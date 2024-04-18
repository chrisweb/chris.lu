'use client'

import { useRef, forwardRef, useEffect, useCallback } from 'react'
import styles from './ui.module.css'
import { Waveform, IWaveLayoutOptions, IWaveCoreOptions } from 'waveform-visualizer'

interface IProps {
    onWaveClickHandler: (clickHorizontalPositionInPercent: number) => void
    waveData: number[]
}

const WaveformCanvas = forwardRef<Waveform, IProps>(({ onWaveClickHandler, waveData }, waveformRef) => {

    const waveCanvasRef = useRef<HTMLCanvasElement | null>(null)

    const initializeWaveform = useCallback((): Waveform => {

        const waveLayoutOptions: IWaveLayoutOptions = {
            waveHeightInPixel: 32,
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

    }, [onWaveClickHandler])

    const getWaveform = useCallback((): Waveform | null => {

        let waveform: Waveform | null = null

        if (typeof waveformRef !== 'function' && waveformRef !== null) {
            waveform = waveformRef.current
        }

        return waveform

    }, [waveformRef])

    useEffect(() => {

        if (waveData.length > 0) {

            const waveform = getWaveform()

            waveform?.setWaveData(waveData)
            waveform?.draw(0)

        }

    }, [waveData, getWaveform])

    useEffect(() => {

        if (typeof waveformRef !== 'function' && waveformRef !== null) {
            waveformRef.current = initializeWaveform()
        }

        return () => {
            if (typeof waveformRef !== 'function' && waveformRef !== null) {
                waveformRef.current?.destroy()
            }
        }

    }, [waveformRef, initializeWaveform])

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