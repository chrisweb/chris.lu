'use client'

import { forwardRef } from 'react'
import styles from './share.module.css'

interface IProps {
    clickCallback?: () => void
}

type ButtonWithIconRefType = HTMLButtonElement

const ShareButton = forwardRef<ButtonWithIconRefType, IProps>((props, buttonRef) => {

    const { clickCallback, ...rest } = props

    const buttonClickHandler = (/*event: React.MouseEvent<HTMLButtonElement>*/) => {
        if (typeof clickCallback === 'function') {
            clickCallback()
        }
        
    }

    return (
        <>
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
        </>
    )
})

export default ShareButton