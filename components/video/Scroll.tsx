'use client'

import { useRef, useEffect, useCallback } from 'react'
import { useInView, scroll } from 'framer-motion'
//import poster from '/public/assets/images/app/web_development/tutorials/next-js-static-mdx-blog/banner.png'

const VideoScroll: React.FC = () => {

    const videoElementRef = useRef<HTMLVideoElement>(null)
    const chunkSizeRef = useRef(0)

    const isInView = useInView(videoElementRef)

    useEffect(() => {

        const video = videoElementRef.current

        const cancel = scroll(() => {

            if (video !== null && chunkSizeRef.current > 0) {

                const frameFloat = window.scrollY * chunkSizeRef.current

                const frame = Math.round((frameFloat + Number.EPSILON) * 100) / 100

                video.currentTime = frame

            }

        })

        return () => {
            cancel()
        }

    }, [isInView])

    const calculateChunkSize = useCallback(() => {

        const modifier = 0.7

        chunkSizeRef.current = videoElementRef.current!.duration / (window.innerHeight * modifier)

    }, [])

    useEffect(() => {

        const video = videoElementRef.current

        video?.addEventListener('loadedmetadata', calculateChunkSize)

        video?.load()

        return () => {
            video?.removeEventListener('loadedmetadata', calculateChunkSize)
        }

    }, [calculateChunkSize])

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