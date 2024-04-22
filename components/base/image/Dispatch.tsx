import Image, { ImageProps } from 'next/image'
import ImageWithDialog from '@/components/base/image/WithDialog'

const ImageDispatch: React.FC<ImageProps> = (props): JSX.Element => {

    let optimizable = true

    // something is odd here, but I have not found the reason yet
    // src is either of type string or StaticImport and somehow ts
    // thinks that when it is of type StaticImport that the object
    // has no properties
    // @ts-ignore: because the library definition is wrong
    const src = props.src?.src as string
    if (src.endsWith('gif')) {
        optimizable = false
    }

    return (
        <>
            {props.alt.startsWith('banner') ? (
                <>
                    {/* eslint-disable-next-line jsx-a11y/alt-text */}
                    <Image
                        style={{
                            width: '100%',
                            height: 'auto',
                        }}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority
                        placeholder={optimizable ? 'blur' : 'empty'}
                        {...(props)}
                    />
                </>
            ) : (props.alt.startsWith('meme') || props.alt.startsWith('photo') || props.alt.startsWith('screenshot')) ? (
                <ImageWithDialog {...(props)} />
            ) : (
                <>
                    {/* eslint-disable-next-line jsx-a11y/alt-text */}
                    <Image
                        style={{
                            maxWidth: '100%',
                            height: 'auto',
                        }}
                        placeholder={optimizable ? 'blur' : 'empty'}
                        unoptimized={optimizable ? false : true}
                        {...(props)}
                    />
                </>
            )}
        </>
    )
}

export default ImageDispatch