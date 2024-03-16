'use client'

import { useRef, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import type { PropsWithChildren } from 'react'
import ButtonWithIcon from '../base/button/WithIcon'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import styles from './modal.module.css'

export interface IUIModalProps extends PropsWithChildren {
    isOpen: boolean;
    hasCloseButton?: boolean
    onCloseCallback?: () => void
}

const UIModal: React.FC<IUIModalProps> = (props): JSX.Element => {

    const { isOpen, hasCloseButton, onCloseCallback, children } = props

    const [isModalOpenState, setIsModalOpenState] = useState(isOpen)

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

    useEffect(() => {
        setIsModalOpenState(isOpen)
    }, [isOpen])

    useEffect(() => {
        const modalElement = modalRef.current

        if (modalElement) {
            if (isModalOpenState) {
                modalElement.showModal()
            } else {
                modalElement.close()
            }
        }
    }, [isModalOpenState])

    return createPortal(
        <dialog ref={modalRef} onCancel={closeHandler} className={styles.modal}>
            <div className={styles.modalCore} onClick={closeHandler}>
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