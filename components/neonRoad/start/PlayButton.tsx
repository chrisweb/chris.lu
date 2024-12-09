'use client'

interface IProps extends React.PropsWithChildren {
    playButtonCallback: () => void
    playButtonStyles: string
}

const PlayButton: React.FC<IProps> = (props) => {

    const { playButtonCallback, children, playButtonStyles } = props

    const pressStartClickHandler = (/*event: React.MouseEvent<HTMLButtonElement>*/) => {
        if (typeof playButtonCallback === 'function') {
            playButtonCallback()
        }
    }

    const pressStartKeyPressHandler = (event: React.KeyboardEvent<HTMLButtonElement>) => {
        if (event.key === 'Enter') {
            // prevent default, to avoid a click event to be
            // triggered on the powerOff button, which will
            // receive focus when the animation starts
            event.preventDefault()

            if (typeof playButtonCallback === 'function') {
                playButtonCallback()
            }
        }
    }

    return (
        <button
            onClick={pressStartClickHandler}
            onKeyDown={pressStartKeyPressHandler}
            className={playButtonStyles}
            aria-label="Play 3d animation"
        >
            {children}
        </button>
    )
}

export default PlayButton