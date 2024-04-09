import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Memes | chris.lu',
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
