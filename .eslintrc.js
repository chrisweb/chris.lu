module.exports = {
    root: true,
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    'env': {
        browser: true,
        es2021: true,
        node: true,
    },
    ignorePatterns: [
        'node_modules/',
        '.next/',
        '.vscode/',
        'public/',
    ],
    reportUnusedDisableDirectives: true,
    overrides: [
        {
            files: ['**/*.ts?(x)', '**/*.md?(x)'],
            extends: [
                'eslint:recommended',
                'next/core-web-vitals',
            ],
        },
        {
            files: ['**/*.ts?(x)'],
            extends: [
                'plugin:@typescript-eslint/recommended',
                'plugin:@react-three/recommended',
            ],
            parser: '@typescript-eslint/parser',
            parserOptions: {
                sourceType: 'module',
                ecmaFeatures: {
                    jsx: true,
                },
                warnOnUnsupportedTypeScriptVersion: true,
            },
            plugins: [
                '@typescript-eslint',
            ],
            rules: {
                quotes: [
                    'error',
                    'single',
                    { "allowTemplateLiterals": true },
                ],
                semi: [
                    'error',
                    'never',
                ],
                '@typescript-eslint/naming-convention': [
                    'error',
                    {
                        'selector': 'interface',
                        'format': [
                            'PascalCase',
                        ],
                        'custom': {
                            'regex': '^I[A-Z]',
                            'match': true,
                        },
                    }
                ],
                '@typescript-eslint/ban-ts-comment': [
                    'error',
                    {
                        'ts-expect-error': 'allow-with-description',
                        'ts-ignore': 'allow-with-description',
                        'ts-nocheck': false,
                        'ts-check': false,
                        minimumDescriptionLength: 3,
                    },
                ],
            },
        },
        {
            files: ['**/*.md?(x)'],
            extends: [
                'plugin:mdx/recommended',
            ],
            parser: 'eslint-mdx',
            parserOptions: {
                markdownExtensions: ['*.md, *.mdx'],
            },
            settings: {
                'mdx/code-blocks': false,
                'mdx/remark': true,
            },
            rules: {
                'react/no-unescaped-entities': 0,
            }
            // markdown rules get configured in remarkrc.mjs
        },
    ],
}