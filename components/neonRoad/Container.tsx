'use client'

import dynamic from 'next/dynamic'
// in this dynamic import case it is important to set "ssr: false"
// as in the NeonRoadCanvas component we use window
// else you get "window is not defined"
const NeonRoadCanvas = dynamic(() => import('./Canvas'), {
    ssr: false,
    loading: () => <span style={{ color: 'white', fontSize: '30px' }}>Loading...</span>,
})

const Container: React.FC = () => {

    return (
        <>
            <NeonRoadCanvas />
        </>
    )
}

export default Container