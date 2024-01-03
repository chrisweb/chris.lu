'use client'

import { useState, useRef, useCallback } from 'react'
import StaticImage from './StaticImage'
import StartScreen from './start/Screen'
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

    const [animationState, setAnimationState] = useState(false)

    const containerRef = useRef<HTMLDivElement>(null)
    const playerRef = useRef<PlayerCore>(null)

    const clickPlayCallback = useCallback(async (playMusic: boolean) => {
        setAnimationState(true)
        if (playMusic) {
            await playerRef.current.play()
        }
    }, [])

    const altText = 'Chris.lu header image, displaying an 80s style landscape and sunset'

    return (
        <div ref={containerRef} style={{width: '100%', height: '100%', position: 'relative'}}>
            {!animationState &&
                <>
                    <StaticImage altText={altText} />
                    <StartScreen clickPlayCallback={clickPlayCallback} />
                </>
            }
            {animationState &&
                <>
                    <NeonRoadCanvas altText={altText} containerRef={containerRef} />
                </>
            }
            <PlayerUI ref={playerRef} />
        </div>
    )
}

export default Container