type Root = import('mdast').Root
type Content = import('mdast').Content
type Node = Root | Content

import type { Plugin } from 'unified'
import { visit } from 'unist-util-visit'
import { toString } from 'mdast-util-to-string'

/*type TOCItem = {
    readonly value: string
    readonly id: string
    readonly level: number
  }*/

const remarkTocMdx: Plugin = () => {

    return async (root: Node) => {

        //const headings: TOCItem[] = []

        visit(root, 'heading', (child) => {

            const value = toString(child)

            // depth:1 headings are titles and not included in the TOC
            if (!value || child.depth < 2) {
                return
            }

            console.log(child)

        })

        

    }

}

export default remarkTocMdx