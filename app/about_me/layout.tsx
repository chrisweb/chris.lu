import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'About me | chris.lu',
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
