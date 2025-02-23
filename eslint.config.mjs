import eslintPlugin from '@eslint/js'
import tseslint, { configs as tseslintConfigs } from 'typescript-eslint'
import importPlugin from 'eslint-plugin-import'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y'
import nextPlugin from '@next/eslint-plugin-next'
import stylisticPlugin from '@stylistic/eslint-plugin'
import * as mdxPlugin from 'eslint-plugin-mdx'
import reactCompilerPlugin from 'eslint-plugin-react-compiler'

// currently an mts file until I find types
// for all imported packages

const eslintConfig = [
    {
        name: 'custom/eslint/recommended',
        // all files expect mdx files
        files: ['**/*.mjs', '**/*.ts?(x)'],
        ...eslintPlugin.configs.recommended,
    },
]

const ignoresConfig = [
    {
        name: 'custom/eslint/ignores',
        // the global ignores must be in it's own config object
        ignores: [
            '.next/',
            '.vscode/',
            'public/',
        ]
    },
]

const tseslintConfig = tseslint.config(
    {
        name: 'custom/typescript-eslint/recommended',
        files: ['**/*.mjs', '**/*.ts?(x)'],
        extends: [
            ...tseslintConfigs.strictTypeChecked,
            ...tseslintConfigs.stylisticTypeChecked,
        ],
        // only needed if you use TypeChecked rules
        languageOptions: {
            parserOptions: {
                // https://typescript-eslint.io/getting-started/typed-linting
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
                ecmaFeatures: {
                    jsx: true,
                },
                warnOnUnsupportedTypeScriptVersion: true,
            },
        },
        plugins: {
            '@stylistic': stylisticPlugin,
        },
        rules: {
            '@stylistic/multiline-ternary': ['warn', 'always-multiline', { ignoreJSX: false }],
            /*'@typescript-eslint/naming-convention': [
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
            ],*/
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
        // disable type-aware linting on JS files
        // only needed if you use TypeChecked rules
        files: ['**/*.mjs'],
        ...tseslintConfigs.disableTypeChecked,
        name: 'custom/typescript-eslint/disable-type-checked',
    },
)

const nextConfig = [
    {
        name: 'custom/next/config',
        // no files (option) for this config as we want to apply it to all files
        plugins: {
            'react': reactPlugin,
            'jsx-a11y': jsxA11yPlugin,
            'react-hooks': reactHooksPlugin,
            '@next/next': nextPlugin,
            'import': importPlugin,
        },
        rules: {
            ...reactPlugin.configs.recommended.rules,
            ...reactPlugin.configs['jsx-runtime'].rules,
            ...reactHooksPlugin.configs.recommended.rules,
            ...nextPlugin.configs.recommended.rules,
            // this is the nextjs strict mode
            ...nextPlugin.configs['core-web-vitals'].rules,
            ...importPlugin.configs.recommended.rules,
            //...jsxA11yPlugin.configs.recommended.rules,
            // OR more strict a11y rules
            ...jsxA11yPlugin.configs.strict.rules,
            // rules from eslint-config-next
            'import/no-anonymous-default-export': 'warn',
            'react/no-unknown-property': 'off',
            'react/react-in-jsx-scope': 'off',
            'react/prop-types': 'off',
            'react/jsx-no-target-blank': 'off',
            'jsx-a11y/alt-text': ['warn', { elements: ['img'], img: ['Image'], },],
            'jsx-a11y/media-has-caption': 'warn',
            'jsx-a11y/aria-props': 'warn',
            'jsx-a11y/aria-proptypes': 'warn',
            'jsx-a11y/aria-unsupported-elements': 'warn',
            'jsx-a11y/role-has-required-aria-props': 'warn',
            'jsx-a11y/role-supports-aria-props': 'warn',
        },
        settings: {
            'react': {
                version: 'detect',
            },
            // only needed if you use (eslint-import-resolver-)typescript
            'import/resolver': {
                typescript: {
                    alwaysTryTypes: true
                }
            },
        },
    },
    {
        name: 'custom/next/config-mdx',
        files: ['**/*.mdx'],
        rules: {
            'react/no-unescaped-entities': 'off',
        },
    },
]

const stylisticConfig = [
    {
        name: 'custom/stylistic/recommended',
        files: ['**/*.ts?(x)'],
        // no files for this config as we want to apply it to all files
        plugins: {
            '@stylistic': stylisticPlugin,
        },
        rules: {
            // this removes all legacy rules from eslint, typescript-eslint and react
            ...stylisticPlugin.configs['disable-legacy'].rules,
            // this adds the recommended rules from stylistic
            ...stylisticPlugin.configs['recommended-flat'].rules,
            // custom rules
            // https://github.com/typescript-eslint/typescript-eslint/issues/1824
            '@stylistic/indent': ['warn', 4],
            '@stylistic/quotes': ['warn', 'single', { avoidEscape: true }],
            '@stylistic/semi': ['warn', 'never'],
            '@stylistic/eol-last': 'off',
            '@stylistic/comma-dangle': ['warn', 'only-multiline'],
            '@stylistic/padded-blocks': 'off',
            '@stylistic/spaced-comment': 'off',
            //'@stylistic/jsx-one-expression-per-line': ['warn', { allow: 'single-line' }],
            '@stylistic/jsx-one-expression-per-line': 'off',
            '@stylistic/jsx-indent-props': ['warn', 4],
            '@stylistic/multiline-ternary': ['warn', 'always-multiline', { ignoreJSX: false }],
            '@stylistic/arrow-parens': ['warn', 'as-needed', { "requireForBlockBody": true }],
            '@stylistic/brace-style': ['warn', '1tbs', { allowSingleLine: true }],
            '@stylistic/operator-linebreak': ['warn', 'after'],
            '@stylistic/jsx-wrap-multilines': ['warn', {
                declaration: 'parens-new-line',
                assignment: 'parens-new-line',
                return: 'parens-new-line',
                arrow: 'parens-new-line',
                condition: 'parens-new-line',
                logical: 'parens-new-line',
                prop: 'parens-new-line',
                propertyValue: 'parens-new-line',
            }],
            '@stylistic/jsx-curly-newline': ['warn', {
                multiline: 'consistent',
                singleline: 'forbid',
            }],
            '@stylistic/no-multiple-empty-lines': ['warn'],
            '@stylistic/no-trailing-spaces': ['warn'],
        },
    }
]

const mdxConfig = [
    // https://github.com/mdx-js/eslint-mdx/blob/d6fc093fb32ab58fb226e8cf42ac77399b8a4758/README.md#flat-config
    {
        name: 'custom/mdx/recommended',
        files: ['**/*.mdx'],
        ...mdxPlugin.flat,
        processor: mdxPlugin.createRemarkProcessor({
            // I disabled linting code blocks
            // as I was having performance issues
            lintCodeBlocks: false,
            languageMapper: {},
        }),
    },
    {
        name: 'custom/mdx/code-blocks',
        files: ['**/*.mdx'],
        ...mdxPlugin.flatCodeBlocks,
        rules: {
            ...mdxPlugin.flatCodeBlocks.rules,
            'no-var': 'error',
            'prefer-const': 'error',
        },
    },
]

const reactCompilerConfig = [
    {
        name: 'custom/react-compiler/recommended',
        files: ['**/*.ts?(x)'],
        plugins: {
            'react-compiler': reactCompilerPlugin,
        },
        rules: {
            'react-compiler/react-compiler': 'warn',
        },
    },
]

const config = [
    ...ignoresConfig,
    ...eslintConfig,
    ...tseslintConfig,
    ...nextConfig,
    ...stylisticConfig,
    ...mdxConfig,
    ...reactCompilerConfig,
];

export default config