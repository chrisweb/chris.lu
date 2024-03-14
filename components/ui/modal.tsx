'use client'

import { useRef, useEffect, useState } from 'react'
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

    const closeButtonClickHandler = () => {
        closeModal()
    }

    const dialogKeyDownHandler = (event: React.KeyboardEvent<HTMLDialogElement>) => {
        if (event.key === 'Escape') {
            closeModal()
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
                modalElement.close()
            }
        }
    }, [isModalOpenState])

    return (
        <dialog ref={modalRef} onKeyDown={dialogKeyDownHandler} className={styles.modal}>
            <div className={styles.modalCore} onClick={closeButtonClickHandler}>
                {withCloseButton && (
                    <ButtonWithIcon clickCallback={closeButtonClickHandler} whichIcon={faClose} />
                )}
                {children}
            </div>
        </dialog>
    )
}

export default UIModal