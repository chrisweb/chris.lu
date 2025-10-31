'use client'

import { useRef, useEffect, useLayoutEffect } from 'react'
import type { AnimationEvent, PropsWithChildren } from 'react'
import { createPortal } from 'react-dom'
import styles from './walkmanDialog.module.css'

interface IProps extends PropsWithChildren {
    isOpen: boolean
    withEscKeyListener: boolean
    onOpenCallback?: () => void
    onCloseCallback?: () => void
}

const WalkmanDialog: React.FC<IProps> = (props) => {

    const { isOpen, onOpenCallback, onCloseCallback, children } = props

    const dialogRef = useRef<HTMLDialogElement | null>(null)
    const previousIsOpenRef = useRef(isOpen)
    const isClosingRef = useRef(false)

    const animationEndHandler = (event: AnimationEvent<HTMLDialogElement>) => {
        if (event.animationName.startsWith('walkmanDialog_close')) {
            dialogRef.current?.close()
            isClosingRef.current = false
        }
    }

    // Handle dialog open/close based on isOpen prop
    useLayoutEffect(() => {
        const dialogElement = dialogRef.current
        const wasOpen = previousIsOpenRef.current

        if (dialogElement) {
            if (isOpen && !wasOpen) {
                // Opening dialog
                isClosingRef.current = false
                dialogElement.classList.remove(styles.close)
                dialogElement.show()
                if (typeof onOpenCallback === 'function') {
                    onOpenCallback()
                }
            } else if (!isOpen && wasOpen) {
                // Closing dialog
                if (dialogElement.hasAttribute('open')) {
                    isClosingRef.current = true
                    dialogElement.classList.add(styles.close)
                }
                if (typeof onCloseCallback === 'function') {
                    onCloseCallback()
                }
            }
        }

        previousIsOpenRef.current = isOpen
    }, [isOpen, onOpenCallback, onCloseCallback])

    // Handle Escape key listener
    useEffect(() => {
        if (!props.withEscKeyListener) return

        const onKeyDownHandler = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && isOpen) {
                // Trigger close by updating parent's state via callback
                if (typeof onCloseCallback === 'function') {
                    onCloseCallback()
                }
            }
        }

        document.addEventListener('keydown', onKeyDownHandler, false)
        return () => {
            document.removeEventListener('keydown', onKeyDownHandler, false)
        }
    }, [props.withEscKeyListener, isOpen, onCloseCallback])

    return createPortal(
        <dialog
            ref={dialogRef}
            onAnimationEnd={animationEndHandler}
            className={`${styles.reset} ${styles.dialog}`}
        >
            {children}
        </dialog>,
        document.body
    )
}

export default WalkmanDialog