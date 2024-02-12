import { useEffect, useState, useRef } from 'react'

const useObserver = (elementsToObserve: string, rootMargin: string) => {

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
                rootMargin: rootMargin
            })

            const elements = document.querySelectorAll(elementsToObserve)

            elements.forEach((elem) => observerRef.current !== null ? observerRef.current.observe(elem) : null)
        }

        return () => {
            observerRef.current?.disconnect()
        }

    }, [elementsToObserve, rootMargin])

    return { activeIdState }

}

export default useObserver