'use client'

import PlayIcon from './PlayIcon'

interface IProps {
    clickPlayCallback: () => void
}

const PlayButton: React.FC<IProps> = (props) => {

    const clickPlayHandler = (/*event: React.MouseEvent*/) => {
        //console.log(event)
        const { clickPlayCallback } = props
        clickPlayCallback()
    }

    return (
        <>
            <div
                onClick={clickPlayHandler}
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    top: '10%',
                    zIndex: '20',
                }}
            >
                <PlayIcon
                    fill='#fff400'
                    fillOpacity='0.8'
                    style={{
                        height: '50%',
                        width: 'auto',
                    }}
                />
            </div>
        </>
    )
}

export default PlayButton