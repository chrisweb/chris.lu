'use client'

import { useRef, useState, forwardRef, useCallback, useEffect } from 'react'
import { PlayerCore, ISoundAttributes, ICoreOptions } from 'web-audio-api-player'
import styles from './ui.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faForwardStep, faEject, faVolumeHigh } from '@fortawesome/free-solid-svg-icons'
import { Waveform } from 'waveform-visualizer'
import RippleButton from './ripple/Button'
import WaveformCanvas from './WaveformCanvas'
import dynamic from 'next/dynamic'
import Cassette from './Cassette'
import VolumeSlider from './VolumeSlider'

const WalkmanDialog = dynamic(() => import('./WalkmanDialog'), { ssr: false })
const VolumeDialog = dynamic(() => import('./VolumeDialog'), { ssr: false })

interface ICredits {
    name: string
    artistName: string
    artistWebsite: string
    license: string
    wave: number[]
}

const PlayerUI = forwardRef<PlayerCore, unknown>((_, playerRef) => {

    const volumeSliderRef = useRef<HTMLInputElement | null>(null)

    const waveformRef = useRef<Waveform | null>(null)

    const [isPlayingState, setIsPlayingState] = useState(false)
    const [isEjectedState, setIsEjectedState] = useState(false)
    const [isVolumeModalOpenState, setIsVolumeModalOpenState] = useState(false)
    const [creditsState, setCreditsState] = useState<ICredits>({
        name: '',
        artistName: '',
        artistWebsite: '',
        license: '',
        wave: [],
    })

    const getMixTape = useCallback(() => {

        const mixTape = [
            {
                source: [
                    {
                        url: 'Hackers_-_Karl_Casey.ogg',
                        codec: 'ogg',
                        isPreferred: true,
                    },
                    {
                        url: 'Hackers_-_Karl_Casey.mp3',
                        codec: 'mp3',
                    }
                ],
                wave: [11, 16, 55, 92, 97, 93, 96, 93, 100, 96, 93, 95, 77, 56, 95, 96, 94, 97, 94, 94, 97, 94, 96, 92, 31, 28, 26, 27, 27, 30, 88, 89, 87, 95, 79, 56, 96, 95, 96, 97, 95, 98, 91, 93, 96, 81, 62, 58, 30, 0],
                name: 'Hackers',
                artistName: 'Karl Casey aka "White Bat Audio"',
                artistWebsite: 'https://whitebataudio.com',
                license: 'https://creativecommons.org/licenses/by/3.0/',
            },
            {
                source: [
                    {
                        url: 'Synthwave_Vibe_-_Meydän.ogg',
                        codec: 'ogg',
                        isPreferred: true,
                    },
                    {
                        url: 'Synthwave_Vibe_-_Meydän.mp3',
                        codec: 'mp3',
                    }
                ],
                wave: [41, 45, 46, 70, 82, 86, 88, 82, 81, 81, 95, 96, 99, 95, 96, 96, 88, 67, 68, 65, 66, 64, 62, 57, 63, 65, 70, 74, 60, 69, 94, 96, 100, 98, 96, 99, 98, 95, 99, 100, 99, 99, 96, 56, 14, 7, 3, 1, 0, 0],
                name: 'Synthwave Vibe',
                artistName: 'Meydän',
                artistWebsite: 'https://linktr.ee/meydan',
                license: 'https://creativecommons.org/licenses/by/3.0/',
            },
            {
                source: [
                    {
                        url: 'Athena_-_Karl_Casey.ogg',
                        codec: 'ogg',
                        isPreferred: true,
                    },
                    {
                        url: 'Athena_-_Karl_Casey.mp3',
                        codec: 'mp3',
                    }
                ],
                wave: [22, 26, 26, 24, 32, 35, 43, 89, 92, 96, 96, 94, 93, 98, 94, 94, 95, 85, 83, 84, 91, 91, 94, 100, 91, 94, 95, 49, 12, 12, 14, 31, 32, 34, 34, 36, 35, 61, 93, 90, 98, 92, 91, 90, 56, 13, 13, 14, 1, 0],
                name: 'Athena',
                artistName: 'Karl Casey aka "White Bat Audio"',
                artistWebsite: 'https://whitebataudio.com',
                license: 'https://creativecommons.org/licenses/by/3.0/',
            },
            {
                source: [
                    {
                        url: 'Out_Of_Love_-_Shirobon.ogg',
                        codec: 'ogg',
                        isPreferred: true,
                    },
                    {
                        url: 'Out_Of_Love_-_Shirobon.mp3',
                        codec: 'mp3',
                    }
                ],
                wave: [34, 35, 35, 35, 59, 62, 82, 77, 96, 95, 96, 95, 97, 97, 96, 81, 39, 57, 97, 92, 95, 70, 21, 25, 30, 42, 52, 52, 52, 64, 71, 79, 93, 92, 97, 97, 97, 95, 96, 97, 97, 99, 100, 100, 100, 42, 33, 23, 20, 6],
                name: 'Out Of Love',
                artistName: 'Shirobon',
                artistWebsite: 'https://shirobon.bandcamp.com/',
                license: 'https://creativecommons.org/licenses/by-nc-sa/3.0/',
            },
            {
                source: [
                    {
                        url: 'Double_Dragon_Neon_City_Streets_1_-_Jake_Kaufman.ogg',
                        codec: 'ogg',
                        isPreferred: true,
                    },
                    {
                        url: 'Double_Dragon_Neon_City_Streets_1_-_Jake_Kaufman.mp3',
                        codec: 'mp3',
                    }
                ],
                wave: [82, 90, 84, 85, 89, 85, 87, 86, 81, 83, 86, 86, 86, 85, 90, 87, 90, 97, 100, 99, 91, 91, 80, 64, 62, 77, 80, 81, 83, 84, 84, 87, 85, 82, 80, 80, 82, 83, 81, 85, 89, 86, 86, 85, 86, 88, 88, 74, 31, 5],
                name: 'City Streets 1 (Double Dragon 1)',
                artistName: 'Jake Kaufman aka "Virt"',
                artistWebsite: 'https://virt.bandcamp.com/',
                license: 'https://creativecommons.org/licenses/by-nc-sa/3.0/',
            },
            {
                source: [
                    {
                        url: 'Sunset_-_LukHash.ogg',
                        codec: 'ogg',
                        isPreferred: true,
                    },
                    {
                        url: 'Sunset_-_LukHash.mp3',
                        codec: 'mp3',
                    }
                ],
                wave: [41, 87, 88, 87, 88, 89, 88, 89, 49, 64, 80, 82, 79, 84, 79, 81, 69, 95, 92, 96, 94, 91, 93, 93, 92, 96, 85, 70, 75, 86, 83, 90, 87, 77, 75, 79, 87, 80, 82, 73, 94, 92, 97, 93, 93, 91, 92, 97, 100, 37],
                name: 'Sunset',
                artistName: 'LukHash',
                artistWebsite: 'https://www.lukhash.com/',
                license: 'https://creativecommons.org/licenses/by-nc-nd/4.0/',
            },
            {
                source: [
                    {
                        url: '50_Million_Year_Trip_-_Karl_Casey.ogg',
                        codec: 'ogg',
                        isPreferred: true,
                    },
                    {
                        url: '50_Million_Year_Trip_-_Karl_Casey.mp3',
                        codec: 'mp3',
                    }
                ],
                wave: [16, 20, 32, 76, 81, 80, 69, 46, 75, 76, 78, 55, 40, 39, 41, 65, 75, 85, 100, 81, 76, 75, 79, 37, 73, 76, 79, 68, 39, 48, 78, 79, 90, 82, 80, 76, 86, 59, 52, 73, 75, 76, 76, 74, 77, 76, 32, 25, 30, 26],
                name: '50 Million Year Trip',
                artistName: 'Karl Casey aka "White Bat Audio"',
                artistWebsite: 'https://whitebataudio.com',
                license: 'https://creativecommons.org/licenses/by/3.0/',
            },
            {
                source: [
                    {
                        url: 'Little_Calculations_-_Shirobon.ogg',
                        codec: 'ogg',
                        isPreferred: true,
                    },
                    {
                        url: 'Little_Calculations_-_Shirobon.mp3',
                        codec: 'mp3',
                    }
                ],
                wave: [25, 25, 51, 78, 80, 80, 79, 80, 80, 79, 79, 80, 82, 86, 80, 87, 81, 78, 87, 86, 88, 86, 88, 86, 86, 89, 87, 88, 89, 88, 87, 90, 95, 85, 74, 76, 77, 75, 86, 91, 89, 88, 89, 95, 97, 100, 99, 98, 90, 49],
                name: 'Little Calculations',
                artistName: 'Shirobon',
                artistWebsite: 'https://shirobon.bandcamp.com/',
                license: 'https://creativecommons.org/licenses/by-nc-sa/3.0/',
            },
        ]

        return mixTape

    }, [])

    const initializePlayer = useCallback((): PlayerCore => {

        const options: ICoreOptions = {
            soundsBaseUrl: '/assets/music/',
            loopQueue: true,
            visibilityWatch: true,
        }

        const player = new PlayerCore(options)

        const mixTape = getMixTape()

        mixTape.forEach((song) => {

            const soundAttributes: ISoundAttributes = {
                source: song.source,
                onLoading: (loadingProgress, maximumValue, currentValue) => {
                    if (process.env.NODE_ENV === 'development') {
                        console.log('loading: ', loadingProgress, maximumValue, currentValue)
                    }
                },
                onPlaying: (playingProgress/*, maximumValue, currentValue*/) => {
                    if (waveformRef.current !== null) {
                        waveformRef.current.draw(playingProgress)
                    }
                },
                onSeeking: (seekingPercentage, duration, playTime) => {
                    if (process.env.NODE_ENV === 'development') {
                        console.log('onSeeking', seekingPercentage, duration, playTime)
                    }
                    if (waveformRef.current !== null) {
                        waveformRef.current.draw(seekingPercentage)
                    }
                },
                onStarted: (playTimeOffset) => {
                    if (process.env.NODE_ENV === 'development') {
                        console.log('started', playTimeOffset)
                    }
                    setIsPlayingState(true)
                    setCreditsState({
                        name: song.name,
                        artistName: song.artistName,
                        artistWebsite: song.artistWebsite,
                        license: song.license,
                        wave: song.wave
                    })
                },
                onPaused: (playTime) => {
                    if (process.env.NODE_ENV === 'development') {
                        console.log('paused', playTime)
                    }
                    setIsPlayingState(false)
                },
                onStopped: (playTime) => {
                    if (process.env.NODE_ENV === 'development') {
                        console.log('stopped', playTime)
                    }
                    setIsPlayingState(false)
                },
                onResumed: (playTime) => {
                    if (process.env.NODE_ENV === 'development') {
                        console.log('resumed', playTime)
                    }
                    setIsPlayingState(true)
                },
                onEnded: (willPlayNext) => {
                    if (process.env.NODE_ENV === 'development') {
                        console.log('ended', willPlayNext)
                    }
                }
            }

            player.addSoundToQueue({ soundAttributes: soundAttributes })

        })

        return player

    }, [getMixTape])

    const getPlayer = useCallback((): PlayerCore | null => {

        let player: PlayerCore | null = null

        if (typeof playerRef !== 'function' && playerRef !== null) {
            player = playerRef.current
        }

        return player

    }, [playerRef])

    const onClickTogglePlayPauseCallback = async () => {
        if (isPlayingState) {
            getPlayer()?.pause()
        } else {
            getPlayer()?.play()
        }
    }

    const onClickNextHandler = () => {
        getPlayer()?.next()
    }

    const onClickEjectHandler = () => {
        if (!isEjectedState) {
            // if the volume modal is open, close it first
            if (isVolumeModalOpenState) {
                setIsVolumeModalOpenState(false)
            }
            setIsEjectedState(true)
        } else {
            setIsEjectedState(false)
        }
    }

    const onWalkmanDialogCloseCallback = () => {
        setIsEjectedState(false)
    }

    const onClickVolumeHandler = () => {
        if (!isVolumeModalOpenState) {
            // if the casette is open, close it first
            if (isEjectedState) {
                setIsEjectedState(false)
            }
            setIsVolumeModalOpenState(true)
        } else {
            setIsVolumeModalOpenState(false)
        }
    }

    const onVolumeDialogCloseCallback = () => {
        setIsVolumeModalOpenState(false)
    }

    const onVolumeDialogOpenCallback = () => {
        if (volumeSliderRef.current !== null) {
            const player = getPlayer()
            if (player !== null) {
                volumeSliderRef.current.value = player.getVolume().toString()
            }
        }
    }

    const onInputVolumeHandler = () => {
        if (volumeSliderRef.current !== null) {
            const volume = volumeSliderRef.current.value
            getPlayer()?.setVolume(parseInt(volume))
        }
    }

    const onWaveClickHandler = useCallback((clickHorizontalPositionInPercent: number) => {
        getPlayer()?.setPosition(clickHorizontalPositionInPercent)
    }, [getPlayer])

    useEffect(() => {

        if (typeof playerRef !== 'function' && playerRef !== null) {
            playerRef.current = initializePlayer()
        }

        const firstSong = getMixTape()[0]

        setCreditsState({
            name: firstSong.name,
            artistName: firstSong.artistName,
            artistWebsite: firstSong.artistWebsite,
            license: firstSong.license,
            wave: firstSong.wave
        })

        return () => {
            if (typeof playerRef !== 'function' && playerRef !== null) {
                playerRef.current?.disconnect()
            }
        }

    }, [getMixTape, initializePlayer, playerRef])

    return (
        <>
            <div className={styles.playerUI}>
                <WaveformCanvas ref={waveformRef} onWaveClickHandler={onWaveClickHandler} waveData={creditsState.wave}></WaveformCanvas>
                <div className={styles.playerButtons}>
                    <RippleButton clickCallback={onClickTogglePlayPauseCallback}>
                        <FontAwesomeIcon icon={isPlayingState ? faPause : faPlay} size="xl" color='white' />
                    </RippleButton>
                    <RippleButton clickCallback={onClickNextHandler}>
                        <FontAwesomeIcon icon={faForwardStep} size="xl" color='white' />
                    </RippleButton>
                    <RippleButton clickCallback={onClickVolumeHandler} className="volume">
                        <FontAwesomeIcon icon={faVolumeHigh} size="xl" color='white' />
                    </RippleButton>
                    <RippleButton clickCallback={onClickEjectHandler}>
                        <FontAwesomeIcon icon={faEject} size="xl" color='white' />
                    </RippleButton>
                </div>
            </div>
            <WalkmanDialog isOpen={isEjectedState} onCloseCallback={onWalkmanDialogCloseCallback}>
                <Cassette credits={creditsState} />
            </WalkmanDialog>
            <VolumeDialog isOpen={isVolumeModalOpenState} onCloseCallback={onVolumeDialogCloseCallback} onOpenCallback={onVolumeDialogOpenCallback}>
                <VolumeSlider ref={volumeSliderRef} onInputVolumeHandler={onInputVolumeHandler} />
            </VolumeDialog>
        </>
    )
})

PlayerUI.displayName = 'PlayerUIComponent'

export default PlayerUI