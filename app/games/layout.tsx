import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Games | chris.lu',
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
