import type { Metadata } from 'next'

interface ISharedMetaData extends Metadata {
    openGraph: {
        url: string
        siteName: string
        locale: string
        type: string
    }
}

export const sharedMetaData: ISharedMetaData = {
    openGraph: {
        url: 'https://chris.lu/',
        siteName: 'Chris.lu',
        locale: 'en_US',
        type: 'website',
    }
}