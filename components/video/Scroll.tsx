'use client'

import { useRef, useEffect, useCallback } from 'react'
import ImageDispatch from '@/components/base/image/Dispatch'
import poster from '@/public/assets/images/app/web_development/tutorials/next-js-static-mdx-blog/banner.png'

const VideoScroll: React.FC = () => {

    const videoElementRef = useRef<HTMLVideoElement>(null)
    const chunkSizeRef = useRef(0)
    const timeRef = useRef(0)
    const firstScrollRef = useRef(true)

    const isInViewCheck = (element: HTMLElement) => {

        // https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
        const rect = element.getBoundingClientRect()

        // to also check for left right add these checks
        // rect.left >= 0 &&
        // rect.right <= (window.innerWidth || document.documentElement.clientWidth)

        return (
            rect.bottom >= 0 &&
            rect.top <= (window.innerHeight || document.documentElement.clientHeight)
        )
    }

    const scrollPlay = useCallback(() => {

        const video = videoElementRef.current

        if (video === null) {
            return
        }

        if (firstScrollRef.current) {
            firstScrollRef.current = false
            // when scroll starts set first frame
            // this will remove the poster making the video visible
            // it will also make sure that the video dimensions (especially height)
            // are set to the correct values
            // until the video starts the browser assumes it is a rectangle
            video.currentTime = 0
        }

        const currentTime = performance.now()
        // delta time in milliseconds
        const deltaTime = currentTime - (timeRef.current ? timeRef.current : 0)
        const isInView = isInViewCheck(video)

        if (!isInView) {
            return
        }

        if (deltaTime < 100) {
            return
        }

        if (chunkSizeRef.current > 0) {
            const frameFloat = window.scrollY * chunkSizeRef.current
            const frame = Math.round((frameFloat + Number.EPSILON) * 1000) / 1000
            video.currentTime = frame
        }

    }, [])

    const start = useCallback(() => {

        videoElementRef.current?.pause()

        let videoElementDuration = 0

        if (videoElementRef.current) {
            videoElementDuration = videoElementRef.current.duration
        }

        chunkSizeRef.current = videoElementDuration / window.innerHeight

        window.addEventListener('scroll', scrollPlay)

        return () => {
            window.removeEventListener('scroll', scrollPlay)
        }

    }, [scrollPlay])

    useEffect(() => {

        const video = videoElementRef.current

        video?.addEventListener('loadedmetadata', start)

        video?.load()

        return () => {
            video?.removeEventListener('loadedmetadata', start)
        }

    }, [start])

    const altText = 'a voodoo lady mixing potions in a big cauldron, it represents a dev using different packages to build a project using an IDE'

    return (
        <div className="videoContainer" style={{ width: '100%', position: 'relative', display: 'flex', flexDirection: 'column' }}>
            <video id="banner_video" style={{ position: 'absolute', zIndex: 10, flexShrink: 1 }} ref={videoElementRef} muted playsInline preload="auto" title={altText} poster="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=">
                <source src="/assets/video/app/web_development/tutorials/next-js-static-mdx-blog/banner.mp4" type="video/mp4" />
                <source src="/assets/video/app/web_development/tutorials/next-js-static-mdx-blog/banner.webm" type="video/webm" />
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