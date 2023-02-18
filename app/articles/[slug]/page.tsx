import { IPageSlug } from '@interfaces/page'
import dynamic from 'next/dynamic'

export default function Article({ params }: IPageSlug) {

    const MDXContent = dynamic(() => import(`./${params.slug}.mdx`))

    return (
        <>
            <MDXContent />
        </>
    )
}