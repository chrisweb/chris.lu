import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Web development | chris.lu',
    alternates: {
        canonical: 'https://chris.lu/web_development',
    },
    openGraph: {
        url: 'https://chris.lu/web_development',
    },
}

export default function WebDevelopmentLayout({ children }: {
    children: React.ReactNode
}) {

    return (
        <>
        {children}
        </>
    )
}
