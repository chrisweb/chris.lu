'use client'

import { forwardRef, useState, useEffect } from 'react'
import styles from './share.module.css'

interface IProps {
    clickCallback?: () => void
}

type ButtonWithIconRefType = HTMLButtonElement

const ShareButton = forwardRef<ButtonWithIconRefType, IProps>((props, buttonRef) => {

    const { clickCallback, ...rest } = props

    const [canShareState, setCanShareState] = useState(false)

    const buttonClickHandler = async (/*event: React.MouseEvent<HTMLButtonElement>*/) => {

        if (typeof clickCallback === 'function') {
            clickCallback()
        }

        const ogUrl = document.querySelector('meta[property=og:url]') as HTMLMetaElement
        const url = ogUrl ? ogUrl.content : document.location.href

        const ogTitle = document.querySelector('meta[property=og:title]') as HTMLMetaElement
        const title = ogTitle ? ogTitle.content : 'Chris.lu'

        const ogDescription = document.querySelector('meta[property=og:description]') as HTMLMetaElement
        const defaultDescription = 'chrisweb\'s blog about web development, games, Lego, music, memes, ... | chris.lu'
        const description = ogDescription ? ogDescription.content : defaultDescription

        const shareData = { url, title, description }

        try {
            await navigator
                .share(shareData)
                .then(() => {
                    console.log('shared')
                })
        } catch (error) {
            console.log(`error: ${error}`)
        }

    }

    useEffect(() => {
        if (window.navigator.canShare()) {
            setCanShareState(true)
        }
    }, [])

    return (
        <>
            {canShareState &&
                <button
                    onClick={buttonClickHandler}
                    className={`${styles.reset} ${styles.base} ${styles.cursor}`}
                    ref={buttonRef}
                    type='button'
                    {...rest}
                >
                    <div className={styles.border}>
                        <div className={styles.core}>
                            Share
                        </div>
                    </div>
                </button>
            }
        </>
    )
})

export default ShareButton