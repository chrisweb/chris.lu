import type { Metadata } from 'next'
import NavigationLink from '@/components/navigation/Link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import styles from './page.module.css'
import Link from 'next/link'
import Image from 'next/image'

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
                    <li>
                        <a href="https://www.buymeacoffee.com/chriswwweb">
                            <Image src="/assets/images/buy_me_a_coffee_button.png" alt="button buy me a coffee" width="240" height="67" />
                        </a>
                    </li>
                </ul>
            </aside>
            <section id="web_development" className="middle">
                <h1 className="h1">Web Development</h1>
                <h2 className="h2">Tutorials</h2>
                <div className="grid">
                    <Link href="/web_development/tutorials/next-js-static-mdx-blog" className={styles.preview}>
                        <Image src="/assets/images/app/web_development/tutorials/next-js-static-mdx-blog/banner.png" alt="" fill sizes="400px" style={{ objectFit: 'cover' }} />
                        <div className={styles.title}>Next.js static MDX Blog</div>
                    </Link>
                </div>
                <h2 className="h2">Posts</h2>
                <div className="grid">
                    <Link href="/web_development/posts/vscode" className={styles.preview}>
                        <Image src="/assets/images/app/web_development/posts/vscode/banner.png" alt="" fill sizes="400px" style={{ objectFit: 'cover' }} />
                        <div className={styles.title}>VSCode</div>
                    </Link>
                    <Link href="/web_development/posts/node-js" className={styles.preview}>
                        <Image src="/assets/images/app/web_development/posts/node-js/banner.png" alt="" fill sizes="400px" style={{ objectFit: 'cover' }} />
                        <div className={styles.title}>Node.js</div>
                    </Link>
                    <Link href="/web_development/posts/git" className={styles.preview}>
                        <Image src="/assets/images/app/web_development/posts/git/banner.png" alt="" fill sizes="400px" style={{ objectFit: 'cover' }} />
                        <div className={styles.title}>git</div>
                    </Link>
                    <Link href="/web_development/posts/github" className={styles.preview}>
                        <Image src="/assets/images/app/web_development/posts/github/banner.png" alt="" fill sizes="400px" style={{ objectFit: 'cover' }} />
                        <div className={styles.title}>GitHub</div>
                    </Link>
                    <Link href="/web_development/posts/vercel" className={styles.preview}>
                        <Image src="/assets/images/app/web_development/posts/vercel/banner.png" alt="" fill sizes="400px" style={{ objectFit: 'cover' }} />
                        <div className={styles.title}>Vercel</div>
                    </Link>
                    <Link href="/web_development/posts/sentry-io" className={styles.preview}>
                        <Image src="/assets/images/app/web_development/posts/sentry-io/banner.png" alt="" fill sizes="400px" style={{ objectFit: 'cover' }} />
                        <div className={styles.title}>Sentry.io</div>
                    </Link>
                    <Link href="/web_development/posts/npm" className={styles.preview}>
                        <Image src="/assets/images/app/web_development/posts/npm/banner.png" alt="" fill sizes="400px" style={{ objectFit: 'cover' }} />
                        <div className={styles.title}>NPM and package.json</div>
                    </Link>
                    <Link href="/web_development/posts/road-to-react-next-js-server-side-features" className={styles.preview}>
                        <Image src="/assets/images/app/web_development/posts/road-to-react-next-js-server-side-features/banner.png" alt="" fill sizes="400px" style={{ objectFit: 'cover' }} />
                        <div className={styles.title}>The road to server components and server actions</div>
                    </Link>
                </div>
            </section>
        </>
    )
}