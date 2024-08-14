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
        'LICENSE',
        // by default we always ignore our tests folder
        // to ensure the tests dont trigger errors in
        // staging / production deployments
        // comment out the next line to have eslint check
        // the test files (in development)
        'tests/eslint/',
    ],
    reportUnusedDisableDirectives: true,
    overrides: [
        {
            files: ['**/*.ts?(x)', '**/*.md?(x)'],
            extends: [
                'next/core-web-vitals',
            ],
        },
        {
            files: ['**/*.ts?(x)'],
            extends: [
                'plugin:@react-three/recommended',
                // https://typescript-eslint.io/users/configs#recommended-configurations
                'plugin:@typescript-eslint/recommended-type-checked',
                'plugin:@typescript-eslint/stylistic-type-checked',
            ],
            parser: '@typescript-eslint/parser',
            parserOptions: {
                sourceType: 'module',
                ecmaFeatures: {
                    jsx: true,
                },
                warnOnUnsupportedTypeScriptVersion: true,
                project: './tsconfig.json',
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
                '@typescript-eslint/consistent-indexed-object-style': 'off',
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