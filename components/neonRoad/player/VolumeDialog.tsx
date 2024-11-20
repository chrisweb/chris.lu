'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import type { AnimationEvent, PropsWithChildren } from 'react'
import { createPortal } from 'react-dom'
import styles from './volumeDialog.module.css'

interface IProps extends PropsWithChildren {
    isOpen: boolean
    withEscKeyListener: boolean
    onOpenCallback?: () => void
    onCloseCallback?: () => void
}

const VolumeDialog: React.FC<IProps> = (props) => {

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

    const onKeyDownHandler = useCallback((event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            closeModal()
        }
    }, [closeModal])

    const animationEndHandler = (event: AnimationEvent<HTMLDialogElement>) => {
        if (event.animationName.startsWith('volumeDialog_close')) {
            dialogRef.current?.close()
            setCloseAnimationState(false)
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', onKeyDownHandler, false)

        return () => {
            document.removeEventListener('keydown', onKeyDownHandler, false)
        }
    }, [onKeyDownHandler])

    useEffect(() => {
        if (isOpen) {
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
            onAnimationEnd={animationEndHandler}
            className={`${styles.reset} ${styles.dialog} ${closeAnimationState ? styles.close : ''}`}
        >
            {children}
        </dialog>,
        document.body
    )
}

export default VolumeDialog