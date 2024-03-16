'use client'

import UIModal from '@/components/ui/Modal'
import styles from './ui.module.css'

interface ICredits {
    name: string
    artistName: string
    artistWebsite: string
    license: string
    wave: number[]
}

const VolumeDialog: React.FC<ICredits> = (props) => {

    

    return (
        <>
            <div className={`${styles.volumeModal} ${isVolumeModalOpenState ? styles.openVolume : styles.closeVolume}`}>
                <input type="range" id="volume" name="volume" min="0" max="100" className={styles.volumeSlider} ref={volumeSliderRef} onInput={onInputVolumeHandler} />
            </div>
        </>
    )
}

export default VolumeDialog