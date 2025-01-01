'use client'

import { useState } from 'react'
import styles from './button.module.css'

interface IProps {
    clickCallback?: () => void
    className?: string
    name: string
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

    const attributes: { 'aria-label'?: string } = {}

    if (props.name && props.name !== '') {
        attributes['aria-label'] = props.name
    }

    return (
        <button
            onAnimationEnd={handleOnAnimationEndHandler}
            onClick={onClickHandler}
            className={`${styles.button}${typeof props.className !== 'undefined' ? ' ' + styles[props.className] : ''}${rippleState ? ' ripple' : ''}`}
            {...attributes}
        >
            {props.children}
        </button>
    )
}

export default RippleButton