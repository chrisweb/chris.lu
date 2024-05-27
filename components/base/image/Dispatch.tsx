import Image from 'next/image'
import type { ImageProps, StaticImageData } from 'next/image'
import ImageWithDialog from '@/components/base/image/WithDialog'

const ImageDispatch: React.FC<ImageProps> = (props): JSX.Element => {

    const staticImageData = props.src as StaticImageData
    const src = staticImageData.src

    const imageProps = { ...props }

    // Pixel GIF code adapted from https://stackoverflow.com/a/33919020/266535
    const keyStr =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='

    const triplet = (e1: number, e2: number, e3: number) =>
        keyStr.charAt(e1 >> 2) +
        keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
        keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
        keyStr.charAt(e3 & 63)

    const rgbDataURL = (r: number, g: number, b: number) =>
        `data:image/gif;base64,R0lGODlhAQABAPAA${triplet(0, r, g) + triplet(b, 255, 255)
        }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`

    if (src?.endsWith('gif')) {
        imageProps.blurDataURL = rgbDataURL(255, 0, 125)
    }

    return (
        <>
            {imageProps.alt.startsWith('banner') ? (
                <>
                    {/* eslint-disable-next-line jsx-a11y/alt-text */}
                    <Image
                        style={{
                            width: '100%',
                            height: 'auto',
                        }}
                        sizes="(max-width: 48rem) 100vw, 704px"
                        priority
                        placeholder={'blur'}
                        {...(imageProps)}
                    />
                </>
            ) : (imageProps.alt.startsWith('meme') || imageProps.alt.startsWith('photo') || imageProps.alt.startsWith('screenshot')) ? (
                <ImageWithDialog {...(imageProps)} />
            ) : (imageProps.alt.startsWith('card')) ? (
                <>
                    {/* eslint-disable-next-line jsx-a11y/alt-text */}
                    <Image
                        style={{
                            width: '100%',
                            height: 'auto',
                            objectFit: 'cover',
                        }}
                        sizes="(max-width: 48rem) 100vw, 336px"
                        placeholder="blur"
                        {...props}
                    />
                </>
            ) : (
                <>
                    {/* eslint-disable-next-line jsx-a11y/alt-text */}
                    <Image
                        style={{
                            maxWidth: '100%',
                            height: 'auto',
                        }}
                        sizes="(max-width: 48rem) 100vw, 704px"
                        placeholder={'blur'}
                        {...(imageProps)}
                    />
                </>
            )}
        </>
    )
}

export default ImageDispatch