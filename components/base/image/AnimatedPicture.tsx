import { getImageProps } from 'next/image'
import type { StaticImageData, ImageProps } from 'next/image'
import { rgbDataURL } from '@/lib/image'
import Image from 'next/image'

interface IAnimatedPictureProps extends Omit<ImageProps, 'src'> {
    avifPath: string
    webpStaticImport: StaticImageData
}

const ImageAnimatedPicture: React.FC<IAnimatedPictureProps> = (props): JSX.Element => {

    // Next.js displays this message in the terminal
    // The requested resource "/_next/static/media/wave_32.178d7408.webp" is an animated image so it will not be optimized. Consider adding the "unoptimized" property to the <Image>.
    // however if you add unoptimized it will set the cache-control header of the image to "no-store, must-revalidate"
    // after we comment the unoptimized option out, the cache-control is "public, max-age=315360000, immutable"
    const common = {
        alt: props.alt,
        //unoptimized: true,
        width: props.width,
        height: props.height,
        quality: 100,
        className: props.className,
    }

    //console.log(props)

    const {
        props: { src: webpSourceSrc, ...rest },
    } = getImageProps({
        ...common,
        placeholder: 'blur',
        blurDataURL: rgbDataURL(255, 0, 125),
        src: props.webpStaticImport
    })

    delete rest.srcSet

    const webpSource = webpSourceSrc?.replace('w=96', 'w=48')
    // animated avifs avif(s) can not be statically imported
    // also next/image reports "The requested resource isn't a valid image"
    // so just use a string for the path and we set a cache control header
    // via the next.js config file
    const avifSource = props.avifPath

    return (
        <>
            <picture>
                <source srcSet={avifSource} type="image/avif" />
                <source srcSet={webpSource} type="image/webp" />
                <Image src={webpSource} {...rest} />
            </picture>
        </>
    )
}

export default ImageAnimatedPicture