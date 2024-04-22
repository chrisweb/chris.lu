'use client'

import { useState, useCallback } from 'react'
import Image, { ImageProps } from 'next/image'
import dynamic from 'next/dynamic'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './withdialog.module.css'

const UIModal = dynamic(() => import('@/components/ui/Modal'), { ssr: false })

const BaseImage: React.FC<ImageProps> = (props): JSX.Element => {

    const [imageDialogIsOpenState, setImageDialogIsOpenState] = useState(false)

    const withOpenButton = false

    const imageButtonClickHandler = () => {
        setImageDialogIsOpenState(true)
    }

    const closeDialogCallback = useCallback(() => {
        setImageDialogIsOpenState(false)
    }, [])

    // @ts-expect-error: because the library definition is wrong
    const modalWidth = props.src?.width as number
    // @ts-expect-error: because the library definition is wrong
    const modalHeight = props.src?.height as number

    return (
        <>
            <button onClick={imageButtonClickHandler} className={`${styles.buttonReset}  ${styles.buttonCore}`}>
                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                <Image
                    style={{
                        width: '100%',
                        height: 'auto',
                    }}
                    className={styles.thumbnail}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 15vw"
                    placeholder="blur"
                    {...props}
                />
                {withOpenButton && (
                    <FontAwesomeIcon icon={faMagnifyingGlass} size="xl" color='white' className={`${styles.iconPositioning}  ${styles.icon}`} />
                )}
            </button>
            <UIModal isOpen={imageDialogIsOpenState} onCloseCallback={closeDialogCallback} hasCloseButton={false} width={modalWidth} height={modalHeight}>
                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                <Image
                    style={{
                        objectFit: 'contain',
                        width: '100%',
                        height: 'auto',
                        maxHeight: '100%',
                    }}
                    placeholder="blur"
                    {...props}
                />
            </UIModal>
        </>
    )
}

export default BaseImage