import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Games | chris.lu',
    alternates: {
        canonical: 'https://chris.lu/games',
    },
    openGraph: {
        url: 'https://chris.lu/games',
    },
}

export default function GamesLayout({ children }: {
    children: React.ReactNode
}) {

    return (
        <>
        {children}
        </>
    )
}
