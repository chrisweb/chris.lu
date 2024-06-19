'use client'

import { useRef, useEffect, useCallback } from 'react'
//import { useScroll } from 'framer-motion'
import { useInView, scroll } from 'framer-motion'
//import poster from '/public/assets/images/app/web_development/tutorials/next-js-static-mdx-blog/banner.png'

const VideoScroll: React.FC = () => {

    const videoElementRef = useRef<HTMLVideoElement>(null)
    const videoDurationRef = useRef(0)

    /*const { scrollY } = useScroll({
        target: videoElementRef,
        offset: ['start end', 'end end'],
    })

    useEffect(() => {

        const video = videoElementRef.current

        console.log('@@@@ scrollYProgress', scrollY.get())
        console.log('video !== null', video !== null)
        console.log('video.duration', video?.duration)

        if (video !== null && video.duration > 0) {

            const frameFloat = video.duration * scrollY.get()

            const frame = Math.round((frameFloat + Number.EPSILON) * 100) / 100

            console.log('@@@@ frame', frame)

            video.currentTime = frame

        }

    }, [scrollY])*/

    const isInView = useInView(videoElementRef)

    useEffect(() => {

        const video = videoElementRef.current

        scroll(() => {

            if (video !== null && videoDurationRef.current > 0) {

                let frame = 0
                let chunkLength = 0
                const modifier = 0.7

                chunkLength = videoDurationRef.current / (window.innerHeight * modifier)

                const frameFloat = window.scrollY * chunkLength

                frame = Math.round((frameFloat + Number.EPSILON) * 100) / 100

                video.currentTime = frame

            }

        })

    }, [isInView])

    const setDuration = useCallback(() => {

        videoDurationRef.current = videoElementRef.current!.duration

    }, [])

    useEffect(() => {

        const video = videoElementRef.current

        video?.addEventListener('loadedmetadata', setDuration)

        video?.load()

        return () => {
            video?.removeEventListener('loadedmetadata', setDuration)
        }

    }, [setDuration])

    return (
        <>
            <video ref={videoElementRef} muted playsInline preload="auto" title="a voodoo lady mixing potions in a big cauldron, it represents a dev using different packages to build a project using an IDE" poster="/assets/images/app/web_development/tutorials/next-js-static-mdx-blog/poster.jpg">
                <source src="/assets/video/app/web_development/tutorials/next-js-static-mdx-blog/banner.webm" type="video/webm" />
                <source src="/assets/video/app/web_development/tutorials/next-js-static-mdx-blog/banner.mp4" type="video/mp4" />
                <p>Your browser doesn&apos;t support HTML5 video.</p>
            </video>
        </>
    )
}

export default VideoScroll