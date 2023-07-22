'use client'

import { useState } from 'react'
import styles from './navigation.module.css'
import Link from 'next/link'
import useClickOutside from '../../hooks/useClickOutside'

const HeaderNavigation: React.FC = () => {

    const [menuButtonIsActiveState, setMenuButtonIsActiveState] = useState<null | boolean>(null)

    const onClickHandler = () => {
        setMenuButtonIsActiveState((previousState) => {
            return previousState === (null || true) ? false : true
        })
    }

    const onClickOutsideHandler = () => {
        if (menuButtonIsActiveState === true) {
            setMenuButtonIsActiveState(false)
        }
    }

    const ref = useClickOutside(onClickOutsideHandler)

    return (
        <>
            <button type="button" role="button" aria-haspopup="menu" aria-controls="navigation" aria-expanded className={`${styles.hamburger} ${styles.emphatic} ${menuButtonIsActiveState ? styles.active : ''}`} onClick={onClickHandler}>
                <span className={styles.hamburgerBox}>
                    <span className={styles.hamburgerInner}></span>
                </span>
            </button>
            <div ref={ref} className={`${styles.layoutNavbarContainer} ${menuButtonIsActiveState === null ? '' : (menuButtonIsActiveState ? styles.openNavbar : styles.closeNavbar)}`}>
                <nav id="navigation" className={`${styles.layoutNavbar}`} >
                    <Link href="/">Home</Link>
                    <Link href="/web_development">Web development</Link>
                    <Link href="/lego">Lego</Link>
                    {/*<Link href="/music">Music</Link>
                            <Link href="/games">Games</Link>
                            <Link href="/cooking">Cooking</Link>
                            <Link href="/movies_and_tv_shows">Movies & TV shows</Link>
                            <Link href="/memes">Memes</Link>*/}
                    <Link href="/about_me">About Me</Link>
                </nav>
            </div>
        </>
    )
}

export default HeaderNavigation