'use client'

import { useState } from 'react'
import StaticImage from './StaticImage'
import PlayButton from './PlayButton'
import dynamic from 'next/dynamic'
// in this dynamic import case it is important to set "ssr: false"
// as in the NeonRoadCanvas component we use window
// else you get "window is not defined"
const NeonRoadCanvas = dynamic(() => import('./Canvas'), {
    ssr: false,
    loading: () => <div style={{
        color: 'white',
        fontSize: '30px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    }}>Loading...</div>,
})

const Container: React.FC = () => {

    const [showAnimationState, setShowAnimationState] = useState(false)

    const clickPlayCallback = () => {
        setShowAnimationState(true)
    }

    const altText = 'Chris.lu header image, displaying an 80s style landscape and sunset'

    return (
        <>
            {!showAnimationState &&
                <>
                    <StaticImage altText={altText} />
                    <PlayButton clickPlayCallback={clickPlayCallback} />
                </>
            }
            {showAnimationState &&
                <NeonRoadCanvas altText={altText} />
            }
        </>
    )
}

export default Container