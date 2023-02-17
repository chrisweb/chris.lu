import Test from './test.mdx'

interface IParams {
    slug: string
}

export default function Article(params: IParams) {

    console.log(params.slug)

    return (
        <>
            <Test />
        </>
    )
}