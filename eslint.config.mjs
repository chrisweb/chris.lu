import eslintPlugin from '@eslint/js'
import { configs as tseslintConfigs } from 'typescript-eslint'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y'
import nextPlugin from '@next/eslint-plugin-next'
import stylisticPlugin from '@stylistic/eslint-plugin'
import tailwindcssPlugin from 'eslint-plugin-tailwindcss'
import reactCompilerPlugin from 'eslint-plugin-react-compiler'
import { defineConfig } from 'eslint/config'
import * as mdxPlugin from 'eslint-plugin-mdx'

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
            'components/ui/',
            'next-env.d.ts',
        ]
    },
]

const tseslintConfig = defineConfig(
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
            // this is an import rule, but it is off because typescript already displays errors
            // the typescript error will highlight the exact error
            '@typescript-eslint/no-unsafe-call': 'off',
            '@typescript-eslint/triple-slash-reference': 'off',
            // disabled next rule due to bug:
            // https://github.com/typescript-eslint/typescript-eslint/issues/11732
            // https://github.com/eslint/eslint/issues/20272
            '@typescript-eslint/unified-signatures': 'off',
            '@typescript-eslint/ban-ts-comment': [
                'error',
                {
                    'ts-expect-error': 'allow-with-description',
                    'ts-ignore': 'allow-with-description',
                    'ts-nocheck': false,
                    'ts-check': false,
                    'minimumDescriptionLength': 3,
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

const nextConfig = defineConfig(
    {
        name: 'custom/next/config',
        // no files (option) for this config as we want to apply it to all files
        plugins: {
            'react': reactPlugin,
            'jsx-a11y': jsxA11yPlugin,
            '@next/next': nextPlugin,
            // commented out for now, because when i create a new file, the import plugin says it doesn't exist until I restart the linting server
            //'import': importPlugin,
        },
        rules: {
            ...reactPlugin.configs.recommended.rules,
            ...reactPlugin.configs['jsx-runtime'].rules,
            ...nextPlugin.configs.recommended.rules,
            // this is the nextjs strict mode
            ...nextPlugin.configs['core-web-vitals'].rules,
            //...importPlugin.configs.recommended.rules,
            //...jsxA11yPlugin.configs.recommended.rules,
            // OR more strict a11y rules
            ...jsxA11yPlugin.configs.strict.rules,
            // rules from eslint-config-next
            //'import/no-anonymous-default-export': 'warn',
            'react/no-unknown-property': 'off',
            'react/react-in-jsx-scope': 'off',
            'react/prop-types': 'off',
            'react/jsx-no-target-blank': 'off',
            'jsx-a11y/alt-text': ['warn', { elements: ['img'], img: ['Image'] }],
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
)

const stylisticConfig = defineConfig(
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
            ...stylisticPlugin.configs['recommended'].rules,
            // custom rules
            // https://github.com/typescript-eslint/typescript-eslint/issues/1824
            '@stylistic/indent': ['warn', 4],
            '@stylistic/indent-binary-ops': ['warn', 4],
            '@stylistic/quotes': ['warn', 'single', { avoidEscape: true, allowTemplateLiterals: 'always' }],
            '@stylistic/jsx-quotes': ['warn', 'prefer-double'],
            '@stylistic/semi': ['warn', 'never'],
            '@stylistic/eol-last': 'off',
            '@stylistic/comma-dangle': ['warn', 'only-multiline'],
            '@stylistic/padded-blocks': 'off',
            '@stylistic/spaced-comment': 'off',
            //'@stylistic/jsx-one-expression-per-line': ['warn', { allow: 'single-line' }],
            '@stylistic/jsx-one-expression-per-line': 'off',
            '@stylistic/jsx-indent-props': ['warn', 4],
            //'@stylistic/multiline-ternary': ['warn', 'always-multiline', { ignoreJSX: true }],
            // disabled "multiline-ternary" because "ignoreJSX" does not work
            '@stylistic/multiline-ternary': 'off',
            '@stylistic/arrow-parens': ['warn', 'as-needed', { requireForBlockBody: true }],
            '@stylistic/brace-style': ['warn', '1tbs', { allowSingleLine: true }],
            '@stylistic/operator-linebreak': ['warn', 'before'],
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
)

const tailwindcssConfig = defineConfig(
    {
        name: 'custom/tailwindcss/recommended',
        files: ['**/*.ts?(x)'],
        plugins: {
            'tailwindcss': tailwindcssPlugin,
        },
        rules: {
            // Basic rules that don't require config resolution
            'tailwindcss/classnames-order': 'warn',
            'tailwindcss/enforces-negative-arbitrary-values': 'warn',
            'tailwindcss/enforces-shorthand': 'warn',
            'tailwindcss/no-contradicting-classname': 'warn',
            'tailwindcss/no-unnecessary-arbitrary-value': 'warn',
            'tailwindcss/no-custom-classname': 'off',
            'tailwindcss/migration-from-tailwind-2': 'off',
        },
        settings: {
            tailwindcss: {
                config: `${import.meta.dirname}/app/globals.css`,
                cssFiles: [
                    'app/**/*.css',
                    'components/**/*.css',
                ],
            },
        },
    },
)

const mdxConfig = defineConfig(
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
)

const reactHookConfig = defineConfig(
    {
        // https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks
        name: 'custom/react-hook/recommended',
        files: ['**/*.ts?(x)'],
        plugins: {
            'react-hooks': reactHooksPlugin,
        },
        rules: {
            ...reactHooksPlugin.configs['recommended-latest'].rules
        },
    }
)

const reactCompilerConfig = defineConfig(
   {
       name: 'custom/react-compiler/recommended',
       files: ['**/*.ts?(x)'],
       plugins: {
           'react-compiler': reactCompilerPlugin,
       },
       rules: {
           ...reactCompilerPlugin.configs.recommended.rules
       },
   },
)

const config = [
    ...ignoresConfig,
    ...eslintConfig,
    ...tseslintConfig,
    ...nextConfig,
    ...stylisticConfig,
    ...tailwindcssConfig,
    ...mdxConfig,
    ...reactHookConfig,
    ...reactCompilerConfig,
]

export default config
