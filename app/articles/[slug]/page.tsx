import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import fs from 'fs'
import { globby } from 'globby'
import { MDXRemote/*, compileMDX*/ } from 'next-mdx-remote/rsc'

interface IPageProps {
    params: {
        slug: string
    }
}

export const dynamicParams = false

export async function generateStaticParams() {

    //const directoryPath = dirname(fileURLToPath(import.meta.url))

    //const contentDirectory = join(directoryPath, '..', '(content)').replace(/\\/g, '/')

    const contentDirectory = dirname(fileURLToPath(import.meta.url))

    const files = await globby('*.mdx', { cwd: contentDirectory })

    return files.map((file) => {
        const slug = file.replace('.mdx', '')
        return {
            'slug': slug,
        }
    })

}

export default async function Article(props: IPageProps) {

    const { params: { slug } } = props

    /*return (
        <>
            <span>{slug}</span>
        </>
    )*/

    const fileName = slug + '.mdx'

    const directoryPath = dirname(fileURLToPath(import.meta.url))

    //const filePath = join(directoryPath, '..', '(content)', fileName)
    const filePath = join(directoryPath, fileName)

    const contentMDX = fs.readFileSync(filePath, 'utf8')

    /*const mdxOptions = {
        parseFrontmatter: true
    }*/

    const mdxComponents = {
        h1: (props: React.PropsWithChildren) => (
            <h1 {...props} className="foo">
                {props.children}
            </h1>
        ),
    }

    // there is a bug in the types for MDXRemoteProps
    // source replaces compiledSource from MDXRemoteSerializeResult
    // https://github.com/hashicorp/next-mdx-remote/issues/336
    // // @ts-expect-error will be fixed in next release of next-mdx-remote/rsc
    //const { content, frontmatter } = await compileMDX({ source: contentMDX, options: mdxOptions, mdxComponents })

    //console.log('frontmatter: ', frontmatter)

    return (
        <>
            {/* open next.js ticket for async components: https://github.com/vercel/next.js/issues/42292 */}
            {/* @ts-expect-error Server Component */}
            <MDXRemote source={contentMDX} components={mdxComponents} /*lazy*/ />
            {/*{content}*/}
        </>
    )
}