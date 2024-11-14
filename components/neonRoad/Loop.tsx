'use client'

import { useRef, useCallback, useEffect } from 'react'
import { useThree } from '@react-three/fiber'

interface IProps extends React.PropsWithChildren {
    canPlay?: boolean
}

const Loop: React.FC<IProps> = (props) => {

    const three = useThree()

    // animation request animation frame
    const requestAnimationFrameRef = useRef(0)
    const timeRef = useRef(0)

    // custom loop
    const loop = useCallback(() => {

        const currentTime = performance.now()

        // delta time in milliseconds
        const deltaTime = currentTime - (timeRef.current ? timeRef.current : 0)

        // extra measure for when the delta time is very high
        // this avoids that all terrains and threes move to their
        // distance threshold and then all reset their position
        // at the same time, leading to (pot-)holes in the road
        if (deltaTime > 100) {
            timeRef.current = currentTime
            requestAnimationFrameRef.current = requestAnimationFrame(loop)
            return
        }

        // max FPS = 30 frames per second
        //const framesPerSecond = 1 / 30

        // if the time since last frame is below the time for one frame
        // then we don't render in the current one but request the next one
        // !!! not sure why but limiting the fps this way actually
        // increases both the CPU and GPU usage
        //if (deltaTime < (framesPerSecond * 1000)) {
        //    //three.clock.elapsedTime = deltaTime
        //    requestAnimationFrameRef.current = requestAnimationFrame(loop)
        //    return
        //}

        // when frameloop is set to "never" advance() will
        // trigger the three fiber  render()
        three.advance(currentTime)

        timeRef.current = currentTime

        requestAnimationFrameRef.current = requestAnimationFrame(loop)

    }, [three])

    const start = useCallback(() => {

        three.clock.start()

        const currentTime = performance.now()

        timeRef.current = currentTime

        three.clock.elapsedTime = currentTime

        // https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
        requestAnimationFrameRef.current = requestAnimationFrame(loop)
    }, [loop, three.clock])

    const stop = useCallback(() => {

        three.clock.stop()

        cancelAnimationFrame(requestAnimationFrameRef.current)

    }, [three.clock])

    const changeAnimationState = useCallback(() => {
        if (document.hidden) {
            stop()
        } else {
            start()
        }
    }, [stop, start])

    useEffect(() => {
        if (three.frameloop === 'never') {
            // https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API
            document.addEventListener('visibilitychange', changeAnimationState)
            start()
        }
        return () => {
            document.removeEventListener('visibilitychange', changeAnimationState)
        }
    }, [changeAnimationState, start, three.frameloop])

    return (<>{props.children}</>)

}

export default Loop