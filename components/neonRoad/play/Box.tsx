'use client'

import { useState, useCallback } from 'react'
import PlayIcon from './Icon'
import styles from './box.module.css'
import Switch from 'react-switch'

interface IProps {
    clickPlayCallback: () => void
}

const PlayBox: React.FC<IProps> = (props) => {

    const [withSoundState, setWidthSoundState] = useState(true)

    const clickPlayCallback = useCallback((/*event: React.MouseEvent<SVGSVGElement>*/) => {
        //console.log(event)
        const { clickPlayCallback } = props
        clickPlayCallback()
    }, [props])

    const checkboxChangeHandler = (/*checked: boolean, event: React.SyntheticEvent<MouseEvent | KeyboardEvent> | MouseEvent*/) => {
        //console.log(checked, event)
        setWidthSoundState((previousState) => {
            console.log(previousState ? false : true)
            return previousState ? false : true
        })
    }

    return (
        <>
            <div className={styles.playContainer}>
                <div className={styles.playBox}>
                    <button
                        onClick={clickPlayCallback}
                        className={styles.playButton}
                    >
                        <PlayIcon
                            fill='#fff400'
                            fillOpacity='0.8'
                            className={styles.playIcon}
                        />
                    </button>
                    <div className={styles.withMusicRow}>
                        <span className={styles.withMusicQuestion}>With Music?</span>
                        <div className={styles.withMusicSwitchContainer}>
                            <Switch
                                onChange={checkboxChangeHandler}
                                checked={withSoundState}
                                offColor="#ff2600"
                                onColor="#5bff00"
                                borderRadius={6}
                                activeBoxShadow="0px 0px 1px 2px #fff"
                            />
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default PlayBox