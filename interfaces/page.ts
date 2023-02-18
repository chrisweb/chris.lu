export interface IPage {
    searchParams?: {
        [key: string]: string | string[] | undefined
    }
}

export interface IPageSlug extends IPage {
    params: {
        slug: string
    }
}