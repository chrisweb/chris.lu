next chapters?

* \[DONE] Prerequisites
* \[DONE] project setup
* \[DONE] typescript setup
* \[DONE] vercel preview (staging environment) with github commit triggers auto deploy
* \[DONE] CSP
* \[DONE] articles (pages) using MDX (@next/mdx)
* \[DONE] eslint for MDX
* \[DONE] CSS modules for styling
* \[DONE] navigation / next/link (optimizing fonts with next/font)
* \[DONE] next/mdx "mdx-components" file
* \[DONE] optimizing images with next/image
* all the MDX plugins
* SEO (metadata)
* github: pull request from preview into main branch (automatically link / close tickets)
* vercel analytics
* vercel prod release (custom domain)










#### custom component to highlight the currently active heading in the table of contents

In a previous chapter we added a remark plugin that generates a toc, now we are going to create a custom component that will use the [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) to check which heading is currently visible in our viewport (screen) and then mark it as active in the table of contents

First add an observer to our headings we will create a custom react hook at `hooks/useObserver.tsx`, with the following code:

```tsx
import { useEffect, useState, useRef } from 'react'

export function useObserver(elementsToObserve: string, rootMargin: string) {

    const [activeIdState, setActiveIdState] = useState('')
    const observerRef = useRef<IntersectionObserver>()

    useEffect(() => {

        const handleObsever = (entries: IntersectionObserverEntry[]) => {

            entries.forEach((entry) => {
                if (entry?.isIntersecting) {
                    
                    setActiveIdState(entry.target.id)
                }
            })
        }

        if (observerRef !== undefined) {
            observerRef.current = new IntersectionObserver(handleObsever, {
                rootMargin: rootMargin
            })

            const elements = document.querySelectorAll(elementsToObserve)

            elements.forEach((elem) => observerRef.current.observe(elem))
        }

        return () => {
            observerRef.current?.disconnect()
        }
    }, [elementsToObserve, rootMargin])

    return { activeIdState }

}
```

now that we have our custom hook lets create our custom component at `components/headings/Observer.tsx`, with the following code:

```tsx
'use client'

import { ErrorBoundary } from 'react-error-boundary'
import { useObserver } from '../../hooks/useObserver'
import { ReactNode, ReactElement, Children, isValidElement, cloneElement, MouseEvent } from 'react'

interface IProps {
    id?: string
    children?: ReactNode | ReactNode[]
}

const findFirstNodeThatMatchesType = (children: ReactNode, type: string): ReactElement => {

    const childrenArray = Children.toArray(children)

    for (const child of childrenArray) {
        if (isValidElement(child)) {
            if (child.type === type) {
                return child
            }
        }
    }

}

const findFirstNodeThatHasProp = (children: ReactNode, prop: string): ReactElement => {

    const childrenArray = Children.toArray(children)

    for (const child of childrenArray) {
        if (isValidElement(child)) {
            if (prop in child.props) {
                return child
            }
        }
    }

}

const onClickLinkHandler = (event: MouseEvent<HTMLAnchorElement>) => {

    event.preventDefault()

    const targetUrl = event.currentTarget.href
    const targetId = targetUrl.slice(targetUrl.indexOf('#'))
    const heading = document.querySelector(targetId)

    if (heading) {
        heading.scrollIntoView({
            behavior: 'smooth',
        })
    }
}

const findAndTransformRows = (children: ReactNode, activeIdState: string, level = 0): ReactNode => {

    const ulChildInput = findFirstNodeThatMatchesType(children, 'ul')

    let ulChildOutput: ReactNode

    if (ulChildInput !== undefined) {

        level++

        const liChildrenInput = ulChildInput.props.children

        const liChildrenOutput = liChildrenInput.map((liChild: ReactNode, index: number) => {

            if (isValidElement(liChild)) {
                if (liChild.type === 'li') {

                    const liChildLinkInput = findFirstNodeThatHasProp(liChild.props.children, 'href')
                    const liChildLinkId = liChildLinkInput.props.href.slice(1)
                    const moreRows = findAndTransformRows(liChild.props.children, activeIdState, level)

                    const clonedLinkChild = cloneElement(liChildLinkInput, {
                        ...liChildLinkInput.props,
                        className: 'a',
                        onClick: onClickLinkHandler,
                    })

                    const clonedLiChild = cloneElement(liChild, {
                        ...liChild.props,
                        key: liChild.key !== null ? liChild.key : level + '_' + index,
                        className: activeIdState === liChildLinkId ? 'active' : 'not-active',
                        children: moreRows ? [clonedLinkChild, moreRows] : clonedLinkChild
                    })

                    return clonedLiChild
                }
            }

            return liChild

        })

        ulChildOutput = cloneElement(ulChildInput, {
            ...ulChildInput.props,
            children: liChildrenOutput
        })

    }

    return ulChildOutput

}

const HeadingsObserver: React.FC<IProps> = (props): JSX.Element => {

    const { activeIdState } = useObserver('h1, h2, h3, h4, h5, h6', '-20% 0% -35% 0px')
    const navChild = findFirstNodeThatMatchesType(props.children, 'nav')
    const toc = findAndTransformRows(navChild.props.children, activeIdState)

    console.log(props)

    return (
        <>
            <ErrorBoundary fallback={<aside {...props}><div className="error">Toc error</div></aside>}>
                <aside {...props}>
                    <nav {...props.children[0].props}>
                        {toc}
                    </nav>
                </aside>
            </ErrorBoundary>
        </>
    )
}

export default HeadingsObserver
```

