import NeonRoadContainer from '../components/neonRoad/Container'
import './global.css'
import styles from './layout.module.css'
import { Permanent_Marker } from 'next/font/google'
import HeaderTitle from '../components/header/Title'
import HeaderNavigation from '../components/header/Navigation'

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
                    <HeaderNavigation />
                    <HeaderTitle />
                    <NeonRoadContainer />
                </header>
                <main>{children}</main>
            </body>
        </html>
    )
}
