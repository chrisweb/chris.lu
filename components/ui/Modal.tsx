'use client'

import { useRef, useEffect, useState } from 'react'
import type { AnimationEvent, PropsWithChildren } from 'react'
import { createPortal } from 'react-dom'

import ButtonWithIcon from '../base/button/WithIcon'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import styles from './modal.module.css'

export interface IUIModalProps extends PropsWithChildren {
    isOpen: boolean
    hasCloseButton?: boolean
    onCloseCallback?: () => void
    width?: number
    height?: number
    className?: string
}

const UIModal: React.FC<IUIModalProps> = (props) => {

    const { isOpen, hasCloseButton, onCloseCallback, children, ...rest } = props

    const [closeAnimationState, setCloseAnimationState] = useState(false)

    const modalRef = useRef<HTMLDialogElement | null>(null)

    let withCloseButton = true

    if (hasCloseButton === false) {
        withCloseButton = false
    }

    const closeModal = () => {
        if (typeof onCloseCallback === 'function') {
            onCloseCallback()
        }
        // start the close animation, the animation end handler closes the dialog element
        if (modalRef.current?.hasAttribute('open')) {
            setCloseAnimationState(true)
        }
    }

    const closeHandler = () => {
        closeModal()
    }

    const animationEndHandler = (event: AnimationEvent<HTMLDialogElement>) => {
        // CSS modules hash the keyframes name (e.g. modal-module__H0elPG__closeAnimation)
        if (event.animationName.includes('closeAnimation')) {
            modalRef.current?.close()
            setCloseAnimationState(false)
        }
    }

    useEffect(() => {
        const modalElement = modalRef.current

        if (modalElement) {
            if (isOpen) {
                if (!modalElement.hasAttribute('open')) {
                    modalElement.showModal()
                }
            } else {
                if (modalElement.hasAttribute('open')) {
                    setCloseAnimationState(true)
                }
            }
        }
    }, [isOpen])

    return createPortal(
        <dialog
            ref={modalRef}
            onCancel={closeHandler}
            onAnimationEnd={animationEndHandler}
            className={`${styles.reset} ${styles.modal} disablePageScroll ${closeAnimationState ? styles.hide : ''}`}
            aria-modal="true"
            {...rest}
        >
            <div
                role="button"
                tabIndex={0}
                onClick={closeHandler}
                onKeyDown={(event) => {
                    event.preventDefault()
                    if (event.key === 'Enter' || event.key === 'Escape' || event.key === ' ') {
                        closeHandler()
                    }
                }}
            >
                {withCloseButton && (
                    <ButtonWithIcon clickCallback={closeHandler} whichIcon={faClose} />
                )}
                {children}
            </div>
        </dialog>,
        document.body
    )
}

export default UIModal