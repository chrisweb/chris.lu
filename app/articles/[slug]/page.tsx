import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import fs from 'fs'
import { globby } from 'globby'
import { /*MDXRemote,*/ compileMDX } from 'next-mdx-remote/rsc'
import type { Metadata } from 'next'

interface IPageProps {
    params: {
        slug: string
    }
}

interface IFrontMatter {
    title: string
    author: string
    publishDate: Date
    lastUpdateDate: Date
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

const getArticle = async (slug: string) => {

    const fileName = slug + '.mdx'

    const directoryPath = dirname(fileURLToPath(import.meta.url))

    //const filePath = join(directoryPath, '..', '(content)', fileName)
    const filePath = join(directoryPath, fileName)

    const contentMDX = fs.readFileSync(filePath, 'utf8')

    // MDX's available options, see the MDX docs for more info.
    // https://mdxjs.com/packages/mdx/#compilefile-options
    const mdxOptions = {
        //remarkPlugins: [],
        //rehypePlugins: [],
        //format: 'mdx',
        parseFrontmatter: true,
    }

    const mdxComponents = {
        h1: (props: React.PropsWithChildren) => (
            <h1 {...props} className="foo">
                {props.children}
            </h1>
        ),
    }

    return await compileMDX<IFrontMatter>({ source: contentMDX, options: mdxOptions, components: mdxComponents })

}

export async function generateMetadata(props: IPageProps) {

    const { params: { slug } } = props

    const { frontmatter } = await getArticle(slug)

    const metadata: Metadata = {
        title: frontmatter.title,
    }

    return metadata

}

export default async function Article(props: IPageProps) {

    const { params: { slug } } = props

    const { content } = await getArticle(slug)

    return (
        <>
            {/* open next.js ticket for async components: https://github.com/vercel/next.js/issues/42292 */}
            {/* //@ts-expect-error Server Component */}
            {/*<MDXRemote source={contentMDX} components={mdxComponents} lazy />*/}
            {content}
        </>
    )
}