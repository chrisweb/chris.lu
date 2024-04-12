'use client'

import { forwardRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { IconProp } from '@fortawesome/fontawesome-svg-core'
import styles from './withicon.module.css'

interface IProps {
    whichIcon: IconProp
    clickCallback?: () => void
}

type ButtonWithIconRefType = HTMLButtonElement

const ButtonWithIcon = forwardRef<ButtonWithIconRefType, IProps>((props, buttonRef) => {

    const { clickCallback, whichIcon, ...rest } = props

    const buttonClickHandler = (/*event: React.MouseEvent<HTMLButtonElement>*/) => {
        if (typeof clickCallback === 'function') {
            clickCallback()
        }
    }

    return (
        <>
            <button
                onClick={buttonClickHandler}
                className={`${styles.bottomRight} ${styles.cursor} ${styles.reset}`}
                ref={buttonRef}
                type='button'
                {...rest}
            >
                <div className={styles.border}>
                    <div className={styles.core}>
                        <FontAwesomeIcon icon={whichIcon} size="xl" color='white' />
                    </div>
                </div>
            </button>
        </>
    )
})

export default ButtonWithIcon