module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: [
        'react',
        '@typescript-eslint',
    ],
    rules: {
        // Indentation BUG: https://github.com/eslint/eslint/issues/16385
        /*
        indent: [
            'error',
            4,
        ],*/
        quotes: [
            'error',
            'single',
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
    },
    overrides: [
        {
            files: ['app/**/*.ts, app/**/*.tsx, components/**/*.ts, components/**/*.tsx, lib/**/*.ts, lib/**/*.tsx'],
            extends: [
                'eslint:recommended',
                'plugin:react/recommended',
                'plugin:@typescript-eslint/recommended',
                'next/core-web-vitals',
            ],
        },
        {
            files: ['app/**/*.mdx, *.md'],
            extends: 'plugin:mdx/recommended',
            settings: {
                'mdx/code-blocks': true,
            },
            parser: 'eslint-mdx',
        },
    ],
}
