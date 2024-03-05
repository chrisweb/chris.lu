import remarkPresetLintRecommended from 'remark-preset-lint-consistent'
import remarkPresetLintConsistent from 'remark-preset-lint-recommended'
import remarkPresetLintMarkdownStyleGuide from 'remark-preset-lint-markdown-style-guide'
//import remarkGfm from 'remark-gfm'
//import remarkGithub from 'remark-github'
//import remarkFrontmatter from 'remark-frontmatter'

// rules imports
import remarkLintMaximumHeadingLength from 'remark-lint-maximum-heading-length'
import remarkLintUnorderedListMarkerStyle from 'remark-lint-unordered-list-marker-style'
import remarkLintNoUndefinedReferences from 'remark-lint-no-undefined-references'
import remarkLintLinkTitleStyle from 'remark-lint-link-title-style'
import remarkLintMaximumLineLength from 'remark-lint-maximum-line-length'
import remarkLintListItemSpacing from 'remark-lint-list-item-spacing'

const config = {
    plugins: [
        remarkPresetLintRecommended,
        remarkPresetLintConsistent,
        remarkPresetLintMarkdownStyleGuide,
        // full list of rules packages
        // https://github.com/remarkjs/remark-lint/tree/main/packages
        //
        // https://www.npmjs.com/package/remark-lint-maximum-heading-length
        [remarkLintMaximumHeadingLength, [1, 100]],
        // https://www.npmjs.com/package/remark-lint-unordered-list-marker-style
        [remarkLintUnorderedListMarkerStyle, 'consistent'],
        // https://www.npmjs.com/package/remark-lint-no-undefined-references
        [remarkLintNoUndefinedReferences, { allow: ['!NOTE', '!TIP', '!MORE', '!WARN', ' ', 'x'] }],
        // https://www.npmjs.com/package/remark-lint-link-title-style
        [remarkLintLinkTitleStyle, '\''],
        // https://www.npmjs.com/package/remark-lint-maximum-line-length
        [remarkLintMaximumLineLength, false],
        // https://www.npmjs.com/package/remark-lint-list-item-spacing
        [remarkLintListItemSpacing, false],

        //remarkGfm,
        //remarkGithub,
        //remarkFrontmatter,
    ]
}

export default config