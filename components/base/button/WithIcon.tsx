'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { IconProp } from '@fortawesome/fontawesome-svg-core'
import styles from './withicon.module.css'

interface IProps {
    clickCallback: () => void
    whichIcon: IconProp
}

const ButtonWithIcon: React.FC<IProps> = (props) => {

    const buttonClickHandler = (/*event: React.MouseEvent<HTMLButtonElement>*/) => {
        props.clickCallback()
    }

    return (
        <>
            <button
                onClick={buttonClickHandler}
                className={`${styles.buttonPositioning} ${styles.buttonReset}`}
            >
                <div className={styles.buttonBorder}>
                    <div className={styles.buttonCore}>
                        <FontAwesomeIcon icon={props.whichIcon} size="xl" color='white' />
                    </div>
                </div>
            </button>
        </>
    )
}

export default ButtonWithIcon