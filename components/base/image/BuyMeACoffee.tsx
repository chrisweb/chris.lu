import { getImageProps } from 'next/image'
import type { StaticImageData, ImageProps } from 'next/image'

interface IAnimatedEmojiProps extends Omit<ImageProps, 'src'> {
    staticImport: StaticImageData
}

const ImageBuyMeACoffee: React.FC<IAnimatedEmojiProps> = (props): JSX.Element => {

    const common = {
        alt: '',
        width: 240,
        height: 48,
        quality: 100,
    }

    const {
        props: { src: sourceSrc, ...rest },
    } = getImageProps({
        ...common,
        src: props.staticImport
    })

    delete rest.srcSet

    const output = sourceSrc.replace('w=640', 'w=256')

    return (
        <>
            {/* eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element */}
            <img src={output} {...rest} />
        </>
    )
}

export default ImageBuyMeACoffee