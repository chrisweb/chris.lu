'use client'

import type { PropsWithChildren } from 'react'
import styles from './button.module.css'

export interface IBaseButtonProps extends PropsWithChildren {
    clickCallback?: () => void
}

const BaseButton: React.FC<IBaseButtonProps> = (props) => {

    const { clickCallback, children, ...rest } = props

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
                type="button"
                {...rest}
            >
                <div className={styles.border}>
                    <div className={styles.core}>
                        {children}
                    </div>
                </div>
            </button>
        </>
    )
}

export default BaseButton