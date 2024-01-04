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
            <div className={styles.container}>
                <button
                    onClick={powerOffClickHandler}
                    className={styles.powerOffButton}
                >
                    <div className={styles.powerOffButtonCore}>
                        <FontAwesomeIcon icon={faPowerOff} size="xl" color='white' />
                    </div>
                </button>
            </div >
        </>
    )
}

export default ButtonPowerOff