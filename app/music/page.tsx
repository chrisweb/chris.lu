import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import styles from './page.module.css'

export const metadata: Metadata = {
    title: 'foo',
    description: 'bar',
}

export default function MusicPage() {

    return (
        <>
            <section id="music" className="middle">
                <h1 className="h1">Music</h1>
                <h2 className="h2">Spotify Playlists</h2>
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
            </section>
        </>
    )
}