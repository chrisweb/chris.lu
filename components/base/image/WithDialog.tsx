'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import type { ImageProps, StaticImageData } from 'next/image'
import dynamic from 'next/dynamic'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './withdialog.module.css'

const UIModal = dynamic(() => import('@/components/ui/Modal'), { ssr: false })

const ImageWithDialog: React.FC<ImageProps> = (props): React.JSX.Element => {

    const [imageDialogIsOpenState, setImageDialogIsOpenState] = useState(false)

    const withOpenButton = false

    const imageButtonClickHandler = () => {
        setImageDialogIsOpenState(true)
    }

    const closeDialogCallback = useCallback(() => {
        setImageDialogIsOpenState(false)
    }, [])

    const staticImageData = props.src as StaticImageData

    const intrinsicWidth = staticImageData.width
    const intrinsicHeight = staticImageData.height

    return (
        <>
            <button onClick={imageButtonClickHandler} className={`${styles.buttonReset}  ${styles.buttonCore}`}>
                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                <Image
                    style={{
                        width: '100%',
                        height: 'auto',
                    }}
                    // 336px = (768px - (2 x 32px) - 32px) / 2
                    // thumbnail width = (middle max width - (2 x spacing) - grid space between two columns) / 2
                    sizes="(max-width: 768px) 100vw, 336px"
                    placeholder="blur"
                    {...props}
                />
                {withOpenButton && (
                    <FontAwesomeIcon icon={faMagnifyingGlass} size="xl" color='white' className={`${styles.iconPositioning}  ${styles.icon}`} />
                )}
            </button>
            <UIModal
                isOpen={imageDialogIsOpenState}
                onCloseCallback={closeDialogCallback}
                hasCloseButton={false}
            >
                <div className={styles.imageContainer}>
                    {/* eslint-disable-next-line jsx-a11y/alt-text */}
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
                        {...props}
                    />
                </div>
            </UIModal>
        </>
    )
}

export default ImageWithDialog