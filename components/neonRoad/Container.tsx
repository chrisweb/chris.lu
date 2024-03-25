'use client'

import { useState, useRef, useCallback } from 'react'
import StaticImage from './StaticImage'
import StartScreen from './start/Screen'
import dynamic from 'next/dynamic'
import PlayerUI from './player/UI'
import { PlayerCore } from 'web-audio-api-player'
import HeaderTitle from '@/components/header/Title'
import LoadingScreen from './loading/Screen'
import ButtonWithIcon from '@/components/base/button/WithIcon'
import styles from './container.module.css'
import { faPowerOff } from '@fortawesome/free-solid-svg-icons'

/**
 * By using a dynamic import for the Canvas we avoid loading
 * assets used by the animation, not everyone will launch
 * the animation so it is better to only load them when
 * someone clicks play
 */

// if the canvas component uses window then ssr needs to be
// false (for example if using window it is undefined)
const NeonRoadCanvas = dynamic(() => import('./Canvas'), {
    ssr: false,
    loading: () => <LoadingScreen />,
})

const Container: React.FC = () => {

    const [animationState, setAnimationState] = useState(false)

    const containerRef = useRef<HTMLDivElement>(null)
    const playerRef = useRef<PlayerCore>(null)
    const powerOffButtonRef = useRef<HTMLButtonElement>(null)

    const playCallback = useCallback(async (playMusic: boolean) => {
        setAnimationState(true)
        if (playMusic) {
            await playerRef.current?.play()
        }
        // preventScroll is false by default (so NOT prevented)
        powerOffButtonRef.current?.focus({ preventScroll: true })
    }, [])

    const powerOffCallback = useCallback(async () => {
        setAnimationState(false)
        await playerRef.current?.stop()
    }, [])

    const altText = 'Chris.lu header image, displaying an 80s style landscape and sunset'

    return (
        <>
            <PlayerUI ref={playerRef} />
            <div ref={containerRef} className={styles.neonRoadContainer}>
                <HeaderTitle />
                {!animationState &&
                    <>
                        <StaticImage altText={altText} />
                        <StartScreen playCallback={playCallback} />
                    </>
                }
                {animationState &&
                    <>
                        <NeonRoadCanvas altText={altText} containerRef={containerRef} />
                        <ButtonWithIcon clickCallback={powerOffCallback} whichIcon={faPowerOff} ref={powerOffButtonRef} />
                    </>
                }
            </div>
        </>
    )
}

export default Container