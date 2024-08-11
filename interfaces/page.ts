export interface IPropsSearchParams {
    searchParams?: {
        [key: string]: string | string[] | undefined
    }
}

export interface IProps extends IPropsSearchParams {
    params: {
        slug: string
    }
}