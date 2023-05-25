import Typing from '../components/Extra/Typing'
import styles from './styles.module.css'

export default function Homepage() {

    return (
        <main>
            <h1>Hello, World! <span className="emoji">👋</span></h1>
            <h3>Welcome to my blog, my name is Chris Weber (aka chrisweb)</h3>
            I like <Typing>Web development, Lego bricks, Music, Games, Cooking, Movies & TV shows, Memes</Typing>
            <section className={styles.portalsGrid}>
                <div className={styles.cyberPortalOuterGlow} id="web_development">
                    <div className={styles.cyberPortalBorder}>
                        <div className={styles.cyberPortalInnerGlow}>
                            <div className={styles.cyberPortalCore}>
                                In this portal you will find my articles about Javascript, React, Next.js, APIs, CI/CD deployment, Cloud, AI, ...
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.cyberPortalOuterGlow} id="lego">
                    <div className={styles.cyberPortalBorder}>
                        <div className={styles.cyberPortalInnerGlow}>
                            <div className={styles.cyberPortalCore}>

                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.cyberPortalOuterGlow} id="games">
                    <div className={styles.cyberPortalBorder}>
                        <div className={styles.cyberPortalInnerGlow}>
                            <div className={styles.cyberPortalCore}>

                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.cyberPortalOuterGlow} id="cooking">
                    <div className={styles.cyberPortalBorder}>
                        <div className={styles.cyberPortalInnerGlow}>
                            <div className={styles.cyberPortalCore}>

                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.cyberPortalOuterGlow} id="music">
                    <div className={styles.cyberPortalBorder}>
                        <div className={styles.cyberPortalInnerGlow}>
                            <div className={styles.cyberPortalCore}>

                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.cyberPortalOuterGlow} id="memes">
                    <div className={styles.cyberPortalBorder}>
                        <div className={styles.cyberPortalInnerGlow}>
                            <div className={styles.cyberPortalCore}>

                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.cyberPortalOuterGlow} id="movies_and_tv_shows">
                    <div className={styles.cyberPortalBorder}>
                        <div className={styles.cyberPortalInnerGlow}>
                            <div className={styles.cyberPortalCore}>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
