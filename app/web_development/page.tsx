import BaseLink from '@/components/base/Link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import styles from './page.module.css'
import Link from 'next/link'
import Image from 'next/image'
import AsideContent from '@/components/aside/Content'

export default function WebDevelopmentPage() {

    return (
        <>
            <aside>
                <div className='asideCore'>
                    <ul className="linksList">
                        <li>
                            <FontAwesomeIcon icon={faGithub} color='white' size="2x" className="social" /> <BaseLink href="https://github.com/chrisweb">My GitHub Projects</BaseLink>
                        </li>
                    </ul>
                    <AsideContent />
                </div>
            </aside>
            <section id="web_development" className="middle">
                <h1 className="h1">Web Development</h1>
                <h2 className="h2">Tutorials</h2>
                <div className="grid">
                    <Link href="/web_development/tutorials/next-js-static-mdx-blog" className={styles.preview}>
                        <Image src="/assets/images/app/web_development/tutorials/next-js-static-mdx-blog/banner.png" alt="" fill sizes="400px" style={{ objectFit: 'cover' }} />
                        <div className={styles.title}>Next.js / React static MDX Blog</div>
                    </Link>
                    <Link href="/web_development/tutorials/next-static-export-github-pages" className={styles.preview}>
                        <Image src="/assets/images/app/web_development/tutorials/next-static-export-github-pages/banner.png" alt="" fill sizes="400px" style={{ objectFit: 'cover' }} />
                        <div className={styles.title}>Next.js static export deployed on GitHub pages using GitHub actions</div>
                    </Link>
                    <Link href="/web_development/tutorials/xcode-cloud-capacitor-webapp" className={styles.preview}>
                        <Image src="/assets/images/app/web_development/tutorials/xcode-cloud-capacitor-webapp/banner.png" alt="" fill sizes="400px" style={{ objectFit: 'cover' }} />
                        <div className={styles.title}>Xcode Cloud CI/CD to distribute a capacitor app to TestFlight users and the App Store</div>
                    </Link>
                    <Link href="/web_development/tutorials/node-js-app-aws-ec2" className={styles.preview}>
                        <Image src="/assets/images/app/web_development/tutorials/node-js-app-aws-ec2/banner.png" alt="" fill sizes="400px" style={{ objectFit: 'cover' }} />
                        <div className={styles.title}>Node.js app deployment on AWS EC2 instance with NGINX reverse proxy</div>
                    </Link>
                </div>
                <h2 className="h2">Posts</h2>
                <div className="grid">
                    <Link href="/web_development/posts/road-to-react-19-next-js-14" className={styles.preview}>
                        <Image src="/assets/images/app/web_development/posts/road-to-react-19-next-js-14/banner.png" alt="" fill sizes="400px" style={{ objectFit: 'cover' }} />
                        <div className={styles.title}>The road to React 19 and Next.js 14</div>
                    </Link>
                    <Link href="/web_development/posts/csp" className={styles.preview}>
                        <Image src="/assets/images/app/web_development/posts/csp/banner.png" alt="" fill sizes="400px" style={{ objectFit: 'cover' }} />
                        <div className={styles.title}>Content Security Policy (CSP)</div>
                    </Link>
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
                </div>
            </section>
        </>
    )
}