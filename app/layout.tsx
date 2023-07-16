import NeonRoadContainer from '../components/neonRoad/Container'
import './global.css'
import styles from './layout.module.css'
import Link from 'next/link'
import { Permanent_Marker } from 'next/font/google'
import HeaderTitle from '../components/header/Title'

import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'
// disable the fontawesome feature which adds a style tag with the css inside to a page
// this is not needed as we also import the css into our project and next.js will bundle it
config.autoAddCss = false

const permanentMarkerFont = Permanent_Marker({
    subsets: ['latin'],
    weight: ['400'],
    display: 'swap',
})

export default function RootLayout({ children }: {
    children: React.ReactNode
}) {

    return (
        <html lang="en" className={permanentMarkerFont.className}>
            <head />
            <body>
                <header className={styles.layoutHeader}>
                    <div className={styles.layoutNavbarContainer}>
                        <nav className={styles.layoutNavbar}>
                            <Link href="/">Home</Link>
                            <Link href="/web_development">Web development</Link>
                            <Link href="/lego">Lego</Link>
                            {/*<Link href="/music">Music</Link>
                            <Link href="/games">Games</Link>
                            <Link href="/cooking">Cooking</Link>
                            <Link href="/movies_and_tv_shows">Movies & TV shows</Link>
                            <Link href="/memes">Memes</Link>*/}
                            <Link href="/about_me">About Me</Link>
                        </nav>
                    </div>
                    <HeaderTitle />
                    <NeonRoadContainer />
                </header>
                <main>{children}</main>
            </body>
        </html>
    )
}
