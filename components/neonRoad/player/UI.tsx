'use client'

import { useRef, useEffect, useState, forwardRef, useCallback } from 'react'
import { PlayerCore, ISoundAttributes, ICoreOptions } from 'web-audio-api-player'

interface IProps {
    isPlaying: boolean
}

const PlayerUI = forwardRef(({ isPlaying }: IProps, playerRef: React.MutableRefObject<PlayerCore>) => {

    const rangeRef = useRef<HTMLInputElement>()
    const volumeRef = useRef<HTMLInputElement>()

    const [isPlayingState, setIsPlayingState] = useState(isPlaying)

    const initializePlayer = useCallback(() => {

        const options: ICoreOptions = {
            soundsBaseUrl: '/assets/songs/',
            playingProgressIntervalTime: 500,
            loadPlayerMode: PlayerCore.PLAYER_MODE_AUDIO,
        }

        playerRef.current = new PlayerCore(options)

        if (typeof volumeRef.current !== 'undefined') {
            console.log('#### playerRef.current.getVolume().toString()')
            volumeRef.current.value = playerRef.current.getVolume().toString()
        }

        const song1: ISoundAttributes = {
            source: [
                {
                    url: 'mp3/Aftermath_-_The_ARTISANS.mp3',
                    codec: 'mp3',
                }
            ],
            id: 1,
            onLoading: (loadingProgress, maximumValue, currentValue) => {
                console.log('loading: ', loadingProgress, maximumValue, currentValue)
            },
            onPlaying: (playingProgress/*, maximumValue, currentValue*/) => {
                //console.log('playing: ', playingProgress, maximumValue, currentValue)
                //console.log(song1)
                //console.log('song1.duration: ', song1.duration)
                if (typeof rangeRef.current !== 'undefined') {
                    rangeRef.current.value = playingProgress.toString()
                }
            },
            onStarted: (playTimeOffset) => {
                console.log('started', playTimeOffset)
            },
            onPaused: (playTimeOffset) => {
                console.log('paused', playTimeOffset)
            },
            onStopped: (playTimeOffset) => {
                console.log('stopped', playTimeOffset)
            },
            onResumed: (playTimeOffset) => {
                console.log('resumed', playTimeOffset)
            },
            onEnded: (willPlayNext) => {
                console.log('ended', willPlayNext)
            }
        }

        const song2: ISoundAttributes = {
            source: [
                {
                    url: 'mp3/50_Million_Year_Trip_-_Karl_Casey.mp3',
                    codec: 'mp3',
                }
            ],
            id: 1,
            onLoading: (loadingProgress, maximumValue, currentValue) => {
                console.log('loading: ', loadingProgress, maximumValue, currentValue)
            },
            onPlaying: (playingProgress/*, maximumValue, currentValue*/) => {
                //console.log('playing: ', playingProgress, maximumValue, currentValue)
                //console.log(song2)
                //console.log('song2.duration: ', song2.duration)
                if (typeof rangeRef.current !== 'undefined') {
                    rangeRef.current.value = playingProgress.toString()
                }
            },
            onStarted: (playTimeOffset) => {
                console.log('started', playTimeOffset)
            },
            onPaused: (playTimeOffset) => {
                console.log('paused', playTimeOffset)
            },
            onStopped: (playTimeOffset) => {
                console.log('stopped', playTimeOffset)
            },
            onResumed: (playTimeOffset) => {
                console.log('resumed', playTimeOffset)
            },
            onEnded: (willPlayNext) => {
                console.log('ended', willPlayNext)
            }
        }

        playerRef.current.addSoundToQueue({ soundAttributes: song1 })
        playerRef.current.addSoundToQueue({ soundAttributes: song2 })

    }, [playerRef])

    const onClickPlayHandler = () => {
        playerRef.current.play()
        /*setIsPlayingState(true)*/
    }

    const onClickPauseHandler = () => {
        playerRef.current.pause()
        /*setIsPlayingState(false)*/
    }

    const onClickNextHandler = () => {
        playerRef.current.next()
    }

    const onChangeVolumeHandler = () => {
        if (typeof volumeRef.current !== 'undefined') {
            const volume = volumeRef.current.value
            playerRef.current.setVolume(parseInt(volume))
        }
    }

    const onChangeRangeHandler = () => {
        if (typeof rangeRef.current !== 'undefined') {
            const rangeInPercent = rangeRef.current.value
            playerRef.current.setPosition(parseInt(rangeInPercent))
        }
    }

    useEffect(() => {
        initializePlayer()
    }, [initializePlayer])

    return (
        <>
            <div style={{
                zIndex: 1,
            }}>
                <button onClick={onClickPlayHandler}>Play audio</button>
                <button onClick={onClickPauseHandler}>Plause audio</button>
                <button onClick={onClickNextHandler}>Next audio</button>
                <input type="range" min="0" max="100" defaultValue="0" step="1" ref={rangeRef} onChange={onChangeRangeHandler} />
                <input type="range" min="0" max="100" step="1" ref={volumeRef} onChange={onChangeVolumeHandler} />
            </div>
        </>
    )
})

PlayerUI.displayName = 'PlayerUI'

export default PlayerUI