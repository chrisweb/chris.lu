import { useEffect, useState, useRef } from 'react'

const useIntersectionObserver = (querySelector: string, rootMargin: string, threshold: number) => {

    const [activeIdState, setActiveIdState] = useState('')
    const observerRef = useRef<IntersectionObserver | null>(null)

    useEffect(() => {

        const handleObsever = (entries: IntersectionObserverEntry[]) => {

            entries.forEach((entry) => {
                if (entry?.isIntersecting) {
                    setActiveIdState(entry.target.id)
                }
            })

        }

        if (observerRef !== undefined) {

            observerRef.current = new IntersectionObserver(handleObsever, {
                rootMargin: rootMargin,
                threshold: threshold,
            })

            const elements = document.querySelectorAll(querySelector)

            elements.forEach((elem) => observerRef.current !== null ? observerRef.current.observe(elem) : null)
        }

        return () => {
            observerRef.current?.disconnect()
        }

    }, [querySelector, rootMargin, threshold])

    return { activeIdState }

}

export default useIntersectionObserver