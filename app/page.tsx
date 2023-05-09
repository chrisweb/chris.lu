import Typing from '../components/Extra/Typing'
import styles from './styles.module.css'

export default function Homepage() {

    return (
        <>
            <h1>Hello, World! <span className="emoji">👋</span></h1>
            <h3>Welcome to my blog, my name is Chris Weber (aka chrisweb)</h3>
            I like <Typing>Web development, Lego bricks, Music, Games, Cooking, Movies & TV shows, Memes</Typing>
            <p></p>
            <svg xmlns="http://www.w3.org/2000/svg">
      <filter id="svg-filter-inner-shadow">
        <feOffset></feOffset>
        <feGaussianBlur result="offset-blur" stdDeviation="1"></feGaussianBlur>
        <feComposite
          in="SourceGraphic"
          in2="offset-blur"
          operator="out"
          result="inverse"
        ></feComposite>
        <feFlood floodColor="#ff00aa" floodOpacity="0.95" result="color"></feFlood>
        <feComposite
          in="color"
          in2="inverse"
          operator="in"
          result="shadow"
        ></feComposite>
        <feComposite in="shadow" in2="SourceGraphic"></feComposite>
      </filter>
      <filter id="svg-filter-outer-shadow">
        <feOffset></feOffset>
        <feGaussianBlur result="offset-blur" stdDeviation="1"></feGaussianBlur>
        <feComposite
          in="SourceGraphic"
          in2="offset-blur"
          operator="out"
          result="inverse"
        ></feComposite>
        <feFlood floodColor="#ff00aa" floodOpacity="0.95" result="color"></feFlood>
        <feComposite
          in="color"
          in2="inverse"
          operator="in"
          result="shadow"
        ></feComposite>
        <feComposite in="shadow" in2="SourceGraphic"></feComposite>
      </filter>
    </svg>
<a className={styles.btnOuterShadow} href="/">
    <div className={styles.btnBorder}>
        <div className={styles.btn}>Button text</div>
    </div>
</a>
        </>
    )
}
