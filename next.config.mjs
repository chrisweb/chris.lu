// uncomment the following lines if you want to use the bundle analyzer
/*import WithBundleAnalyzer from '@next/bundle-analyzer'
//import { PHASE_DEVELOPMENT_SERVER } from 'next/constants.js'*/
// then uncomment the phase parameter

import WithMDX from '@next/mdx'

const ContentSecurityPolicy = `
  default-src 'self';
`

const nextConfig = (/*phase*/) => {

    // to use the bundle analyzer uncomment the following lines
    // then uncomment the return to use withBundleAnalyzer
    /*const withBundleAnalyzer = WithBundleAnalyzer({
        enabled: phase === PHASE_DEVELOPMENT_SERVER ? true : false,
        openAnalyzer: false,
    })*/

    const withMDX = WithMDX(/*{
        extension: /\.mdx?$/,
        options: {
            // If you use remark-gfm, you'll need to use next.config.mjs
            // as the package is ESM only
            // https://github.com/remarkjs/remark-gfm#install
            remarkPlugins: [],
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