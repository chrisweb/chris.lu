'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import type { ImageProps } from 'next/image'
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

    return (
        <>
            <button onClick={imageButtonClickHandler} className={`${styles.buttonReset}  ${styles.buttonCore}`}>
                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                <Image
                    style={{
                        width: '100%',
                        height: 'auto',
                    }}
                    sizes="(max-width: 48rem) 100vw, 336px"
                    placeholder="blur"
                    {...props}
                />
                {withOpenButton && (
                    <FontAwesomeIcon icon={faMagnifyingGlass} size="xl" color='white' className={`${styles.iconPositioning}  ${styles.icon}`} />
                )}
            </button>
            <UIModal isOpen={imageDialogIsOpenState} onCloseCallback={closeDialogCallback} hasCloseButton={false}>
                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                <Image
                    style={{
                        width: '100%',
                        height: 'auto',
                    }}
                    sizes="100vw"
                    placeholder="blur"
                    {...props}
                />
            </UIModal>
        </>
    )
}

export default BaseImage