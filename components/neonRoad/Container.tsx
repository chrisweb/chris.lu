'use client'

import { Suspense, lazy } from 'react'
//import dynamic from 'next/dynamic'
// in this dynamic import case it is important to set "ssr: false"
// as in the NeonRoadCanvas component we use window
// else you get "window is not defined"
//const NeonRoadCanvas = dynamic(() => import('./Canvas'), { ssr: false })
const NeonRoadCanvas = lazy(() => import('./Canvas'))

const Container: React.FC = () => {

    return (
        <>
            <Suspense fallback={<span style={{ color: 'white', fontSize: '30px' }}>Loading...</span>}>
                <NeonRoadCanvas />
            </Suspense>
        </>
    )
}

export default Container