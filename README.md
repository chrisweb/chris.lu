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

in october 2022 the next.js team released [Next.js 13](https://nextjs.org/blog/next-13) which included the first version of the new `app` folder and two months later in december [Next.js 13.1](https://nextjs.org/blog/next-13-1)

## image(s) manipulation

converting images to AVIF and WEBP and thumbnails

https://www.npmjs.com/package/sharp

## blog

### create a new repository on github

use github to create a new repository for your project

also let github create a README.md a LICENSE as well as a default .gitignore file for you

Note: if you chose "node" as template for the `.gitignore` it will create a quite large gitignore file that contains patterns for lots of common frameworks used when working with nodejs, one of them being next.js, which means the `.next` folder will get excluded if you use this gitignore, the other rules are less useful in our case but also do no harm, so you don't really need to touch that file, also in case you wonder, yes the .gitignore file should get commited

now you can check out your project locally, typing the following command into favorite command line tool / terminal:

```shell
git clone git@github.com:MY_GITHUB_USERNAME/MY_REPOSITORY_NAME.git
```

### initialize project

Note: install nodejs: the next.js 13 "app directory features" require nodejs v16.8.0 or later

run the following command to have eslint guide you step by step through the creation of your `package.json` file:

```shell
npm init
```

anser the question that get displayed in your command line, when this is done npm will create a `package.json` in the root of your project for you

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

Note: next,js 13 got released at the end of 2022 and even though it included a lot of improvements for existing features it also now includes the new `app` directory which is what we will use in this toturial, as the next.js team reminds as at several places this feature will evolve and get improved a lot over the coming months, the next.js team added it to next.js 13 so that developers can start playing with it and to hopefully gather a lot of good feedback from the community but they also made it clear that you probably shouldn't use this in production just yet and wait a little bit longer for it to mature

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

Note: but wait, there is currently a bug in next.js eslint configuration, the `app` directory is not in the list of directories yet (as of january 2023), there is however already a ticket ["next lint omits app dir by default"](https://github.com/vercel/next.js/issues/43021) as well as PR ["[ESLint] Add app dir to default linting directories"](https://github.com/vercel/next.js/pull/44426) and when the PR gets merged this problem will be solved

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

```typescript
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

this vscode "workspace settings" file got created in a folder called `.vscode` and the file is called `settings.js`, it contains workspace specific configuration instructions for your VSCode IDE, as next.js tells you, it is up to you if you add them to .gitignore to ensure they don't get shared with other people using your repository, I usually however share mine, I think it can be helpful if the entire team working on a project uses the same IDE configuration

* because of that new VSCode settings file next.js just created, a notification will appear in your VSCode, saying that it detected that you installed typescript in the current workspace and will ask you if you allow it to use that version instead of it's own typescript version that is bundled into vscode, so we click on "Allow"

![vscode notification typescript version](./documentation/assets/images/vscode_notification_typescript_version.png)

this notification is related to a new typescript plugin the next.js team created and which is included in the release of next.js 13, here isc a little quote from their [next.js 13.1 blog post](https://nextjs.org/blog/next-13-1):

> We've built a new TypeScript plugin that provides suggestions for page and layout configuration options and provides helpful usage hints around Server and Client Components

Note: check out the [youtube video "Next.js 13: Prevent Common Mistakes w/ New TypeScript Plugin"](https://www.youtube.com/watch?v=pqMqn9fKEf8) from [Delba](https://twitter.com/delba_oliveira) which is part of the next.js developer experience team giving more info about what the new plugin is and what it does

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

with the pages folder in previous next.js version, you had the possibility to wrap the children property of your _app.tsx with a layout component to then have that layout being applied to every page, but the disadvantage was that it would then be used by every single page in your pages folder, all other solutions involved writing more code, for example by adding custom code inside of your _app.tsx that would check which route you were on and based on that switch to another layout, or you could have imported different layouts in every page file and wrap you page into those layout components

with the new layout system it is much easier to have different layouts for different segments of your website

layouts will apply to the segment they are in and all segments nested below that, which brings us to another feature which is that now it is possible to have a cascade of layouts where one layout from a child segment is encapsulated into the layout of the parent segment





Server Components and Client Components:

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

so a component with no statement, a component located into a segment folder if loaded by a client component will also be considered being a client component without having to explicitly add the 'use client' statement on top

TODO: show example of server component, show it printing a message in the terminal, then re-use it but his time being imported into a client component and it just works (no need to add 'use client' statement) and show that now the message appears in the browser console and not the server anymore

Question(s): how to add a server component into a client component (if next.js then thinks it also a client component), is there a 'use server' statement?

Note: to learn more about the advantages of server components, check out the [next.js documentation "Why Server Components?"](https://beta.nextjs.org/docs/rendering/server-and-client-components#why-server-components)

server components can NOT get IMPORTED into client components, you ALWAYS need to pass them as children prop from within a server component down to the client component that will use it: <https://beta.nextjs.org/docs/rendering/server-and-client-components#importing-server-components-into-client-components>

TODO: to answer the question above, show example code of passing a server component via the children prop into a client component (that client component needs to be inside of a server component)

Is next.js 13 Isomorphic and do I even want it to be Isomorphic:

Note: to be honest I find all this quite complex, I don't like having to remember all the time that I need to do something in a specific way for it to work based on the environment where I'm, this adds complexity when creating components and also forces me to do some refactoring when I convert a component from a server component to a client component or vice versa and suddenly I need to remove the async await I could previously use, I like to be able to always do the same thing and be sure I will get the best result, I don't want to also have to wonder if my component is a server component inside a client component then I will fetch data so I need to pass it via children to client side components

to me this is not "Isomorphic" at all, I personally expect from a modern framework to be Isomorphic, you should be able to reuse most of your code on server side as well as the client side and only have a few files that function as adapters and do something different based on the environment, like having a getData function for both on the server and the client side, but inside getData you check the environemnt and based on the result you either do a browser fetch request using an API URL if you are in the client or if you are on the server you use the database adapter to make a direct database query without passing through an API, same would get done for caching, for example you would be able to cache data queries with a unique function that you can use the same way on the server side as well as the client, the cache function would use an adapter that caches data for example using the localstorage if you are in the client and if on server another adapter that caches or retrieves the data from for example a redis database

can we solve this headache by using the new next.js fetch? if so, this would mean we need an API! I don't mind needing an API, we would need one anyway for POST, PUT, PATCH and DELETE methods that client side code would call to execute actions, what is also nice is that the features like being able to use the `loading.tsx` file in your segment folder is not lost and still gets used when making a server side fetch, but finally all this all means that we never make any component function async and also not use await inside of it, but instead always use the new react `use` hook, only if we do all of this then we come very close to a real Isomorphic experience where we don't need to think about the question is this a component I can import or a component I need to pass via the `children` prop

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






caching:

this page <https://beta.nextjs.org/docs/routing/fundamentals#server-centric-routing-with-client-side-navigation> mentions:

> Additionally, as users navigate around the app, the router will store the result of the React Server Component payload in an in-memory client-side cache. The cache is split by route segments which allows invalidation at any level and ensures consistency across concurrent renders. This means that for certain cases, the cache of a previously fetched segment can be re-used, further improving performance.







rendering:

there are two environments where your application code can be rendered, the client and the server, you can choose the rendering environment at the component level, a server component is rendered on the server and a client component in the client

read more: [BETA Next.js documentation: Rendering Fundamentals](https://beta.nextjs.org/docs/rendering/fundamentals)

similar to what we were achieving getServerSideProps and getStaticProps, with next.js 13's app directory, you have two main options, "dynamic rendering" and optimized "static rendering"

weird, the [rendering](https://beta.nextjs.org/docs/rendering/fundamentals#dynamic-rendering) doc says:

> With Dynamic Rendering, both Server and Client Components are rendered on the server at request time.

Question(s): I don't get it, why it says client side components are rendered on the server

with dynamic rendering client components are prerendered on the server: <https://beta.nextjs.org/docs/rendering/static-and-dynamic-rendering<>

Question(s): what is "prerendering", how does it differ from "rendering", how is it better than no prerendering at all

TODO: can we analyze what is in next.js bundle files sent to the client, can we look at what a prerendered component looks like in terms of code, is for example the jsx already turned into html?... this next.js page <https://nextjs.org/learn/basics/data-fetching/pre-rendering> is for nextjs pages, but it explains what nextjs means by "prerendering" and it also explains how to check if prerendering happen, so this is worth reading before making an example that shows and explaisn prerendering




routes:

you can create static route segments, like /users but same as with pages you can also create dynamic routes like [id], to get the dynamic value you use the "params" prop

Question(s): do ["catch all"](https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes) routes (that have 3 dots: [...id]) and ["optional catch all"](https://nextjs.org/docs/routing/dynamic-routes#optional-catch-all-routes) routes (that have 2 square brackets [[...id]]) still work in the app directory???

next.js created a layout file for us in the root segment, but if inside of that segment we add a new segment /posts/[id] then this page will use the same layout, the best here is that all data that is being fetched in the layout is not getting refetched when you **navigate** from one to another

TODO: show an example with just "a href" links, which reload the entire page and then an example which uses next/link, explain that when I say **"navigate"** I mean by using **next/link** and NOT a conventinal **html anchor element**, show clearly that the data query in the layout is not being executed twice, just the main content (children of layout) are being updated

loading:

you can now create new loading files and these files have an error prop that contains details about the error

Question(s): are loading scripts also getting used by nested segments, like with layouts or do you need a loading script in each segment?

TODO: create a small demo by creating a loading file and adding a setTimeout to our library/fetch that returns the dummy json

error:

similar as loading, you can create error files

Question(s): error files can only be client components???

components directory or not:

prior to next.js 13's release or if you worked previously with create react app and did not use next.js at all, like me you might be used to put all components into a folder called `components`, but with next.js you can put all your components into the segment directories themself, you can even put your test files, like a jest test file to test your component into that folder too

so now the question is do you store the components in the segment folder or a seperate components folder, you can do both, it is as you prefer, for the moment as next.js is very new there is not yet really a trend which shows as that most devs do it this or that way

I for my part prefer a seperate components folder that acts as a library for all my components, for several reasons:

* because some components will be used by more than one segment
* not sure about this? -> all components are handled as client side components by next.js and we don't need to add the "use client" statement explicitly
* all files in the components folder will have react only code and no have any next.js specific code
* it will hopefully be easier in the future to re-use or share the components









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



### next/image

images go into the public folder, but "public" is not part of the src path, only what comes after

so an image called "foo.jpg" located in "/public/images/" would have an src like this: "/images/foo.jpg"

Note: if you used next/image prior to next.js 13 you might want to check out the migration guide as there are some major changes as to how some options work: <https://nextjs.org/docs/messages/next-image-upgrade-to-13>

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

Note: when you start your server with `npm run dev`, next.js will automatically create files with different dimensions of your image and store them into the folder `\.next\cache\images`

our original image is a PNG image, so it's quite heavy, because modern browser support formats like [AVIF](https://developer.mozilla.org/docs/Web/Media/Formats/Image_types#avif_image) or [WebP](https://developer.mozilla.org/docs/Web/Media/Formats/Image_types#webp_image) we want next.js to convert our original file into these formats and depending on what format the browser supports we want next.js to either ship .avif files to the user (best compression / smallest size) or else ship .webp files (good compression / smaller size) and only if none of those two is formats is supported it should ship .png files (worst compression / bigger size)

to add support for webp and avif we need to add the following code to our next.config.js:

```js
module.exports = {
 images: {
  formats: ['image/avif', 'image/webp']
 }
}
```

no need to change any code of the `<Image>` component we added previously, next.js will handle the conversion to the different formats automatically now that we have added them to the configuration file and will store the different versions into `\.next\cache\images`

Note: next/image uses sharp <https://www.npmjs.com/package/sharp> to convert images to other formats

Note: when using next/image for the first time, check out the browser dev tools console, next.js might give you tips about how to improve the usage you make of it, for example if your image is on top of the page but you have not set the attribute ["priority"](https://beta.nextjs.org/docs/api-reference/components/image#priority) then next.js will tell you to do so:

> Image with src "/assets/images/neonroad/fallback-min.png" was detected as the Largest Contentful Paint (LCP). Please add the "priority" property if this image is above the fold.

read more:

* next.js next/image documentation: <https://beta.nextjs.org/docs/api-reference/components/image>
* use avif in next.js: <https://avif.io/blog/tutorials/nextjs/>

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




## planetscale staging environment

> plantscale lets you branch your production database to create a staging environment for testing out schema changes

## vercel analytics

next you can enable [vercel analytics](https://vercel.com/docs/concepts/analytics/audiences/quickstart) for your project, by visiting your dashboard and then clicking on top on the **analytics** tab

Note: apparently vercel analytics is GDPR compliant (without cookie banner requirement), read more on their [privacy policy explanation page in the documentation](https://vercel.com/docs/concepts/analytics/privacy)

after enbabling vercel anayltics for your project you need to add their ([vercel analytics on github](https://github.com/vercel/analytics)) package to your project

## adding environment variables

## checking out vercel env variables locally

Note: when using vercel, you add env variables to the project via the vercel web interface, you don't create local `.env.*` files manually
also to check out your env variables (that you have added to the project via the vercel web interface) locally, you use their cli command `vercel env pull`

Note: if using vercel and also next.js, you don't need to use their cli command vercel dev as next dev does already handle serverless on localhost: <https://vercel.com/blog/vercel-dev>
