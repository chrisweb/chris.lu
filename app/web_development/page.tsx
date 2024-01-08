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
            <section id="web_development" className="middle">
                <h1 className="h1">Web Development Posts</h1>
                <h2 className="h2">Tutorial: Next.js static MDX Blog</h2>
                <p>This tutorial will guide you step by step to build a blog (for developers / everyone) with the following features:</p>
                <ul>
                    <li>we will create static pages using the Next.js (v13/14) app directory</li>
                    <li>add suuport for MDX content formatting via the @next/mdx package</li>
                    <li>add a plugin to automatically generate a table of contents for each post</li>
                    <li>another plugin will handle code blocks styling based on your favorite VSCode template</li>
                    <li>yet another plugin will allow us to GitHub like alerts to our content</li>
                    <li>we will also add linting tools for both the code of the project and the content of the posts</li>
                    <li>we will add a CI/CD pipeline using vercel.com so that every time we commit code to our GitHub repository it gets automatically deployed</li>
                </ul>
                <p><NavigationLink href="/web_development/tutorials/next-js-static-mdx-blog" className="a">Next.js static MDX Blog: Table of contents</NavigationLink></p>
            </section>
        </>
    )
}