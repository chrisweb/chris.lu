'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import type { AnimationEvent, PropsWithChildren } from 'react'
import { createPortal } from 'react-dom'
import styles from './walkmanDialog.module.css'

interface IProps extends PropsWithChildren {
    isOpen: boolean
    onOpenCallback?: () => void
    onCloseCallback?: () => void
}

const WalkmanDialog: React.FC<IProps> = (props) => {

    const { isOpen, onOpenCallback, onCloseCallback, children } = props

    const [isDialogOpenState, setIsDialogOpenState] = useState(isOpen)
    const [closeAnimationState, setCloseAnimationState] = useState(false)

    const dialogRef = useRef<HTMLDialogElement | null>(null)

    const openModal = useCallback(() => {
        setIsDialogOpenState(true)
        if (typeof onOpenCallback === 'function') {
            onOpenCallback()
        }
    }, [onOpenCallback])

    const closeModal = useCallback(() => {
        if (typeof onCloseCallback === 'function') {
            onCloseCallback()
        }
        setIsDialogOpenState(false)
    }, [onCloseCallback])

    const onKeyDownHandler = (event: React.KeyboardEvent<HTMLDialogElement>) => {
        if (event.key === 'Escape') {
            closeModal()
        }
    }

    const animationEndHandler = (event: AnimationEvent<HTMLDialogElement>) => {
        if (event.animationName.startsWith('walkmanDialog_close')) {
            dialogRef.current?.close()
            setCloseAnimationState(false)
        }
    }

    useEffect(() => {
        if (isOpen === true) {
            openModal()
        } else {
            closeModal()
        }
    }, [isOpen, openModal, closeModal])

    useEffect(() => {
        const dialogElement = dialogRef.current

        if (dialogElement) {
            if (isDialogOpenState) {
                dialogElement.show()
            } else {
                if (dialogElement.hasAttribute('open')) {
                    setCloseAnimationState(true)
                }
            }
        }
    }, [isDialogOpenState])

    return createPortal(
        <dialog
            ref={dialogRef}
            onKeyDown={onKeyDownHandler}
            onAnimationEnd={animationEndHandler}
            className={`${styles.reset} ${styles.dialog} ${closeAnimationState === true ? styles.close : ''}`}
        >
            {children}
        </dialog>,
        document.body
    )
}

export default WalkmanDialog