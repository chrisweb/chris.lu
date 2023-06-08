import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'foo',
    description: 'bar',
}

export default function WebDevelopmentPage() {

    return (
        <>
            <br /><br />
            <Link href="/web_development/04.06.2023_first_article" className="a">04.06.2023 first article</Link>
        </>
    )
}