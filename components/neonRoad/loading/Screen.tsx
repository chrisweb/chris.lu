'use client'

import { useEffect, useState } from 'react'
import styles from './screen.module.css'

const messages = [
    'Procedurally generating mountains',
    'Planting trees',
    'Straitening the road lines',
]

const LoadingScreen: React.FC = () => {

    const [loadingMessageState, setLoadingMessageState] = useState<string>(messages[0] + '...')

    useEffect(() => {

        let i = 0

        const intervalID = setInterval(() => {
            i++
            if (i > (messages.length - 1)) {
                i = 0
            }
            setLoadingMessageState(messages[i] + '...')
        }, 2000)

        return () => {
            clearInterval(intervalID)
        }

    }, [])

    return (
        <>
            <div className={styles.loadingContainer}>
                <span className={styles.loadingText}>{loadingMessageState}</span>
            </div>
        </>
    )
}

export default LoadingScreen