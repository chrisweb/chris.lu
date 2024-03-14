import type { Metadata } from 'next'
import BaseLink from '@/components/base/Link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpotify } from '@fortawesome/free-brands-svg-icons'
import Link from 'next/link'
import Image from 'next/image'
import styles from './page.module.css'
import MusicBannerImage from '/public/assets/images/app/music/banner.png'

export const metadata: Metadata = {
    title: 'foo',
    description: 'bar',
}

export default function MusicPage() {

    return (
        <>
            <aside>
                <div className='asideCore sticky'>
                    <ul className="linksList">
                        <li>
                            <FontAwesomeIcon icon={faSpotify} color='white' size="2x" className="social" /> <BaseLink href="https://open.spotify.com/user/chriswwweb/playlists">My Spotify Playlists</BaseLink>
                        </li>
                        <li>
                            <a href="https://www.buymeacoffee.com/chriswwweb">
                                <Image src="/assets/images/buy_me_a_coffee_button.png" alt="button buy me a coffee" width="240" height="67" />
                            </a>
                        </li>
                    </ul>
                </div>
            </aside>
            <section id="music" className="middle">
                <h1 className="h1">Music</h1>
                <Image
                    src={MusicBannerImage}
                    alt="banner image of a band of alian musicians and a human singer"
                    style={{
                        width: '100%',
                        height: 'auto',
                    }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                    placeholder={'blur'}
                />
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