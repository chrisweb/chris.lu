'use client'

import { useState, useRef, useCallback } from 'react'
import StaticImage from './StaticImage'
import PlayBox from './play/Box'
import dynamic from 'next/dynamic'
import PlayerUI from './player/UI'
import { PlayerCore } from 'web-audio-api-player'

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
        height: '60%',
    }}>Loading...</div>,
})

const Container: React.FC = () => {

    const [showAnimationState, setShowAnimationState] = useState(false)

    const playerRef = useRef<PlayerCore>()

    const clickPlayCallback = useCallback((playMusic) => {
        setShowAnimationState(true)
        if (playMusic) {
            playerRef.current.play()
        }
    }, [])

    const altText = 'Chris.lu header image, displaying an 80s style landscape and sunset'

    return (
        <>
            {!showAnimationState &&
                <>
                    <StaticImage altText={altText} />
                    <PlayBox clickPlayCallback={clickPlayCallback} />
                </>
            }
            {showAnimationState &&
                <>
                    <NeonRoadCanvas altText={altText} />
                </>
            }
            <PlayerUI ref={playerRef} />
        </>
    )
}

export default Container