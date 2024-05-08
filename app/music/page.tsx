import type { Metadata } from 'next'
import BaseLink from '@/components/base/Link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpotify } from '@fortawesome/free-brands-svg-icons'
import Link from 'next/link'
import Image from 'next/image'
import styles from './page.module.css'
import MusicBannerImage from '/public/assets/images/app/music/banner.png'
import AsideContent from '@/components/aside/Content'

export const metadata: Metadata = {

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
                    </ul>
                    <AsideContent />
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
                        <Image src="/assets/images/app/music/indie_summer.png" alt="indie summer playlist cover showing a beach with palms and the sea" fill sizes="400px" style={{ objectFit: 'cover' }} />
                        <div className={styles.title}>Indie summer ☀️</div>
                    </Link>
                    <Link href="https://open.spotify.com/playlist/341fyZWfso1OzWrQjfnHyV" className={styles.preview}>
                        <Image src="/assets/images/app/music/indie_rock.png" alt="indie rock playlist cover showing an oldschool rock guitar" fill sizes="400px" style={{ objectFit: 'cover' }} />
                        <div className={styles.title}>Indie rock 🎸</div>
                    </Link>
                    <Link href="https://open.spotify.com/playlist/67UDicGisTxY0heokY0Xuz" className={styles.preview}>
                        <Image src="/assets/images/app/music/happy_hipster.jpg" alt="happy hipster playlist cover showing a smiling kitten" fill sizes="400px" style={{ objectFit: 'cover' }} />
                        <div className={styles.title}>happy hipster 😄</div>
                    </Link>
                    <Link href="https://open.spotify.com/playlist/0s3e11aWxOCbXBfCoI066J" className={styles.preview}>
                        <Image src="/assets/images/app/music/indie_love_sad.jpg" alt="indie love sad edition playlist cover with the words: I love you" fill sizes="400px" style={{ objectFit: 'cover' }} />
                        <div className={styles.title}>Indie ❤️ love (sad edition)</div>
                    </Link>
                    <Link href="https://open.spotify.com/playlist/6QMS1aXyGbebKuyGaixz34" className={styles.preview}>
                        <Image src="/assets/images/app/music/monkey_music.jpg" alt="monkey playlist cover showing a monkey playing electric guitar" fill sizes="400px" style={{ objectFit: 'cover' }} />
                        <div className={styles.title}>If you&apos;ve got the monkey 🐵 I got the music 🎶</div>
                    </Link>
                    <Link href="https://open.spotify.com/playlist/1TRFxCiaBoqrhJsIoSREfx" className={styles.preview}>
                        <Image src="/assets/images/app/music/indie_pop.jpg" alt="indie pop playlist cover showing a mix of colorful lights" fill sizes="400px" style={{ objectFit: 'cover' }} />
                        <div className={styles.title}>Indie pop 🎉</div>
                    </Link>
                    <Link href="https://open.spotify.com/playlist/68FWf8WueCZwFWmZstyjkX" className={styles.preview}>
                        <Image src="/assets/images/app/music/indie_chill_sunset.jpg" alt="indie chill sunset playlist showing a sun gowing down in front of a red and purple sky" fill sizes="400px" style={{ objectFit: 'cover' }} />
                        <div className={styles.title}>Indie chill sunset 🌇</div>
                    </Link>
                    <Link href="https://open.spotify.com/playlist/6h3ikUhQu8CxFsuTTJC8TR" className={styles.preview}>
                        <Image src="/assets/images/app/music/easy_indie_hipster_mix.jpg" alt="easy playlist cover showing an neo sign on a brick world that reads: people" fill sizes="400px" style={{ objectFit: 'cover' }} />
                        <div className={styles.title}>Easy 🎵 the indie hipster mix</div>
                    </Link>
                </div>
            </section>
        </>
    )
}