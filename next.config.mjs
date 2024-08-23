import { withSentryConfig } from '@sentry/nextjs'
// uncomment the following lines if you want to use the bundle analyzer
//import WithBundleAnalyzer from '@next/bundle-analyzer'
import { PHASE_DEVELOPMENT_SERVER } from 'next/constants.js'

/**
 * @typedef {import('rehype-github-alerts').IOptions} IOptions
 * @typedef {import('rehype-github-alerts').DefaultBuildType} DefaultBuildType
 */

import createMdx from '@next/mdx'
import rehypePrettyCode from 'rehype-pretty-code'
import { remarkTableOfContents } from 'remark-table-of-contents'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import { fromHtmlIsomorphic } from 'hast-util-from-html-isomorphic'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import { rehypeGithubAlerts } from 'rehype-github-alerts'
import rehypeMDXImportMedia from 'rehype-mdx-import-media'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'

const nextConfig = (phase) => {

    // to use the bundle analyzer uncomment the following lines
    // then uncomment the return to use withBundleAnalyzer
    /*const withBundleAnalyzer = WithBundleAnalyzer({
        enabled: phase === PHASE_DEVELOPMENT_SERVER ? true : false,
        openAnalyzer: false,
    })*/

    // https://rehype-pretty-code.netlify.app/
    /** @type {import('rehype-pretty-code').Options} */
    const rehypePrettyCodeOptions = {
        // VSCode "SynthWave '84" theme
        theme: 'synthwave-84',
        // Keep the background or use a custom background color?
        keepBackground: true,
        tokensMap: {
            'function': 'entity.name.function',
            'string': 'string',
            'key': '.meta.object-literal.key',
        },
        defaultLang: {
            block: 'tsx',
            inline: 'shell',
        },
    }

    // https://github.com/chrisweb/remark-table-of-contents#options
    /** @type {import('remark-table-of-contents').IRemarkTableOfContentsOptions} */
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
        behavior: 'append',
        properties: (node) => {
            //console.log(node)
            return {
                class: 'headingAnchor',
                'aria-label': 'Heading permalink for: ' + node.children[0].value,
                title: 'Heading permalink for: ' + node.children[0].value,
            }
        },
        content: fromHtmlIsomorphic(
            '<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 24 24" class="icon iconLink" aria-hidden="true"><path d="M11 17H7q-2.075 0-3.537-1.463Q2 14.075 2 12t1.463-3.538Q4.925 7 7 7h4v2H7q-1.25 0-2.125.875T4 12q0 1.25.875 2.125T7 15h4Zm-3-4v-2h8v2Zm5 4v-2h4q1.25 0 2.125-.875T20 12q0-1.25-.875-2.125T17 9h-4V7h4q2.075 0 3.538 1.462Q22 9.925 22 12q0 2.075-1.462 3.537Q19.075 17 17 17Z"/></svg>',
            { fragment: true }
        ).children,
    }

    // https://github.com/remarkjs/remark-gfm
    /** @type {import('remark-gfm').Options} */
    const remarkGfmOptions = {
        singleTilde: false,
    }

    // https://github.com/chrisweb/rehype-github-alerts
    /** @type { DefaultBuildType } */
    const myGithubAlertBuild = (alertOptions, originalChildren) => {

        const alert = {
            type: 'element',
            tagName: 'div',
            properties: {
                className: [
                    'markdown-alert',
                    `markdown-alert-${alertOptions.keyword.toLowerCase()}`,
                ],
            },
            children: [
                {
                    type: 'element',
                    tagName: 'div',
                    properties: {
                        className: [
                            'makrdown-alert-fake-border',
                        ],
                    },
                    children: [
                        {
                            type: 'element',
                            tagName: 'div',
                            properties: {
                                className: [
                                    'markdown-alert-header'
                                ]
                            },
                            children: [
                                {
                                    type: 'text',
                                    value: alertOptions.title
                                }
                            ],
                        },
                        {
                            type: 'element',
                            tagName: 'div',
                            properties: {
                                className: [
                                    'markdown-alert-body'
                                ]
                            },
                            children: [
                                ...originalChildren
                            ],
                        },
                    ],
                },
            ],
        }

        return alert

    }

    /** @type { IOptions } */
    const rehypeGithubAlertsOptions = {
        supportLegacy: false,
        build: myGithubAlertBuild,
        alerts: [
            {
                keyword: 'NOTE',
                icon: '',
                color: '',
                title: 'Note',
            },
            {
                keyword: 'TIP',
                icon: '',
                color: '',
                title: 'Tip',
            },
            {
                keyword: 'MORE',
                icon: '',
                color: '',
                title: 'Read more',
            },
            {
                keyword: 'WARN',
                icon: '',
                color: '',
                title: 'Warning',
            },
        ],
    }

    const withMDX = createMdx({
        options: {
            remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter, [remarkTableOfContents, remarkTableOfContentsOptions], [remarkGfm, remarkGfmOptions]],
            rehypePlugins: [[rehypePrettyCode, rehypePrettyCodeOptions], rehypeSlug, rehypeMDXImportMedia, [rehypeAutolinkHeadings, rehypeAutolinkHeadingsOptions], [rehypeGithubAlerts, rehypeGithubAlertsOptions]],
        },
    })

    /** @type {import('next').NextConfig} */
    const nextConfigOptions = {
        reactStrictMode: true,
        poweredByHeader: false,
        experimental: {
            // experimental use rust compiler for MDX
            // as of now (07.10.2023) there is no support for rehype plugins
            // this is why it is currently disabled
            // https://nextjs.org/docs/app/api-reference/next-config-js/mdxRs
            mdxRs: false,
            // experimental partial prerendering
            // (as of now) need a canary next.js for this to work
            // https://nextjs.org/docs/messages/ppr-preview
            ppr: false,
            // experimental typescript "statically typed links"
            // https://nextjs.org/docs/app/api-reference/next-config-js/typedRoutes
            // currently false in prod until Issue #62335 is fixed
            // https://github.com/vercel/next.js/issues/62335
            typedRoutes: phase === PHASE_DEVELOPMENT_SERVER ? true : false,
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
        },
        // TODO: is this needed for app directory
        // Configure pageExtensions to include md and mdx
        pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'mdx'],
        // disable linting during builds using "next lint"
        // we have manually added our lint script in package.json to the build command
        eslint: {
            ignoreDuringBuilds: true,
        },
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
            ];
        },
        redirects: async () => {
            return [
                {
                    source: '/myprojects',
                    destination: '/web_development',
                    permanent: true,
                },
            ]
        },
    }

    return withMDX(nextConfigOptions)
    //return withBundleAnalyzer(withMDX(nextConfigOptions))

}

