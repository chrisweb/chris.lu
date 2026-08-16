// uncomment the following lines if you want to use the bundle analyzer
//import WithBundleAnalyzer from '@next/bundle-analyzer'
import { PHASE_DEVELOPMENT_SERVER } from 'next/constants.js'
import createMdx from '@next/mdx'
import path from 'node:path'
import { NextConfig } from 'next'

const nextConfig = (phase: string) => {

    // to use the bundle analyzer uncomment the following lines
    // then uncomment the return to use withBundleAnalyzer
    /*const withBundleAnalyzer = WithBundleAnalyzer({
        enabled: phase === PHASE_DEVELOPMENT_SERVER,
        openAnalyzer: false,
    })*/

    // plugin configs need to be JSON-serializable (plugin names as strings,
    // options as plain objects) so that they can cross Turbopack's Rust
    // boundary; plugins whose options need JS values (functions, transformer
    // instances) or that have no default export are wrapped in local preset
    // modules (lib/mdx/) referenced by absolute path
    const mdxPluginPath = (fileName: string) => path.join(process.cwd(), 'lib', 'mdx', fileName)

    const withMDX = createMdx({
        options: {
            remarkPlugins: [
                'remark-frontmatter',
                'remark-mdx-frontmatter',
                mdxPluginPath('remark-table-of-contents.mjs'),
                // https://github.com/remarkjs/remark-gfm
                ['remark-gfm', { singleTilde: false }],
            ],
            rehypePlugins: [
                mdxPluginPath('rehype-pretty-code.mjs'),
                'rehype-slug',
                'rehype-mdx-import-media',
                mdxPluginPath('rehype-autolink-headings.mjs'),
                mdxPluginPath('rehype-github-alerts.mjs'),
            ],
        },
    })

    const nextConfigOptions: NextConfig = {
        reactStrictMode: true,
        poweredByHeader: false,
        reactCompiler: true,
        // cacheComponents is currently disabled, the site is mostly static
        // it was originally disabled because of a Sentry incompatibility
        // (Sentry has since been removed), enabling it is planned
        cacheComponents: false,
        typedRoutes: true,
        experimental: {
            // experimental use rust compiler for MDX
            // as of now (07.10.2023) there is no support for rehype plugins
            // this is why it is currently disabled
            // https://nextjs.org/docs/app/api-reference/next-config-js/mdxRs
            /*mdxRs: {
                mdxType: 'gfm',
            },*/
            mdxRs: false,
            // https://nextjs.org/blog/next-15-2#react-view-transitions-experimental
            //viewTransition: true,
            // MCP server
            mcpServer: true
        },
        // hit or skip data cache logging (dev server)
        // https://nextjs.org/docs/app/api-reference/next-config-js/logging
        logging: {
            fetches: {
                fullUrl: true,
            },
        },
        // file formats for next/image
        images: {
            formats: ['image/avif', 'image/webp'],
            deviceSizes: [240, 336, 480, 704, 1080, 1408, 1920, 2112, 3840],
            // 75 is too low for avif, so images use 90 (or 100 for animated ones)
            qualities: [100, 90],
            localPatterns: [
                {
                    pathname: '/_next/image',
                    // Allow any query parameters
                },
                {
                    pathname: '/_next/static/media/**',
                    // Allow any query parameters
                },
            ],
        },
        // Configure pageExtensions to include md and mdx
        pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'mdx'],
        // eslint-disable-next-line @typescript-eslint/require-await
        headers: async () => {
            return [
                {
                    source: '/(.*)',
                    headers: securityHeadersConfig(phase)
                },
                {
                    source: '/(.*).(cur|webm|mp4|ogg|mp3)',
                    headers: [
                        {
                            key: 'Cache-Control',
                            value: 'public, max-age=315360000, immutable',
                        },
                    ],
                },
                {
                    source: '/assets/images/animated/(.*).(webp|avif)',
                    headers: [
                        {
                            key: 'Cache-Control',
                            value: 'public, max-age=315360000, immutable',
                        },
                    ],
                },
            ]
        },
        // eslint-disable-next-line @typescript-eslint/require-await
        redirects: async () => {
            return [
                {
                    source: '/myprojects',
                    destination: '/web_development',
                    permanent: true,
                },
                {
                    // this chapter was published twice, once with "flavored"
                    // misspelled as "flawored", the typo url is kept alive as
                    // a redirect so old inbound links and search results do
                    // not 404 on it
                    source: '/web_development/tutorials/next-js-static-mdx-blog/github-flawored-markdown-plugin',
                    destination: '/web_development/tutorials/next-js-static-mdx-blog/github-flavored-markdown-plugin',
                    permanent: true,
                },
            ]
        },
    }

    return withMDX(nextConfigOptions)
    //return withBundleAnalyzer(withMDX(nextConfigOptions))

}

