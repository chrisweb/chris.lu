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
        // on press enter key
        if (event.code === '13') {
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
        >
            {children}
        </button>
    )
}

export default PlayButton