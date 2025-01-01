import { useEffect, useState, useRef } from 'react'

const useIntersectionObserver = (querySelector: string, rootMargin: string, threshold: number) => {

    const [activeIdState, setActiveIdState] = useState('')
    const observerRef = useRef<IntersectionObserver | null>(null)

    useEffect(() => {

        const handleObserver = (entries: IntersectionObserverEntry[]) => {

            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveIdState(entry.target.id)
                }
            })

        }

        if (typeof observerRef !== 'undefined') {

            observerRef.current = new IntersectionObserver(handleObserver, {
                rootMargin: rootMargin,
                threshold: threshold,
            })

            const elements = document.querySelectorAll(querySelector)

            elements.forEach((elem) => {
                if (observerRef.current === null) return
                observerRef.current.observe(elem)
            })
        }

        return () => {
            observerRef.current?.disconnect()
        }

    }, [querySelector, rootMargin, threshold])

    return { activeIdState }

}

export default useIntersectionObserver