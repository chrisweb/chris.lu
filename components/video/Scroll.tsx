'use client'

import { useRef, useEffect, useCallback } from 'react'

const VideoScroll: React.FC = () => {

    const videoRef = useRef<HTMLVideoElement>(null)

    //const frameNumber = 0 // start video at frame 0
    // lower numbers = faster playback
    const playbackConst = 100

    // Use requestAnimationFrame for smooth playback
    const scrollPlay = useCallback(() => {
        const frameNumber = window.scrollY / playbackConst

console.log(window.scrollY)
console.log(frameNumber)

        if (videoRef.current !== null) {
            videoRef.current.currentTime = frameNumber
        }
        window.requestAnimationFrame(scrollPlay)
    }, [])

    useEffect(() => {

        // get page height from video duration
        //const setHeight = window.document.getElementById('set-height')

        // dynamically set the page height according to video length
        videoRef.current?.addEventListener('loadedmetadata', function () {
            /*if (setHeight !== null && typeof videoRef.current?.duration === 'number') {
                setHeight.style.height = Math.floor(videoRef.current.duration) * playbackConst + 'px'
            }*/

                
        })

        window.requestAnimationFrame(scrollPlay)

    }, [scrollPlay])

    return (
        <>
            <div id="set-height"></div>
            <video ref={videoRef} controls preload="preload" title="a voodoo lady mixing potions in a big cauldron, it represents a dev using different packages to build a project using an IDE" poster="/assets/images/app/web_development/tutorials/next-js-static-mdx-blog/banner.png">
                <source src="/assets/video/app/web_development/tutorials/next-js-static-mdx-blog/banner.mp4" type="video/mp4" />
                <p>Your browser doesn&apos;t support HTML5 video.</p>
            </video>
        </>
    )
}

export default VideoScroll