import Image from 'next/image'
import type { ImageProps, StaticImageData } from 'next/image'
import ImageWithDialog, { type IImageWithDialog } from '@/components/base/image/WithDialog'
import { rgbDataURL } from '@/lib/image'

function extractImageType(imageProps: ImageProps, newImageProps: Omit<ImageProps, 'alt'>) {
    let imageType = ''
    const imageTypeMatch = imageProps.title?.match(/\{(.*?)\}/)

    if (imageTypeMatch) {
        // the full match, for example "{ banner }"
        const imageTypeFull = imageTypeMatch[0]
        // the type only, for example "banner"
        imageType = imageTypeMatch[1].trim()
        // remove the image type info from the title
        const newTitle = imageProps.title?.replace(imageTypeFull, '').trim()

        if (newTitle !== '') {
            newImageProps.title = newTitle
        } else {
            delete newImageProps.title
        }
    }

    return imageType
}

const ImageDispatch: React.FC<ImageProps> = (props) => {
    const { alt, ...rest } = props
    const newImageProps = { ...rest }
    const imageType = extractImageType(props, newImageProps)
    const staticImageData = props.src as StaticImageData
    const src = staticImageData.src

    if (!src) {
        return null
    }

    if (src.endsWith('gif') || imageType === 'animated') {
        newImageProps.blurDataURL = rgbDataURL(255, 0, 125)
    }

    if (imageType === 'banner') {
        return (
            <Image
                style={{
                    width: '100%',
                    height: 'auto'
                }}
                // 704px = 768px - (2 x 32px)
                // banner width = middle max width - (2 x spacing)
                sizes="(max-width: 768px) 100vw, 704px"
                priority
                placeholder="blur"
                alt={alt || ''}
                {...newImageProps}
            />
        )
    }

    if (imageType === 'meme' || imageType === 'photo' || imageType === 'screenshot') {
        return (
            <ImageWithDialog {...(newImageProps as IImageWithDialog)} alt={alt || ''} />
        )
    }

    if (imageType === 'card') {
        return (
            <Image
                style={{
                    objectFit: 'cover'
                }}
                fill
                // 336px = (768px - (2 x 32px) - 32px) / 2
                // thumbnail width = (middle max width - (2 x spacing) - grid space between two columns) / 2
                sizes="(max-width: 768px) 100vw, 336px"
                placeholder="blur"
                alt={alt || ''}
                {...newImageProps}
            />
        )
    }

    if (imageType === 'animated') {
        return (
            <Image
                style={{
                    width: '480px',
                    maxWidth: '100%',
                    height: 'auto'
                }}
                unoptimized
                placeholder="blur"
                alt={alt || ''}
                {...newImageProps}
            />
        )
    }

    return (
        <Image
            style={{
                maxWidth: '100%',
                height: 'auto'
            }}
            // 704px = 768px - (2 x 32px)
            // banner width = middle max width - (2 x spacing)
            sizes="(max-width: 768px) 100vw, 704px"
            placeholder="blur"
            alt={alt || ''}
            {...newImageProps}
        />
    )
}

export default ImageDispatch