// wrapper module for the MDX pipeline (see next.config.ts): Turbopack passes
// plugin configs to the MDX loader as JSON, so plugins get referenced by name
// (string) and the loader imports their default export; this wrapper exists
// because remark-table-of-contents only has a named export
import { remarkTableOfContents } from 'remark-table-of-contents'

// https://github.com/chrisweb/remark-table-of-contents#options
const remarkTableOfContentsOptions = {
    containerAttributes: {
        id: 'articleToc',
    },
    navAttributes: {
        'aria-label': 'table of contents'
    },
    maxDepth: 2,
}

// a unified "plugin tuple": [plugin, options]
export default [remarkTableOfContents, remarkTableOfContentsOptions]
