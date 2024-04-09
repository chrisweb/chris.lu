import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Music | chris.lu',
    alternates: {
        canonical: 'https://chris.lu/music',
    },
    openGraph: {
        url: 'https://chris.lu/music',
    },
}

export default function MusicLayout({ children }: {
    children: React.ReactNode
}) {

    return (
        <>
        {children}
        </>
    )
}
