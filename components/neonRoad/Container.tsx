'use client'

import { useState, useEffect, Suspense } from 'react'
import dynamic from 'next/dynamic'
const NeonRoadCanvas = dynamic(() => import('./Canvas'), { ssr: false })
import styles from '../../app/styles.module.css'

const Container: React.FC = () => {

    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    return (
        <>
            {!isMounted ? null : (
                <Suspense fallback={null}>
                    <NeonRoadCanvas />
                </Suspense>
            )}
        </>
    )
}

export default Container