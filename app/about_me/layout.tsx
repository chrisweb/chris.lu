import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'About me | chris.lu',
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