const securityHeadersConfig = (phase) => {

    const cspReportOnly = true;

    const reportingUrl = 'https://o4504017992482816.ingest.us.sentry.io/api/4506763918770176/security/?sentry_key=daf0befe66519725bbe2ad707a11bbb3'

    const reportingDomainWildcard = 'https://*.ingest.us.sentry.io'

    const cspHeader = () => {

        const upgradeInsecure = (phase !== PHASE_DEVELOPMENT_SERVER && !cspReportOnly) ? 'upgrade-insecure-requests;' : ''

        // report directive to be added at the end
        // with Reporting API fallback
        /*const reportCSPViolations = `
            report-uri ${reportingUrl};
            report-to default
        `*/

        // reporting uri (CSP v1)
        const reportCSPViolations = `report-uri ${reportingUrl};`

        // worker-src is for sentry replay
        // child-src is because safari <= 15.4 does not support worker-src
        const defaultCSPDirectives = `
            default-src 'none';
            media-src 'self';
            object-src 'none';
            worker-src 'self' blob:;
            child-src 'self' blob:;
            manifest-src 'self';
            base-uri 'none';
            form-action 'none';
            frame-ancestors 'none';
            ${upgradeInsecure}
        `

        // I wanted to add:
        // require-trusted-types-for 'script';
        // unfortunatly because of fontawesome this is not possible (yet)
        // https://github.com/FortAwesome/Font-Awesome/issues/20001

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
                script-src 'self' 'unsafe-inline' https://vercel.live/;
                connect-src 'self' https://vercel.live/ https://vitals.vercel-insights.com https://*.pusher.com/ wss://*.pusher.com/ ${reportingDomainWildcard};
                img-src 'self' data: https://vercel.com/ https://vercel.live/;
                frame-src 'self' https://vercel.live/;
                ${reportCSPViolations}
            `
        }

        // for production environment white-list vitals.vercel-insights
        // based on: https://vercel.com/docs/speed-insights#content-security-policy
        if (process.env.VERCEL_ENV === 'production') {
            return `
                ${defaultCSPDirectives}
                font-src 'self';
                style-src 'self' 'unsafe-inline';
                script-src 'self' 'unsafe-inline';
                connect-src 'self' https://vitals.vercel-insights.com ${reportingDomainWildcard};
                img-src 'self' data:;
                frame-src 'none';
                ${reportCSPViolations}
            `
        }

        // for dev environment enable unsafe-eval for hot-reload
        return `
            ${defaultCSPDirectives}
            font-src 'self';
            style-src 'self' 'unsafe-inline';
            script-src 'self' 'unsafe-inline' 'unsafe-eval';
            connect-src 'self';
            img-src 'self' data:;
            frame-src 'none';
        `

    }

    // security headers for preview & production
    const extraSecurityHeaders = []

    if (phase !== PHASE_DEVELOPMENT_SERVER) {
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

export default withSentryConfig(
    nextConfig,
    {
        // For all available options, see:
        // https://github.com/getsentry/sentry-webpack-plugin#options

        telemetry: false,

        org: "chrisweb",
        project: "javascript-nextjs",

        // Only print logs for uploading source maps in CI
        silent: !process.env.CI,

        // For all available options, see:
        // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

        // Upload a larger set of source maps for prettier stack traces (increases build time)
        widenClientFileUpload: true,

        // Automatically annotate React components to show their full name in breadcrumbs and session replay
        reactComponentAnnotation: {
            enabled: false,
        },

        // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
        // This can increase your server load as well as your hosting bill.
        // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
        // side errors will fail.
        tunnelRoute: "/monitoring",

        // Hides source maps from generated client bundles
        hideSourceMaps: true,

        // Automatically tree-shake Sentry logger statements to reduce bundle size
        disableLogger: true,

        // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
        // See the following for more information:
        // https://docs.sentry.io/product/crons/
        // https://vercel.com/docs/cron-jobs
        automaticVercelMonitors: true,
    }
)