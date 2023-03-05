# chris.lu

this series of articles will showcase how to build a blog using [Next.js](https://nextjs.org/) version 13 and up as our rendering framework as well as the [React](https://reactjs.org/) version 18 and up as our frontend framework and focus on using new features like "next.js app directory", "React Server Components", "React Streaming Components", "React Suspense"

both [React](https://reactjs.org/) and [Next.js](https://nextjs.org/) are very popular in the javascript community, based on the latest results from the **state of js survey** that got released in january 2023 and is based on a survey they did at the end of november 2022. This time almost 40k developers from around the world participated and based on their feedback react is in 2022/2023 the most used frontend framework: ["state of js survey results: frontend frameworks"](https://2022.stateofjs.com/en-US/libraries/front-end-frameworks/) and next.js is the most used rendering framework ["state of js survey results: frontend frameworks"](https://2022.stateofjs.com/en-US/libraries/rendering-frameworks/)

## history

### react history

the react team released the [RFC: React Server Components](https://reactjs.org/blog/2020/12/21/data-fetching-with-react-server-components.html) as well as an experimental demo of React Server Components (RSC) in december 2020

the next announcement regarding server components came as part of a blog post announcing the release of [React v18.0](https://reactjs.org/blog/2022/03/29/react-v18.html), the react team mentions that the feature is considered experimental but also that they plan to release the server components in one of the next minor versions of react 18

### next.js history

in may 2022 the next.js team released the [Layouts RFC](https://nextjs.org/blog/layouts-rfc) and sketched out their ideas for server components, but also improved data fetching and things like nested layouts, alongside the RFC posted on their blog they opened a [github discussion regarding the layouts RFC](https://github.com/vercel/next.js/discussions/37136)

Question(s): regarding the new layouts system, the RFC mentioned it would be nice to have a feature that allows to "preserve the state on navigation", did they include this? if so how does it work

Glossary:

* URL Path: Part of the URL that comes after the domain.
* URL Segment: Part of the URL path delimited by slashes

Note: this series of articles will focues on the new `app` directory and server components, I will not go into much into detail describing how to use the "classic" next.js `pages` directory and the "classic" data fetching methods like `getStaticProps`, `getServerSideProps` or even the legacy `getInitialProps`, but I might mention them and compare them to the "new way of doing things" to give you an idea of how we did things until today and how we will now do things starting tomorrow ;) like this little recap that follows

recap of the 1st and 2nd generation of data fetching in next.js:

* first there was `getInitialProps`, with getInitialProps the first page would render on the server and so getInitialProps would be called on the server, then if visiting another page using next/link or next/router that page would get build in the client, so any code in getInitialProps would get executed on the client side, this meant that you had to be aware if you were currently on the server and could use server side code to make a direct data fetch call to the database or if you were in the client and hence fetch the data via an ajax call to an API endpoint you would also need to code, besides that it was also important to be careful about how and what packages you were importing as you might use a package when getInitialProps is executed on the server but then that code would also be bundled into the client to be imported too when getInitialProps runs in the client, to avoid that you would need to exclude packages from the client by either using dynamic imports encapsulated into conditions that check if the code is being executed on the server or client or by using plugins that exclude those "server only" packages at build time. read more: [next.js getInitialProps documentation](https://nextjs.org/docs/api-reference/data-fetching/get-initial-props)
* the newer `getServerSideProps` (which first appeared in march 2020 with [Next.js 9.3](https://nextjs.org/blog/next-9-3)) and is an async function that fetches the data and populates the props object of your page function and works differently then getInitialProps, same as with getInitialProps for the first page the code gets executed on the server and the data is being returned directly to the code of the page, but if you visit a second page getInitialProps will again get executed on the server and the data it returns will get sent as JSON to the client where again it gets used by the page code, this means using getServerSideProps instead of getInitialProps eliminated two pain points, first you did not have to care about your imports anymore as next.js would exclude those packages for you from client code automatically and the second one being that you did not have to create an API for client side data fetching anymore as next.js would go and call getServerSideProps on the server and then fetch the data as JSON for you. read more: [next.js getServerSideProps documentation](https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props)
* `getStaticProps` appeared alongside getServerSideProps, the difference between the two is that getServerSideProps disables ["Automatic Static Optimization"](https://nextjs.org/docs/advanced-features/automatic-static-optimization) but getStaticProps does not, getStaticProps it is a method that you would use to fetch data not at "runtime" but at "build time", so when a user visits a page no data call is being made, all data got already fetched at build time (and the page props have been put in a static json file), which means for any request being made by a user your data won't change, this can be very interesting to build pages that load super fast as they use data that does not change between two builds, however getStaticProps has a feature so that you can "revalidate" data in the background, this is what gets used by "[Incremental Static Regeneration](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration)" and allows you to update the static data you got at build time. read more: [next.js getStaticProps documentation](https://nextjs.org/docs/basic-features/data-fetching/get-static-props)

in october 2022 the next.js team released [Next.js 13](https://nextjs.org/blog/next-13) which included the first version of the new `app` directory and two months later in december [Next.js 13.1](https://nextjs.org/blog/next-13-1)

## image(s) manipulation

converting images to AVIF and WEBP and thumbnails

<https://www.npmjs.com/package/sharp>

## blog

### create a new repository on github

use github to create a new repository for your project

also let github create a README.md a LICENSE as well as a default .gitignore file for you

Note: if you chose "node" as template for the `.gitignore` it will create a quite large gitignore file that contains patterns for lots of common frameworks used when working with nodejs, one of them being next.js, which means the `.next` directory will get excluded if you use this gitignore, the other rules are less useful in our case but also do no harm, so you don't really need to touch that file, also in case you wonder, yes the .gitignore file should get commited

now you can check out your project locally, typing the following command into favorite command line tool / terminal:

```shell
git clone git@github.com:MY_GITHUB_USERNAME/MY_REPOSITORY_NAME.git
```

### initialize project

Note: install nodejs: the **next.js 13** "app directory features" require nodejs v16.8.0 or later

run the following command to have eslint guide you step by step through the creation of your `package.json` file:

```shell
npm init
```

anser the question that get displayed in your command line, when this is done npm will create a `package.json` in the root of your project for you

#### next.js npm scripts

add the next.js scripts to the `package.json` file, which is in the root of the project:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "npx eslint ./"
  }
}
```

those 4 scripts are the npm commands we will later in this tutorial use to execute different task, like:

`npm run dev`: to start the development server
`npm run build`: to make a production build
`npm run start`: to start the server on a production server using the build we made with the previous command
`npm run lint`: to run a linting script that will scan our code and help us find problems in our code

#### enable the app directory in the next.js configuration file

then we create the next.js configuration `next.config.js` file, in the root of the project:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
    },
}

module.exports = nextConfig
```

not much in there right now, for the moment we only add one line in the experimental block to enable the app dir which is still experimental (in beta at the time 01.01.2003)

Note: **next.js 13** got released at the end of 2022 and even though it included a lot of improvements for existing features it also now includes the new `app` directory which is what we will use in this toturial, as the next.js team reminds as at several places this feature will evolve and get improved a lot over the coming months, the next.js team added it to **next.js 13** so that developers can start playing with it and to hopefully gather a lot of good feedback from the community but they also made it clear that you probably shouldn't use this in production just yet and wait a little bit longer for it to mature

#### convert the next.js configuration to an ES module

if you prefer to keep using the CommonJS (CJS) style configuration this is fine as long as you don't use any packages that are [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c), I personally prefer [ECMAScript modules (ES modules / ESM)](https://nodejs.org/api/esm.html) so I decided to convert my `next.config.js` into a `next.config.mjs`

Note: later in this project we will use an [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c) package and at that point is will be mandatory to convert the next.js configuration to an ESM

to do so change the next.config file extension from `.js` to `.mjs` and then change the file content to this:

```js
const nextConfig = () => {

    /** @type {import('next').NextConfig} */
    const nextConfig = {
        experimental: {
            appDir: true,
        },
    }

    return nextConfig

}

export default nextConfig
```

read more:

* next.js configuration documentation: <https://nextjs.org/docs/api-reference/next.config.js/introduction>
* ESM only packages: <https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c>

### install first dependencies

install react and next.js

```shell
npm i react@latest react-dom@latest next@latest --save-exact
```

install eslint and some plugins like the next.js eslint configuration

```shell
npm i eslint-config-next@latest eslint-plugin-react@latest eslint-plugin-react-hooks@latest eslint-plugin-jsx-a11y@latest eslint-plugin-import@latest @typescript-eslint/eslint-plugin@latest @typescript-eslint/parser@latest eslint@latest --save-dev --save-exact
```

Question(s): some plugins like import, react-hooks, jsx-a11y, ... get already added by next.js https://github.com/vercel/next.js/blob/canary/packages/eslint-config-next/package.json ... so it might be overkill to add them, not sure if it is good to add them so that you can create custom rules for those later on in your eslint configuration!?

TODO: when I found a bug mentioned later in the configuration chapter, that next lint was not going into the "app" directory, I however noticed that in vscode linting errors in files from the app directory were being displayed, so I wonder if this impacts other things related to next lint, for example I wonder if plugins added by eslint get actually used by the configuration used in vscode, to answer that question I should extend "next/config" in my eslint configuration but not yet install the "eslint import plugin" or "eslint react hooks plugin" via npm install (clear the node_modules directory and do a fresh install without them to be sure) and do some mistakes that those plugins are supposed to catch in any of my files to see if they get catched, I'm sure next lint will catch them but I wonder if they also get catched in vscode as those are not directly in my config but only in the nextjs eslint that I extend, then as mentioned in the question above, I also wonder if I extend nextjs eslint if I then can add custom rules that are based on plugins that nextjs lint calls but that are not explicitly in my own configuration

install typescript and types:

```shell
npm i typescript@latest @types/react @types/react-dom @types/node --save-dev --save-exact
```

of course if you prefer to use [pNpM](https://pnpm.io/) or [Yarn](https://yarnpkg.com/) as your package managers to install the dependencies above, feel free to do so they are great tools too, I for my part prefer to use npm so this is what you will see in this tutorial but the install commands of [pNpM install](https://pnpm.io/cli/install) or [yarn install](https://yarnpkg.com/getting-started/usage) are very similar


## eslint setup

you have 3 options, when it comes to configuring eslint, option 1 is to use the eslint init command, this in my opinion good as you get to see what eslint thinks are "best practices" when it comes to setting it up, option 2 is to use the next.js eslint init command (when you have no eslint configuration file yet, just run `npm run lint` and the next.js eslint configuration will start) which again is good because you get to see what next.js thinks is a good eslint setup and finally option 3 is that you create an eslint configuration manually and add configure it as you pleases

what is great about those 3 options is that you can combine all 3 to get the best of each world, so lets do just that

first we configure eslint using their own configuration tool, using this command:

```shell
npm init @eslint/config
```

chose the options you like best, I for my part chose the following:

* how would you like to use eslint: check syntax, find problems and enforce code style
* what type of modules does your project use: javascript (import / export)
* which framework does your project use: react
* does your project use typescript: yes
* where does your project run: press the "a" key to have both selected, "browser" and "node"
* how would you like to define a style for your project: you can select "use a popular style guide", eslint will let you chose between ["standard"](https://www.npmjs.com/package/eslint-config-standard-with-typescript) and ["XO"](https://www.npmjs.com/package/eslint-config-xo), check out their repositories if you want to know more about what configuration they apply, I for my part prefer to answer some questions to set my own rules and also because in the next step we will extend the next.js elint configuration
* what format do you want your config to be in: I like to use javascript configuration files over json as it allows me to leave comments for myself and other developers that might come after me, if I wish to do so, so I chose "javascript"
* what style of indentation do you use: I have always used 4 spaces, so I will stick to this, some prefer 2 spaces others prefer tabs these days, there is no right or wrong here, chose what you like best
* what quotes do you use for strings: I always use single quotes, double quotes make me think of html attributes
* what line endings do you use: I chose windows as I'm on windows, I don't think it doesn't matter much, because when you commit to github they will get converted anyway, ["for compatibility, line endings are converted to Unix style when you commit files"](https://docs.github.com/en/get-started/getting-started-with-git/configuring-git-to-handle-line-endings#about-line-endings), also if you want to know more about line endings I recommend reading this article ["Dealing with line endings in Windows with Git and ESLint"](https://markoskon.com/line-endings-in-vscode-with-git-and-eslint/)
* do you require semicolons: I don't anymore, less to code is a win for me, but I know it can cause problems as there are some places where they are mandatory, like between statements in a for loop, but in all these years spoting those has not been a problem

now eslint init has created a `.eslintrc.js` configuration file for us

next step we will extend the ["next.js eslint configuration"](https://nextjs.org/docs/basic-features/eslint#additional-configurations) in our own `.eslintrc.js`

```js
'extends': [
    'next/core-web-vitals',
],
```

Note: as they say in their documentation, it is very important that "next" is last in the list of extended configurations to ensure none of their configurations get overwritten

there are two types of next.js eslint configurations you can extend, the "base" one and the "strict" one, the "strict" one adds web vitals specific checks, for example they recommend you use their "next/image" module, I will enable it for now but we might tweak that configuration later, if you don't want those extra checks, just switch to using "base" instead

to know more you can check out their ["next.js eslint documentation"](https://nextjs.org/docs/basic-features/eslint)

### eslint custom configuration

a plugin I like to add to my eslint configurations is the ["react-hooks eslint plugin"](https://www.npmjs.com/package/eslint-plugin-react-hooks), the package itself we installed it earlier as it was part of the eslint dependencies in our npm install command that we used when we installed all our dependencies in the chapter ["install first dependencies"](#install-first-dependencies), now we just need add it to our configuration for it:

```js
'extends': [
    'plugin:react-hooks/recommended',
],
```

finally you can now add your own custom rules to the eslint configuration, I for example always like to add a custom rule, to ensure all my typescript interfaces start with a big "i", I find this helpful when they get imported later on, to distinguish them from regular functions and variables, if you wish to do so, add the following code in the "rules" section of your `.eslintrc.js`:

```js
'rules': {
    '@typescript-eslint/naming-convention': [
        'error',
        {
            'selector': 'interface',
            'format": [
                'PascalCase'
            ],
            'custom': {
                'regex': '^I[A-Z]',
                'match': true
            }
        }
    ],
}
```

the completed eslint `.eslintrc.js` configuration file should now look something like this:

```js
module.exports = {
    'env': {
        'browser': true,
        'es2021': true,
        'node': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'next/core-web-vitals',
    ],
    'overrides': [
    ],
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'ecmaVersion': 'latest',
        'sourceType': 'module'
    },
    'plugins': [
        'react',
        '@typescript-eslint'
    ],
    'rules': {
        'indent': [
            'error',
            4,
        ],
        'quotes': [
            'error',
            'single',
        ],
        'semi': [
            'error',
            'never',
        ],
        '@typescript-eslint/naming-convention': [
            'error',
            {
                'selector': 'interface',
                'format': [
                    'PascalCase'
                ],
                'custom': {
                    'regex': '^I[A-Z]',
                    'match': true
                },
            }
        ],
    },
}

```

### using eslint

if you now want to lint your code, just run the following command

```shell
npm run lint
```

if you used eslint before you might have used [eslint cli options](https://eslint.org/docs/latest/user-guide/command-line-interface), next lint supports some of these too

which means that if in the past you did, something like this:

```shell
npx eslint ./ --fix
```

then you can still do the same with next lint, like so:

```shell
npm run lint --fix
```

Note: if you look at the code of linting cli from the next.js package, you can see which eslint options next.js supports ["cli/next-lint.ts"](https://github.com/vercel/next.js/blob/canary/packages/next/src/cli/next-lint.ts#L63)

### our first page

first we create the app directory in the root of our project, by using the following command or by using your IDE:

```shell
mkdir app
```

inside of the `app` directory create a first page called `page.tsx` and put the following content into it:

```tsx
export default function Homepage() {
    return <main>Hello, World!</main>
}
```

Note: you will see in VSCode that the `<main>` element is underlined and shows an error, ignore this for now, it will go away in the next step as soon as next.js has created the typescript configuration file for us

Note: did you notice how our first page is called `page.tsx` but the function itself has as name `Homepage`, if you worked with next.js before you might be used to create files for pages where the file name and the function were both identical and represented the content of that page, this isn't the case anymore, in the app directory every file containing UI code of a page is always called `page.tsx`

TODO: probably here would be a good place to explain the new routing system and how URL segments get matched to files in the new app directory

Note: now we could create two more initial files ourself `head.tsx` and `layout.tsx`, but wait because we can also let next.js do it for us and that's the option I will chose here because I want to see what initial code next.js puts into them

in your command line tool (or a vscode terminal), type this command to start the development server:

```shell
npm run dev
```

when you do this for the first time a lot of things will happen:

* because next.js has detected that `page.tsx` is a typescript file, it will display a message, saying that:

> We detected TypeScript in your project and created a tsconfig.json file for you.

so next.js automatically created a `tsconfig.json` file but also a `next-env.d.ts` for us in the root of our project to configure typescript for us

Note: learn more about next.js typescript support and the two files I just mentioned, check out their ["next.js TypeScript documentation page"](https://nextjs.org/docs/basic-features/typescript)

Note: also good to know is that starting with version 12 next.js typescript compilation is now much faster thx to ["SWC"](https://swc.rs/), which is now the new next.js compiler, for a bit of history and more in depth information check out their ["next.js compiler documentation page"](https://nextjs.org/docs/advanced-features/compiler)

* you will notice that in your terminal a message appeared telling you that:

> info  - VS Code settings.json has been created for Next.js' automatic app types, this file can be added to .gitignore if desired

this vscode "workspace settings" file got created in a directory called `.vscode` and the file is called `settings.js`, it contains workspace specific configuration instructions for your VSCode IDE, as next.js tells you, it is up to you if you add them to .gitignore to ensure they don't get shared with other people using your repository, I usually however share mine, I think it can be helpful if the entire team working on a project uses the same IDE configuration

* because of that new VSCode settings file next.js just created, a notification will appear in your VSCode, saying that it detected that you installed typescript in the current workspace and will ask you if you allow it to use that version instead of it's own typescript version that is bundled into vscode, so we click on "Allow"

![vscode notification typescript version](./documentation/assets/images/vscode_notification_typescript_version.png)

this notification is related to a new typescript plugin the next.js team created and which is included in the release of **next.js 13**, here is a little quote from their [next.js 13.1 blog post](https://nextjs.org/blog/next-13-1):

> We've built a new TypeScript plugin that provides suggestions for page and layout configuration options and provides helpful usage hints around Server and Client Components

Read more:

* check out the [youtube video "Next.js 13: Prevent Common Mistakes w/ New TypeScript Plugin"](https://www.youtube.com/watch?v=pqMqn9fKEf8) from [Delba](https://twitter.com/delba_oliveira) which is part of the next.js developer experience team giving more info about what the new plugin is and what it does
* [next.js "using the typeScript plugin" beta documentation](https://beta.nextjs.org/docs/configuring/typescript#using-the-typescript-plugin)

* but this is not all next.js does for us, because now if you visit the your first page by using the URL `http://localhost:3000`, next.js will also create the two files, `head.tsx` and `layout.tsx`, that I mentioned ealier, inside of the `app` directory

the `head.tsx` next.js created for us, looks like this:

```typescript
export default function Head() {
    return (
        <>
            <title></title>
            <meta content="width=device-width, initial-scale=1" name="viewport" />
            <link rel="icon" href="/favicon.ico" />
        </>
    )
}
```

the `layout.tsx` next.js created for us, looks like this:

```typescript
export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html>
            <head />
            <body>{children}</body>
        </html>
    )
}
```

layout:

with the pages directory in previous next.js version, you had the possibility to wrap the `children` property of your `_app.tsx` with a layout component to then have that layout being applied to every page, but the disadvantage was that it would then be used by every single page in your pages directory, all other solutions involved writing more code, for example by adding custom code inside of your _app.tsx that would check which route you were on and based on that switch to another layout, or you could have imported different layouts in every page file and wrap you page into those layout components

with the new layout system it is much easier to have different layouts for different segments of your website

layouts will apply to the segment they are in and all segments nested below that, which brings us to another feature which is that now it is possible to have a cascade of layouts where one layout from a child segment is encapsulated into the layout of the parent segment





Server Components and Client Components:

TODO: need to segment this main chapter into smaller sub chapters

all files inside app directory are by default "React Server Components" and hence will be rendered on the server

but you can also have files in the app directory that are client components

which finally means you can have both server and client components in a component tree

Note: for more info and good diagrams that help you understand how client and server components can be mixed can be found in the [next.js (beta) documentation "Rendering Fundamentals"](https://beta.nextjs.org/docs/rendering/fundamentals)

TODO: show an example with a console log, show that the console log appears in the terminal but not in the console logs of your browser developer tools

so may wonder but when do I need to define a client component as being a client component? well there are several things that when added to a component will have next.js tell you that those can't be used in client components, like when using reacts local state, or react context or a clickHandler on a button

hmmm weird this page <https://beta.nextjs.org/docs/rendering/server-and-client-components#convention> contradicts the previous statement, as it says only hooks in the code will force you to mark a component as client component:

> You only need to mark components as 'use client' when they use client hooks such as useState or useEffect. It's best to leave components that do not depend on client hooks without the directive so that they can automatically be rendered as a Server Component when they aren't imported by another Client Component. This helps ensure the smallest amount of client-side JavaScript.

TODO: do an example of a component that is a server component, then add for example an onClick handler and demonstrate the next.js message that says that you need to turn the component into a client component, is it really only hooks that trigger this message and things like onClick are listed in this table <https://beta.nextjs.org/docs/rendering/server-and-client-components#when-to-use-server-vs-client-components> to explain that an onclick would never get "clicked" on the server by a user???

Question(s): if my component is not in the app directory and has no statement "use client", but I import it inside of a Server Component, do I still get the error that server components can not use XY?

TODO: show example of question above, where the component is in components directory and being imported inside of server component, but there is no error, because as it is not in the app directory it is not getting treated as server component but a client component

as I mentioned above you can mix server and client components, for example if you explicitly state that component is a client component but then inside of it use a server component or vice versa

so a component with no statement, a component located into a segment directory if loaded by a client component will also be considered being a client component without having to explicitly add the 'use client' statement on top

TODO: show example of server component, show it printing a message in the terminal, then re-use it but his time being imported into a client component and it just works (no need to add 'use client' statement) and show that now the message appears in the browser console and not the server anymore

Question(s): how to add a server component into a client component (if next.js then thinks it also a client component), is there a 'use server' statement?

Note: to learn more about the advantages of server components, check out the [next.js documentation "Why Server Components?"](https://beta.nextjs.org/docs/rendering/server-and-client-components#why-server-components)

server components can NOT get IMPORTED into client components, you ALWAYS need to pass them as children prop from within a server component down to the client component that will use it: <https://beta.nextjs.org/docs/rendering/server-and-client-components#importing-server-components-into-client-components>

TODO: to answer the question above, show example code of passing a server component via the children prop into a client component (that client component needs to be inside of a server component)

Is next.js 13 Isomorphic and do I even want it to be Isomorphic:

Note: to be honest I find all this quite complex, I don't like having to remember all the time that I need to do something in a specific way for it to work based on the environment where I'm, this adds complexity when creating components and also forces me to do some refactoring when I convert a component from a server component to a client component or vice versa and suddenly I need to remove the async await I could previously use, I like to be able to always do the same thing and be sure I will get the best result, I don't want to also have to wonder if my component is a server component inside a client component then I will fetch data so I need to pass it via children to client side components

to me this is not "Isomorphic" at all, I personally expect from a modern framework to be Isomorphic, you should be able to reuse most of your code on server side as well as the client side and only have a few files that function as adapters and do something different based on the environment, like having a getData function for both on the server and the client side, but inside getData you check the environemnt and based on the result you either do a browser fetch request using an API URL if you are in the client or if you are on the server you use the database adapter to make a direct database query without passing through an API, same would get done for caching, for example you would be able to cache data queries with a unique function that you can use the same way on the server side as well as the client, the cache function would use an adapter that caches data for example using the localstorage if you are in the client and if on server another adapter that caches or retrieves the data from for example a redis database

can we solve this headache by using the new next.js fetch? if so, this would mean we need an API! I don't mind needing an API, we would need one anyway for POST, PUT, PATCH and DELETE methods that client side code would call to execute actions, what is also nice is that the features like being able to use the `loading.tsx` file in your segment directory is not lost and still gets used when making a server side fetch, but finally all this all means that we never make any component function async and also not use await inside of it, but instead always use the new react `use` hook, only if we do all of this then we come very close to a real Isomorphic experience where we don't need to think about the question is this a component I can import or a component I need to pass via the `children` prop

the problem with fetching data in the client, is that after fetching the data from API, it is the client which needs to do the rendering job to produce the final html, so we lose the SSR benefit where the client gets the html pre-rendered and just needs to hydrate it, next.js in their documentation explicitly mentions that fetching in the client should get avoided: <https://beta.nextjs.org/docs/rendering/server-and-client-components#data-fetching>, you can compare this to have someone deliver to you you all the ingredients to cook your meal but you still need to do the cooking vs having someone deliver to you a pre-cooked meal that you just need to heat before you can eat it

so unfortunatly to not lose the SSR benefit, if we are in a situation where a client component makes use of a server component, then we have to pass it to the client component via the `children`

having to pass components via children however reminds me a lot to ugly and code intensive **props drilling** problem we had before react introduced react context

TODO: It might be better to put all this into a separate blog post, outside of the scope of this tutorial and then link to it

Question(s): what would be nice is that if the framework when encountering a server component inside a client component, would not consider it a client component but instead pre-render it automatically on the server for you and send the html to the client component to then get hydrated

Question(s): can streaming fix some of these problems? make it easier for the devs?

next problem, apparently you can't just pass any props from a server to a client component, they need to be serializable: <https://beta.nextjs.org/docs/rendering/server-and-client-components#passing-props-from-server-to-client-components-serialization>, which means that a function for example can't be passed from a server component to a client component

because some components can be used ONLY on the server or ONLY in the client, next.js added two new optional packages you need to import into your component: <https://beta.nextjs.org/docs/rendering/server-and-client-components#keeping-server-only-code-out-of-client-components-poisoning>

Question(s): what happens if you put a useState hook into a page.tsx or layout.tsx? next.js recommends to seperate such code and externalize it into client components: <https://beta.nextjs.org/docs/rendering/server-and-client-components#moving-client-components-to-the-leaves>

third party packages that use client only hooks, can't be used in server components as is, you need to wrap them into a client component and re-export them before using them in your server component: <https://beta.nextjs.org/docs/rendering/server-and-client-components#third-party-packages>

similar problem with context, context can not be used as is in server components, so you need to put the provider into a client component that has the 'use client' statement and then you can use that component inside of your server component: <https://beta.nextjs.org/docs/rendering/server-and-client-components#using-context-in-client-components>

and also same problem for third party providers: <https://beta.nextjs.org/docs/rendering/server-and-client-components#rendering-third-party-context-providers-in-server-components>

for sharing data between multiple server components you need to use a pattern like **singletons** to make it work: <https://beta.nextjs.org/docs/rendering/server-and-client-components#sharing-data-between-server-components>

TODO: for this a good example is the database file we already share between files in the api routes

TODO: explain why the package **server only** can be useful <https://beta.nextjs.org/docs/rendering/server-and-client-components#keeping-server-only-code-out-of-client-components-poisoning>

TODO: optimization, explain it is important to only have client components in the leaves, the more server components the more pre-rendering will happen, the faster the page will load <https://beta.nextjs.org/docs/rendering/server-and-client-components#moving-client-components-to-the-leaves>

TODO: explain that a common problem due to the new **'use client'** directive, is that lots of npm packages don't have it, the solution is to encapsulate those third party tools into a wrapper component of your own that has the **'use client'** directive and which imports and re-exports the third party component <https://beta.nextjs.org/docs/rendering/server-and-client-components#third-party-packages>


data fetching:

you can fetch data directly inside of your "Server Component" function, so now there is NO need to use an extra async function like getServerSideProps or getStaticProps anymore (also there is no need to try to use them, they are not supported in the app directory anymore, in the pages directory on the other hand nothing changed in that regard)

a big novelty for server components versus client components, is that in server components you can use await, this means you declare that the function is async and then use await inside of it, so now we can do "await getSomeData()" inside components, compared to previously where we would have created a seperate function to fetch data and put that data into local react state of our component

TODO: show example of async component function with an await, that calls an /library/fetch file which returns some dummy json data

in clients you still can't use async / await but in client components there is another novelty which is called the "use" hook, this hook is still very experimental and the [proposed RFC](https://github.com/acdlite/rfcs/blob/first-class-promises/text/0000-first-class-support-for-promises.md) has not even be merged into the official RFCs repository yet

Note: more info about the new react hook "use()" can be found in the [next.js "use in Client Components" documentation page](https://beta.nextjs.org/docs/data-fetching/fetching#use-in-client-components) or the [proposed RFC](https://github.com/acdlite/rfcs/blob/first-class-promises/text/0000-first-class-support-for-promises.md) (careful these informations can change as any moment and some of it might not be true anymore in a few weeks, I will update this part as the situation evolves)

```typescript
import { use } from 'react'
```

from the next.js documentation:

> When a route is loaded, the Next.js and React runtime will be loaded, which is cacheable and predictable in size. This runtime does not increase in size as your application grows. Further, the runtime is asynchronously loaded, enabling your HTML from the server to be progressively enhanced on the client

Question(s): what exactly is the runtime? how is it loaded asynchronously? Isn't it bundled like everything else?

so sharing data between server components, as mentioned in the previous chapter, can't be done via context, so the previous chapter recommended using a pattern for example like the **singleton** pattern, but an alternative when fetching data is to use fetch, if we do the same fetch in several server components next.js will cache the result and only a single query will be made: <https://beta.nextjs.org/docs/rendering/server-and-client-components#sharing-fetch-requests-between-server-components>, there are more details about this caching on this page: <https://beta.nextjs.org/docs/data-fetching/fundamentals#automatic-fetch-request-deduping> which says that the caching technique being used is called **deduping** and it is mentioned that this works on both the server and in the client, on the server the fetch result is cached until the request is done and on the client it is cached until the page is reloaded, which means on the client if using navigate and then fetching again will use the data from cache and not trigger a new API request








rendering:

there are two environments where your application code can be rendered, the client and the server, you can choose the rendering environment at the component level, a server component is rendered on the server and a client component in the client

read more: [BETA Next.js documentation: Rendering Fundamentals](https://beta.nextjs.org/docs/rendering/fundamentals)

similar to what we were achieving getServerSideProps and getStaticProps, with **next.js 13's** app directory, you have two main options, **dynamic rendering** and optimized **static rendering**

Note: next.js will try to make static rendering happen as much as possible, for example by default fetch requests will be cached (TODO: need to verify this, if using a fetch and not opt out of caching, will the page be static, meaning the fetch is done at build time???) (more about this in the TODO: link to **caching** chapter), but similar exceptions to what we have in the pages directory, there are things that will force next.js out of static rendering, one of these is if you use the hook **useSearchParams** (more about this in the TODO: link to **searchParams** chapter)

weird, the [rendering](https://beta.nextjs.org/docs/rendering/fundamentals#dynamic-rendering) doc says:

> With Dynamic Rendering, both Server and Client Components are rendered on the server at request time.

Question(s): I don't get it, why it says client side components are rendered on the server

with dynamic rendering client components are prerendered on the server: <https://beta.nextjs.org/docs/rendering/static-and-dynamic-rendering>

Question(s): what is "prerendering", how does it differ from "rendering", how is it better than no prerendering at all

TODO: can we analyze what is in next.js bundle files sent to the client, can we look at what a prerendered component looks like in terms of code, is for example the jsx already turned into html?... this next.js page <https://nextjs.org/learn/basics/data-fetching/pre-rendering> is for nextjs pages, but it explains what nextjs means by "prerendering" and it also explains how to check if prerendering happen, so this is worth reading before making an example that shows and explaisn prerendering


TODO:

check out these articles to better explain rendering especially SSR pre-rendering

<https://nextjs.org/learn/foundations/how-nextjs-works/rendering>
<https://nextjs.org/learn/basics/data-fetching/two-forms>
<https://nextjs.org/learn/basics/data-fetching/pre-rendering>
<https://nextjs.org/docs/basic-features/pages#pre-rendering>






routes:

you can create static route segments, like /users but same as with pages you can also create dynamic routes like [id], to get the dynamic value you use the "params" prop

Question(s): do ["catch all"](https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes) routes (that have 3 dots: [...id]) and ["optional catch all"](https://nextjs.org/docs/routing/dynamic-routes#optional-catch-all-routes) routes (that have 2 square brackets [[...id]]) still work in the app directory???

next.js created a layout file for us in the root segment, but if inside of that segment we add a new segment /posts/[id] then this page will use the same layout, the best here is that all data that is being fetched in the layout is not getting refetched when you **navigate** from one to another

TODO: show an example with just "a href" links, which reload the entire page and then an example which uses next/link, explain that when I say **"navigate"** I mean by using **next/link** and NOT a conventinal **html anchor element**, show clearly that the data query in the layout is not being executed twice, just the main content (children of layout) are being updated

TODO: add an extra sub-chapter to explain how **statically typed links** work: <https://nextjs.org/blog/next-13-2#statically-typed-links>





loading:

Note: next.js loading uses a react suspense boundary under the hood, meaning that loading.tsx is a suspense boundary wrapped around your page.tsx

you can now create new loading files and these files have an error prop that contains details about the error

Question(s): are loading scripts also getting used by nested segments, like with layouts or do you need a loading script in each segment?

TODO: create a small demo by creating a loading file and adding a setTimeout to our library/fetch that returns the dummy json

read more:

* [next.js loading UI documentation](https://beta.nextjs.org/docs/routing/loading-ui)
* [next.js loading.js documentation](https://beta.nextjs.org/docs/api-reference/file-conventions/loading)
* [react beta docs suspense documentation](https://beta.reactjs.org/reference/react/Suspense)



error:

Note: similar to loading.tsx which use react suspense boundaries under the hood, the error.tsx file uses react error boundaries under the hood

similar as loading, you can create error files

Question(s): error files can only be client components???

TODO: also check out how error bounderies work: 

read more: 

* [next.js error file convention documentation](https://beta.nextjs.org/docs/api-reference/file-conventions/error)
* [next.js error handling documentation](https://beta.nextjs.org/docs/routing/error-handling)
* [react error boundery documentation](https://reactjs.org/docs/error-boundaries.html)
* [react beta docs catching rendering error with an error boundary documentation](https://beta.reactjs.org/reference/react/Component#catching-rendering-errors-with-an-error-boundary)



put your components into a seperate `components` directory or alongside the page files inside of the route segment directory:

prior to next.js 13's release or if you worked previously with create react app and did not use next.js at all, like me you might be used to put all components into a directory called `components`

Note: putting a compenentX.tsx file into the `pages` directory would not be wise as next.js will consider every .tsx file to be a page

if you use the new next.js 13 however, you can now put all your components into segment directories, this means you can put all your UI components and even your test files into the same directory as your page.tsx, only the page.tsx file will be handled as page by next.js and every other file except those that have reserved names like loading.tsx or error.tsx will be considered being custom components

so is a seperate components directory still needed and advisable or should you now get rid of the components directory and put all components into segment directories along with your page files?

you could also do both, put some components that are being used by only one page into the pages segment directory and all other components that are being used by more than one page into the components directory

it is as you prefer, for the moment as next.js is very new there is not yet really a trend which shows us which solution is the most popular

I for my part prefer a seperate components directory that acts as a library for all my components, for several reasons:

* because some components will be used by more than one page, so putting them into a segment directory alongside a page but getting imported by another page in another directory seems weird to me
* you could argue that doing both, putting the components used by a page alongside the page into the same directory and all other components that are being used by more than just one page into a components directory, but the disadvantage I see here is that often you will create a component and at first it will be used by one page so you will put it alongside the page but then later on you discover that another page will benefit from using it too and then you need to move it and refactor the import pathes, this is something I want to avoid
* TODO: not sure about this? -> all components that are in the app directory are considered being server components by default, so does that mean all components that are not in the app directory are considered being client components by default, meaning you don't have to explicitly add the 'use client' statement on top of each file? the other way around, if you have a component outside of the app directory and you want it to be a server component, how do you communicate that to next.js 13???
* all files in the components directory will have react only code and no have any next.js specific code
* it will hopefully be easier in the future to re-use or share the components






caching:

TODO: <https://beta.nextjs.org/docs/data-fetching/fundamentals#caching-data>

this page <https://beta.nextjs.org/docs/routing/fundamentals#server-centric-routing-with-client-side-navigation> mentions:

> Additionally, as users navigate around the app, the router will store the result of the React Server Component payload in an in-memory client-side cache. The cache is split by route segments which allows invalidation at any level and ensures consistency across concurrent renders. This means that for certain cases, the cache of a previously fetched segment can be re-used, further improving performance.

read more: <https://beta.nextjs.org/docs/data-fetching/caching>

// Generates statically like getStaticProps.
fetch(URL, { cache: 'force-cache' });

// Generates server-side upon every request like getServerSideProps.
fetch(URL, { cache: 'no-store' });

// Generates statically but revalidates every 20 seconds
fetch(URL, { next: { revalidate: 20 } });

Note: if you use fetch with no options, the default value for cache will be force-cache(?) TODO: need to confirm that

TODO: need to verify this, if using a fetch and not opt out of caching, will the page be static, meaning the fetch is done at build time???, need to test this with some examples using a version deployed to vercel, to use a real prod build for testing / verification

TODO: check out the next.js 13.2 improvements: <https://nextjs.org/blog/next-13-2#nextjs-cache>




revalidating:

<https://beta.nextjs.org/docs/data-fetching/revalidating>




streaming:

from the ["next.js 13 blog post"](https://nextjs.org/blog/next-13):

> the app/ directory introduces the ability to progressively render and incrementally stream rendered units of the UI to the client

I let you check out the [next.js "what is Streaming?" documentation section](https://beta.nextjs.org/docs/data-fetching/streaming-and-suspense) it is very informative about what limitations SSR has and why streaming is good solution







TODO: Web fetch() API ???
https://beta.nextjs.org/docs/data-fetching/fundamentals
TODO: client components
TODO: list all reserved next.js file names:
layout.tsx
page.tsx
loading.tsx
error.tsx
template.tsx (similar to layouts, but the difference is that on navigation a new instance is being created)
head.tsx
not-found.tsx
are there more?

TODO: increase dev server speed with turbopack, add the option `--turbo` to `next dev` in the package json scripts
https://nextjs.org/docs/advanced-features/turbopack
Question(s): is turbo also used for build command? I mean prod build, same as for dev?


add mui to our project

install mui but also the mui eslint plugin, then edit the eslint configuration to activate it


add authentification using next-auth
the session provider that was previously in _app now goes into the root layout
the login button component which has a clickHandler must have a "use client" statement if it is located inside of the app dirctory or get moved to the components directory

use jest to write some tests
jest seems to have the biggest user base right now if you look at the ["state of js 2022 survey results"](https://2022.stateofjs.com/en-US/libraries/testing/)



### optimizing images with next/image

images go into the public directory, but `public` is not part of the src path, only what comes after

so an image called `foo.jpg` located in `/public/images/` would have an src like this: `/images/foo.jpg`

Note: if you used next/image prior to **next.js 13** you might want to check out the migration guide as there are some major changes as to how some options work: <https://nextjs.org/docs/messages/next-image-upgrade-to-13>

for the layout header, we will add a fallback image for the canvas element, the goal is to use the [css property object fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit) to make it as large as the canvas container:

```ts
<Image
    src="/assets/images/neonroad/fallback-min.png"
    alt="Chris.lu header image, displaying an 80s style landscape and sunset"
    fill
    style={{objectFit:'cover'}}
    sizes="100vw"
    priority
    quality={80}
/>
```

if now open the page in your browser and inspect the html you will see that next.js add a lot of different srcset attributes to the img tag

Note: when you start your server with `npm run dev`, next.js will automatically create files with different dimensions of your image and store them into the directory `\.next\cache\images`

our original image is a PNG image, so it's quite heavy, because modern browser support formats like [AVIF](https://developer.mozilla.org/docs/Web/Media/Formats/Image_types#avif_image) or [WebP](https://developer.mozilla.org/docs/Web/Media/Formats/Image_types#webp_image) we want next.js to convert our original file into these formats and depending on what format the browser supports we want next.js to either ship .avif files to the user (best compression / smallest size) or else ship .webp files (good compression / smaller size) and only if none of those two is formats is supported it should ship .png files (worst compression / bigger size)

to add support for webp and avif we need to add the following code to our next.config.js:

```js
const nextConfig = () => {

    /** @type {import('next').NextConfig} */
    const nextConfig = {
        experimental: {
            // experimental support for next.js > 13 app directory
            appDir: true,
        },
        // file formats for next/image
        images: {
            formats: ['image/avif', 'image/webp']
        },
    }

    return nextConfig

}

export default nextConfig
```

no need to change any code of the `<Image>` component we added previously, next.js will handle the conversion to the different formats automatically now that we have added them to the configuration file and will store the different versions into `\.next\cache\images`

Note: next/image uses sharp <https://www.npmjs.com/package/sharp> to convert images to other formats

Note: when using next/image for the first time, check out the browser dev tools console, next.js might give you tips about how to improve the usage you make of it, for example if your image is on top of the page but you have not set the attribute ["priority"](https://beta.nextjs.org/docs/api-reference/components/image#priority) then next.js will tell you to do so:

> Image with src "/assets/images/neonroad/fallback-min.png" was detected as the Largest Contentful Paint (LCP). Please add the "priority" property if this image is above the fold.

read more:

* next.js next/image documentation: <https://beta.nextjs.org/docs/api-reference/components/image>
* use avif in next.js: <https://avif.io/blog/tutorials/nextjs/>

### optimizing fonts with next/font

next.js 13.2 has some next/font improvements: <https://nextjs.org/blog/next-13-2#other-improvements>

read more:

[next.js next/font beta documentation](https://beta.nextjs.org/docs/optimizing/fonts)

### state management

here are the libraries I consider using:

jotai: <https://github.com/pmndrs/jotai>
zustand: <https://github.com/pmndrs/zustand>
recoil: <https://github.com/facebookexperimental/Recoil>

here is a comparison of the 3: <https://npmtrends.com/jotai-vs-recoil-vs-zustand>

### setting up vercel account

vercel website: <https://vercel.com/>
vercel is free for personal prjects, like your blog: <https://vercel.com/pricing>

first one your dashboard: <https://vercel.com/dashboard>, if haven't connected your git account (github, gitlab, ...) do that first

click on "Add new project", then select your git account

now for the repositories you can chose to enable vercel on all of them or just a selection (I chose to select which ones I want to use with vercel as I have a bunch of accounts which are either forks, own packages or just experiments I created)

then click on "Install"

on the next page, click the "import" button next to the project you want to set up

Note: if like me in this project, you use next.js, vercel will set up your project using default values for projects using next.js with will reduce the time you spend on configuring the next step

now you must configure the project, you will notice that most values have default values but feel free to edit them if you need to

when I look at the "Build and Output Settings" section, I see vercel says they will use "npm install" by default to install the projects dependencies, I'm a bit surprised that they don't use `npm ci` [(npm ci documentation)](https://docs.npmjs.com/cli/commands/npm-ci)

TODO: for now I did not change the install command to `npm ci`, I let the default value, I will do a deployment and see if I can see in the logs which command is really being used

one section we will need to make some changes at some point is the [environment variables section](https://vercel.com/docs/concepts/projects/environment-variables), but for now we have no environment variables, so we skip it for now

finally click on "Deploy"

wait for the deployment to finish

if the deployment was successfull it will show you a preview image of the homepage, click on that image to visit your deployment

### introduction to planetscale

planetscale is a MySQL database platform for serverless apps

it's databases are powered by [Vitess](https://github.com/vitessio/vitess) a MySQL cloud database that is today opensource and got developped by youtube in 2011 for their own needs and is being used there since then

they offer a generous free tier for hobbyists and two paid plans for enterprise use



### setting up planetscale account

planetscale website: <https://planetscale.com/>
planetscale is free for "hobby" projects, like your personal blog: <https://planetscale.com/pricing>

go to your planetscale account and create your first database

enter a name and chose a default region for your first database (idially a location close to your own location)

now on top you will see a button that reads "initializing" with a loading spinner, wait for it to finish

Note: we don't define a schema just yet, we will come to that in a bit

## connecting planetscale to vercel

after you have created a plantscale account and set up the database for your project head back to your [vercel dashboard](https://vercel.com/dashboard)

Note: [vercel integrations](https://vercel.com/docs/integrations) let you connect third party tools to your vercel account

in the top navigation bar click on the **settings** tab and then in the left navighation click on **integrations**, ot in this case as we know what we want to add we can also directly visit the plantscale integration page: <https://vercel.com/integrations/planetscale>

now in the top right of the page click on the button "Add integration"

select the vercel account you want to connect planetscale to and then click on "continue"

on the next step, select "Specific Projects" and chose the project you want to connect planetscale to

next click on "Add Integration"

on the next step, on the "Vercel" side is a field named "Framework" with 3 options, "General" "Nodejs" and "Prisma", which have an impact on what environment variables will be created for you in the vercel environment variables interface

Note: when using planetscale in combination with vercel, you add planetscale as an "integration" in your vercel account and then you don't need to set up the env variables by yourself, vercel will automatically get them from planetscale for you

we are not going to use Prisma as ORM for now, so as framework we chose "Nodejs", we are actually going to use the planetscale javascript database driver to connect to our database which supports ["database URLs"](https://github.com/planetscale/database-js#database-url) which is what vercel is going to set up as environment variable for us when chosing "Nodejs" as framework, you could also use "General", the only difference is that instead of one environment variable containing everything it will setup multiple variables (username, password, host), you can chose that option if you prefer, I for my part prefer to have all in one database URL

Note: personally I think any ORM is overkill for small projects, they add overhead to queries and there is a lot to learn before you know exactly how to make good use of it, this is why I like to start with a basic mysql client and regular mysql queries before going over to using something more complex but if you prefer to go straight to using Prisma, fell free to do so

Note: the plantscale repository on github: <https://github.com/planetscale/database-js>

now click on the button "Connect database", you will see a message successfully connected and then "installation process" will start, don't close the window but instead wait for the installation to finish (the window will close itself when the installation is done)

read more:

* integrate plantscale with vercel (by vercel): <https://vercel.com/integrations/planetscale>
* integrate plantscale with vercel (by plantscale): <https://planetscale.com/docs/tutorials/deploy-to-vercel>

## creating a database using the planetscale interface

Note: you can import an existing database, if you wish to do so follow the [planetscale database imports guide](https://planetscale.com/docs/imports/database-imports), but as we are working on the new project we will use the planetscale web interface to create a new database and tables

go to your planetscale account and then click on "Console" in the top navigation bar

Note: we earlier created a database, for that database planetscale has created a "default" branch called **main**, this branch should be selected by default in the console

next click on **connect**

<https://app.planetscale.com/chrisweb/chris-lu/console>
<https://planetscale.com/docs/onboarding/create-a-database>
<https://github.com/planetscale/docs/blob/main/docs/onboarding/create-a-database.md>
<https://planetscale.com/docs/tutorials/planetscale-quick-start-guide#getting-started-%E2%80%94-planetscale-cli>

## vercel preview (staging environment)

if you have a repository with a **main** and do a commit vercel will do a new deployment of your production environment

some people like to live dangerously:

![I don't always test my code, but when I do, I do it in production](./documentation/assets/images/test_in_production.png)

it is useful to have **preview** deployments, so that you can check out changes you made before pushing those into production

to have vercel create **preview** deployments we create a new branch in our repository and call it **preview**, then we switch to that branch in VSCode

now every change we do, we commit it into our **preview** branch, this will trigger a **preview** deployment by vercel

open your repository on github and now on the right side you should see a section environments, you now have two environments listed here, **production** and **preview**

![github / vercel deployment environments](./documentation/assets/images/github_vercel_deployment_environments.png)

click on **preview** to go to the deployments history page, there you can click on **View deployment** and then you can test the deployment

## github: pull request from preview into main branch (automatically link / close tickets)

if everything is ok, you need to merge the changes from your **preview** branch into the **main** branch, or even better do a [PR (pull request)](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request)

go to your repository on github, if you are on the **main** branch switch to the **preview** branch

if you did a commit not long ago github will automatically show a message on top "preview had recent pushes", if that the case click on **Compare and pull request**, if the latest commits are a bit older you will have a button **Pull request** on the top right side of your branch files list, click it to go to the PR page

github creates a PR brings you to the PR page

first add a good title to describe what is in the PR

then you can add an optional description

Note: to [automatically link your PRs to one or more tickets](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue), edit the PR description, type hashtag and then select your ticket from the list or manually type #TICKET_NUMBER

Note: if you want the linked ticket to get automatically **closed** by the PR, put a word like **closes** or **fixes** (for a full list of keywords check out the [github "ticket linking" documentation page](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue#linking-a-pull-request-to-an-issue-using-a-keyword)) in front of the #TICKET_NUMBER in your PR description, so for example `fixes #1`, then after doing the PR the ticket will get automatically set to **closed** by github

![github: this PR closes the issue(s)](./documentation/assets/images/PR_closes_issue.png)

if you are part of a team and want to have other people check out your PR, you also assign one or more reviewers on the right side of the PR page

when your PR is ready to get merged into the **main** branch, click the button **Merge pull request** on the bottom of the page

Note: after the PR is done, if you listed your ticket(s) in the description of the PR, then on the page of your ticket you will see that it automatically got linked to your PR and if you used one of the keywords that automatically closes the ticket then you will notice that it also got closed

![github: linked PR message](./documentation/assets/images/linked_PR_and_ticket_closed.png)

now that the PR into the **main** branch is done, vercel will do a new production deployment for you

## articles (pages) using MDX (@next/mdx)

### introduction

the articles of our blog will be MDX files

Note: MDX extends the [markdown](https://en.wikipedia.org/wiki/Markdown) markup language

one of the great features of MDX is that it lets you integrate react components into your markdown

Note: I think that every time you have to decide what framework you will use for your next project or what package to use to solve a problem or build a new feature, it is important that you take some time and do several prototypes using the different options you have, after that it will be much easier to decide which one suits your use case best and this is what we are about to do here, we will experiment with 3 ways of rendering MDX content and after that it will be easier to chose which one suits our use case best

you can chose between 3 ways of creating an **article page** that will display MDX content:

* [option 1](#option-1-multiple-pagetsx-files-one-static-route-per-article): multiple page.tsx files, one static route per article
* [option 2](#option-2-multiple-pagemdx-files-one-static-route-per-article): multiple page.mdx files, one static route per article
* [option 3](#option-3-one-pagetsx-file-one-dynamic-route-segment-for-all-articles): one page.tsx file, one dynamic route segment for all articles

### getting started (only for option 1 and 2 NOT 3)

Note: the prerequisites listed in this chapter are only for option 1 and 2, for option 3 we will use other packages and DON'T need the steps mentioned in this chapter

to render our MDX content we will use the [next.js @next/mdx package](https://beta.nextjs.org/docs/guides/mdx)

@next/mdx uses [remark](https://www.npmjs.com/package/remark) and [rehype](https://www.npmjs.com/package/rehype) under the hood, but if you prefer to use them without @next/mdx, check out the example called **Deep Dive: How do you transform markdown into HTML?** in the next.js ["Markdown and MDX" documentation](https://beta.nextjs.org/docs/guides/mdx)

first we will add the `@next/mdx` package our next.js project, this package will add support for mdx files to our next.js project, execute the following command in your VSCode terminal:

```shell
npm install @next/mdx --save-exact
```

TODO: in the regular docs they say you need to install [@mdx-js/loader](https://www.npmjs.com/package/@mdx-js/loader) (an MDX loader for webpack) and [@mdx-js/react](https://www.npmjs.com/package/@mdx-js/react) as mentioned in the documentation you probably never need this: <https://mdxjs.com/docs/using-mdx/#mdx-provider>, but they don't mention to install those two in the beta docs anymore, so do I need to add them manually or not??? This PR seems to confirm they are optional: <https://github.com/vercel/next.js/pull/45440/files#diff-7b9eb4f98eac741f3a0f77cd2a82a19db9f6adaaf8805ca740d6bba439598ced>

then we need to update the content our `next.config.mjs` file, to this:

```js
import WithMDX from '@next/mdx'

const nextConfig = () => {

    const withMDX = WithMDX(/*{
        extension: /\.mdx?$/,
        options: {
            // If you use remark-gfm, you'll need to use next.config.mjs
            // as the package is ESM only
            // https://github.com/remarkjs/remark-gfm#install
            remarkPlugins: [
                //remarkGfm,
            ],
            rehypePlugins: [],
            // If you use `MDXProvider`, uncomment the following line.
            // providerImportSource: "@mdx-js/react",
        },
    }*/)

    /** @type {import('next').NextConfig} */
    const nextConfig = {
        experimental: {
            // experimental support for next.js > 13 app directory
            appDir: true,
            // experimental use rust compiler for MDX
            mdxRs: true,
        },
        // file formats for next/image
        images: {
            formats: ['image/avif', 'image/webp']
        },
        // configure pageExtensions to include md and mdx
        pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
    }

    return withMDX(nextConfig)

}

export default nextConfig
```

TODO: in next config, do I need to configure pageExtensions for MDX to work in app directory, or is this just for pages directory???
TODO: the `mdxRs: true` in next config that they tell you to add in the beta docs <https://beta.nextjs.org/docs/guides/mdx>, because in the regular docs they say to not use it in production, so is it mandatory for the app directory or not??? If I do not enable the experimental rust MDX compiler, I guess next/mdx will fallback to using webpack(?) if it does, do I need to install the @mdx-js/loader manually, see the TODO above
TODO: check the withMDX options above, I currently have them commented as I'm not sure yet if they are needed and if they are what values I need to set, should come back later if a usecase requires me to use the options else get rid of them before publishing this tutorial

now we need to add two more files to make MDX work with server components

add another file into the root of your project called `mdx-components.tsx` with the following content

```tsx
import type { MDXComponents } from 'mdx/types'

// This file is required to use MDX in `app` directory.
export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        // Allows customizing built-in components, e.g. to add styling.
        // h1: ({ children }) => <h1 style={{ fontSize: "100px" }}>{children}</h1>,
        ...components,
    }
}
```

and then in the root of the project create a directory called `types` and inside of it add a file called `` with the following content:

```ts
// types/mdx.d.ts
declare module '*.mdx' {
    let MDXComponent: (props) => JSX.Element
    export default MDXComponent
}
```

Note: it is important you add the `mdx-components.tsx` to your project for MDX files to work in the app directory, if you don't add it you will get this error:

> TypeError: createContext only works in Client Components.

Note: Also after adding this file or in the future after making changes to it, you always need to restart the dev server, as this is a configuration file like `next.config.mjs`

#### option 1: multiple page.tsx files, one static route per article

in the `app` directory, create a new directory called `articles` and then inside that another directory `option1`, to end up with the following structure:

```shell
─ app
├─ articles
  ├─ option1
```

then inside of the `option1` directory, we create a file that we call `content.mdx`, which will contain some MDX formatted content, so that we can then import it into our page

```md
# Hello, World!

## option 1

*italic*

**bold**

***bold and italic***

> quote

[link](https://chris.lu)

![This is an octocat image](https://myoctocat.com/assets/images/base-octocat.svg)

* foo
* bar
* baz
```

next inside of that same `option1` directory, we will now create a regular `page.tsx` file that will import the `content.mdx` file we just created

```tsx
import ContentMDX from './content.mdx'

export default function Article() {

    return (
        <>
            <ContentMDX />
        </>
    )
}
```

if your dev server is not yet running, use the following command in the VSCode terminal (or use your preferred command line tool):

```shell
npm run dev
```

now in your browser navigate to <http://localhost:3000/articles/option1> and you should see our MDX page getting displayed, with **option 1** as subtitle

Note: this is an easy solution that is similar to option 3 but requires less code, one downside of this option is that you will end up having to create one page.tsx for each article, each of these page.tsx will be in a different directory but they all will contain the exact same code (except for the import path of the MDX content that will always point to a different file), if your blog is small and you write few articles a year this is not a problem, but if you use this technique for something that has hundreds of pages and then you need to update code in the page.tsx file for some reason, then this might require a considerable amount of effort (even if you use exclude some of the code into reusable components and even if the refactoring is done with a tool, that does update the code for you, in each of the page.tsx files)

#### option 2: multiple page.mdx files, one static route per article

what we did in previous **option 1** example, is what you will currently find in the [next.js MDX beta documentation](https://beta.nextjs.org/docs/guides/mdx), but in **option 2** we will create an even simpler version

if you didn't already in the previous option, in the `app` directory, create a new directory called `articles`

in the `articles` directory, create a new directory called `option2`

```shell
─ app
├─ articles
  ├─ option2
```

inside of the `option2` directory, create a file called `page.mdx` and insert the following MDX content:

```md
# Hello, World!

## option 2

*italic*

**bold**

***bold and italic***

> quote

[link](https://chris.lu)

![This is an octocat image](https://myoctocat.com/assets/images/base-octocat.svg)

* foo
* bar
* baz
```

now in your browser navigate to <http://localhost:3000/articles/option2> and you should see our MDX page getting displayed, with **bar** as subtitle

Note: this is an even easier solution and one that requires even less code than what we just saw in option 1, one downside to this solution is the same thing I mentioned in option 1, if you want to add a feature to your article pages, then you will need to do some refactoring in each page, the second downside to this solution is that if you want to add metadata to your files, or already have existing MDX files using a YAML front-matter, then there is no way to parse that metadata, instead you need to use the next.js MDX metadata technique, more about [MDX content metadata](#mdx-content-metadata) in the next chapter

#### option 3: one page.tsx file, one dynamic route segment for all articles

Note: for this option we will NOT need all the steps mentioned in the chapter [getting started (only for option 1 and 2 NOT 3)](#getting-started-only-for-option-1-and-2-not-3), so for option 3 there is NO need to install `@next/mdx` and also not need to change `next.config.mjs` or create a file called `mdx-components.tsx`, for now if your goal is to compare the 3 options next to each other you don't need to remove those option 1 & 2 prerequisites, but if at some point you decide that your choice is option 3, then you can remove the `@next/mdx` package using `npm remove @next/mdx`, revert back the changes we did in `next.config.mjs` and also delete the file `mdx-components.tsx`

if you didn't already in one of the previous options, in the `app` directory, create a new directory called `articles`

inside of the `articles` directory, we will now create another directory using the **dynamic segment** technique, to do so create a directory and name it `[slug]`, the square parenthesis tell next.js this is a dynamic route and NOT a static segment

Glossary: a slug is a clean version of the article title, it is search engine-friendly, which means it is good for SEO and also serves as a unique identifier of the page, if you want more details, check out the [MDN slug definition and rules](https://developer.mozilla.org/en-US/docs/MDN/Writing_guidelines/Writing_style_guide#slugs)

now inside of the `[slug]` directory create a new file called `page.tsx`, with the following content:

```tsx
interface IProps {
    params: {
        slug: string
    }
}

export default function Article(props: IProps) {

    const { params: { slug } } = props

    return (
        <>
            <span>{slug}</span>
        </>
    )
}
```

now you can try it out for yourself, in your browser navigate to <http://localhost:3000/articles/option3> and you should see **option3** getting displayed, this is good as it means our slug (dynamic route segment) works

to test our slug we used **option3** as value in the URL, but you can replace that value by whatever you want and it will get displayed on the screen, meaning our slug can by anything

the good thing about option 1 and 2 is that both are static pages as there is nothing dynamic in the code, the route is static and the content too, in this example however the slug segment is dynamic

we are currently using `npm run dev` as we are developping locally, but the moment we want to deploy our blog in prod we will have to do a  build of our app using the command `npm run build` (or this is the command our CI/CD tool will use), lets stop the dev server for a moment and instead lets run the build command locally to see the output:

```shell
Route (app)                                Size     First Load JS
┌ ○ /                                      0 B                0 B
├ λ /articles/[slug]                       152 B          68.1 kB
├ ○ /articles/option1                      152 B          68.1 kB
└ ○ /articles/option2                      0 B                0 B
```

you will notice that in front of route `/articles/[slug]` there is this symbol **λ** but our previous two examples have the symbol **○** in front of their URL, this means that both pages, that we created in option 1 and 2 will be generated at build time using a technique called **static site generation (SSG)**, but NOT our slug page, which will get generated at runtime using a technique called **server side rendering (SSR)**, meaning it will get generated on each request

next.js opted out of generation at build time and instead decided to use generation at runtime, because at build time it did not know what values for our slug would be, all next.js could see at build time was that slug was undefined, it did not know one potential value for our slug would be option3

this is a problem, because we don't want the server to have to regenerate the page every time a user visits it, because this would harm the performance of our server especially if a lot of people visit the page at the same time, so what we want is getting back **static site generation (SSG)** so that the page can be built again at build time and then served very quickly to the user at runtime, hence keeping the performance of our server low even if the page gets visited a lot

Note: if you have created a page in the past using react create app, you have created an app that was using **client side rendering (CSR)**, which means that for each on each request the client recieves the javascript code you wrote using react components, it then needs to parse and execute that javascript to then be able to build the page (the html code, css and client javascript) on the client side, if the browser runs on a device that is slow this will take some time, if instead of that you use **server side rendering (SSR)** then the javascript code will get parsed and executed on each request but on the server side by a powerful server and the resulting html (+ js + css) is then sent to the client which only has to display it, this usually results smaller page loading times **SSR > CSR**, but you are still doing a lot of work on each request on the server side, this is why **static site generation (SSG)** is even better, because with **static site generation (SSG)** you do the work only once at build time and then for on each request the server only has to send back the already generated html (+ js + css) to the client, meaning the server has less work to do and can deliver responses much faster, this is why **SSG > SRR**, you can then further increase the delivery by putting the static content that got created at build time onto a **content delivery network (CDN)**, meaning your server has even less work to do and because **CDNs** are optimised for fast static content delivery and because they consist of a group of geographically distributed servers that are closer to the user, this will result in yet another speed boost 🚀

to do that we need to use a function called `generateStaticParams` that is provided by next.js 13, to be used in pages of the `app` directory and which will offer us a way to tell next.js during the build process, what the values of our slug are, meaning we will generate a static list of the values for our slug

Note: if you used the `pages` directory before, you might have heard of / used a function called `getStaticPaths`, well `generateStaticParams` is the equivalent of it but for the `app` directory, if you want to learn more about their differencies, I recomend you check out the [migration guide](https://beta.nextjs.org/docs/upgrade-guide#dynamic-paths-getstaticpaths) which does a great job at explaining them

let's update our page code and add the `generateStaticParams` function to it:

```tsx
interface IProps {
    params: {
        slug: string
    }
}

export default function Article(props: IProps) {

    const { params: { slug } } = props

    return (
        <>
            <span>{slug}</span>
        </>
    )
}
```

now let's run the build again to see what the output is this time:

```shell
Route (app)                                Size     First Load JS
┌ ○ /                                      0 B                0 B
├ ● /articles/[slug]                       152 B          68.1 kB
├   └ /articles/option3
├ ○ /articles/option1                      152 B          68.1 kB
└ ○ /articles/option2                      0 B      
```

as you can see, we previously had the **λ** representing **server side generation (SSR)** but now we have a filled circle **●** symbol, that symbol is similar to the hollow circle **○** symbol we have for **static site generation (SSG)** like option 1 and option 2 but a bit different, the difference is that this symbol indicates that the **static site generation (SSG)** will be used for every slug that is know at build time (every slug that will get returned by generateStaticParams) but for every other slug that will only be known at runtime it will use **server side generation (SSR)**, this is because some apps might have a mix of both, some pages for which the slug was known at build time but also some other pages for which the slug will only exist at runtime

we however don't want to use the default behavior where our page uses **SSR** as fallback for pages that couldn't get generated using **SSG**, in our case we prefer to always return a **404** page if a slug is not in the return value provided by `generateStaticParams`, to do that we need to modify our page.tsx and add a configuration option called [dynamicParams](https://beta.nextjs.org/docs/api-reference/segment-config#dynamicparams)

```tsx
interface IPageProps {
    params: {
        slug: string
    }
}

export const dynamicParams = false

export async function generateStaticParams() {

    return [{ slug: 'option3' }]

}

export default function Article(props: IPageProps) {

    const { params: { slug } } = props

    return (
        <>
            <span>{slug}</span>
        </>
    )
}
```

if you want to try this out, first set `dynamicParams` to `true` (or comment it out because true is the default value anyway) and then if your dev server is not yet running use the command `npm run build` in your VSCode terminal, then in your browser navigate to <http://localhost:3000/articles/option4> and you will see that **option4** gets displayed because it got server side generated, now uncomment or set `dynamicParams` to `false` again and finally reload the page <http://localhost:3000/articles/option4> and you will see that now it displays the default `404` page, because there is not **option4** slug in the array that gets returned by `generateStaticParams`

now of course this is not quite the end yet, as we don't want to maintain the list of slugs manually, but instead want to use a script that will fetch the list of MDX files and then genrate a list of slugs

first we are going to add [globby](https://www.npmjs.com/package/globby) as new dependency

```shell
npm i globby --save-exact
```

next we need to create a MDX file with some content, inside of the `[slug]` directory create a new file called `option3.mdx`, where it's name is equivalent to our slug, with the following content:

```md
# Hello, World!

## option 3

*italic*

**bold**

***bold and italic***

> quote

[link](https://chris.lu)

![This is an octocat image](https://myoctocat.com/assets/images/base-octocat.svg)

* foo
* bar
* baz
```

then we add 3 new imports into our `/app/articles/[slug]/page.tsx` file:

```tsx
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { globby } from 'globby'
```

the 2 first imports we do, `fileURLToPath` and `dirname` are node.js modules, the 3rd import is the globby package we just installed

and finally we update the `generateStaticParams` function in `/app/articles/[slug]/page.tsx` file to be like this:

```tsx
export async function generateStaticParams() {

    const contentDirectory = dirname(fileURLToPath(import.meta.url))

    const files = await globby('*.mdx', { cwd: contentDirectory })

    return files.map((file) => {
        const slug = file.replace('.mdx', '')
        return {
            'slug': slug,
        }
    })

}
```

the code update we did in `generateStaticParams`, `import.meta.url` contains the full URL to the current file, `fileURLToPath` converts the URL to a path and finally `dirname` converts the full path to just the directory path without the filename itself, which in our case will produce something like `REPOSITORY_ROOT_PATH\app\articles\[slug]` on windows and `REPOSITORY_ROOT_PATH/app/articles/[slug]` on Mac and Linux (the only difference is that if you are windows the path will contain `\` **(backslashes)** and on Mac and Linux it will use the Posix format that uses `/` **(forward slashes)**)

next we use `globby` which will return a list of all files that are in `contentDirectory` and match the `*.mdx` glob. the result is an array of filenames

we finally iterate over the list of files to get our slug, which is equivalent to the filename without the file extension

try it out for yourself, ensure the dev server is running and then in the browser navigate to <http://localhost:3000/articles/option3> and you should again see option3 (the slug and mdx file name) getting displayed, which means we now successfully created a dynamic list of static pathes, you can add more `.mdx` files to the folder, each filename will be become a new slug

next we want to load the file content and convert the MDX, to make the conversion we will use a package called [next-mdx-remote](https://www.npmjs.com/package/next-mdx-remote), so lets first install it using the following command:

```shell
npm i next-mdx-remote --save-exact
```

now in our `/app/articles/[slug]/page.tsx` file, we add two more imports and edit the second import to also get the join function from path module:

```tsx
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import fs from 'fs'
import { globby } from 'globby'
import { MDXRemote } from 'next-mdx-remote/rsc'
```

the first import we added (on line 3) is because we will use the **filesystem (fs)** native module from nodejs to get the file content and the second import we added (on line 5) is the **MDXRemote** function from the **next-mdx-remote** remote package, which is a react component that will render our file content and finally we will also get the **join** function from the **path** module to create the directory path 

next we will edit the `Article` function to be like this:

```tsx
export default async function Article(props: IPageProps) {

    const { params: { slug } } = props

    const fileName = slug + '.mdx'

    const directoryPath = dirname(fileURLToPath(import.meta.url))

    const filePath = join(directoryPath, fileName)

    const contentMDX = fs.readFileSync(filePath, 'utf8')

    return (
        <>
            {/* @ts-expect-error Server Component */}
            <MDXRemote source={contentMDX} />
        </>
    )
}
```

the first part is unchanged, we take the `slug` that is in the page props

then we convert the `slug` into a file name by adding the **mdx** extension

then we create a variable containing the `directoryPath` (same as we did in the `generateStaticParams` function, which is why we could refactor this later on so that both functions use the same variable instead of creating it twice, but for now to better understand what the code does I like to keep it there as is)

next we create `filePath` which is nothing else then combining the `directoryPath` and the `fileName`

then we use the node.js filesystem module to fetch the content of the file (as our file is encoded in 'utf-8' we let node.js know that this is the encoding it should use)

and finally the we use the `MDXRemote` component from the **next-mdx-remote** package to render the MDX content that we pass to it via the source prop

above the `MDXRemote` component line I added a comment **@ts-expect-error Server Component** that tells typescript to ignore errors in the following line, this is because MDXRemote is a component that returns an async JSX Element and when used in a server component like we do here, typescript will throw an error:

> 'MDXRemote' cannot be used as a JSX component.
> Its return type is not a valid JSX element.

there is a ticket currently open (as of 03.02.2023) in the next.js repository on github because of this problem: <https://github.com/vercel/next.js/issues/42292>, the problem is mentioned in the [next.js "async/await in Server Components" beta docs](https://beta.nextjs.org/docs/data-fetching/fetching#asyncawait-in-server-components) too, it is a types problem and the react and typescript teams are working on a solution, as soon as it is fixed this line will not be needed anymore

try it out for yourself, ensure the dev server is running and then in the browser navigate to <http://localhost:3000/articles/option3>, you will now see the MDX content we have put in the `option3.mdx` file getting loaded and rendered

Note: this option is similar to option 1, but the main difference is that instead of multiple page.tsx (or multiple page.mdx as we had in option 2) and multiple static routes (one segment directory for each page) in this option we end up having one page.tsx and then use a dynamic route which allows us to display an unlimited amount of articles, so on the one hand this option needs more code but on the other hand it needs less files (the more files you have the bigger a difference this will make), the biggest advantage of this option however, is as the name suggest it, that the MDX content can be remote, by that I mean the MDX content does not have to be located in the app directory (which is a limitation of option 1 & 2) but instead it can be located in a folder anywhere on your server or you could even replace the `readFileSync` function we used to get the content from a file by a call to a database and get the content from there

Read more:

* [next-mdx-remote documentation](https://github.com/hashicorp/next-mdx-remote#readme)
* [next.js page params and searchParams documentation](https://beta.nextjs.org/docs/api-reference/file-conventions/page#params-optional)
* [next.js dynamic segments documentation](https://beta.nextjs.org/docs/routing/defining-routes#dynamic-segments)
* [next.js generate static params documentation](https://beta.nextjs.org/docs/api-reference/generate-static-params)
* [next.js "dynamicparams" segment configuration documentation](https://beta.nextjs.org/docs/api-reference/segment-config#dynamicparams)

#### option 3: using costum components

Note: in prerequisites for option 1 & 2 we had created a file called `mdx-components.tsx` to set up custom components, with **next-mdx-remote** this is done differently

if you want to alter the way MDXRemote transforms MDX into HTML elements, you can use custom components to do so, here you will find a list of all HTML elements that can be replaced by a custom component: <https://mdxjs.com/table-of-components/>

we are again going to edit `Article` function in the file `/app/articles/[slug]/page.tsx`:

```tsx
export default async function Article(props: IPageProps) {

    const { params: { slug } } = props

    const fileName = slug + '.mdx'

    const directoryPath = dirname(fileURLToPath(import.meta.url))

    const filePath = join(directoryPath, fileName)

    const contentMDX = fs.readFileSync(filePath, 'utf8')

    const mdxComponents = {
        h1: (props: React.PropsWithChildren) => (
            <h1 {...props} className="foo">
                {props.children}
            </h1>
        ),
    }

    return (
        <>
            {/* @ts-expect-error Server Component */}
            <MDXRemote source={contentMDX} components={mdxComponents} />
        </>
    )
}
```

here we have created a simple custom component for **h1 headers** inside of an `mdxComponents` object, we tell it that for each h1 element we want to use our custom component, we then pass the `mdxComponents` object to the `MDXRemote` component, of course you can extend `mdxComponents` and add as much custom components as you wish to use to alter how your MDX will get rendered, you can of course also create external files for each component, import them and then use them in `mdxComponents`

try it out for yourself, ensure the dev server is running and then in the browser navigate to <http://localhost:3000/articles/option3>, then use your browser developper tools inspect tool and you will see that the `<h1>` element now has a **class** attribute containing the value `foo`

Read more:

* [MDX HTML elements that can be replaced with custom components](https://mdxjs.com/table-of-components/)

#### option 3: defer hydration when using MDXRemote

it is possible defer hydration of the content (in the client) and immediately serve the static markup, we can use **MDXRemote** `lazy` prop, but be aware that because of the hydration delay, means that interactivity for any dynamic content within your MDX content will be delayed too, if you use few react components this might not be a problem at all, if you however use components that are heavy and take some time until they are hydrated then this optimization might not be a good idea

```tsx
<MDXRemote source={contentMDX} lazy />
```

#### option 3: adding metadata (using front matter data)

in the **option 3** exxample above we used the `<MDXRemote />` component, which is a quick and easy solution, but if you have YAML front-matter in your file and want to use that, then you need to use the `compileMDX` function instead

first let's add some front-matter to our MDX file `/app/articles/[slug]/option3.mdx`

```tsx
---
title: foo
author: bar
publishDate: 2023-01-20 18:00:00 +00:00
lastUpdateDate: 2023-01-21 11:00:00 +00:00
---

# Hello, World!

## option 3

*italic*

**bold**

***bold and italic***

> quote

[link](https://chris.lu)

![This is an octocat image](https://myoctocat.com/assets/images/base-octocat.svg)

* foo
* bar
* baz
```

next we replace the import of the `MDXRemote` component with the import of the `compileMDX` function in our `/app/articles/[slug]/page.tsx` file:

```tsx
import { compileMDX } from 'next-mdx-remote/rsc'
```

below the import (in the same file), we add a new interface for out front-matter:

```tsx
interface IFrontMatter {
    title: string
    author: string
    publishDate: Date
    lastUpdateDate: Date
}
```

then we need edit the `Article` function in the file `/app/articles/[slug]/page.tsx` once more:

```tsx
export default async function Article(props: IPageProps) {

    const { params: { slug } } = props

    const fileName = slug + '.mdx'

    const directoryPath = dirname(fileURLToPath(import.meta.url))

    const filePath = join(directoryPath, fileName)

    const contentMDX = fs.readFileSync(filePath, 'utf8')

    const mdxComponents = {
        h1: (props: React.PropsWithChildren) => (
            <h1 {...props} className="foo">
                {props.children}
            </h1>
        ),
    }

    const mdxOptions = {
        parseFrontmatter: true,
    }

    const { content, frontmatter } = await compileMDX<IFrontMatter>({ source: contentMDX, options: mdxOptions, components: mdxComponents })

    console.log('frontmatter: ', frontmatter)

    return (
        <>
            {content}
        </>
    )
}
```

in this update we first added an `mdxOptions` object in which we set `parseFrontmatter` to **true** to enable front-matter parsing

then we used the `compileMDX` function, to which we passed the `source` and `components` that we were already using as props for `<MDXRemote>`, but now we also pass our new `options` object, we also use our `IFrontMatter` interface to ensure the returned front-matter is typed

finally we replaced `<MDXRemote>` with `{content}`, which is the react element that got returned from `compileMDX`

ensure you saved the `page.tsx` and that the dev server is running, then check out your terminal and you will see a console log output that should look like this:

```shell
frontmatter:  {
  title: 'foo',
  author: 'bar',
  publishDate: 2023-01-20T18:00:00.000Z,
  lastUpdateDate: 2023-01-21T11:00:00.000Z
}
```

this shows us that our front-matter is now getting parsed

next we will use the new metadata API that got introduced in [next.js 13.2](https://nextjs.org/blog/next-13-2) at the end of february 2023, to pass some of our values we get from front-matter to next.js metadata

Note: the new metadata API replaces the previous app directory **head.js** file that got introduced in next.js 13 but is now deprecated, if you used an earlier version of next.js prior to v13.2 then check out the [next.js "head.js" beta documentation](https://beta.nextjs.org/docs/api-reference/file-conventions/head) in which the next.js team has added a lot of migration examples

first we are going to add a new import:

```tsx
import type { Metadata } from 'next'
```

the type we just imported is a next.js metadata interface to describe all the metadata fields that can be set

next to tell next.js what a page (or layout) metadata is, you need to export an async function called `generateMetadata` and inside of it we need to fetch out front-matter using `compileMDX`, but we also use `compileMDX` inside of the page function called `Article`, this is why we refactor our code a bit and put a big chunk of the code that was in our `Article` function into a seperate function so that we can re-use it in both the `Article` function as well as the `generateMetadata` function

```tsx
const getArticle = async (slug: string) => {

    const fileName = slug + '.mdx'

    const directoryPath = dirname(fileURLToPath(import.meta.url))

    const filePath = join(directoryPath, fileName)

    const contentMDX = fs.readFileSync(filePath, 'utf8')

    const mdxOptions = {
        parseFrontmatter: true,
    }

    const mdxComponents = {
        h1: (props: React.PropsWithChildren) => (
            <h1 {...props} className="foo">
                {props.children}
            </h1>
        ),
    }

    return await compileMDX<IFrontMatter>({ source: contentMDX, options: mdxOptions, components: mdxComponents })

}
```

next we refactor our `Article` function to make use of the new `getArticle` function:

```tsx
export default async function Article(props: IPageProps) {

    const { params: { slug } } = props

    const { content } = await getArticle(slug)

    return (
        <>
            {content}
        </>
    )
}
```

and now we can finally add the `generateMetadata` function to our `/app/articles/[slug]/page.tsx` file:

```tsx
export async function generateMetadata(props: IPageProps) {

    const { params: { slug } } = props

    const { frontmatter } = await getArticle(slug)

    const metadata: Metadata = {
        title: frontmatter.title,
    }

    return metadata

}
```

here we are using the title that is defined in our front-matter and pass it to the next.js metadata object

if you now visit our option3 article page <http://localhost:3000/articles/option3> and use your browsers inspect tool, you will see that in the `<head>` of the HTML document there is now a title tag containing the title we set in front-matter

because of the next.js metadata type we have imported we now have type safety and get nice tooltips in VSCode with lots of useful information, as you can see in the next screenshot:

![next.js metadata type tooltip example](./documentation/assets/images/nextjs_metadata_type_example.png)

Read more:

* [next-mdx-remote "front-matter" documentation](https://github.com/hashicorp/next-mdx-remote#readme)
* [next.js "metadata API" beta documentation](https://beta.nextjs.org/docs/api-reference/metadata)
* [MDX options](https://mdxjs.com/packages/mdx/#compilefile-options)






#### the option I prefer

I prefer option XY, because ...


TODO: at some point I could add a "the hidden option 4" chapter about using a **remote source** (dynamic imports of mdx files via **react lazy** or **next/dynamic** or even getting MDX content from a database) and **dynamic routing** like in we did in option 3 but use **@next/mdx** for the rendering instead of **next-mdx-remote**
TODO: a chapter about metadata for option 1 & 2
### option 1 & 2: metadata using next/mdx

next/mdx itself has no support YAML front-matter built in, but instead it supports exporting a **meta** object that contains your metadata

```tsx
export const meta = {
    title: 'foo'
    author: 'bar'
}
```
TODO: a chapter where we create custom components to render our MDX, like a code block but also make use of the github mdx component
TODO: a chapter about remark and rehype plugins

* [list of rehype plugins](https://github.com/rehypejs/rehype/blob/main/doc/plugins.md#list-of-plugins)
* [list of remark plugins](https://github.com/remarkjs/remark/blob/main/doc/plugins.md#list-of-plugins)


we are now going to make the final version of our article page using option 3

I like to make my types / interfaces to be reusable as much as possible, so first we are going to move the interface definition we have on top to an external file, create a new directory called 

we had to create a utils/filesystem.ts that got used by generateStaticParams to tell next.js what the different articles URLs (route segments) are, for example when we do a production deployment or locally run `npm run build`, so that next.js can create a static page on build time for each article



TODO: benchmark performance of the 3 options above, are there any differencies??? some use the examples above to do benchmarks, using a version deployed to vercel, to use a real prod build for testing / verification and not a local dev build as the dev build will not have the pre-built static versions of pages

TODO: ensure all images in mdx files use next/image and all internal links use next/link

to make slugs I found two libraries <https://www.npmjs.com/package/github-slugger> and <https://www.npmjs.com/package/@sindresorhus/slugify>

for the code highlighting I plan to use <https://www.npmjs.com/package/highlight.js>

**rehype pretty code** is a rehype plugin for vscode like syntax highlighting with support for themes: <https://rehype-pretty-code.netlify.app/>, here is the npm page <https://www.npmjs.com/package/rehype-pretty-code>, it uses shiki <https://shiki.matsu.io/>

if code block titles for filenames are not supported out of the box by rehype pretty code then add this <https://www.npmjs.com/package/rehype-code-titles>







## (content) directory for all MDX files

before we create the page, in the `/app/articles/[slug]/` directory, create a new directory called `(content)`, to end up with the following directories structure:

```shell
─ app
├─ articles
  ├─ [slug]
    ├─ (content)
```

Note: did you notice the parenthesis around the content directory name, no this is mistake, this is what next.js calls [route groups](https://beta.nextjs.org/docs/routing/defining-routes#route-groups), in our use case we use this technique to add a directory to store our mdx files but because this is a route group it will not affect the URL structure as other directories without parenthesis would do, to test this you can go to <https://localhost:3000/(content)> and you will see that you get a 404 meaning no route got found for that URL

Note: you have other options to store your MDX files of course, you could create a directory at the root of your project if you prefer and not use the route groups techniqu


## add a layout for all our article page

TODO: add a layout file, to be used by all of the pages, so that every article has the same layout

## MDX directories naming convention

Note: as **naming convention** for our markdown files, we will use a format where the first part is the publication date, for the date we will use the YYYY-MM-DD format because according to the international ISO 8601 standard, this allows files to be sorted into chronological order and avoids confusion when national conventions vary, then after the date we will put a slugified (cleaned up) version of the article's title, where all spaces are replaced by underscores

Note: I think I just inventied the adjective [**slugified**](https://www.google.com/search?q=%22slugified%22) /ˈslʌɡɪfʌɪd/ in the note above 😂



## adding custom react components to MDX pages



## adding the remark "remark-gfm" plugin

[remark-gfm](https://www.npmjs.com/package/remark-gfm)

## extending MDX, to transform code blocks using the xxx plugins

**SynthWave '84** VSCode theme <https://github.com/robb0wen/synthwave-vscode>

## MDX VSCode plugin

<https://github.com/mdx-js/vscode-mdx>
<https://marketplace.visualstudio.com/items?itemName=unifiedjs.vscode-mdx>







## styling

### ui framework

In my previous projects I have used [**material ui (mui)**](https://mui.com/material-ui/getting-started/overview/) which is a popular react UI framework, I have loved how quickly I could build interfaces and forms and how well documented the project is

However as of right now, several css-in-js projects are not working out of the box with the new **server components**, which in documented in the [next.js 13 "css-in-js" beta docs](https://beta.nextjs.org/docs/styling/css-in-js)

Material ui uses the css-in-js library called [emotion](https://emotion.sh/docs/introduction) which as of now (05.03.2023) does not fully work with server components and especially streaming

this is why I have decided that for now I would use the [css modules](https://github.com/css-modules/css-modules), many frameworks have built-in support for css modules like [gatsby (css modules support)](https://www.gatsbyjs.com/docs/how-to/styling/css-modules/) or [remix (css modules support)](https://remix.run/docs/en/1.14.0/guides/styling#css-modules) and so does [next.js (css modules support)](https://beta.nextjs.org/docs/styling/css-modules)

read more:

* [next.js "css modules" beta documentation)](https://beta.nextjs.org/docs/styling/css-modules)
* [next.js 13 "css-in-js" beta documentation](https://beta.nextjs.org/docs/styling/css-in-js)
* [material ui ticket "Improve Next.js 13 support"](https://github.com/mui/material-ui/issues/34905)
* [emotion ticket "Plans to support Next.js 13 - /app directory"](https://github.com/emotion-js/emotion/issues/2928)

### css modules

to get started we create a file `styles.module.css` in our `app` directory and add the following content:

```css
/* https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties */
:root {
    --main-background-color: black;
    --main-text-color: white;
    --main-font-family: 'Consolas, \'Courier New\', monospace';
}

html {
    /* https://developer.mozilla.org/en-US/docs/Web/CSS/font-smooth */
    -webkit-font-smoothing: 'antialiased';
    -moz-osx-font-smoothing: 'grayscale';
    /* https://developer.mozilla.org/en-US/docs/Web/CSS/text-size-adjust */
    -webkit-text-size-adjust: '100%';
    text-size-adjust: '100%';
}

body {
    /* remove any margin that browsers add to body */
    margin: 0;
    /* default values */
    background-color: var(--main-background-color);
    color: var(--main-text-color);
    font-family: var(--main-font-family);
}

@media print {
    body {
        background-color: white;
    }
}
```
as you can see at the top of the file I have first defined some common values using [custom properties (css variables)](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) that I intend to re-use several times in different classes inside of the pseudo-class `:root` which is a container for global custom properties

then in the css ruleset for the `body` element, I have used the `var()` function to set the value of some properties to the value of my [custom property (css variable)](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)

Note: using custom properties (css variables) will make it easier to change a value in the future in just one place, instead of having to go through the entire css file and find all the places I need to update that value

as you can see those are just some default values for common things like text or background color, a default font family and some extra properties for the **html** element that you usually can find in base css (css reset) rulesets of ui frameworks

read more:

* [css modules github repository](https://github.com/css-modules/css-modules)
* [next.js "css modules" beta documentation)](https://beta.nextjs.org/docs/styling/css-modules)
* [MDN "Using CSS custom properties (variables)" documentation](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
* [MDN "CSS" documentation](https://developer.mozilla.org/en-US/docs/Web/CSS)

### 




## planetscale staging environment

> plantscale lets you branch your production database to create a staging environment for testing out schema changes

## planetscale serverless javascript database driver

<https://planetscale.com/blog/introducing-the-planetscale-serverless-driver-for-javascript>
<https://github.com/planetscale/f1-championship-stats>
<https://github.com/planetscale/database-js>

## vercel analytics

next you can enable [vercel analytics](https://vercel.com/docs/concepts/analytics/audiences/quickstart) for your project, by visiting your dashboard and then clicking on top on the **analytics** tab

Note: apparently vercel analytics is GDPR compliant (without cookie banner requirement), read more on their [privacy policy explanation page in the documentation](https://vercel.com/docs/concepts/analytics/privacy)

after enbabling vercel anayltics for your project you need to add their ([vercel analytics on github](https://github.com/vercel/analytics)) package to your project

read more: <https://vercel.com/docs/concepts/analytics/audiences/quickstart>

## adding environment variables

## checking out vercel env variables locally

Note: when using vercel, you add env variables to the project via the vercel web interface, you don't create local `.env.*` files manually
also to check out your env variables (that you have added to the project via the vercel web interface) locally, you use their cli command `vercel env pull`

Note: if using vercel and also next.js, you don't need to use their cli command vercel dev as next dev does already handle serverless on localhost: <https://vercel.com/blog/vercel-dev>



## add authentification, sign up, activation, re-sending activation and lost password

blitz is a framework on top of next.js, check out their login, sign up, lost password forms and pages, maybe they did things I missed or are better than my implementation: <https://github.com/blitz-js/blitz/commit/6ec020c6d67d18c074d4064c2a4d63bfa9c83d5c>









## mui styling

seems to have problems with **next.js 13**: <https://github.com/mui/material-ui/issues/34905>
mostly because of CSS in JS <https://beta.nextjs.org/docs/styling/css-in-js> server side rendering (SRR) with **emotion**: <https://github.com/emotion-js/emotion/issues/2928>, the biggest problem seems to be if your app uses streaming of components

so right now MUI is a problem, because of their style engine **emotion** which has trouble to create the css on runtime when using streaming

a former contributor of emotion explains why they moved away from emotion to use sass modules (css modules + sass): <https://dev.to/srmagura/why-were-breaking-up-wiht-css-in-js-4g9b>

mui is discussing adding a new engine: <https://github.com/mui/material-ui/issues/34826>
the author of mui thinks static extration would be best, but static extraction got removed from emotion: <https://github.com/emotion-js/emotion/blob/main/docs/extract-static.mdx>
static css extraction explained: <https://andreipfeiffer.dev/blog/2021/css-in-js-styles-output>

using tailwind css would be a solution, as it doesn't have the problems that css-in-js libraries have and there is a mui documentation page about using tailwind, but this does not mean tailwind is replacing emotion as a peer dependency of mui, you just have it alongside mui: <https://mui.com/material-ui/guides/interoperability/#tailwind-css>

here is a very long, but interesting article about what kind of css experiments the author of tailwind did before he created tailwind: <>

why I'm not a tailwind fan: <>

## CSP (content security policy)

CSP is very important

TODO: mui 5 seems to have problems with CSP: <https://github.com/mui/material-ui/issues/19938>

## github actions

this seems to be an interesting github action, using lighthouse: <https://github.com/lfre/lightkeeper>

use github codeql? <https://docs.github.com/en/code-security/code-scanning/automatically-scanning-your-code-for-vulnerabilities-and-errors/about-code-scanning-with-codeql>, it is used by mui: <https://github.com/mui/material-ui/blob/master/.github/workflows/codeql.yml>

github action to compare next.js bundle size: <https://jeffchen.dev/posts/Measuring-Bundle-Sizes-With-Next-js-And-Github-Actions-Part-2/>

## metadata support and SEO optimization

<https://nextjs.org/blog/next-13-2#built-in-seo-support-with-new-metadata-api>

## app directory api routes

TODO: is this really a full replacement for api routes?

<https://beta.nextjs.org/docs/routing/route-handlers#static-and-dynamic-route-handlers>

## turbopack

TODO: chapter about [turbopack](https://turbo.build/pack) support

Note: warning! turbopack is alpha, so not even beta yet, a lot of things will change until the first stable release, so things might break over time and some features might have bugs, be unstable or just slow

TODO: sub chapter to explain how to use loaders with turbopack: <https://nextjs.org/blog/next-13-2#custom-file-transformation-with-webpack-loaders>, explore what loaders there are for things that we use like MDX, ...?

TODO: benchamerk using the mdx loader compared to not using it, is it faster and how much faster is it

Read more:

* [next.js 13 turbopack documentation](https://beta.nextjs.org/docs/configuring/turbopack)

## layout / blog design

scrollbar style:

<https://css-tricks.com/almanac/properties/s/scrollbar-color/>
<https://css-tricks.com/almanac/properties/s/scrollbar/>
<https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Scrollbars>

text neon glow:

<https://css-tricks.com/how-to-create-neon-text-with-css/>
<https://codepen.io/FelixRilling/pen/oNNLMb>
<https://codepen.io/GeorgePark/pen/MrjbEr>

## audio player for header animation

either the files will be regular fetch requests or maybe use HLS

<https://github.com/video-dev/hls.js/issues/1713>
<https://github.com/video-dev/hls.js/issues/1713>
<https://caniuse.com/mediasource>
<https://caniuse.com/?search=hls>
<https://www.npmjs.com/package/fluent-ffmpeg>
<https://www.npmjs.com/package/hls.js/v/canary>

## TODOs

* build authentification: <https://authjs.dev/>, can have a look at how 
* add all sorts of meta data to head.tsx <https://github.com/whoisryosuke/r3f-next-starter/blob/main/src/components/dom/Header.tsx>, also check out <https://beta.nextjs.org/docs/guides/seo>, create a chapter "head.js: SEO and metadata", also check out <https://beta.nextjs.org/docs/api-reference/metadata#generatemetadata>
* improve accessibility: <https://vercel.com/blog/improving-the-accessibility-of-our-nextjs-site>
* add tests <https://2022.stateofjs.com/en-US/libraries/testing/>
* optimize the images of the documentation (readme.md)
* add "protect main branch" instructions to github chapter
* add mdx support to eslint


## future articles

* setup cronjobs on vercel <https://vercel.com/docs/cron-jobs>
* vercel rollback a deployment <https://vercel.com/docs/cli/rollback>
* revert a schema change with planetscale <https://planetscale.com/blog/behind-the-scenes-how-schema-reverts-work>
