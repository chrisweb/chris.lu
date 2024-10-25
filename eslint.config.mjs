import globals from "globals";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import parser from "eslint-mdx";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: [
        "**/node_modules/",
        "**/.next/",
        "**/.vscode/",
        "**/public/",
        "**/LICENSE",
        "tests/eslint/",
    ],
}, {
    linterOptions: {
        reportUnusedDisableDirectives: true,
    },

    languageOptions: {
        globals: {
            ...globals.browser,
            ...globals.node,
        },

        ecmaVersion: "latest",
        sourceType: "module",
    },
}, ...compat.extends("next/core-web-vitals").map(config => ({
    ...config,
    files: ["**/*.ts?(x)", "**/*.md?(x)"],
})), ...compat.extends(
    "plugin:@react-three/recommended",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
).map(config => ({
    ...config,
    files: ["**/*.ts?(x)"],
})), {
    files: ["**/*.ts?(x)"],

    plugins: {
        "@typescript-eslint": typescriptEslint,
    },

    languageOptions: {
        parser: tsParser,
        ecmaVersion: 5,
        sourceType: "module",

        parserOptions: {
            ecmaFeatures: {
                jsx: true,
            },

            warnOnUnsupportedTypeScriptVersion: true,
            project: "./tsconfig.json",
        },
    },

    rules: {
        quotes: ["error", "single", {
            allowTemplateLiterals: true,
        }],

        semi: ["error", "never"],

        "@typescript-eslint/naming-convention": ["error", {
            selector: "interface",
            format: ["PascalCase"],

            custom: {
                regex: "^I[A-Z]",
                match: true,
            },
        }],

        "@typescript-eslint/consistent-indexed-object-style": "off",

        "@typescript-eslint/ban-ts-comment": ["error", {
            "ts-expect-error": "allow-with-description",
            "ts-ignore": "allow-with-description",
            "ts-nocheck": false,
            "ts-check": false,
            minimumDescriptionLength: 3,
        }],
    },
}, ...compat.extends("plugin:mdx/recommended").map(config => ({
    ...config,
    files: ["**/*.md?(x)"],
})), {
    files: ["**/*.md?(x)"],

    languageOptions: {
        parser: parser,
        ecmaVersion: 5,
        sourceType: "script",

        parserOptions: {
            markdownExtensions: ["*.md, *.mdx"],
        },
    },

    settings: {
        "mdx/code-blocks": false,
        "mdx/remark": true,
    },

    rules: {
        "react/no-unescaped-entities": 0,
    },
}];