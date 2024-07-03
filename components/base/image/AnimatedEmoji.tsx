import { getImageProps } from 'next/image'
import type { StaticImageData, ImageProps } from 'next/image'

interface IAnimatedEmojiProps extends Omit<ImageProps, 'src'> {
    gifStaticImport: StaticImageData
    webpStaticImport: StaticImageData
    //avifStaticImport: StaticImageData
}

const ImageAnimatedEmoji: React.FC<IAnimatedEmojiProps> = (props): JSX.Element => {

    // Next.js displays this message in the terminal
    // The requested resource "/_next/static/media/wave_32.178d7408.webp" is an animated image so it will not be optimized. Consider adding the "unoptimized" property to the <Image>.
    // however if you add unoptimized it will set the cache-control header of the image to "no-store, must-revalidate"
    // after we comment the unoptimized option out, the cache-control is "public, max-age=315360000, immutable"
    const common = {
        alt: '',
        //unoptimized: true,
        width: 46,
        height: 46,
        quality: 100,
    }

    const {
        props: { src: gifSourceSrc, ...rest },
    } = getImageProps({
        ...common,
        src: props.gifStaticImport
    })

    const {
        props: { src: webpSourceSrc },
    } = getImageProps({
        ...common,
        src: props.webpStaticImport
    })

    /*const {
        props: { src: avifSourceSrc },
    } = getImageProps({
        ...common,
        src: props.avifStaticImport
    })*/

    return (
        <>
            <picture>
                {/*<source srcSet={avifSourceSrc} type="image/avif" />*/}
                <source srcSet={webpSourceSrc} type="image/webp" />
                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                <img src={gifSourceSrc} {...rest} className="animatedEmoji" />
            </picture>
        </>
    )
}

export default ImageAnimatedEmoji