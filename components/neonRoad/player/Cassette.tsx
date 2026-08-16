'use client'

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

    return (
        <>
            <div className={styles.cassette}>
                <div className={`${styles.face} ${styles.front}`}>
                    <a href={credits.license} target="_blank" rel="noreferrer" className={styles.songTitle}>
                        {credits.name}
                        &nbsp;
                        <FontAwesomeIcon icon={faCreativeCommons} color="white" />
                    </a>
                    <a href={credits.artistWebsite} target="_blank" rel="noreferrer" className={styles.artistName}>
                        {credits.artistName}
                        &nbsp;
                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} color="white" />
                    </a>
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