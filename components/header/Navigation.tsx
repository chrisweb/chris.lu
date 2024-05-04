'use client'

import { useState, useCallback } from 'react'
import styles from './navigation.module.css'
import Link from 'next/link'
import useClickOutside, { TypeCallback } from '@/hooks/useClickOutside'
import { useRouter, usePathname } from 'next/navigation'
import { useSwipeable } from 'react-swipeable'
import { Route } from 'next'

interface IMainMenuItem {
    pathname: string
    text: string
}

const HeaderNavigation: React.FC = () => {

    const [navigationIsOpenState, setNavigationIsOpenState] = useState<null | boolean>(null)

    const router = useRouter()
    const currentPagePathname = usePathname()

    // on click on the hamburger toggle navigation open/close
    const onClickHamburgerHandler = () => {
        setNavigationIsOpenState((previousState) => {
            return previousState === (true || null) ? false : true
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
        { pathname: '/', text: 'Home' },
        { pathname: '/web_development', text: 'Web development' },
        { pathname: '/lego', text: 'Lego' },
        { pathname: '/games', text: 'Games' },
        { pathname: '/music', text: 'Music' },
        { pathname: '/memes', text: 'Memes' },
        { pathname: '/about_me', text: 'About me' },
    ]

    const isActiveCheck = (menuItemPathname: string) => {

        let isActiveClass = ''

        if (menuItemPathname.length > 1) {
            if (currentPagePathname.startsWith(menuItemPathname)) {
                isActiveClass = styles.active
            }
        } else {
            // exception for homepage path which is "/"
            // in that case the page path needs to be equal
            if (currentPagePathname === menuItemPathname) {
                isActiveClass = styles.active
            }
        }

        return isActiveClass
    }

    return (
        <>
            <button type="button" aria-label="open global navigation menu" className={`${styles.hamburger} ${styles.emphatic} ${navigationIsOpenState ? styles.active : ''}`} onClick={onClickHamburgerHandler}>
                <span className={styles.hamburgerInner}></span>
            </button>
            <div className={`${styles.layoutNavbarContainer} ${navigationIsOpenState === null ? '' : (navigationIsOpenState ? styles.openNavbar : styles.closeNavbar)}`} {...swipeHandlers} ref={swipeableRefPassthrough}>
                <nav id="navigation" className={`${styles.layoutNavbar}`} >
                    {mainMenuItems.map((menuItem) => {
                        return (
                            <Link
                                href={menuItem.pathname  as Route}
                                key={menuItem.pathname}
                                onClick={onClickLinkHandler}
                                className={isActiveCheck(menuItem.pathname)}
                                title={menuItem.text}
                            >
                                {menuItem.text}
                            </Link>
                        )
                    })}
                </nav>
            </div>
        </>
    )
}

export default HeaderNavigation