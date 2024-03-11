import type { Metadata } from 'next'
import NavigationLink from '@/components/navigation/Link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpotify } from '@fortawesome/free-brands-svg-icons'
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
            <aside>
                <ul className="linksList">
                    <li>
                        <FontAwesomeIcon icon={faSpotify} color='white' size="2x" className="social" /> <NavigationLink href="https://open.spotify.com/user/chriswwweb/playlists">My Spotify Playlists</NavigationLink>
                    </li>
                    <li>
                        <a href="https://www.buymeacoffee.com/chriswwweb">
                            <Image src="/assets/images/buy_me_a_coffee_button.png" alt="button buy me a coffee" width="240" height="67" />
                        </a>
                    </li>
                </ul>
            </aside>
            <section id="music" className="middle">
                <h1 className="h1">Music</h1>
                <h2 className="h2">Spotify Playlists</h2>
                <div className="grid">
                    <Link href="https://open.spotify.com/playlist/0ju1z7ELlpnSeabW2kEuQT" className={styles.preview}>
                        <Image src="/assets/images/app/music/indie_summer.png" alt="" fill sizes="400px" style={{ objectFit: 'cover' }} />
                        <div className={styles.title}>Indie summer ☀️</div>
                    </Link>
                    <Link href="https://open.spotify.com/playlist/341fyZWfso1OzWrQjfnHyV" className={styles.preview}>
                        <Image src="/assets/images/app/music/indie_rock.png" alt="" fill sizes="400px" style={{ objectFit: 'cover' }} />
                        <div className={styles.title}>Indie rock 🎸</div>
                    </Link>
                </div>
            </section>
        </>
    )
}