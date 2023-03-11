import Image from 'next/image'

interface IProps {
    altText: string
}

const StaticImage: React.FC<IProps> = (props) => {

    const { altText } = props

    return (
        <Image
            src="/assets/images/neonroad/static-min.png"
            alt={altText}
            fill
            style={{ objectFit: 'cover' }}
            sizes="100vw"
            priority
            quality={80}
        />
    )
}

export default StaticImage