'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import styles from './typing.module.css'

interface IProps {
    children: React.ReactNode
}

const colors = ['#09f7ee', '#2dd2e3', '#649bd5', '#9d63c5', '#d628b5', '#ff00aa']
let lastColor = ''

const getRandomColor = (): string => {
    const random = Math.floor(Math.random() * colors.length)
    const color = colors[random]
    if (color !== lastColor) {
        lastColor = color
        return color
    } else {
        return getRandomColor()
    }
}

const Button: React.FC<IProps> = ({ children }) => {

    const wordsList = children ? children.toString() : ''
    const parts = wordsList.split(', ')
    const requestAnimationFrameRef = useRef(0)
    const animationTimestampRef = useRef(0)
    const partIndexRef = useRef(0)
    const characterIndexRef = useRef(0)
    const pauseIndexRef = useRef(20)
    const actionRef = useRef('type')
    const withColorChange = true

    const [wordState, setWordState] = useState('')
    const [colorState, setColorState] = useState('#fff')

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
        // set a new color
        if (withColorChange && characterIndexRef.current === 0) {
            const color = getRandomColor()
            setColorState(color)
        }
        if (characterIndexRef.current < charactersArray.length - 1) {
            // we have NOT reached the end of the characters array
            characterIndexRef.current++
        } else {
            // no characters left, jump to next part
            updatePartIndex()
            // part typing done, make a pause
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
            // pause done, remove current part
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
            // all characters removed, type next
            actionRef.current = 'type'
        }
        setWordState((previousState) => {
            return previousState.slice(0, -1)
        })
    }, [])

    const animate = useCallback((timeStamp: number) => {
        // only once every 130ms
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
        requestAnimationFrameRef.current = requestAnimationFrame(animate)
    }, [type, undo, pause])

    useEffect(() => {
        requestAnimationFrameRef.current = requestAnimationFrame(animate)
        return () => {
            cancelAnimationFrame(requestAnimationFrameRef.current)
        }
    }, [animate])

    return (
        <>
            <span className={styles.blinkingCarret} style={{ color: colorState }}>{wordState}</span>
        </>
    )
}

export default Button