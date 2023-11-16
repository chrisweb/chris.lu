'use client'

import { useRef, forwardRef, useEffect } from 'react'
import styles from './ui.module.css'
import { Waveform, IWaveLayoutOptions, IWaveCoreOptions } from 'waveform-visualizer'

interface IProps {
    onWaveClickHandler: (clickHorizontalPositionInPercent: number) => void
    waveData: number[]
}

const WaveformCanvas = forwardRef(({ onWaveClickHandler, waveData }: IProps, waveformRef: React.MutableRefObject<Waveform>) => {

    const waveCanvasRef = useRef<HTMLCanvasElement>()

    const initializeWaveform = () => {

        const waveLayoutOptions: IWaveLayoutOptions = {
            waveHeightInPixel: 40,
            waveTopPercentage: 50,
        }

        const waveCoreOptions: IWaveCoreOptions = {
            layout: waveLayoutOptions,
            data: [],
            waveformClickCallback: onWaveClickHandler,
        }

        const waveform = new Waveform(waveCoreOptions)

        waveform.setCanvasElement(waveCanvasRef.current)

        waveform.setLayoutOptions({
            peakTopFillStyle: 'rgba(255,255,255,0.7)',
            peakBottomFillStyle: 'rgba(255,255,255,0.5)',
            peakTopProgressFillStyle: 'white',
            peakBottomProgressFillStyle: 'white',
        })

        return waveform

    }

    const getWaveform = () => {

        if (waveformRef.current !== null) {
            return waveformRef.current
        }

        const waveform = initializeWaveform()
        waveformRef.current = waveform

        return waveform
    }

    useEffect(() => {

        console.log('use effect, waveData: ', waveData)

        const waveform = getWaveform()

        waveform.setWaveData(waveData)
        waveform.draw(0)
    }, [waveData])

    return (
        <>
            <div className={styles.audioWaveForm}>
                <canvas ref={waveCanvasRef} width="200px" height="60px" />
            </div>
        </>
    )
})

WaveformCanvas.displayName = 'WaveformCanvas'

export default WaveformCanvas