import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'
import importX from 'eslint-plugin-import-x'
import * as mdx from 'eslint-plugin-mdx'
import react from 'eslint-plugin-react'
import tseslint, { configs as tseslintConfigs } from 'typescript-eslint'
import reactHooks from 'eslint-plugin-react-hooks'
import jsxA11y from 'eslint-plugin-jsx-a11y'

const compat = new FlatCompat()

// when using eslint-config-next it becomes complicated
// to exclude MDX files from setup it does
// to avoid getting "parsing error: Invalid character"
/*const compatNextESLintConfig = [
    ...compat.extends('next/core-web-vitals'),
]*/
// so instead we use the same ESLint compat package
// but only include the eslint-plugin-next
const compatNextESLintPlugin = compat.config({
    extends: [
        // will get applied to all files
        // https://github.com/vercel/next.js/discussions/49337
        'plugin:@next/eslint-plugin-next/core-web-vitals',
    ],
})

const tsESLintConfig = tseslint.config(
    {
        name: 'tsESLintConfig',
        // as we did not use eslint-config-next we will now
        // manually add the packages it would have added
        extends: [
            //...tseslint.configs.recommended,
            // OR more type checked rules
            //...tseslint.configs.recommendedTypeChecked,
            // OR more strict rules
            //...tseslint.configs.strict,
            // OR more strict and type checked rules
            ...tseslintConfigs.strictTypeChecked,
            // optional stylistic rules
            //...tseslint.configs.stylistic,
            // OR the type checked version
            ...tseslintConfigs.stylisticTypeChecked,
            react.configs.flat.recommended,
            react.configs.flat['jsx-runtime'],
            jsxA11y.flatConfigs.recommended,
            importX.flatConfigs.recommended,
            // the following is only needed if you use typescript
            importX.flatConfigs.typescript,
        ],
        files: ['**/*.mjs', '**/*.ts?(x)'],
        // only needed if you use TypeChecked rules
        languageOptions: {
            parserOptions: {
                // https://typescript-eslint.io/getting-started/typed-linting
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
                // react recommended is already adding the ecmaFeatures
                /*ecmaFeatures: {
                    jsx: true,
                },*/
                // following option already added by eslint recommended
                // which we added in the jsESLintConfig
                //warnOnUnsupportedTypeScriptVersion: false,
            },
        },
        plugins: {
            react,
            'react-hooks': reactHooks,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            // rules from eslint-config-next
            'import-x/no-anonymous-default-export': 'warn',
            'react/no-unknown-property': 'off',
            'react/react-in-jsx-scope': 'off',
            'react/prop-types': 'off',
            'jsx-a11y/alt-text': ['warn', { elements: ['img'], img: ['Image'], },],
            'jsx-a11y/aria-props': 'warn',
            'jsx-a11y/aria-proptypes': 'warn',
            'jsx-a11y/aria-unsupported-elements': 'warn',
            'jsx-a11y/role-has-required-aria-props': 'warn',
            'jsx-a11y/role-supports-aria-props': 'warn',
            'react/jsx-no-target-blank': 'off',
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
    },
    {
        // disable type-aware linting on JS files
        // only needed if you use TypeChecked rules
        files: ['**/*.mjs'],
        ...tseslintConfigs.disableTypeChecked,
    },
)

const jsESLintConfig = [
    {
        name: 'jsESLintConfig',
        // all files expect mdx files
        files: ['**/*.mjs', '**/*.ts?(x)'],
        ...js.configs.recommended,
    },
]

const mdxESLintConfig = [
    // https://github.com/mdx-js/eslint-mdx/blob/d6fc093fb32ab58fb226e8cf42ac77399b8a4758/README.md#flat-config
    {
        name: 'mdxFlatESLintConfig',
        files: ['**/*.mdx'],
        ...mdx.flat,
        processor: mdx.createRemarkProcessor({
            // I disabled linting code blocks
            // as I was having performance issues
            lintCodeBlocks: false,
            languageMapper: {},
        }),
    },
    {
        name: 'mdxFlatCodeBlocksESLintConfig',
        files: ['**/*.mdx'],
        ...mdx.flatCodeBlocks,
        rules: {
            ...mdx.flatCodeBlocks.rules,
            'no-var': 'error',
            'prefer-const': 'error',
        },
    },
]

// eslint-disable-next-line import-x/no-anonymous-default-export
export default [
    {
        name: 'ignoreESLintConfig',
        // the ignores option needs to be in a separate configuration object
        // replaces the .eslintignore file
        ignores: [
            '.next/',
            '.vscode/',
            'public/',
        ]
    },
    ...jsESLintConfig,
    ...tsESLintConfig,
    ...mdxESLintConfig,
    ...compatNextESLintPlugin,
]