import Typing from '../components/Extra/Typing'
import styles from './page.module.css'
import Link from 'next/link'

export default function Homepage() {

    return (
        <>
            <h1 className="h1">Hello, World! <span className="emoji">👋</span></h1>
            <p>Welcome to my blog, my name is Chris Weber (aka chrisweb)</p>
            <p>I like <Typing>Web development, Lego bricks, Music, Games, Cooking, Movies & TV shows, Memes</Typing></p>
            <section className={styles.portalsGrid}>
                <div className={styles.cyberPortalOuterGlow} id="web_development">
                    <div className={styles.cyberPortalBorder}>
                        <div className={styles.cyberPortalInnerGlow}>
                            <div className={styles.cyberPortalCore}>
                                <p><Link href="/web_development" className="a"><b>Web Development:</b></Link> In this portal you will find my articles about all things web development, so mostly about Javascript (Typescript), React, Next.js, APIs, CI/CD deployment, capacitor (web apps), WebGL, but probably also some posts about Cloud (serverless, edge, CDNs, ...), AI, IoT and maybe some more</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.cyberPortalOuterGlow} id="lego">
                    <div className={styles.cyberPortalBorder}>
                        <div className={styles.cyberPortalInnerGlow}>
                            <div className={styles.cyberPortalCore}>
                                <p><Link href="/about_me" className="a"><b>About me:</b></Link> I don&apos;t think most of the content of this blog will be about me, as I intend to mostly write about my hobbies, but I also wanted to have a more personal section where I share a brief (and obviously biased) description of myself. Over time I will eventually post some more personal articles not linked to any hobby.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.cyberPortalOuterGlow} id="games">
                    <div className={styles.cyberPortalBorder}>
                        <div className={styles.cyberPortalInnerGlow}>
                            <div className={styles.cyberPortalCore}>
                                Coming soon...
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
