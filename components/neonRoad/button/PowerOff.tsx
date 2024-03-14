'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff } from '@fortawesome/free-solid-svg-icons'
import styles from './poweroff.module.css'

interface IProps {
    clickStopCallback: () => void
}

const ButtonPowerOff: React.FC<IProps> = (props) => {

    const powerOffClickHandler = (/*event: React.MouseEvent<HTMLButtonElement>*/) => {
        props.clickStopCallback()
    }

    return (
        <>
            <button
                onClick={powerOffClickHandler}
                className={`${styles.powerOffButton} ${styles.buttonReset}`}
            >
                <div className={styles.powerOffButtonBorder}>
                    <div className={styles.powerOffButtonCore}>
                        <FontAwesomeIcon icon={faPowerOff} size="xl" color='white' />
                    </div>
                </div>
            </button>
        </>
    )
}

export default ButtonPowerOff