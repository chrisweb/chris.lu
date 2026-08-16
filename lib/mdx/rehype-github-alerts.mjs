// wrapper module for the MDX pipeline (see next.config.ts): Turbopack passes
// plugin configs to the MDX loader as JSON, so options containing JS functions
// (here the custom alert build) must live in a module that gets referenced by
// path instead of being declared inline in the next config
import { rehypeGithubAlerts } from 'rehype-github-alerts'

// https://github.com/chrisweb/rehype-github-alerts
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
                        'markdown-alert-fake-border',
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

// https://github.com/chrisweb/rehype-github-alerts#options
const rehypeGithubAlertsOptions = {
    supportLegacy: false,
    build: myGithubAlertBuild,
    alerts: [
        {
            keyword: 'NOTE',
            icon: '',
            title: 'Note',
        },
        {
            keyword: 'TIP',
            icon: '',
            title: 'Tip',
        },
        {
            keyword: 'MORE',
            icon: '',
            title: 'Read more',
        },
        {
            keyword: 'WARN',
            icon: '',
            title: 'Warning',
        },
    ],
}

// a unified "plugin tuple": [plugin, options]
export default [rehypeGithubAlerts, rehypeGithubAlertsOptions]
