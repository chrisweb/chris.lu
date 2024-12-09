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

const UIModal: React.FC<IUIModalProps> = (props): React.JSX.Element => {

    const { isOpen, hasCloseButton, onCloseCallback, children, ...rest } = props

    const [isModalOpenState, setIsModalOpenState] = useState(isOpen)
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
        setIsModalOpenState(false)
    }

    const closeHandler = () => {
        closeModal()
    }

    const animationEndHandler = (event: AnimationEvent<HTMLDialogElement>) => {
        if (event.animationName.startsWith('modal_closeAnimation')) {
            modalRef.current?.close()
            setCloseAnimationState(false)
        }
    }

    useEffect(() => {
        setIsModalOpenState(isOpen)
    }, [isOpen])

    useEffect(() => {
        const modalElement = modalRef.current

        if (modalElement) {
            if (isModalOpenState) {
                modalElement.showModal()
            } else {
                if (modalElement.hasAttribute('open')) {
                    setCloseAnimationState(true)
                }
            }
        }
    }, [isModalOpenState])

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
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        closeHandler()
                    }
                }}
            />
            {withCloseButton && (
                <ButtonWithIcon clickCallback={closeHandler} whichIcon={faClose} />
            )}
            {children}
        </dialog>,
        document.body
    )
}

export default UIModal