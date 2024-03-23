'use client'

import { forwardRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { IconProp } from '@fortawesome/fontawesome-svg-core'
import styles from './withicon.module.css'

interface IProps {
    clickCallback: () => void
    whichIcon: IconProp
}

type ButtonWithIconRefType = HTMLButtonElement

const ButtonWithIcon = forwardRef<ButtonWithIconRefType, IProps>((props, playButtonRef = null) => {

    const buttonClickHandler = (/*event: React.MouseEvent<HTMLButtonElement>*/) => {
        props.clickCallback()
    }

    return (
        <>
            <button
                onClick={buttonClickHandler}
                className={`${styles.buttonPositioning} ${styles.buttonCursor} ${styles.buttonReset}`}
                ref={playButtonRef}
            >
                <div className={styles.buttonBorder}>
                    <div className={styles.buttonCore}>
                        <FontAwesomeIcon icon={props.whichIcon} size="xl" color='white' />
                    </div>
                </div>
            </button>
        </>
    )
})

export default ButtonWithIcon