import { IPageSlug } from '@interfaces/page'
import dynamic from 'next/dynamic'

export default function Article({ params }: IPageSlug) {

    //const { slug } = params

    

    return (
        <>
            {/*<MDXContent />*/}
        </>
    )
}

export async function generateStaticParams() {

    /*const MDXContent = dynamic(() => import(`./${params.slug}.mdx`))
  
    return posts.map((post) => ({
      slug: post.slug,
    }));*/
  }