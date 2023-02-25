/*import { IPageSlug } from '@interfaces/page'

const getPost = async (slug: string) => {

    console.log('getPost, slug:', slug)

    return '# post'

}

export async function generateStaticParams() {*/

    //const MDXContent = dynamic(() => import(`./${params.slug}.mdx`))
  
    /*return posts.map((post) => ({
      slug: post.slug,
    }))*/

    /*return [{ slug: 'foo' }, { slug: 'bar' } ]

  }

export default async function Article({ params }: IPageSlug) {

    const { slug } = params

    const ArticleContent = await getPost(slug)

    return (
        <>
            <ArticleContent />
        </>
    )
}*/

interface IPageProps {
    params: {
        slug: string
    }
}

export const dynamicParams = false

export async function generateStaticParams() {

    return [{ slug: 'option3' }]

}

export default function Article(props: IPageProps) {

    const { params: { slug } } = props

    return (
        <>
            <span>{slug}</span>
        </>
    )
}