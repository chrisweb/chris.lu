// uncomment the following lines if you want to use the bundle analyzer
/*import WithBundleAnalyzer from '@next/bundle-analyzer'
//import { PHASE_DEVELOPMENT_SERVER } from 'next/constants.js'*/
// then uncomment the phase parameter

import WithMDX from '@next/mdx'
import rehypePrettyCode from 'rehype-pretty-code'
import { readFileSync } from 'fs'
import { jsonrepair } from 'jsonrepair'
import { remarkTableOfContents } from 'remark-table-of-contents'

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

    const rehypePrettyCodeOptions = {
        // VSCode "SynthWave '84" theme
        theme: JSON.parse(themeJsonContentFixed),

        // Keep the background or use a custom background color?
        keepBackground: true,

        // Callback hooks to add custom logic to nodes when visiting
        // them.
        onVisitLine(node) {
            // Prevent lines from collapsing in `display: grid` mode, and
            // allow empty lines to be copy/pasted
            if (node.children.length === 0) {
                node.children = [{ type: 'text', value: ' ' }]
            }
        },
        onVisitHighlightedLine(node) {
            // Each line node by default has `class="line"`.
            node.properties.className.push('highlighted')
        },
        onVisitHighlightedWord(node) {
            // Each word node has no className by default.
            node.properties.className = ['word']
        },
    }

    const withMDX = WithMDX({
        extension: /\.mdx?$/,
        options: {
            // If you use remark-gfm, you'll need to use next.config.mjs
            // as the package is ESM only
            // https://github.com/remarkjs/remark-gfm#install
            // should I also use: remark-slug remark-autolink-headings ???
            remarkPlugins: [remarkTableOfContents],
            rehypePlugins: [[rehypePrettyCode, rehypePrettyCodeOptions]],
            // If you use `MDXProvider`, uncomment the following line.
            // providerImportSource: "@mdx-js/react",
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
        // TODO: is this needed for app directory
        // Configure pageExtensions to include md and mdx
        pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
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