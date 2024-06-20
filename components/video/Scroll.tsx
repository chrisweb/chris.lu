'use client'

import { useRef, useEffect, useCallback } from 'react'
import { useInView, scroll } from 'framer-motion'
import ImageDispatch from '@/components/base/image/Dispatch'
import poster from '/public/assets/images/app/web_development/tutorials/next-js-static-mdx-blog/banner.png'

const VideoScroll: React.FC = () => {

    const videoElementRef = useRef<HTMLVideoElement>(null)
    const chunkSizeRef = useRef(0)

    const isInView = useInView(videoElementRef)

    useEffect(() => {

        const video = videoElementRef.current

        const cancel = scroll(() => {

            if (video !== null && chunkSizeRef.current > 0 && isInView) {
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

        videoElementRef.current!.pause()

        chunkSizeRef.current = videoElementRef.current!.duration / window.innerHeight

    }, [])

    useEffect(() => {

        const video = videoElementRef.current

        video?.addEventListener('loadedmetadata', calculateChunkSize)

        video?.load()

        return () => {
            video?.removeEventListener('loadedmetadata', calculateChunkSize)
        }

    }, [calculateChunkSize])

    const altText = 'a voodoo lady mixing potions in a big cauldron, it represents a dev using different packages to build a project using an IDE'

    return (
        <div className="videoContainer" style={{ width: '100%', position: 'relative' }}>
            <video style={{ position: 'absolute', zIndex: '10' }} ref={videoElementRef} muted playsInline preload="auto" title={altText} poster="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=">
                <source src="/assets/video/app/web_development/tutorials/next-js-static-mdx-blog/banner.webm" type="video/webm" />
                <source src="/assets/video/app/web_development/tutorials/next-js-static-mdx-blog/banner.mp4" type="video/mp4" />
                <p>Your browser doesn&apos;t support HTML5 video.</p>
            </video>
            <ImageDispatch
                src={poster}
                alt={altText}
                title="{ banner }"
            />
        </div>
    )
}

export default VideoScroll