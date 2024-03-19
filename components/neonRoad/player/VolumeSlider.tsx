'use client'

import { forwardRef } from 'react'
import styles from './volumeSlider.module.css'

interface IProps {
    onInputVolumeHandler: () => void
}

type VolumeInputRefType = HTMLInputElement

const VolumeSlider = forwardRef<VolumeInputRefType, IProps>((props, volumeSliderRef) => {

    return (
        <input type="range" id="volume" name="volume" min="0" max="100" className={styles.slider} ref={volumeSliderRef} onInput={props.onInputVolumeHandler} />
    )
})

export default VolumeSlider