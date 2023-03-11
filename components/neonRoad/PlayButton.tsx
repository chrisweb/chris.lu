'use client'

import PlayIcon from './PlayIcon'

interface IProps {
    clickPlayCallback: () => void
}

const PlayButton: React.FC<IProps> = (props) => {

    const clickPlayHandler = (event: React.MouseEvent) => {
        console.log(event)
        const { clickPlayCallback } = props
        clickPlayCallback()
    }

    return (
        <>
            <div
                onClick={clickPlayHandler}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                }}
            >
                <PlayIcon
                    fill='#fff'
                    fillOpacity='0.8'
                    style={{
                        height: '25%',
                        width: 'auto',
                    }}
                />
            </div>
        </>
    )
}

export default PlayButton