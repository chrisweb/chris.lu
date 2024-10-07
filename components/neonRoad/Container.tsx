'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
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
import { ErrorBoundary } from 'react-error-boundary'
import * as Sentry from '@sentry/nextjs'

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

const isWebAssemblySupported = () => {
    // https://stackoverflow.com/a/47880734/656689
    try {
        if (typeof WebAssembly === 'object'
            && typeof WebAssembly.instantiate === 'function') {
            // https://nextjs.org/docs/messages/no-assign-module-variable
            const webAssemblyModule = new WebAssembly.Module(Uint8Array.of(0x0, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00))
            if (webAssemblyModule instanceof WebAssembly.Module)
                return new WebAssembly.Instance(webAssemblyModule) instanceof WebAssembly.Instance
        }
    } catch (error) {
        Sentry.captureException(error)
    }
    return false
}

const Container: React.FC = () => {

    const [animationState, setAnimationState] = useState(false)
    const [startScreenState, setStartScreenState] = useState(false)

    const containerRef = useRef<HTMLDivElement>(null)
    const playerRef = useRef<PlayerCore>(null)
    const powerOffButtonRef = useRef<HTMLButtonElement>(null)

    const playCallback = useCallback((playMusic: boolean) => {
        setAnimationState(true)
        if (playMusic) {
            playerRef.current?.play().catch((error): void => {
                if (process.env.NODE_ENV === 'development') {
                    console.log('player play() error: ', error)
                }
            })
        }
        // preventScroll is false by default (so NOT prevented)
        powerOffButtonRef.current?.focus({ preventScroll: true })
    }, [])

    const powerOffCallback = useCallback(() => {
        setAnimationState(false)
        playerRef.current?.stop().catch((error): void => {
            if (process.env.NODE_ENV === 'development') {
                console.log('player stop() error: ', error)
            }
        })
    }, [])

    useEffect(() => {
        // only show the start screen if web assembly is supported
        // wasm is required for decompression (draco)
        // for modern browsers there is a 'wasm-unsafe-eval' CSP directive
        // for older browsers that don't support 'wasm-unsafe-eval' you need 'unsafe-eval'
        // if will not use 'unsafe-eval' so I needed a way to detect if wasm works
        // or got blocked by CSP
        // if it is blocked there is no need to show the start webgl animation screen
        setStartScreenState(isWebAssemblySupported())
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
                        {startScreenState &&
                            <>
                                <StartScreen playCallback={playCallback} />
                            </>
                        }
                    </>
                }
                {animationState &&
                    <>
                        <ErrorBoundary fallback={<div className="error">Error</div>}>
                            <NeonRoadCanvas altText={altText} containerRef={containerRef} />
                        </ErrorBoundary>
                        <ButtonWithIcon clickCallback={powerOffCallback} whichIcon={faPowerOff} ref={powerOffButtonRef} />
                    </>
                }
            </div>
        </>
    )
}

export default Container