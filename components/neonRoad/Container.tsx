'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'
const NeonRoadCanvas = dynamic(() => import('./Canvas'))

const Container: React.FC = () => {

    return (
        <>
            <Suspense fallback={<span style={{color: 'black'}}>Loading...</span>}>
                <NeonRoadCanvas />
            </Suspense>
        </>
    )
}

export default Container