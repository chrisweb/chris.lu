import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'About me | chris.lu',
    alternates: {
        canonical: 'https://chris.lu/about_me',
    },
    openGraph: {
        url: 'https://chris.lu/about_me',
    },
}

export default function AboutMeLayout({ children }: {
    children: React.ReactNode
}) {

    return (
        <>
            {children}
        </>
    )
}
