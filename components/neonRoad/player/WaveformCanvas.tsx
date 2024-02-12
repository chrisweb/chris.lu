'use client'

import { useRef, forwardRef, useEffect } from 'react'
import styles from './ui.module.css'
import { Waveform, IWaveLayoutOptions, IWaveCoreOptions } from 'waveform-visualizer'

interface IProps {
    onWaveClickHandler: (clickHorizontalPositionInPercent: number) => void
    waveData: number[]
}

const WaveformCanvas = forwardRef<Waveform, IProps>(({ onWaveClickHandler, waveData }, waveformRef) => {

    const waveCanvasRef = useRef<HTMLCanvasElement | null>(null)

    const initializeWaveform = (): Waveform => {

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

        if (waveCanvasRef.current !== null) {
            waveform.setCanvasElement(waveCanvasRef.current)
        }
        
        waveform.setLayoutOptions({
            peakTopFillStyle: 'rgba(255,255,255,0.7)',
            peakBottomFillStyle: 'rgba(255,255,255,0.5)',
            peakTopProgressFillStyle: 'white',
            peakBottomProgressFillStyle: 'white',
        })

        return waveform

    }

    const getWaveform = (): Waveform => {

        const waveform = initializeWaveform()

        if (typeof waveformRef === 'function') {
            waveformRef(waveform)
        } else {
            if (waveformRef !== null) {
                waveformRef.current = waveform
            }
        }

        return waveform

    }

    useEffect(() => {

        if (waveData.length > 0) {

            const waveform = getWaveform()

            waveform.setWaveData(waveData)
            waveform.draw(0)

        }

    }, [waveData])

    return (
        <>
            <div className={styles.audioWaveForm}>
                <canvas ref={waveCanvasRef} width="200px" height="60px" />
            </div>
        </>
    )
})

WaveformCanvas.displayName = 'WaveformCanvasComponent'

export default WaveformCanvas