'use client'

import { useRef, useEffect, useCallback } from 'react'

const VideoScroll: React.FC = () => {

    const videoRef = useRef<HTMLVideoElement>(null)
    const requestAnimationFrameRef = useRef(0)

    const scrollPlay = useCallback(() => {

        let frame = 0
        let chunkLength = 0

        if (window.scrollY > window.innerHeight) {
            requestAnimationFrameRef.current = window.requestAnimationFrame(scrollPlay)
            return
        }

        if (typeof videoRef.current?.duration === 'number') {
            chunkLength = videoRef.current.duration / window.innerHeight
        }

        frame = window.scrollY * chunkLength
/*
console.log(videoRef.current?.duration)
console.log(chunkLength)
console.log(window.scrollY)
console.log(window.innerHeight)
console.log(frame)
//console.log(videoRef.current)
console.log('------')
//cancelAnimationFrame(requestAnimationFrameRef.current)
*/

        if (videoRef.current && chunkLength > 0) {
            videoRef.current.currentTime = frame
            requestAnimationFrameRef.current = window.requestAnimationFrame(scrollPlay)
        }
        
    }, [])

    const start = useCallback(() => {
console.log('#### starting')
        requestAnimationFrameRef.current = window.requestAnimationFrame(scrollPlay)
    }, [scrollPlay])

    useEffect(() => {

        const video = videoRef.current

        video?.addEventListener('loadedmetadata', start)

        video?.load()

        return () => {
            cancelAnimationFrame(requestAnimationFrameRef.current)
            video?.removeEventListener('loadedmetadata', start)
        }

    }, [start])

    return (
        <>
            <div id="set-height"></div>
            <video ref={videoRef} muted playsInline preload="auto" title="a voodoo lady mixing potions in a big cauldron, it represents a dev using different packages to build a project using an IDE" poster="/assets/images/app/web_development/tutorials/next-js-static-mdx-blog/banner.png">
                <source src="/assets/video/app/web_development/tutorials/next-js-static-mdx-blog/banner.mp4" type="video/mp4" />
                <p>Your browser doesn&apos;t support HTML5 video.</p>
            </video>
        </>
    )
}

export default VideoScroll