import NeonRoadCanvas from '../components/neonRoad/Canvas'
import styles from './styles.module.css'

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html>
            <head />
            <body>
                <header>
                    <h1 className={styles.eighties}>Chris.lu</h1>
                    <NeonRoadCanvas />
                </header>
                <main>{children}</main>
            </body>
        </html>
    )
}
