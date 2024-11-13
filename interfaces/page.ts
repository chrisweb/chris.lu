export interface IPropsSearchParams {
    searchParams?: Record<string, string | string[] | undefined>
}

export interface IProps extends IPropsSearchParams {
    params: {
        slug: string
    }
}