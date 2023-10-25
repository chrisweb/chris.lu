import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'foo',
    description: 'bar',
}

export default function WebDevelopmentPage() {

    return (
        <section>
            <br /><br />
            <Link href="/web_development/test" className="a">04.06.2023 first article</Link>
            <br /><br />
            <Link href="/web_development/next-js-static-mdx-blog/eslint" className="a">ESLint</Link>
        </section>
    )
}