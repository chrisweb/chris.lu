# chris.lu


this series of articles will showcase how to build a blog using next.js 13 and focus on using features like "React Server Components", "React Streaming Components", "React Suspense"


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

## react server components

files inside app will be rendered on the server as "React Server Components"

but those files in the app directory can also be client components

you can have both server and client components in a component tree, read more: [BETA Next.js documentation: Rendering Fundamentals](https://beta.nextjs.org/docs/rendering/fundamentals)

Inside the app/ directory, there is a powerful new way to fetch data with React's use() hook and the extended Web fetch() API. This allows you to colocate data fetching directly inside components for the most flexibility, including inside layouts

When a route is loaded, the Next.js and React runtime will be loaded, which is cacheable and predictable in size. This runtime does not increase in size as your application grows. Further, the runtime is asynchronously loaded, enabling your HTML from the server to be progressively enhanced on the client

Question(s): what exactly is the runtime? how is it loaded asynchronously? Isn't it bundled like everything else?



### rendering

you can choose the rendering environment at the component level

Glossary:

Rendering Environments: there are two environments where your application code can be rendered, the client and the server

similar to what we were achieving getServerSideProps and getStaticProps, with next.js 13's app directory, you have two main options, "dynamic rendering" and optimized "static rendering"

read more: [BETA Next.js documentation: Rendering Fundamentals](https://beta.nextjs.org/docs/rendering/fundamentals)

### streaming

from the ["next.js 13 blog post"](https://nextjs.org/blog/next-13):

> the app/ directory introduces the ability to progressively render and incrementally stream rendered units of the UI to the client

I let you check out the [next.js "what is Streaming?" documentation section](https://beta.nextjs.org/docs/data-fetching/streaming-and-suspense) it is very informative about what limitations SSR has and why streaming is good solution



## 

Question(s): what about react Streaming, react Suspense, and react Transitions?


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

create the next.js configuration `next.config.js` file, in the root of the project:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
    },
}

module.exports = nextConfig
```

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





add mui to our project

install mui but also the mui eslint plugin, then edit the eslint configuration to activate it
