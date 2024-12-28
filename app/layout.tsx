import NeonRoadContainer from '@/components/neonRoad/Container'
import './global.css'
import styles from './layout.module.css'
import { Permanent_Marker, VT323, Architects_Daughter, Source_Code_Pro, Anta } from 'next/font/google'
import HeaderNavigation from '@/components/header/Navigation'
import Disclaimer from '@/components/footer/Disclaimer'
import type { Metadata, Viewport } from 'next'
import { sharedMetaData } from '@/shared/metadata'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export const metadata: Metadata = {
    // default next.js value
    // added this just to make the console message go away
    metadataBase: process.env.VERCEL_URL ?
        new URL(`https://${process.env.VERCEL_URL}`) :
        new URL(`http://localhost:${process.env.PORT ?? '3000'}`),
    title: {
        template: '%s | chris.lu',
        default: 'Home | chris.lu',
    },
    description: 'chrisweb\'s blog about web development, games, Lego, music, memes, ... | chris.lu',
    keywords: ['web development', 'lego', 'games', 'music', 'about me'],
    twitter: null,
    alternates: {
        canonical: 'https://chris.lu/',
    },
    openGraph: {
        ...sharedMetaData.openGraph,
    },
}

export const viewport: Viewport = {
    /* on older safari this is used as background color
    for the top safari UI, use dark color instead of primary */
    themeColor: '#2e102f',
}

import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'
// disable the fontawesome feature which adds a style tag with the css inside to a page
// this is not needed as we also import the css into our project and next.js will bundle it
config.autoAddCss = false

const permanentMarkerFont = Permanent_Marker({
    subsets: ['latin'],
    variable: '--font-permanentMarker',
    weight: ['400'],
    display: 'swap',
})

const vt323 = VT323({
    subsets: ['latin'],
    variable: '--font-vt323',
    weight: ['400'],
    display: 'swap',
})

const architectsDaughter = Architects_Daughter({
    subsets: ['latin'],
    variable: '--font-architectsDaughter',
    weight: ['400'],
    display: 'swap',
})

const sourceCodePro = Source_Code_Pro({
    subsets: ['latin'],
    variable: '--font-sourceCodePro',
    weight: ['400'],
    display: 'swap',
})

const anta = Anta({
    subsets: ['latin'],
    variable: '--font-anta',
    weight: ['400'],
    display: 'swap',
})

export default function RootLayout({ children }: {
    children: React.ReactNode
}) {

    return (
        <html lang="en" className={`${permanentMarkerFont.variable} ${vt323.variable} ${architectsDaughter.variable} ${sourceCodePro.variable} ${anta.variable}`}>
            <head />
            <body>
                <header className={styles.layoutHeader}>
                    <HeaderNavigation />
                    <NeonRoadContainer />
                </header>
                <main>
                    {children}
                </main>
                <footer className={styles.layoutFooter}>
                    <Disclaimer />
                </footer>
                <Analytics />
                <SpeedInsights />
            </body>
        </html>
    )
}
