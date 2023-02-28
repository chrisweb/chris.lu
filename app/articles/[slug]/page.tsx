import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { globby } from 'globby'


import fs from 'fs'
import { MDXRemote, compileMDX } from 'next-mdx-remote/rsc'

interface IPageProps {
    params: {
        slug: string
    }
}

export const dynamicParams = false

export async function generateStaticParams() {

    const directoryPath = dirname(fileURLToPath(import.meta.url))

    const contentDirectory = join(directoryPath, '..', '(content)').replace(/\\/g, '/')

    const files = await globby('*.mdx', { cwd: contentDirectory })

    return files.map((file) => {
        const slug = file.replace('.mdx', '')
        return {
            'slug': slug,
        }
    })

}

export default async function Article(props: IPageProps) {

    console.log(props)

    const { params: { slug } } = props

    const fileName = slug + '.mdx'

    const directoryPath = dirname(fileURLToPath(import.meta.url))

    const filePath = join(directoryPath, '..', '(content)', fileName)

    const contentMDX = fs.readFileSync(filePath, 'utf8')

    const mdxOptions = {
        parseFrontmatter: true
    }

    const mdxComponents = {
        h1: (props) => (
            <h1 {...props} className="large-text">
                {props.children}
            </h1>
        ),
    }

    // there is a bug in the types for MDXRemoteProps
    // source replaces compiledSource from MDXRemoteSerializeResult
    // https://github.com/hashicorp/next-mdx-remote/issues/336
    // @ts-expect-error will be fixed in next release of next-mdx-remote/rsc
    const { content, frontmatter } = await compileMDX({ source: contentMDX, options: mdxOptions, mdxComponents })

    console.log('frontmatter: ', frontmatter)

    return (
        <>
            {/*<MDXRemote source={contentMDX} components={mdxComponents}  />*/}
            {content}
        </>
    )
}