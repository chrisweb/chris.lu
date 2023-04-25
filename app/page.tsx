import Typing from '../components/Extra/Typing'
import styles from './styles.module.css'

export default function Homepage() {

    return (
        <>
            <h1>Hello, World! <span className="emoji">👋</span></h1>
            <h3>Welcome to my blog, my name is Chris Weber (aka chrisweb)</h3>
            I like <Typing>Web development, Lego bricks, Music, Games, Cooking, Movies & TV shows, Memes</Typing>
            <p></p>
            <a className={styles.cyberButton} href="/">Button text</a>
            <br /><br />
            
            <a className={styles.cyberButton2Shadow} href="/">
                <div className={styles.cyberButton2Border}>
                    <div className={styles.cyberButton2}>Button text</div>
                </div>
            </a>
        </>
    )
}
