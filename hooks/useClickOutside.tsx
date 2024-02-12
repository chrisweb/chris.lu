import { useRef, useEffect } from 'react'

export type TypeCallback = () => void

const useClickOutside = (callback: TypeCallback) => {

    const ref = useRef<HTMLElement | null>(null)

    useEffect(() => {

        const clickHandler: EventListenerOrEventListenerObject = (event) => {
            if (ref.current && event.target !== null && !ref.current.contains(event.target as Node)) {
                callback()
            }
        }

        document.addEventListener('click', clickHandler)

        return () => {
            document.removeEventListener('click', clickHandler)
        }

    }, [ref, callback])

    return ref

}

export default useClickOutside