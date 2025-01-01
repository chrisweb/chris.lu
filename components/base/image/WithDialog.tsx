'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import type { ImageProps, StaticImageData } from 'next/image'
import dynamic from 'next/dynamic'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './withdialog.module.css'

const UIModal = dynamic(() => import('@/components/ui/Modal'), { ssr: false })

export interface IImageWithDialog extends Omit<ImageProps, 'src'> {
    withOpenButton?: boolean
    src: StaticImageData
}

const ImageWithDialog: React.FC<IImageWithDialog> = (props) => {

    const [imageDialogIsOpenState, setImageDialogIsOpenState] = useState(false)

    const imageButtonClickHandler = () => {
        setImageDialogIsOpenState(true)
    }

    const closeDialogCallback = useCallback(() => {
        setImageDialogIsOpenState(false)
    }, [])

    const staticImageData = props.src
    const intrinsicWidth = staticImageData.width
    const intrinsicHeight = staticImageData.height

    const { alt: altText, ...rest } = props

    return (
        <>
            <button onClick={imageButtonClickHandler} className={`${styles.buttonReset}  ${styles.buttonCore}`}>
                <Image
                    style={{
                        width: '100%',
                        height: 'auto',
                    }}
                    // 336px = (768px - (2 x 32px) - 32px) / 2
                    // thumbnail width = (middle max width - (2 x spacing) - grid space between two columns) / 2
                    sizes="(max-width: 768px) 100vw, 336px"
                    placeholder="blur"
                    alt={`thumbnail: ${altText}`}
                    {...rest}
                />
                {rest.withOpenButton && (
                    <FontAwesomeIcon icon={faMagnifyingGlass} size="xl" color="white" className={`${styles.iconPositioning}  ${styles.icon}`} />
                )}
            </button>
            <UIModal
                isOpen={imageDialogIsOpenState}
                onCloseCallback={closeDialogCallback}
                hasCloseButton={false}
            >
                <div className={styles.imageContainer}>
                    <Image
                        style={{
                            objectFit: 'contain',
                            width: '100%',
                            height: '100%',
                            maxWidth: intrinsicWidth,
                            maxHeight: intrinsicHeight,
                        }}
                        sizes="100vw"
                        placeholder="blur"
                        alt={altText}
                        {...rest}
                    />
                </div>
            </UIModal>
        </>
    )
}

export default ImageWithDialog