import { useEffect, useState } from 'react'

const useIntersectionObserver = (querySelector: string, rootMargin: string, threshold: number) => {

    const [activeIdState, setActiveIdState] = useState('')

    useEffect(() => {

        const handleObserver = (entries: IntersectionObserverEntry[]) => {

            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveIdState(entry.target.id)
                }
            })

        }

        const observer = new IntersectionObserver(handleObserver, {
            rootMargin: rootMargin,
            threshold: threshold,
        })

        const elements = document.querySelectorAll(querySelector)

        elements.forEach((elem) => {
            observer.observe(elem)
        })

        return () => {
            observer.disconnect()
        }

    }, [querySelector, rootMargin, threshold])

    return { activeIdState }

}

export default useIntersectionObserver