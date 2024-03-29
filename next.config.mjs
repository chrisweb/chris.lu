import { withSentryConfig } from '@sentry/nextjs';
// uncomment the following lines if you want to use the bundle analyzer
//import WithBundleAnalyzer from '@next/bundle-analyzer'
import { PHASE_DEVELOPMENT_SERVER } from 'next/constants.js'

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
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import { rehypeGithubAlerts } from 'rehype-github-alerts'
import remarkMdxImages from 'remark-mdx-images'
import remarkUnwrapImages from 'remark-unwrap-images'

/*const ContentSecurityPolicy = `
  default-src 'self';
`*/

const nextConfig = (phase) => {

    // to use the bundle analyzer uncomment the following lines
    // then uncomment the return to use withBundleAnalyzer
    /*const withBundleAnalyzer = WithBundleAnalyzer({
        enabled: phase === PHASE_DEVELOPMENT_SERVER ? true : false,
        openAnalyzer: false,
    })*/

    const themeJsonPath = new URL('./node_modules/synthwave-vscode/themes/synthwave-color-theme.json', import.meta.url)

    // get the json theme
    const themeJsonContent = readFileSync(themeJsonPath, 'utf-8')

    // fix errors in the json
    const themeJsonContentFixed = jsonrepair(themeJsonContent)

    // https://rehype-pretty-code.netlify.app/
    /** @type {import('rehype-pretty-code').Options} */
    const rehypePrettyCodeOptions = {
        // VSCode "SynthWave '84" theme
        theme: JSON.parse(themeJsonContentFixed),
        // Keep the background or use a custom background color?
        keepBackground: true,
        tokensMap: {
            'function': 'entity.name.function',
            'string': '.constant.numeric.decimal.js',
            'key': '.meta.object-literal.key',
        },
        defaultLang: {
            block: "tsx",
            inline: "shell",
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
        /*behavior: 'wrap',
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
        }*/
        properties: {
            class: 'headingAnchor',
        },
        content: fromHtmlIsomorphic(
            '<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 24 24" class="icon iconLink"><path d="M11 17H7q-2.075 0-3.537-1.463Q2 14.075 2 12t1.463-3.538Q4.925 7 7 7h4v2H7q-1.25 0-2.125.875T4 12q0 1.25.875 2.125T7 15h4Zm-3-4v-2h8v2Zm5 4v-2h4q1.25 0 2.125-.875T20 12q0-1.25-.875-2.125T17 9h-4V7h4q2.075 0 3.538 1.462Q22 9.925 22 12q0 2.075-1.462 3.537Q19.075 17 17 17Z"/></svg>',
            { fragment: true }
        ).children,
    }

    // https://github.com/remarkjs/remark-gfm
    // If you use remark-gfm, you'll need to use next.config.mjs
    // as the package is ESM only
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
        extension: /\.mdx?$/,
        options: {
            remarkPlugins: [remarkUnwrapImages, remarkMdxImages, [remarkTableOfContents, remarkTableOfContentsOptions], [remarkGfm, remarkGfmOptions]],
            rehypePlugins: [[rehypePrettyCode, rehypePrettyCodeOptions], rehypeSlug, [rehypeAutolinkHeadings, rehypeAutolinkHeadingsOptions], [rehypeGithubAlerts, rehypeGithubAlertsOptions]],
            // If you use `MDXProvider`, uncomment the following line.
            // providerImportSource: "@mdx-js/react",
        },
    })

    // CSP headers here is set based on Next.js recommendations:
    // https://nextjs.org/docs/app/building-your-application/configuring/content-security-policy
    const cspReportOnly = true;

    //const reportUrl = 'https://o4504017992482816.ingest.sentry.io/api/4506763918770176/security/?sentry_key=daf0befe66519725bbe2ad707a11bbb3'
    const reportUrl = 'https://chrisweb.dev'

    const cspHeader = () => {

        const upgradeInsecure = cspReportOnly ? '' : 'upgrade-insecure-requests;'

        // report directive to be added at the end
        /*const reportCSPViolations = `
            report-uri ${sentryReportUri};
            report-to {"group":"default","max_age":10886400,"endpoints":[{"url":"${sentryReportUri}"}],"include_subdomains":true}
        `*/
        const reportCSPViolations = `
            report-uri ${reportUrl};
            report-to endpoint-sentry
        `
        /*const reportCSPViolations = `
            report-uri ${sentryReportUri};
        `*/

        // worker-src is for sentry replay
        // child-src is because safari <= 15.4 does not support worker-src
        const defaultCSPDirectives = `
            default-src 'none';
            media-src 'self';
            object-src 'none';
            worker-src 'self' blob:;
            child-src 'self' blob:;
            base-uri 'none';
            form-action 'none';
            frame-ancestors 'none';
            block-all-mixed-content;
            ${upgradeInsecure}
        `

        // when environment is preview enable unsafe-inline scripts for vercel preview feedback/comments feature
        // and whitelist vercel's domains based on:
        // https://vercel.com/docs/workflow-collaboration/comments/specialized-usage#using-a-content-security-policy
        // and white-list vitals.vercel-insights
        // based on: https://vercel.com/docs/speed-insights#content-security-policy
        if (process.env?.VERCEL_ENV === 'preview') {
            return `
                ${defaultCSPDirectives}
                font-src 'none';
                style-src 'self' 'unsafe-inline' https://vercel.live/fonts;
                script-src 'self' 'unsafe-inline' https://vercel.live/;
                connect-src 'self' https://vercel.live/ https://vitals.vercel-insights.com https://*.pusher.com/ wss://*.pusher.com/ ${reportUrl};
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
                script-src 'self';
                connect-src 'self' https://vitals.vercel-insights.com ${reportUrl};
                img-src 'self';
                frame-src 'none';
                ${reportCSPViolations}
            `
        }

        // for dev environment enable unsafe-eval for hot-reload
        return `
            ${defaultCSPDirectives}
            font-src 'none';
            style-src 'self' 'unsafe-inline';
            script-src 'self' 'unsafe-eval' 'unsafe-inline';
            connect-src 'self' ${reportUrl};
            img-src 'self' data:;
            frame-src 'none';
            ${reportCSPViolations}
        `

    }

    /** @type {import('next').NextConfig} */
    const nextConfig = {
        experimental: {
            // experimental use rust compiler for MDX
            // as of now (07.10.2023) there is no support for rehype plugins
            // this is why it is currently disabled
            mdxRs: false,
            // experimental partial prerendering
            // (as of now) need a canary next.js for this to work
            ppr: false,
            // experimental typescript "statically typed links"
            // https://nextjs.org/docs/app/building-your-application/configuring/typescript#statically-typed-links
            typedRoutes: phase === PHASE_DEVELOPMENT_SERVER ? true : false,
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
        reactStrictMode: true,
        poweredByHeader: false,
        headers: async () => {
            return [
                {
                    source: '/(.*)',
                    headers: [
                        {
                            key: cspReportOnly ? 'Content-Security-Policy-Report-Only' : 'Content-Security-Policy',
                            value: cspHeader().replace(/\n/g, ''),
                        },
                        /*{
                            key: 'Report-To',
                            value: `{"group":"endpoint-sentry","max_age":10886400,"endpoints":[{"url":"${reportUrl}"}],"include_subdomains":true}`,
                        },*/
                        {
                            key: 'Reporting-Endpoints',
                            value: `endpoint-sentry="${reportUrl}"`,
                        },
                    ],
                },
            ];
        },
    }

    return withMDX(nextConfig)
    //return withBundleAnalyzer(withMDX(nextConfig))

}

export default withSentryConfig(nextConfig, {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options

    // Suppresses source map uploading logs during build
    silent: true,
    org: "chrisweb",
    project: "javascript-nextjs",
}, {
    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Transpiles SDK to be compatible with IE11 (increases bundle size)
    transpileClientSDK: true,

    // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
    tunnelRoute: "/monitoring",

    // Hides source maps from generated client bundles
    hideSourceMaps: true,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,

    // Enables automatic instrumentation of Vercel Cron Monitors.
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,
});