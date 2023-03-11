import NeonRoadContainer from '../components/neonRoad/Container'
import './global.css'
import styles from './styles.module.css'
import Link from 'next/link'

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {

    return (
        <html lang="en">
            <head />
            <body>
                <header className={styles.layoutHeader}>
                    <div className={styles.layoutNavbarContainer}>
                        <nav className={styles.layoutNavbar}>
                            <Link href="/">Home</Link>
                            <Link href="/dev">Web development</Link>
                            <Link href="/lego">Lego bricks</Link>
                            <Link href="/music">Music</Link>
                        </nav>
                    </div>
                    <h1 className={styles.eighties}>Chris.lu</h1>
                    <NeonRoadContainer />
                </header>
                <main>{children}</main>
            </body>
        </html>
    )
}
