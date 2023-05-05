import Typing from '../components/Extra/Typing'
import styles from './styles.module.css'

export default function Homepage() {

    return (
        <>
            <h1>Hello, World! <span className="emoji">👋</span></h1>
            <h3>Welcome to my blog, my name is Chris Weber (aka chrisweb)</h3>
            I like <Typing>Web development, Lego bricks, Music, Games, Cooking, Movies & TV shows, Memes</Typing>
            <p></p>
            <a className={styles.btn} href="/">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52.917 10.583"><path d="M27.762 93.41v10.582h47.625l5.292-5.291v-5.292z" transform="translate(-27.762 -93.41)" id="svgPath" /></svg>
                <span className={styles.btnText}>Button text</span>
            </a>
        </>
    )
}
