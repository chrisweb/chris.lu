import remarkPresetLintRecommended from 'remark-preset-lint-consistent'
import remarkPresetLintConsistent from 'remark-preset-lint-recommended'
import remarkPresetLintMarkdownStyleGuide from 'remark-preset-lint-markdown-style-guide'
//import remarkGfm from 'remark-gfm'
//import remarkGithub from 'remark-github'
//import remarkFrontmatter from 'remark-frontmatter'

const config = {
    plugins: [
        remarkPresetLintRecommended,
        remarkPresetLintConsistent,
        remarkPresetLintMarkdownStyleGuide,
        // full list of rules packages
        // https://github.com/remarkjs/remark-lint/tree/main/packages
        //
        // https://www.npmjs.com/package/remark-lint-maximum-line-length
        ['remark-lint-maximum-line-length', false],
        // https://www.npmjs.com/package/remark-lint-list-item-spacing
        ['remark-lint-list-item-spacing', false],
        // https://www.npmjs.com/package/remark-lint-maximum-heading-length
        ['remark-lint-maximum-heading-length', [1, 50]],
        // https://www.npmjs.com/package/remark-lint-no-html
        ['remark-lint-no-html', true],

        //remarkGfm,
        //remarkGithub,
        //remarkFrontmatter,
    ]
}

export default config