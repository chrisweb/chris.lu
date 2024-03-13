'use client'

import { useRef, useEffect, useState } from 'react'
import type { PropsWithChildren } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'

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
        <>
            <dialog ref={modalRef} onKeyDown={dialogKeyDownHandler} className="modal" style={{width: '100%', height: '100%'}}>
                {withCloseButton && (
                    <button
                        onClick={closeButtonClickHandler}
                        className="close"
                    >
                        <FontAwesomeIcon icon={faClose} size="xl" color='white' />
                    </button>
                )}
                {children}
            </dialog>
        </>
    )
}

export default UIModal