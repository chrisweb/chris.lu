// uncomment the following lines if you want to use the bundle analyzer
/*import WithBundleAnalyzer from '@next/bundle-analyzer'
//import { PHASE_DEVELOPMENT_SERVER } from 'next/constants.js'*/
// then uncomment the phase parameter

/**
 * @typedef {import('rehype-github-alerts').IOptions} IOptions
 * @typedef {import('rehype-github-alerts').DefaultBuildType} DefaultBuildType
 */

import createMdx from '@next/mdx'
import rehypePrettyCode from 'rehype-pretty-code'
import { readFileSync } from 'fs'
import { jsonrepair } from 'jsonrepair'
import { remarkTableOfContents } from 'remark-table-of-contents'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import { fromHtmlIsomorphic } from 'hast-util-from-html-isomorphic'
import { toString } from 'hast-util-to-string'
import { h } from 'hastscript'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import { rehypeGithubAlerts } from 'rehype-github-alerts'



/*const ContentSecurityPolicy = `
  default-src 'self';
`*/

const nextConfig = (/*phase*/) => {

    // to use the bundle analyzer uncomment the following lines
    // then uncomment the return to use withBundleAnalyzer
    /*const withBundleAnalyzer = WithBundleAnalyzer({
        enabled: phase === PHASE_DEVELOPMENT_SERVER ? true : false,
        openAnalyzer: false,
    })*/

    const themeJsonPath = new URL('./node_modules/synthwave-vscode/themes/synthwave-color-theme.json', import.meta.url)
    //const themeJsonPath = new URL('./synthwave84.json', import.meta.url)

    // get the json theme
    const themeJsonContent = readFileSync(themeJsonPath, 'utf-8')

    // fix errors in the json
    const themeJsonContentFixed = jsonrepair(themeJsonContent)

    // https://rehype-pretty-code.netlify.app/
    const rehypePrettyCodeOptions = {
        // VSCode "SynthWave '84" theme
        theme: JSON.parse(themeJsonContentFixed),

        // Keep the background or use a custom background color?
        keepBackground: true,

        // "visitor" hooks to customize the html output
        onVisitLine(element) {
            // prevent lines from collapsing in `display: grid` mode, and
            // allow empty lines to be copy/pasted
            if (element.children.length === 0) {
                element.children = [{ type: 'text', value: ' ' }]
            }
        },
        onVisitHighlightedLine(element) {
            if (typeof element.properties.className === 'undefined') {
                element.properties.className = []
            }
            element.properties.className.push('highlightedLine')
        },
        onVisitHighlightedWord(element) {
            if (typeof element.properties.className === 'undefined') {
                element.properties.className = []
            }
            element.properties.className.push('highlightedWord')
        },
        onVisitHighlightedChars(element) {
            if (typeof element.properties.className === 'undefined') {
                element.properties.className = []
            }
            element.properties.className.push('highlightedChars')
        },
        onVisitTitle(element) {
            if (typeof element.properties.className === 'undefined') {
                element.properties.className = []
            }
            element.properties.className.push('codeBlockTitle')

        },
        onVisitCaption(element) {
            if (typeof element.properties.className === 'undefined') {
                element.properties.className = []
            }
            element.properties.className.push('codeBlockCaption')
        },
    }

    // https://github.com/chrisweb/remark-table-of-contents#options
    const remarkTableOfContentsOptions = {
        containerAttributes: {
            id: 'articleToc',
        },
        navAttributes: {
            'aria-label': 'table of contents'
        },
        maxDepth: 3,
    }

    // https://github.com/rehypejs/rehype-autolink-headings#api
    const rehypeAutolinkHeadingsOptions = {
        behavior: 'wrap',
        properties: {
            class: 'headingAnchor',
        },
        content: (node) => {
            const svgIcon = fromHtmlIsomorphic(
                '<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 24 24" aria-hidden="true"><path d="M11 17H7q-2.075 0-3.537-1.463Q2 14.075 2 12t1.463-3.538Q4.925 7 7 7h4v2H7q-1.25 0-2.125.875T4 12q0 1.25.875 2.125T7 15h4Zm-3-4v-2h8v2Zm5 4v-2h4q1.25 0 2.125-.875T20 12q0-1.25-.875-2.125T17 9h-4V7h4q2.075 0 3.538 1.462Q22 9.925 22 12q0 2.075-1.462 3.537Q19.075 17 17 17Z"/></svg>',
                { fragment: true }
            )
            return [
                h(null, toString(node)),
                svgIcon
            ]
        }
    }

    // https://github.com/remarkjs/remark-gfm
    // If you use remark-gfm, you'll need to use next.config.mjs
    // as the package is ESM only
    const remarkGfmOptions = {
        singleTilde: false,
    }

    // https://github.com/chrisweb/rehype-github-alerts
    /** @type { DefaultBuildType } */
    /*const myGithubAlertBuild = (alertOptions, originalChildren) => {
        const alert = {
            type: 'element',
            tagName: 'div',
            properties: {
                className: [
                    `markdown-alert-${alertOptions.keyword.toLowerCase()}`,
                ],
                style: 'color: ' + alertOptions.color + ';'
            },
            children: [
                ...originalChildren
            ]
        }

        return alert
    }*/

    /** @type { IOptions } */
    const rehypeGithubAlertsOptions = {
        supportLegacy: false,
        //build: myGithubAlertBuild
    }

    const withMDX = createMdx({
        extension: /\.mdx?$/,
        options: {
            remarkPlugins: [[remarkTableOfContents, remarkTableOfContentsOptions], [remarkGfm, remarkGfmOptions]],
            rehypePlugins: [[rehypePrettyCode, rehypePrettyCodeOptions], rehypeSlug, [rehypeAutolinkHeadings, rehypeAutolinkHeadingsOptions], [rehypeGithubAlerts, rehypeGithubAlertsOptions]],
            // If you use `MDXProvider`, uncomment the following line.
            // providerImportSource: "@mdx-js/react",
        },
    })

    /** @type {import('next').NextConfig} */
    const nextConfig = {
        experimental: {
            // experimental use rust compiler for MDX
            // as of now (07.10.2023) there is no support for rehype plugins
            // this is why it is currently disabled
            mdxRs: false,
        },
        // file formats for next/image
        images: {
            formats: ['image/avif', 'image/webp']
        },
        // TODO: is this needed for app directory
        // Configure pageExtensions to include md and mdx
        pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
        // disable linting during builds using "next lint"
        // we have manually added our lint script in package.json to the build command
        eslint: {
            ignoreDuringBuilds: true,
        },
        /*headers: async () => {
            return [
                {
                    source: '/:path*',
                    headers: [
                        {
                            //key: 'Content-Security-Policy',
                            key: 'Content-Security-Policy-Report-Only',
                            value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim()
                        },
                    ]
                }
            ]
        },*/
    }

    return withMDX(nextConfig)
    //return withBundleAnalyzer(withMDX(nextConfig))

}

export default nextConfig