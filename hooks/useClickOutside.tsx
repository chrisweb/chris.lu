import { useRef, useEffect } from 'react'

export type ICallback = () => void

const useClickOutside = (callback: ICallback) => {

    const ref = useRef(null)

    useEffect(() => {

        const clickHandler: EventListenerOrEventListenerObject = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
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