const securityHeadersConfig = (phase: string) => {

    const cspReportOnly = false
    const isDev = phase === PHASE_DEVELOPMENT_SERVER

    const cspHeader = () => {

        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        const upgradeInsecure = (!isDev && !cspReportOnly) ? 'upgrade-insecure-requests;' : ''

        // I wanted to add the trusted-types directive to the defaultCSPDirectives:
        // require-trusted-types-for 'script';
        // unfortunately because of fontawesome this is not possible (yet)
        // https://github.com/FortAwesome/Font-Awesome/issues/20001
        // I think that even if fontawesome would support it
        // it would not work with the current version of next.js

        // child-src is because safari <= 15.4 does not support worker-src
        const defaultCSPDirectives = `
            default-src 'none';
            media-src 'self';
            object-src 'none';
            worker-src 'self';
            child-src 'self';
            manifest-src 'self';
            base-uri 'none';
            form-action 'none';
            frame-ancestors 'none';
            ${upgradeInsecure}
        `

        // for production environment white-list vitals.vercel-insights
        // based on: https://vercel.com/docs/speed-insights#content-security-policy
        if (process.env.VERCEL_ENV === 'production') {
            return `
                ${defaultCSPDirectives}
                font-src 'self';
                style-src 'self' 'unsafe-inline';
                script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval';
                connect-src 'self' https://vitals.vercel-insights.com;
                img-src 'self' data:;
                frame-src 'none';
            `
        }

        // when environment is preview enable unsafe-inline scripts for vercel preview feedback/comments feature
        // and whitelist vercel's domains based on:
        // https://vercel.com/docs/workflow-collaboration/comments/specialized-usage#using-a-content-security-policy
        // and white-list vitals.vercel-insights
        // based on: https://vercel.com/docs/speed-insights#content-security-policy
        if (process.env.VERCEL_ENV === 'preview') {
            return `
                ${defaultCSPDirectives}
                font-src 'self' https://vercel.live/ https://assets.vercel.com https://fonts.gstatic.com;
                style-src 'self' 'unsafe-inline' https://vercel.live/fonts;
                script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval' https://vercel.live/;
                connect-src 'self' https://vercel.live/ https://vitals.vercel-insights.com https://*.pusher.com/ wss://*.pusher.com/;
                img-src 'self' data: https://vercel.com/ https://vercel.live/;
                frame-src 'self' https://vercel.live/;
            `
        }

        // for dev environment enable unsafe-eval for hot-reload
        return `
            ${defaultCSPDirectives}
            font-src 'self' https://fonts.gstatic.com;
            style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
            script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com;
            connect-src 'self';
            img-src 'self' data:;
            frame-src 'none';
        `

    }

    // security headers for preview & production
    const extraSecurityHeaders = []

    if (!isDev) {
        extraSecurityHeaders.push(
            {
                key: 'Strict-Transport-Security',
                value: 'max-age=31536000', // 1 year
            },
        )
    }

    const headers = [
        ...extraSecurityHeaders,
        {
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            key: cspReportOnly ? 'Content-Security-Policy-Report-Only' : 'Content-Security-Policy',
            value: cspHeader().replace(/\n/g, ''),
        },
        // reporting API v0
        /*{
            key: 'Report-To',
            value: `{"group":"default","max_age":10886400,"endpoints":[{"url":"${reportUrl}"}],"include_subdomains":true}`,
        },*/
        // reporting API v1
        /*{
            key: 'Reporting-Endpoints',
            value: `default="${reportUrl}"`,
        },*/
        {
            key: 'Referrer-Policy',
            value: 'same-origin',
        },
        {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
        },
        {
            key: 'X-Frame-Options',
            value: 'DENY'
        },
    ]

    return headers

}

export default nextConfig