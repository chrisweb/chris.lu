import Typing from '@/components/animated/Typing'
import styles from './page.module.css'
import Link from 'next/link'
import ImageAnimatedEmoji from '@/components/base/image/AnimatedEmoji'
import gifWaveStaticImport from '@/public/assets/images/noto_emoji_animated/48/waving.gif'
import webpWaveStaticImport from '@/public/assets/images/noto_emoji_animated/48/waving.webp'

export default function Homepage() {

    return (
        <>
            <section className="core">
                <h1 className={`h1 ${styles.specialHeadingMargin}`}>
                    Hello, World!
                    &nbsp;
                    <ImageAnimatedEmoji gifStaticImport={gifWaveStaticImport} webpStaticImport={webpWaveStaticImport} alt="animated emoji waving hand" />
                </h1>
                <p>Welcome to my blog, my name is Chris Weber (aka chrisweb)</p>
                <p className={`fontBigger ${styles.specialMargin}`}>
                    I like
                    &nbsp;
                    <Typing>Web development, Lego bricks, Music, Games, Cooking, Movies & TV shows, Memes</Typing>
                </p>
                <div className={styles.portalsGrid}>
                    <div className={styles.cyberPortalOuterGlow} id="web_development">
                        <div className={styles.cyberPortalBorder}>
                            <div className={styles.cyberPortalInnerGlow}>
                                <div className={styles.cyberPortalCore}>
                                    <p>
                                        <Link href="/web_development" className="hyperLink">Web Development:</Link>
                                        &nbsp;
                                        In this portal you will find my articles about all things web development, so mostly about Javascript (Typescript), React, Next.js, APIs, CI/CD deployment, capacitor (web apps), WebGL, but probably also some posts about Cloud (serverless, edge, CDNs, ...), AI, IoT and maybe some more
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.cyberPortalOuterGlow} id="games">
                        <div className={styles.cyberPortalBorder}>
                            <div className={styles.cyberPortalInnerGlow}>
                                <div className={styles.cyberPortalCore}>
                                    <p>
                                        <Link href="/games" className="hyperLink">Games:</Link>
                                        &nbsp;
                                        I have always liked playing video games, be it on consoles, PC and yes even mobile (I know shame on me 😉). Playing games is my oldest hobby I still enjoy these days. I like playing games and also like watching people play on Twitch and sometimes I even do both at the same time.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.cyberPortalOuterGlow} id="lego">
                        <div className={styles.cyberPortalBorder}>
                            <div className={styles.cyberPortalInnerGlow}>
                                <div className={styles.cyberPortalCore}>
                                    <p>
                                        <Link href="/lego" className="hyperLink">Lego:</Link>
                                        &nbsp;
                                        If there is one hobby that helps me chill after a busy day it for sure is building things using bricks. I like building a lot as I can do it in the evening while also bing watching my favorite TV series or just listening to music. I like being creative and like watching Videos or Streams from other AFOLs.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.cyberPortalOuterGlow} id="lego">
                        <div className={styles.cyberPortalBorder}>
                            <div className={styles.cyberPortalInnerGlow}>
                                <div className={styles.cyberPortalCore}>
                                    <p>
                                        <Link href="/music" className="hyperLink">Music:</Link>
                                        &nbsp;
                                        There are a lot of different activities during which I like listening to music, hence the music genres I listen to vary depending on what I do. I have my road trip playlists for when I&apos;m in my car, my work playlist I listen to while coding, my chill playlists when building with bricks, ...
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.cyberPortalOuterGlow} id="lego">
                        <div className={styles.cyberPortalBorder}>
                            <div className={styles.cyberPortalInnerGlow}>
                                <div className={styles.cyberPortalCore}>
                                    <p>
                                        <Link href="/memes" className="hyperLink">Memes:</Link>
                                        &nbsp;
                                        A growing collection of memes that make me laugh. The most important ingredient for a good meme is humor, without it a meme is just a quote on a picture. A good meme can be used as a source of light relief during a tense situation.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.cyberPortalOuterGlow} id="about_me">
                        <div className={styles.cyberPortalBorder}>
                            <div className={styles.cyberPortalInnerGlow}>
                                <div className={styles.cyberPortalCore}>
                                    <p>
                                        <Link href="/about_me" className="hyperLink">About me:</Link>
                                        &nbsp;
                                        Everything on this blog is already about me, but I also wanted to have a more personal area where I can write about things that are not related to web development, playing games and building with bricks.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
