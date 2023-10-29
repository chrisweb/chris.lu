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
            <section id="web_development" className="content">
                <h1 className="h1">My Posts:</h1>
                <br /><br />
                <NavigationLink href="/web_development/test" className="a">04.06.2023 first article</NavigationLink>
                <br /><br />
                <NavigationLink href="/web_development/next-js-static-mdx-blog/eslint" className="a">ESLint</NavigationLink>
            </section>
        </>
    )
}