next we need to edit the `mdx-components.tsx` file, like so:

```tsx
export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        aside: ({ children, id, ...props }) => (
            <>
                {props.id === 'articleToc' ? (
                    <HeadingsObserver {...props}>
                        {children}
                    </HeadingsObserver>
                ) : (
                    <aside {...props}>
                        {children}
                    </aside>
                )}
            </>
        ),
        ...components,
    }
}
```

we have used [JSX conditanal rendering](https://react.dev/learn/conditional-rendering) to check if the aside is the one of the toc, if it is we use our component if it is not we render a basic aside

now it time to modify the styling and placement of our \**table of contents* by adding some css into `app/layout.module.css` file:

```css
```

read more:

* [react "custom hooks" documentation](https://react.dev/learn/reusing-logic-with-custom-hooks)
* [react "JSX conditanal rendering" documentation](https://react.dev/learn/conditional-rendering)
* [MDN "Intersection Observer API" documentation](https://www.smashingmagazine.com/2021/07/dynamic-header-intersection-observer/)
* [Smashing Magazine "Intersection Observer API" article](https://www.smashingmagazine.com/2021/07/dynamic-header-intersection-observer/)

## rehypeSlug and rehypeAutolinkHeadings plugins

To improve our headings even more we are going to add another two plugins, [rehype-slug](https://www.npmjs.com/package/rehype-slug) and [rehype-autolink-headings](https://www.npmjs.com/package/rehype-autolink-headings)

**rehype-slug** will automatically generate IDs for each of our headings, if rehype-slug encounters headings with duplicate titles it will create unique IDs for us by appending a number at the end of the ID
**rehype-autolink-headings** will add links to the heading itself inside of our heading elements, it will make our headings look like this `<h1 id="heading-id"><a href="#heading-id"></a></h1>`, meaning that rehype-autolink-headings provides similar functionality to what you may know from GitHub or npm, where an anchor is added to headings, when you hover over a heading you will see a link icon appear on the left, now when you move the the mouse cursor over that icon it will become a pointer indicating that you can click it, when you click on it the browser address bar will switch to the page URL and include the ID of the heading, if you then share the URL (containing the heading ID) with someone else and they navigate to that URL then their browser will point (scroll down) to the particular heading in the page

here is an an image to show you how these bookmark links (anchor links) look like in a github readme:

![bookmark link (anchor link) example](./documentation/assets/images/github_headings_link_icon.png)

Note: the two plugins are rehype plugins meaning they will alter the HTML markup and not the markdown itself, to understand better what MDX plugins are and what the differencies between remark and rehype are, check out the chapter [what is MDX (behind the scenes](#what-is-mdx-behind-the-scenes) and [using plugins to extend MDX](#using-plugins-to-extend-mdx)

first lets install the two new dependencies:

```shell
npm i rehype-slug --save-exact
```

```shell
npm i rehype-autolink-headings --save-exact
```

next we will modify the next.config.mjs file to import both plugins and then add them to rehypePlugins array, like so:

```js
import createMdx from '@next/mdx'
import { remarkTableOfContents } from 'remark-table-of-contents'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'

const nextConfig = (/*phase*/) => {

    // https://github.com/chrisweb/remark-table-of-contents#options
    const remarkTableOfContentsOptions = {
        containerAttributes: {
            id: 'articleToc',
        },
        navAttributes: {
            'aria-label': 'table of contents'
        }
    }

    // https://github.com/rehypejs/rehype-autolink-headings#api
    const rehypeAutolinkHeadingsOptions = {
        properties: {
            ariaHidden: true,
            tabIndex: -1,
            class: 'headingAnchor',
        },
        content: fromHtmlIsomorphic(
            '<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 24 24" class="icon iconLink"><path d="M11 17H7q-2.075 0-3.537-1.463Q2 14.075 2 12t1.463-3.538Q4.925 7 7 7h4v2H7q-1.25 0-2.125.875T4 12q0 1.25.875 2.125T7 15h4Zm-3-4v-2h8v2Zm5 4v-2h4q1.25 0 2.125-.875T20 12q0-1.25-.875-2.125T17 9h-4V7h4q2.075 0 3.538 1.462Q22 9.925 22 12q0 2.075-1.462 3.537Q19.075 17 17 17Z" style="fill:#fff;"/></svg></span>',
            { fragment: true }
        ).children,
    }

    const withMDX = createMdx({
        extension: /\.mdx?$/,
        options: {
            remarkPlugins: [[remarkTableOfContents, remarkTableOfContentsOptions]],
            rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, rehypeAutolinkHeadingsOptions]],
        },
    })

    /** @type {import('next').NextConfig} */
    const nextConfig = {
        experimental: {
            // experimental support for next.js > 13 app directory
            appDir: true,
            // experimental use rust compiler for MDX
            mdxRs: false,
        },
        // file formats for next/image
        images: {
            formats: ['image/avif', 'image/webp']
        },
        // Configure pageExtensions to include md and mdx
        pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
    }

    return withMDX(nextConfig)

}

export default nextConfig
```

Note: the order in which you add those two plugins to your configuration matters, rehype-slug needs to come first because it adds IDs to the headings and then you can add rehype-autolink-headings which will use those IDs and turn the headings in autolinked headings

when using the default options **rehype-autolink-headings** will add the following span `<span class="icon icon-link"></span>` inside of the link of each heading, we want to do the same thing that github does for their readme headings, which means we are going to replace the span with an SVG

Note: using rehype-autolink-headings options you can configure the behavior of the links it is creating, in this example we only use two options but if want to know which options are available, I recommend to quickly check out the ["rehype-autolink-headings" readme](https://github.com/rehypejs/rehype-autolink-headings) to at least know which options are available

there are many ways that lead to rome, but here is my suggestion to add an link icon for the autolink heading:

First I we need an SVG icon, when I need an icon I like to check out Google's [Material Symbols](https://fonts.google.com/icons) collection, the entire collection of icons is available as font on <https://fonts.google.com/icons> and there you can also visualize and search for material symbols, I found one called "Link" but as far as I could see you can't just get the SVG file from there, so I headed over to github, into the [material icons/symbols repository](https://github.com/google/material-design-icons/) directory, from there I opened the **symbols** directory, then **web**, here are all the material web symbols, I then downloaded the Link SVG ([/link/materialsymbolsoutlined/link\_24px.svg](https://github.com/google/material-design-icons/blob/master/symbols/web/link/materialsymbolsoutlined/link_24px.svg)) and finally opened it in vscode, this is the original source of that file:

```xml
<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M11 17H7q-2.075 0-3.537-1.463Q2 14.075 2 12t1.463-3.538Q4.925 7 7 7h4v2H7q-1.25 0-2.125.875T4 12q0 1.25.875 2.125T7 15h4Zm-3-4v-2h8v2Zm5 4v-2h4q1.25 0 2.125-.875T20 12q0-1.25-.875-2.125T17 9h-4V7h4q2.075 0 3.538 1.462Q22 9.925 22 12q0 2.075-1.462 3.537Q19.075 17 17 17Z"/></svg>
```

I slightly changed the SVG code to this:

```xml
<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 24 24" class="icon iconLink"><path d="M11 17H7q-2.075 0-3.537-1.463Q2 14.075 2 12t1.463-3.538Q4.925 7 7 7h4v2H7q-1.25 0-2.125.875T4 12q0 1.25.875 2.125T7 15h4Zm-3-4v-2h8v2Zm5 4v-2h4q1.25 0 2.125-.875T20 12q0-1.25-.875-2.125T17 9h-4V7h4q2.075 0 3.538 1.462Q22 9.925 22 12q0 2.075-1.462 3.537Q19.075 17 17 17Z"/></svg>
```

in the updated SVG I added the view box **0 0 24 24** attribte and a class attribute with our two classes **icon iconLink**

because our SVG for the heading anchor is HTML we are going to add another package called [hast-util-from-html-isomorphic](https://www.npmjs.com/package/hast-util-from-html-isomorphic) to our project, which we will use to transform the HTML to a hast node before passing it to **rehype-autolink-headings** via the options

next we add the some options for the **rehype-autolink-headings** plugin to our `next.config.mjs` file:

```js
import createMdx from '@next/mdx'
import { remarkTableOfContents } from 'remark-table-of-contents'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import { fromHtmlIsomorphic } from 'hast-util-from-html-isomorphic'
import rehypeSlug from 'rehype-slug'

const nextConfig = (/*phase*/) => {

    // https://github.com/chrisweb/remark-table-of-contents#options
    const remarkTableOfContentsOptions = {
        containerAttributes: {
            id: 'articleToc',
        },
        navAttributes: {
            'aria-label': 'table of contents'
        }
    }

    // https://github.com/rehypejs/rehype-autolink-headings#api
    const rehypeAutolinkHeadingsOptions = {
        properties: {
            ariaHidden: true,
            tabIndex: -1,
            class: 'headingAnchor',
        },
        content: fromHtmlIsomorphic(
            '<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 24 24" class="icon iconLink"><path d="M11 17H7q-2.075 0-3.537-1.463Q2 14.075 2 12t1.463-3.538Q4.925 7 7 7h4v2H7q-1.25 0-2.125.875T4 12q0 1.25.875 2.125T7 15h4Zm-3-4v-2h8v2Zm5 4v-2h4q1.25 0 2.125-.875T20 12q0-1.25-.875-2.125T17 9h-4V7h4q2.075 0 3.538 1.462Q22 9.925 22 12q0 2.075-1.462 3.537Q19.075 17 17 17Z" style="fill:#fff;"/></svg></span>',
            { fragment: true }
        ).children,
    }

    // https://github.com/rehypejs/rehype-autolink-headings#api
    const rehypeAutolinkHeadingsOptions = {
        properties: {
            ariaHidden: true,
            tabIndex: -1,
            class: 'headingAnchor',
        },
        content: fromHtmlIsomorphic(
            '<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 24 24" class="icon iconLink"><path d="M11 17H7q-2.075 0-3.537-1.463Q2 14.075 2 12t1.463-3.538Q4.925 7 7 7h4v2H7q-1.25 0-2.125.875T4 12q0 1.25.875 2.125T7 15h4Zm-3-4v-2h8v2Zm5 4v-2h4q1.25 0 2.125-.875T20 12q0-1.25-.875-2.125T17 9h-4V7h4q2.075 0 3.538 1.462Q22 9.925 22 12q0 2.075-1.462 3.537Q19.075 17 17 17Z"/></svg>',
            { fragment: true }
        ).children,
    }

    const withMDX = createMdx({
        extension: /\.mdx?$/,
        options: {
            remarkPlugins: [[remarkTableOfContents, remarkTableOfContentsOptions]],
            rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, rehypeAutolinkHeadingsOptions]],
        },
    })

    /** @type {import('next').NextConfig} */
    const nextConfig = {
        experimental: {
            // experimental support for next.js > 13 app directory
            appDir: true,
            // experimental use rust compiler for MDX
            mdxRs: false,
        },
        // file formats for next/image
        images: {
            formats: ['image/avif', 'image/webp']
        },
        // Configure pageExtensions to include md and mdx
        pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
    }

    return withMDX(nextConfig)

}

export default nextConfig
```

first we have added an import for the **fromHtmlIsomorphic** function from the **hast-util-from-html-isomorphic** package and then we used the **properties** option add **headingAnchor** class to the anchor itself, we use it in the next step to position the anchor and we used the **content** option to replace the default span with our Link SVG we downloaded in the previous step, to transform the HTML of our SVG into a hast node we use **fromHtmlIsomorphic** function from the **hast-util-from-html-isomorphic** package

now we are going to edit our `global.css` file, most of it is needed to currectly position the heading anchor icon on the left of the heading(s), I took a lot of inspiration from github (yeah ok I just copied their css, but hey why re-invent the wheel):

```css
.headingAnchor {
    display: flex;
    align-items: center;
    margin-left: -28px;
    margin-right: 4px;
}

.icon {
    display: inline-block;
    overflow: visible;
    fill: #fff;
}

.iconLink {
    visibility: hidden;
}

@media (hover: none) {
    .iconLink {
        visibility: visible;
    }
}

h1:hover .headingAnchor .iconLink,
h2:hover .headingAnchor .iconLink,
h3:hover .headingAnchor .iconLink,
h4:hover .headingAnchor .iconLink,
h5:hover .headingAnchor .iconLink,
h6:hover .headingAnchor .iconLink {
    visibility: visible;
}
```

Note: as you can see we added a special media query **hover: none**, this is for mobile, where hover is not possible, so if it is a mobile device we always show the anchor, on desktop it is only visible when you hover over the heading itself

also make sure your heading are set to **display: flex** (same as the .headingAnchor class):

```css
h1,
h2,
h3,
h4,
h5,
h6 {
    display: flex;
    font-weight: var(--main-fontWeight-headline);
    line-height: var(--main-lineHeight-headline);
    margin: 0 0 0.35em 0;
    /* add a scroll margin because of the top navbar */
    /* fixes the scrollIntoView position */
    /* https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-margin-top */
    scroll-margin-top: 80px;
}
```

TODO: not on accessibility: [Are your Anchor Links Accessible?](https://amberwilson.co.uk/blog/are-your-anchor-links-accessible/)

read more:

* ["rehype-slug" npm page](https://www.npmjs.com/package/rehype-slug)
* ["rehype-autolink-headings" npm page](https://www.npmjs.com/package/rehype-autolink-headings)
* ["hast-util-from-html-isomorphic" npm page](https://www.npmjs.com/package/hast-util-from-html-isomorphic)



## Importing custom React components into MDX pages

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

## metadata support and SEO optimization

<https://nextjs.org/blog/next-13-2#built-in-seo-support-with-new-metadata-api>

## metadata

[Next.js "metadata" documentation](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)

### favicon and web app icon(s)

[Next.js "app icon(s)" documentation](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons)
[Apple "web application icon" documentation](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html)

### web app manifest

[MDN "manifest shortcuts" documentation](https://developer.mozilla.org/en-US/docs/Web/Manifest/shortcuts)
[web.dev "manifest" documentation](https://web.dev/articles/add-manifest)
[MDN "CSP manifest-src" documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/manifest-src)

### opengraph

> \[!MORE]\
> [The Open Graph protocol website](https://ogp.me/)\
> [Facebook "Sharing Debugger" website](https://developers.facebook.com/tools/debug/)

#### opengraph image

> \[!WARN]\
> If like me you are on the vercel free plan (Hobby plan), be careful to not use images that are very heavy or use a lot of images (or other assets like fonts) in your og image script, because functions have a limit of 1MB, so if your PNG background image is 1.5 MB you will get this error during the build process: "Error: The Edge Function "web\_development/opengraph-image" size is 1.68 MB and your plan size limit is 1 MB. Learn More: <https://vercel.link/edge-function-size>", in case you wonder Hobby: 1 MB, Pro: 2 MB, Enterprise: 4 MB

[Next.js "opengraph image" documentation](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image)
[Vercel "OG image generation" documentation](https://vercel.com/docs/functions/og-image-generation)
[Vercel "OG image examples" documentation](https://vercel.com/docs/functions/og-image-generation/og-image-examples)
[Satori documentation](https://github.com/vercel/satori#documentation)
[Vercel "OG image" playground](https://og-playground.vercel.app/)
