// eslint.config.mjs
import { defineConfig } from 'eslint/config'
import eslintPlugin from '@eslint/js'
import { configs as tseslintConfigs } from 'typescript-eslint'
import reactPlugin from '@eslint-react/eslint-plugin'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import nextPlugin from '@next/eslint-plugin-next'
import stylisticPlugin from '@stylistic/eslint-plugin'
import * as mdxPlugin from 'eslint-plugin-mdx'

// Global ignores configuration
// Must be in its own config object to act as global ignores
const ignoresConfig = defineConfig([
    {
        name: 'project/ignores',
        ignores: [
            '.next/',
            'node_modules/',
            'public/',
            '.vscode/',
            'next-env.d.ts',
        ]
    },
])

// ESLint recommended rules for JavaScript/TypeScript
const eslintConfig = defineConfig([
    {
        name: 'project/javascript-recommended',
        files: ['**/*.{js,mjs,ts,tsx}'],
        ...eslintPlugin.configs.recommended,
    },
])

// TypeScript configuration with type-checked rules
const typescriptConfig = defineConfig([
    {
        name: 'project/typescript-strict',
        files: ['**/*.{ts,tsx,mjs}'],
        extends: [
            ...tseslintConfigs.strictTypeChecked,
            ...tseslintConfigs.stylisticTypeChecked,
        ],
        languageOptions: {
            parserOptions: {
                // Automatically detects tsconfig.json
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
                ecmaFeatures: {
                    jsx: true,
                },
                warnOnUnsupportedTypeScriptVersion: true,
            },
        },
        rules: {
            // Disable rules that conflict with TypeScript's own error checking
            '@typescript-eslint/no-unsafe-call': 'off',
            '@typescript-eslint/triple-slash-reference': 'off',
            // disabled next rule due to bug:
            // https://github.com/typescript-eslint/typescript-eslint/issues/11732
            // https://github.com/eslint/eslint/issues/20272
            '@typescript-eslint/unified-signatures': 'off',
            // Allow ts-expect-error and ts-ignore with descriptions
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
        name: 'project/javascript-disable-type-check',
        files: ['**/*.{js,mjs,cjs}'],
        ...tseslintConfigs.disableTypeChecked,
    }
])

// React and Next.js configuration
const reactConfig = defineConfig([
    {
        name: 'project/react-next',
        files: ['**/*.{jsx,tsx}'],
        // @eslint-react/eslint-plugin v5 exposes flat configs that bundle the plugin and its rules
        // https://eslint-react.xyz/docs/presets
        extends: [
            reactPlugin.configs['recommended-typescript'],
        ],
        plugins: {
            'react-hooks': reactHooksPlugin,
            '@next/next': nextPlugin,
        },
        rules: {
            // React Hooks rules (use recommended-latest for latest features)
            ...reactHooksPlugin.configs['recommended-latest'].rules,
            // downgrade set-state-in-effect from 'error' (in recommended-latest) to 'warn'
            'react-hooks/set-state-in-effect': 'warn',
            // Next.js recommended rules
            ...nextPlugin.configs.recommended.rules,
            // Next.js Core Web Vitals rules
            ...nextPlugin.configs['core-web-vitals'].rules,
        },
    }
])

// Code style and formatting configuration
const stylisticConfig = defineConfig([
    {
        name: 'project/stylistic',
        files: ['**/*.{js,mjs,ts,tsx}'],
        plugins: {
            '@stylistic': stylisticPlugin,
        },
        rules: {
            // Remove legacy formatting rules from ESLint/TypeScript ESLint
            ...stylisticPlugin.configs['disable-legacy'].rules,
            // Add recommended stylistic rules as base
            ...stylisticPlugin.configs.recommended.rules,

            // Custom style preferences (adjust to your team's preferences)
            '@stylistic/indent': ['warn', 4],
            '@stylistic/indent-binary-ops': ['warn', 4],
            '@stylistic/quotes': ['warn', 'single', {
                avoidEscape: true,
                allowTemplateLiterals: 'always'
            }],
            '@stylistic/jsx-quotes': ['warn', 'prefer-double'],
            '@stylistic/semi': ['warn', 'never'],
            '@stylistic/comma-dangle': ['warn', 'only-multiline'],
            '@stylistic/arrow-parens': ['warn', 'as-needed', {
                requireForBlockBody: true
            }],
            '@stylistic/brace-style': ['warn', '1tbs', {
                allowSingleLine: true
            }],
            '@stylistic/operator-linebreak': ['warn', 'before'],

            // JSX-specific style rules
            '@stylistic/jsx-indent-props': ['warn', 4],
            '@stylistic/jsx-one-expression-per-line': 'off', // Too strict
            '@stylistic/jsx-wrap-multilines': ['warn', {
                declaration: 'parens-new-line',
                assignment: 'parens-new-line',
                return: 'parens-new-line',
                arrow: 'parens-new-line',
                condition: 'parens-new-line',
                logical: 'parens-new-line',
                prop: 'parens-new-line',
            }],
            '@stylistic/jsx-curly-newline': ['warn', {
                multiline: 'consistent',
                singleline: 'forbid',
            }],

            // Additional formatting preferences
            '@stylistic/eol-last': 'off',
            '@stylistic/padded-blocks': 'off',
            '@stylistic/spaced-comment': 'off',
            '@stylistic/multiline-ternary': 'off', // Conflicts with JSX
            '@stylistic/no-multiple-empty-lines': ['warn'],
            '@stylistic/no-trailing-spaces': ['warn'],
        },
    }
])

// MDX configuration
const mdxConfig = defineConfig([
    {
        name: 'project/mdx-files',
        files: ['**/*.mdx'],
        ...mdxPlugin.flat,
        processor: mdxPlugin.createRemarkProcessor({
            // Disable linting code blocks for better performance
            lintCodeBlocks: false,
            languageMapper: {},
        }),
    },
    {
        name: 'project/mdx-code-blocks',
        files: ['**/*.mdx'],
        ...mdxPlugin.flatCodeBlocks,
        rules: {
            ...mdxPlugin.flatCodeBlocks.rules,
            'no-var': 'error',
            'prefer-const': 'error',
        },
    },
])

// Export the complete configuration
// Order matters: ignores first, then general configs, then specific overrides
export default defineConfig([
    ...ignoresConfig,
    ...eslintConfig,
    ...typescriptConfig,
    ...reactConfig,
    ...stylisticConfig,
    ...mdxConfig,
])
