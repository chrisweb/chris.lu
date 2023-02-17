import NeonRoadContainer from '../components/neonRoad/Container'
import './global.css'
//import styles from './styles.module.css'

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {

    return (
        <html lang="en">
            <head />
            <body>
                <header style={{ width: '100vw', height: 'calc(100vh/2)', maxWidth:'100%', position: 'relative' }}>
                    {/*<h1 className={styles.eighties}>Chris.lu</h1>*/}
                    <NeonRoadContainer />
                </header>
                <main>{children}</main>
            </body>
        </html>
    )
}
