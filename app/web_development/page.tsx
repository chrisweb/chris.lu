import type { Metadata } from 'next'
import NavigationLink from '@components/navigation/Link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

export const metadata: Metadata = {
    title: 'foo',
    description: 'bar',
}

export default function WebDevelopmentPage() {

    return (
        <>
            <aside>
                <ul className="linksList">
                    <li>
                        <FontAwesomeIcon icon={faGithub} color='white' size="2x" className="social" /> <NavigationLink href="https://github.com/chrisweb">My GitHub Projects</NavigationLink>
                    </li>
                </ul>
            </aside>
            <section id="web_development" className="core">
                <h1 className="h1">Web Development Posts</h1>
                <h2 className="h2">Next.js static MDX Blog</h2>
                <p>A personal blog tutorial. Fully static pages using Next.js (13 / 14) app directory and @next/mdx. Automatic table of contents generation in posts. Code blocks styling based on VSCode template.</p>
                <ul>
                    <li>
                        <NavigationLink href="/web_development/next-js-static-mdx-blog/eslint" className="a">ESLint</NavigationLink>
                    </li>
                </ul>
            </section>
        </>
    )
}