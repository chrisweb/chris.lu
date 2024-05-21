import Image from 'next/image'
import fallback from '/public/assets/images/neonroad/fallback.png'

interface IProps {
    altText: string
}

const StaticImage: React.FC<IProps> = (props) => {

    const { altText } = props

    return (
        <Image
            src={fallback}
            alt={altText}
            fill
            style={{
                objectFit: 'cover',
                objectPosition: 'center',
            }}
            sizes="100vw"
            priority
            placeholder='blur'
        />
    )
}

export default StaticImage