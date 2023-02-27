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

    const __dirname = dirname(fileURLToPath(import.meta.url))

    const contentDirectory = join(__dirname, '..', '(content)').replace(/\\/g, '/')

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

    const filePath = join(__dirname, '..', '(content)', fileName).replace('server\\', '').replace('.next\\', '')
    //const filePath = './app/articles/(content)/' + fileName

    const fileContent = fs.readFileSync(filePath, 'utf8')

    const mdxOptions = {
        parseFrontmatter: true
    }

    // there is a bug in the types for MDXRemoteProps
    // source replaces compiledSource from MDXRemoteSerializeResult
    // https://github.com/hashicorp/next-mdx-remote/issues/336
    // @ts-expect-error will be fixed in next release of next-mdx-remote/rsc
    const { content, frontmatter } = await compileMDX({ source: fileContent, options: mdxOptions })

    console.log('frontmatter: ', frontmatter)

    const components = {
        h1: (props) => (
            <h1 {...props} className="large-text">
                {props.children}
            </h1>
        ),
    }

    return (
        <>
            {/*<MDXRemote source={fileContent} components={components}  />*/}
            {content}
        </>
    )
}