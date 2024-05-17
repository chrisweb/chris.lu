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
    const intrinsicImageWidth = props.src?.width as number
    // @ts-expect-error: because the library definition is wrong
    const intrinsicImageHeight = props.src?.height as number

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
            <UIModal isOpen={imageDialogIsOpenState} onCloseCallback={closeDialogCallback} hasCloseButton={false}>
                <div className={styles.imageContainer}>
                    {/* eslint-disable-next-line jsx-a11y/alt-text */}
                    <Image
                        style={{
                            objectFit: 'contain',
                            width: '100%',
                            height: '100%',
                            maxWidth: intrinsicImageWidth ? intrinsicImageWidth + 'px' : '100%',
                            maxHeight: intrinsicImageHeight ? intrinsicImageHeight + 'px' : '100%'
                        }}
                        sizes="100vw"
                        placeholder="blur"
                        {...props}
                    />
                </div>
            </UIModal>
        </>
    )
}

export default BaseImage