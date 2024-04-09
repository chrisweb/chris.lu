import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Lego | chris.lu',
    alternates: {
        canonical: 'https://chris.lu/lego',
    },
    openGraph: {
        url: 'https://chris.lu/lego',
    },
}

export default function LegoLayout({ children }: {
    children: React.ReactNode
}) {

    return (
        <>
        {children}
        </>
    )
}
