import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Memes | chris.lu',
    alternates: {
        canonical: 'https://chris.lu/memes',
    },
    openGraph: {
        url: 'https://chris.lu/memes',
    },
}

export default function MemesLayout({ children }: {
    children: React.ReactNode
}) {

    return (
        <>
        {children}
        </>
    )
}
