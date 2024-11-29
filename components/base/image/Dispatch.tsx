import Image from 'next/image'
import type { ImageProps, StaticImageData } from 'next/image'
import ImageWithDialog, { type IImageWithDialog } from '@/components/base/image/WithDialog'
import { rgbDataURL } from '@/lib/image'

function extractImageType(imageProps: ImageProps) {

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
            imageProps.title = newTitle
        } else {
            delete imageProps.title
        }

    }

    return imageType

}

const ImageDispatch: React.FC<ImageProps> = (props): React.JSX.Element => {

    const newImageProps = { ...props }

    const imageType = extractImageType(newImageProps)

    const staticImageData = props.src as StaticImageData
    const src = staticImageData.src

    if (src.endsWith('gif') || imageType === 'animated') {
        newImageProps.blurDataURL = rgbDataURL(255, 0, 125)
    }

    // TODO: fix indentation, I mean it passes linting
    // but it does not "look right"
    return (
        <>
            {(imageType === 'banner') ?
                (
                    <>
                        {/* eslint-disable-next-line jsx-a11y/alt-text */}
                        <Image
                            style={{
                                width: '100%',
                                height: 'auto',
                            }}
                            // 704px = 768px - (2 x 32px)
                            // banner width = middle max width - (2 x spacing)
                            sizes="(max-width: 768px) 100vw, 704px"
                            priority
                            placeholder="blur"
                            {...(newImageProps)}
                        />
                    </>
                ) :
                (imageType === 'meme' || imageType === 'photo' || imageType === 'screenshot') ?
                    (
                        <>
                            <ImageWithDialog {...(newImageProps as IImageWithDialog)} alt={newImageProps.alt || ''} />
                        </>
                    ) :
                    (imageType === 'card') ?
                        (
                            <>
                                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                                <Image
                                    style={{
                                        objectFit: 'cover',
                                    }}
                                    fill
                                    // 336px = (768px - (2 x 32px) - 32px) / 2
                                    // thumbnail width = (middle max width - (2 x spacing) - grid space between two columns) / 2
                                    sizes="(max-width: 768px) 100vw, 336px"
                                    placeholder="blur"
                                    {...newImageProps}
                                />
                            </>
                        ) :
                        (imageType === 'animated') ?
                            (
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
                            ) :
                            (
                                <>
                                    {/* eslint-disable-next-line jsx-a11y/alt-text */}
                                    <Image
                                        style={{
                                            maxWidth: '100%',
                                            height: 'auto',
                                        }}
                                        // 704px = 768px - (2 x 32px)
                                        // banner width = middle max width - (2 x spacing)
                                        sizes="(max-width: 768px) 100vw, 704px"
                                        placeholder="blur"
                                        {...(newImageProps)}
                                    />
                                </>
                            )}
        </>
    )
}

export default ImageDispatch