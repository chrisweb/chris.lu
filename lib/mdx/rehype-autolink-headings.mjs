// wrapper module for the MDX pipeline (see next.config.ts): Turbopack passes
// plugin configs to the MDX loader as JSON, so options containing JS functions
// (here the per-heading properties callback) must live in a module that gets
// referenced by path instead of being declared inline in the next config
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import { fromHtmlIsomorphic } from 'hast-util-from-html-isomorphic'
import { toString as hastToString } from 'mdast-util-to-string'

// https://github.com/rehypejs/rehype-autolink-headings#api
const rehypeAutolinkHeadingsOptions = {
    behavior: 'append',
    properties: (node) => {
        //console.log(node)
        const headingText = hastToString(node.children[0])
        return {
            'class': 'headingAnchor',
            'aria-label': 'Heading permalink for: ' + headingText,
            'title': 'Heading permalink for: ' + headingText,
        }
    },
    content: fromHtmlIsomorphic(
        '<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 24 24" class="icon iconLink" aria-hidden="true"><path d="M11 17H7q-2.075 0-3.537-1.463Q2 14.075 2 12t1.463-3.538Q4.925 7 7 7h4v2H7q-1.25 0-2.125.875T4 12q0 1.25.875 2.125T7 15h4Zm-3-4v-2h8v2Zm5 4v-2h4q1.25 0 2.125-.875T20 12q0-1.25-.875-2.125T17 9h-4V7h4q2.075 0 3.538 1.462Q22 9.925 22 12q0 2.075-1.462 3.537Q19.075 17 17 17Z"/></svg>',
        { fragment: true }
    ).children,
}

// a unified "plugin tuple": [plugin, options]
export default [rehypeAutolinkHeadings, rehypeAutolinkHeadingsOptions]
