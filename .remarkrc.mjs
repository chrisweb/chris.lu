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
        // https://www.npmjs.com/package/remark-lint-maximum-line-length
        ['remark-lint-maximum-line-length', false],
        // https://www.npmjs.com/package/remark-lint-list-item-spacing
        ['remark-lint-list-item-spacing', false],
        // https://www.npmjs.com/package/remark-lint-maximum-heading-length
        ['remark-lint-maximum-heading-length', [1, 48]],

        //remarkGfm,
        //remarkGithub,
        //remarkFrontmatter,
    ]
}

export default config