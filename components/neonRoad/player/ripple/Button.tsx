'use client'

import { useState } from 'react'
import styles from './button.module.css'

interface IProps {
    clickCallback?: () => void
}

const RippleButton: React.FC<React.PropsWithChildren<IProps>> = (props) => {

    const [rippleState, setRippleState] = useState(false)

    const rippleAnimation = () => {
        setRippleState(true)
    }

    const handleOnAnimationEndHandler = () => {
        setRippleState(false)
    }

    const onClickHandler = () => {
        rippleAnimation()
        if (typeof props.clickCallback !== 'undefined') {
            props.clickCallback()
        }
    }

    return (
        <button onAnimationEnd={handleOnAnimationEndHandler} onClick={onClickHandler} className={`${styles.button} ${rippleState ? 'ripple' : ''}`}>
            {props.children}
        </button>
    )
}

export default RippleButton