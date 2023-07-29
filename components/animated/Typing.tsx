'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import styles from './typing.module.css'

interface IProps {
    children: React.ReactNode
}

const Button: React.FC<IProps> = ({ children }) => {

    const wordsList = children.toString()
    const parts = wordsList.split(', ')
    const requestAnimationFrameRef = useRef(0)
    const animationTimestampRef = useRef(0)
    const partIndexRef = useRef(0)
    const characterIndexRef = useRef(0)
    const pauseIndexRef = useRef(20)
    const actionRef = useRef('type')

    const [wordState, setWordState] = useState('')

    const updatePartIndex = useCallback(() => {
        if (partIndexRef.current < parts.length - 1) {
            partIndexRef.current++
        } else {
            partIndexRef.current = 0
        }
    }, [parts])

    const type = useCallback(() => {
        const part = parts[partIndexRef.current]
        const charactersArray = [...part]
        const character = charactersArray[characterIndexRef.current]
        if (characterIndexRef.current < charactersArray.length - 1) {
            // we have NOT reached the end of the characters array
            characterIndexRef.current++
        } else {
            // no characters left, jump to next part
            updatePartIndex()
            // change the action, to "undo" the characters
            actionRef.current = 'pause'
        }
        setWordState((previousState) => {
            return previousState += character
        })
    }, [parts, updatePartIndex])

    const pause = useCallback(() => {
        if (pauseIndexRef.current >= 0) {
            // the pause is NOT done yet
            pauseIndexRef.current--
        } else {
            // change the action, to "type" again
            actionRef.current = 'undo'
            // reset the pause index
            pauseIndexRef.current = 20
        }
    }, [])

    const undo = useCallback(() => {
        if (characterIndexRef.current > 0) {
            // we have NOT removed all characters yet
            characterIndexRef.current--
        } else {
            // change the action, to "pause"
            actionRef.current = 'type'
        }
        setWordState((previousState) => {
            return previousState.slice(0, -1)
        })
    }, [])

    const animate = useCallback((timeStamp: number) => {
        // only once every 120ms
        // increase to slow animation down
        if (timeStamp - animationTimestampRef.current >= 1 * 130) {
            switch (actionRef.current) {
                case 'type':
                    type()
                    break
                case 'pause':
                    pause()
                    break
                case 'undo':
                    undo()
                    break
            }
            animationTimestampRef.current = timeStamp
        }
        requestAnimationFrame(animate)
    }, [type, undo, pause])

    useEffect(() => {
        requestAnimationFrameRef.current = requestAnimationFrame(animate)
        return () => {
            cancelAnimationFrame(requestAnimationFrameRef.current)
        }
    }, [animate])

    return (
        <>
            <span className={styles.blinkingCarret}>{wordState}</span>
        </>
    )
}

export default Button