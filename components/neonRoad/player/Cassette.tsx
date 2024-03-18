'use client'

import { useState, useEffect } from 'react'
import styles from './cassette.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import { faCreativeCommons } from '@fortawesome/free-brands-svg-icons'

interface ICredits {
    name: string
    artistName: string
    artistWebsite: string
    license: string
}

interface IProps {
    credits: ICredits
}

const Walkman: React.FC<IProps> = (props) => {

    const { credits } = props

    const [creditsState, setCreditsState] = useState<ICredits>(credits)

    useEffect(() => {
        setCreditsState(credits)
    }, [credits])

    return (
        <>
            
                <div className={styles.cassette}>
                    <div className={`${styles.face} ${styles.front}`}>
                        {/* I set the href to '/' by default, because if I set it to empty '' I get this error:
                        Warning: An empty string ("") was passed to the href attribute.
                        To fix this, either do not render the element at all or pass null to
                        href instead of an empty string. */}
                        <a href={creditsState.license} target="_blank" rel="noreferrer" tabIndex={-1} className={styles.songTitle}>{creditsState !== null ? creditsState.name : ''} <FontAwesomeIcon icon={faCreativeCommons} color='white' /></a>
                        <a href={creditsState.artistWebsite} target="_blank" rel="noreferrer" tabIndex={-1} className={styles.artistName}>{creditsState !== null ? creditsState.artistName : ''} <FontAwesomeIcon icon={faArrowUpRightFromSquare} color='white' /></a>
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
            
        </>
    )
}

export default Walkman