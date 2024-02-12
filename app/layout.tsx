import NeonRoadContainer from '../components/neonRoad/Container'
import './global.css'
import styles from './layout.module.css'
import { Permanent_Marker, VT323, Architects_Daughter, Source_Code_Pro } from 'next/font/google'
import HeaderNavigation from '../components/header/Navigation'
import NavigationLink from '@components/navigation/Link'

import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'
// disable the fontawesome feature which adds a style tag with the css inside to a page
// this is not needed as we also import the css into our project and next.js will bundle it
config.autoAddCss = false

import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'chris.lu',
    description: '',
}

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

export default function RootLayout({ children }: {
    children: React.ReactNode
}) {

    return (
        <html lang="en" className={`${permanentMarkerFont.variable} ${vt323.variable} ${architectsDaughter.variable} ${sourceCodePro.variable}`}>
            <head />
            <body>
                <header className={styles.layoutHeader}>
                    <HeaderNavigation />
                    <NeonRoadContainer />
                </header>
                <main>{children}</main>
                <footer className={styles.layoutFooter}>
                    <hr className={styles.layoutFooterSeperator} />
                    <p>If you find any bugs, mistakes or typos in this blog or it's content or if you want to suggest a new feature, then please use <NavigationLink href="https://github.com/chrisweb/chris.lu/issues">the ticket system</NavigationLink> in the chris.lu GitHub repository. Feedback, ideas and suggestions are appricated, please do so by using the <NavigationLink href="https://github.com/chrisweb/chris.lu/discussions">discussion board</NavigationLink> in the chris.lu GitHub repository.</p>
                    <p>All content on this site is licensed under a <NavigationLink href="https://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International</NavigationLink> license. The source code of this project is licensed under <NavigationLink href="https://github.com/chrisweb/chris.lu/blob/main/LICENSE">MIT</NavigationLink> and a copy of the source code can be found in the <NavigationLink href="https://github.com/chrisweb/chris.lu">chris.lu public GitHub respository</NavigationLink>. A list of all open source packages used to build this project can be found in the <NavigationLink href="https://github.com/chrisweb/chris.lu/blob/main/package.json">package.json</NavigationLink> file. This website uses music licensed under different creative commons licenses, the music tracks <NavigationLink href="https://github.com/chrisweb/chris.lu/blob/main/public/assets/music/CREDITS.txt">credits</NavigationLink> file can be found in the repository of this project or by clicking on the "eject" button of the player on the top right of the screen. This website uses <NavigationLink href="https://fontawesome.com/search?o=r&m=free">Free Icons by Font Awesome</NavigationLink>.</p>
                </footer>
            </body>
        </html>
    )
}
