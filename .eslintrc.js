module.exports = {
    root: true,
    'env': {
        es2021: true,
        node: true,
        browser: true,
    },
    ignorePatterns: [
        'node_modules/',
        '.next/',
        '.vscode/',
        'public/',
        'tests/',
    ],
    reportUnusedDisableDirectives: true,
    overrides: [
        {
            files: ['**/*.ts?(x)'],
            extends: [
                'eslint:recommended',
                'plugin:@typescript-eslint/recommended',
                'plugin:react/recommended',
                'plugin:react-hooks/recommended',
                'plugin:@react-three/recommended',
                'plugin:@next/next/core-web-vitals',
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
                'import',
                'react',
                'jsx-a11y',
                '@typescript-eslint',
                '@react-three',
                '@next/next',
            ],
            rules: {
                // rules copied from the eslint-config-next package
                // https://github.com/vercel/next.js/blob/canary/packages/eslint-config-next/index.js
                'import/no-anonymous-default-export': 'warn',
                'react/no-unknown-property': 'off',
                'react/react-in-jsx-scope': 'off',
                'react/prop-types': 'off',
                'jsx-a11y/alt-text': [
                    'warn',
                    {
                        elements: ['img'],
                        img: ['Image'],
                    },
                ],
                'jsx-a11y/aria-props': 'warn',
                'jsx-a11y/aria-proptypes': 'warn',
                'jsx-a11y/aria-unsupported-elements': 'warn',
                'jsx-a11y/role-has-required-aria-props': 'warn',
                'jsx-a11y/role-supports-aria-props': 'warn',
                'react/jsx-no-target-blank': 'off',
                // our custom rules
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
            settings: {
                react: {
                    version: 'detect',
                },
                'import/parsers': {
                    [require.resolve('@typescript-eslint/parser')]: [
                        '.ts',
                        '.mts',
                        '.cts',
                        '.tsx',
                        '.d.ts',
                    ],
                },
                'import/resolver': {
                    [require.resolve('eslint-import-resolver-node')]: {
                        extensions: ['.js', '.jsx', '.ts', '.tsx'],
                    },
                    [require.resolve('eslint-import-resolver-typescript')]: {
                        alwaysTryTypes: true,
                    },
                },
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
            // rules get configured in remarkrc.mjs
        },
    ],
}