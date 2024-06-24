import Image from 'next/image'
import type { ImageProps, StaticImageData } from 'next/image'
import ImageWithDialog from '@/components/base/image/WithDialog'

// Pixel GIF code adapted from https://stackoverflow.com/a/33919020/266535
const keyStr =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='

const triplet = (e1: number, e2: number, e3: number) =>
    keyStr.charAt(e1 >> 2) +
    keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
    keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
    keyStr.charAt(e3 & 63)

function rgbDataURL(r: number, g: number, b: number) {
    return `data:image/gif;base64,R0lGODlhAQABAPAA${triplet(0, r, g) + triplet(b, 255, 255)}/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`
}

function extractImageType(imageProps: ImageProps) {

    let imageType = ''

    if (imageProps !== null) {

        const imageTypeMatch = imageProps.title?.match(/\{(.*?)\}/)

        if (imageTypeMatch) {
            // the full match, for example "{ banner }"
            const imageTypeFull = imageTypeMatch[0]
            // the type only, for example "banner"
            imageType = imageTypeMatch[1].trim()
            // remove the image type info from the title
            const newTitle = imageProps.title?.replace(imageTypeFull, '').trim()

            if (newTitle !== '') {
                imageProps.title = newTitle
            } else {
                delete imageProps.title
            }
        }

    }

    return imageType

}

const ImageDispatch: React.FC<ImageProps> = (props): JSX.Element => {

    const newImageProps = { ...props }

    const imageType = extractImageType(newImageProps)

    const staticImageData = props.src as StaticImageData
    const src = staticImageData.src

    if (src?.endsWith('gif') || imageType === 'animated') {
        newImageProps.blurDataURL = rgbDataURL(255, 0, 125)
    }

    return (
        <>
            {imageType === 'banner' ? (
                <>
                    {/* eslint-disable-next-line jsx-a11y/alt-text */}
                    <Image
                        style={{
                            width: '100%',
                            height: 'auto',
                        }}
                        sizes="(max-width: 48rem) 100vw, 704px"
                        priority
                        placeholder="blur"
                        {...(newImageProps)}
                    />
                </>
            ) : (imageType === 'meme' || imageType === 'photo' || imageType === 'screenshot') ? (
                <ImageWithDialog {...(newImageProps)} />
            ) : (imageType === 'card') ? (
                <>
                    {/* eslint-disable-next-line jsx-a11y/alt-text */}
                    <Image
                        style={{
                            objectFit: 'cover',
                        }}
                        fill
                        sizes="(max-width: 48rem) 100vw, 336px"
                        placeholder="blur"
                        {...newImageProps}
                    />
                </>
            ) : (imageType === 'animated') ? (
                <>
                    {/* eslint-disable-next-line jsx-a11y/alt-text */}
                    <Image
                        style={{
                            width: '480px',
                            maxWidth: '100%',
                            height: 'auto',
                        }}
                        unoptimized
                        placeholder="blur"
                        {...(newImageProps)}
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
                        placeholder="blur"
                        {...(newImageProps)}
                    />
                </>
            )}
        </>
    )
}

export default ImageDispatch