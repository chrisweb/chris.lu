'use client'

import { useRef, useEffect, useState, forwardRef, useCallback } from 'react'
import { PlayerCore, ISoundAttributes, ICoreOptions } from 'web-audio-api-player'
import styles from './ui.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faForwardStep, faEject, faArrowUpRightFromSquare, faVolumeHigh, faVolumeXmark } from '@fortawesome/free-solid-svg-icons'
import { Waveform, IWaveLayoutOptions, IWaveCoreOptions, IWaveClickCallback } from 'waveform-visualizer'
import RippleButton from './ripple/Button'

interface ICredits {
    songName: string
    artistName: string
    website: string
}

const PlayerUI = forwardRef((_: unknown, playerRef: React.MutableRefObject<PlayerCore>) => {

    const volumeRef = useRef<HTMLInputElement>()
    const waveCanvasRef = useRef<HTMLCanvasElement>()
    const waveformRef = useRef<Waveform | null>(null)

    const [isPlayingState, setIsPlayingState] = useState(false)
    const [isEjectedState, setIsEjectedState] = useState(false)
    const [isVolumeModalOpenState, setIsVolumeModalOpenState] = useState(false)
    const [creditsState, setCreditsState] = useState<ICredits>({
        songName: 'Athena',
        artistName: 'Karl Casey aka "White Bat Audio"',
        website: 'https://whitebataudio.com',
    })

    const initializePlayer = useCallback(() => {

        const options: ICoreOptions = {
            soundsBaseUrl: '/assets/music/',
            loopQueue: true,
        }

        playerRef.current = new PlayerCore(options)

        if (typeof volumeRef.current !== 'undefined') {
            console.log('#### playerRef.current.getVolume().toString()')
            volumeRef.current.value = playerRef.current.getVolume().toString()
        }

        const song1: ISoundAttributes = {
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
            id: 1,
            onLoading: (loadingProgress, maximumValue, currentValue) => {
                console.log('loading: ', loadingProgress, maximumValue, currentValue)
            },
            onPlaying: (playingProgress/*, maximumValue, currentValue*/) => {
                if (waveformRef.current !== null) {
                    waveformRef.current.draw(playingProgress)
                }
            },
            onStarted: (playTimeOffset) => {
                console.log('started', playTimeOffset)
                waveformRef.current.setWaveData([22, 26, 26, 24, 32, 35, 43, 89, 92, 96, 96, 94, 93, 98, 94, 94, 95, 85, 83, 84, 91, 91, 94, 100, 91, 94, 95, 49, 12, 12, 14, 31, 32, 34, 34, 36, 35, 61, 93, 90, 98, 92, 91, 90, 56, 13, 13, 14, 1, 0])
                setIsPlayingState(true)
                setCreditsState({
                    songName: 'Athena',
                    artistName: 'Karl Casey aka "White Bat Audio"',
                    website: 'https://whitebataudio.com',
                })
            },
            onPaused: (playTimeOffset) => {
                console.log('paused', playTimeOffset)

                setIsPlayingState(false)
            },
            onStopped: (playTimeOffset) => {
                console.log('stopped', playTimeOffset)

                setIsPlayingState(false)
            },
            onResumed: (playTimeOffset) => {
                console.log('resumed', playTimeOffset)

                setIsPlayingState(true)
            },
            onEnded: (willPlayNext) => {
                console.log('ended', willPlayNext)
            }
        }

        const song2: ISoundAttributes = {
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
            id: 2,
            onLoading: (loadingProgress, maximumValue, currentValue) => {
                console.log('loading: ', loadingProgress, maximumValue, currentValue)
            },
            onPlaying: (playingProgress/*, maximumValue, currentValue*/) => {
                if (waveformRef.current !== null) {
                    waveformRef.current.draw(playingProgress)
                }
            },
            onStarted: (playTimeOffset) => {
                console.log('started', playTimeOffset)
                waveformRef.current.setWaveData([82, 90, 84, 85, 89, 85, 87, 86, 81, 83, 86, 86, 86, 85, 90, 87, 90, 97, 100, 99, 91, 91, 80, 64, 62, 77, 80, 81, 83, 84, 84, 87, 85, 82, 80, 80, 82, 83, 81, 85, 89, 86, 86, 85, 86, 88, 88, 74, 31, 5])
                setIsPlayingState(true)
                setCreditsState({
                    songName: 'City Streets 1 (Double Dragon 1)',
                    artistName: 'Jake Kaufman aka "Virt"',
                    website: 'https://virt.bandcamp.com/',
                })
            },
            onPaused: (playTimeOffset) => {
                console.log('paused', playTimeOffset)

                setIsPlayingState(false)
            },
            onStopped: (playTimeOffset) => {
                console.log('stopped', playTimeOffset)

                setIsPlayingState(false)
            },
            onResumed: (playTimeOffset) => {
                console.log('resumed', playTimeOffset)

                setIsPlayingState(true)
            },
            onEnded: (willPlayNext) => {
                console.log('ended', willPlayNext)
            }
        }

        const song3: ISoundAttributes = {
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
            id: 3,
            onLoading: (loadingProgress, maximumValue, currentValue) => {
                console.log('loading: ', loadingProgress, maximumValue, currentValue)
            },
            onPlaying: (playingProgress/*, maximumValue, currentValue*/) => {
                if (waveformRef.current !== null) {
                    waveformRef.current.draw(playingProgress)
                }
            },
            onStarted: (playTimeOffset) => {
                console.log('started', playTimeOffset)
                waveformRef.current.setWaveData([16, 20, 32, 76, 81, 80, 69, 46, 75, 76, 78, 55, 40, 39, 41, 65, 75, 85, 100, 81, 76, 75, 79, 37, 73, 76, 79, 68, 39, 48, 78, 79, 90, 82, 80, 76, 86, 59, 52, 73, 75, 76, 76, 74, 77, 76, 32, 25, 30, 26])
                setIsPlayingState(true)
                setCreditsState({
                    songName: '50 Million Year Trip',
                    artistName: 'Karl Casey aka "White Bat Audio"',
                    website: 'https://whitebataudio.com',
                })
            },
            onPaused: (playTimeOffset) => {
                console.log('paused', playTimeOffset)

                setIsPlayingState(false)
            },
            onStopped: (playTimeOffset) => {
                console.log('stopped', playTimeOffset)

                setIsPlayingState(false)
            },
            onResumed: (playTimeOffset) => {
                console.log('resumed', playTimeOffset)

                setIsPlayingState(true)
            },
            onEnded: (willPlayNext) => {
                console.log('ended', willPlayNext)
            }
        }

        playerRef.current.addSoundToQueue({ soundAttributes: song1 })
        playerRef.current.addSoundToQueue({ soundAttributes: song2 })
        playerRef.current.addSoundToQueue({ soundAttributes: song3 })

    }, [playerRef])


    const onWaveClickHandler: IWaveClickCallback = useCallback((clickHorizontalPositionInPercent) => {

        playerRef.current.setPosition(clickHorizontalPositionInPercent)

    }, [playerRef])

    const initializeWaveform = useCallback(() => {

        const waveLayoutOptions: IWaveLayoutOptions = {
            waveHeightInPixel: 40,
            waveTopPercentage: 50,
        }

        const waveCoreOptions: IWaveCoreOptions = {
            layout: waveLayoutOptions,
            data: [22, 26, 26, 24, 32, 35, 43, 89, 92, 96, 96, 94, 93, 98, 94, 94, 95, 85, 83, 84, 91, 91, 94, 100, 91, 94, 95, 49, 12, 12, 14, 31, 32, 34, 34, 36, 35, 61, 93, 90, 98, 92, 91, 90, 56, 13, 13, 14, 1, 0],
            waveformClickCallback: onWaveClickHandler,
        }

        const waveform = new Waveform(waveCoreOptions)

        waveformRef.current = waveform

        waveform.setCanvasElement(waveCanvasRef.current)

        /*const waveCanvasContext = waveform.getCanvasContext()

        const linearGradiantTopPeaks = waveCanvasContext.createLinearGradient(0,0,0,25)

        linearGradiantTopPeaks.addColorStop(0, 'yellow')
        linearGradiantTopPeaks.addColorStop(1, 'red')

        const linearGradiantBottomPeaks = waveCanvasContext.createLinearGradient(0,25,0,50)

        linearGradiantBottomPeaks.addColorStop(0, 'orange')
        linearGradiantBottomPeaks.addColorStop(1, 'yellow')*/

        /*const solidColorTopProgressFillStyle = 'red'
        const solidColorBottomProgressFillStyle = 'orange'

        waveform.setLayoutOptions({
            peakTopFillStyle: linearGradiantTopPeaks,
            peakBottomFillStyle: linearGradiantBottomPeaks,
            peakTopProgressFillStyle: solidColorTopProgressFillStyle,
            peakBottomProgressFillStyle: solidColorBottomProgressFillStyle,
        })*/

        waveform.setLayoutOptions({
            peakTopFillStyle: 'rgba(255,255,255,0.7)',
            peakBottomFillStyle: 'rgba(255,255,255,0.5)',
            peakTopProgressFillStyle: 'white',
            peakBottomProgressFillStyle: 'white',
        })

        waveform.draw(0)

    }, [onWaveClickHandler])

    const onClickTogglePlayPauseCallback = useCallback(() => {
        if (isPlayingState) {
            playerRef.current.pause()
        } else {
            playerRef.current.play()
        }
    }, [isPlayingState, playerRef])

    const onClickNextHandler = () => {
        playerRef.current.next()
    }

    const onClickEjectHandler = () => {
        if (!isEjectedState) {
            setIsEjectedState(true)
        } else {
            setIsEjectedState(false)
        }
    }

    const onClickVolumeHandler = () => {
        if (!isVolumeModalOpenState) {
            setIsVolumeModalOpenState(true)
        } else {
            setIsVolumeModalOpenState(false)
        }
    }

    useEffect(() => {
        initializePlayer()
        initializeWaveform()
        return () => {
            if (playerRef.current !== null) {
                // tell the player to remove it's listeners
                playerRef.current.disconnect()
            }
            if (waveformRef.current !== null) {
                // tell the waveform to remove it's listeners
                waveformRef.current.destroy()
            }
        }
    }, [initializePlayer, initializeWaveform, playerRef, waveformRef])

    return (
        <>
            <div className={styles.playerUI}>
                <div className={styles.audioWaveForm}>
                    <canvas ref={waveCanvasRef} width="200px" height="60px" />
                </div>
                <div className={styles.playerButtons}>
                    <RippleButton clickCallback={onClickTogglePlayPauseCallback}>
                        <FontAwesomeIcon icon={isPlayingState ? faPause : faPlay} size="2x" color='white' />
                    </RippleButton>
                    <RippleButton clickCallback={onClickNextHandler}>
                        <FontAwesomeIcon icon={faForwardStep} size="2x" color='white' />
                    </RippleButton>
                    <RippleButton clickCallback={onClickVolumeHandler} className="volume">
                        <FontAwesomeIcon icon={faVolumeHigh} size="2x" color='white' />
                    </RippleButton>
                    <RippleButton clickCallback={onClickEjectHandler}>
                        <FontAwesomeIcon icon={faEject} size="2x" color='white' />
                    </RippleButton>
                </div>
            </div>
            <div className={`${styles.walkman} ${isEjectedState ? styles.ejected : styles.inserted}`}>
                <div className={`${styles.cassette} ${isEjectedState ? styles.slideIn : styles.slideOut}`}>
                    <div className={`${styles.face} ${styles.front}`}>
                        <a href={creditsState !== null ? creditsState.website : ''} target="_blank" rel="noreferrer" tabIndex={-1} className={styles.songTitle}>{creditsState !== null ? creditsState.songName : ''} <FontAwesomeIcon icon={faArrowUpRightFromSquare} color='white' /></a>
                        <a href={creditsState !== null ? creditsState.website : ''} target="_blank" rel="noreferrer" tabIndex={-1} className={styles.artistName}>{creditsState !== null ? creditsState.artistName : ''} <FontAwesomeIcon icon={faArrowUpRightFromSquare} color='white' /></a>
                        <div className={styles.spoolLeft}></div>
                        <div className={styles.spoolRight}></div>
                        <div className={styles.shield}></div>
                    </div>
                    <div className={`${styles.face} ${styles.back}`}></div>
                    <div className={`${styles.face} ${styles.right}`}></div>
                    <div className={`${styles.face} ${styles.left}`}></div>
                    <div className={`${styles.face} ${styles.top}`}></div>
                    <div className={`${styles.face} ${styles.bottom}`}></div>
                </div>
            </div>
            <div className={`${styles.volumeModal} ${isVolumeModalOpenState ? styles.openVolume : styles.closeVolume}`}>
                <input type="range" id="volume" name="volume" min="0" max="100" className={styles.volumeSlider} />
            </div>
        </>
    )
})

PlayerUI.displayName = 'PlayerUI'

export default PlayerUI