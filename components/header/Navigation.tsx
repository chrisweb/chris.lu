'use client'

import { useState, useCallback } from 'react'
import styles from './navigation.module.css'
import Link from 'next/link'
import useClickOutside, { TypeCallback } from '@/hooks/useClickOutside'
import { useRouter, usePathname } from 'next/navigation'
import { useSwipeable } from 'react-swipeable'
import { Route } from 'next'

interface IMainMenuItem {
    href: string
    text: string
}

const HeaderNavigation: React.FC = () => {

    const [navigationIsOpenState, setNavigationIsOpenState] = useState<null | boolean>(null)

    const router = useRouter()
    const currentPagePathname = usePathname()

    // on click on the hamburger toggle navigation open/close
    const onClickHamburgerHandler = () => {
        setNavigationIsOpenState((previousState) => {
            return previousState === (null || true) ? false : true
        })
    }

    // on click outside of the navigation (mobile) close it
    const onClickOutsideHandler = useCallback<TypeCallback>(() => {
        if (navigationIsOpenState === true) {
            setNavigationIsOpenState(false)
        }
    }, [navigationIsOpenState])

    const layoutNavbarContainerRef = useClickOutside(onClickOutsideHandler)

    // on click on a link close navigation too
    const onClickLinkHandler = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault()
        setNavigationIsOpenState(false)
        router.push(event.currentTarget.href as Route)
    }

    // on swipe up (when over the navigation) close the navigation
    const swipeableConfiguration = {
        // prevents scroll during swipe
        preventScrollOnSwipe: true,
    }

    const swipeHandlers = useSwipeable({
        onSwipedUp: () => {
            setNavigationIsOpenState(false)
        },
        ...swipeableConfiguration,
    })

    // https://github.com/FormidableLabs/react-swipeable/issues/189#issuecomment-656302682
    const swipeableRefPassthrough = (element: HTMLDivElement) => {
        // call useSwipeables ref prop with el    
        swipeHandlers.ref(element)
        // set the el to a ref you can access yourself
        layoutNavbarContainerRef.current = element
    }

    const mainMenuItems: IMainMenuItem[] = [
        { href: '/', text: 'Home' },
        { href: '/web_development', text: 'Web development' },
        { href: '/lego', text: 'Lego' },
        { href: '/games', text: 'Games' },
        { href: '/music', text: 'Music' },
        { href: '/memes', text: 'Memes' },
        { href: '/about_me', text: 'About me' },
    ]

    return (
        <>
            <button type="button" aria-label="open global navigation menu" className={`${styles.hamburger} ${styles.emphatic} ${navigationIsOpenState ? styles.active : ''}`} onClick={onClickHamburgerHandler}>
                <span className={styles.hamburgerInner}></span>
            </button>
            <div className={`${styles.layoutNavbarContainer} ${navigationIsOpenState === null ? '' : (navigationIsOpenState ? styles.openNavbar : styles.closeNavbar)}`} {...swipeHandlers} ref={swipeableRefPassthrough}>
                <nav id="navigation" className={`${styles.layoutNavbar}`} >
                    {mainMenuItems.map((mainMenuItem) => {
                        let isActiveClass = ''
                        if (typeof window !== 'undefined') {
                            // window existd, we are in client
                            const linkPathname = new URL(mainMenuItem.href, window.location.href).pathname
                            if (linkPathname === currentPagePathname) {
                                isActiveClass = styles.active
                            }
                        } else {
                            // window does NOT exist, we are on server
                            const linkPathname = new URL(mainMenuItem.href, 'http://localhost:3000').pathname
                            if (linkPathname === currentPagePathname) {
                                isActiveClass = styles.active
                            }
                        }
                        return (
                            <Link
                                href={mainMenuItem.href  as Route}
                                key={mainMenuItem.href}
                                onClick={onClickLinkHandler}
                                className={isActiveClass}
                                title={mainMenuItem.text}
                            >
                                {mainMenuItem.text}
                            </Link>
                        )
                    })}
                </nav>
            </div>
        </>
    )
}

export default HeaderNavigation