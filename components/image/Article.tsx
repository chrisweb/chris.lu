import Image, { ImageProps } from 'next/image'

const ImageArticle: React.FC<ImageProps> = (props): JSX.Element => {

    return (
        <>
            {props.alt.startsWith('banner') ? (
                <Image
                    style={{
                        width: '100%',
                        height: 'auto',
                    }}
                    sizes="100vw"
                    priority
                    placeholder="blur"
                    //quality={90} // default is 75
                    {...(props as ImageProps)}
                />
            ) : (props.alt.startsWith('photo') || props.alt.startsWith('screenshot')) ? (
                <Image
                    style={{
                        width: '100%',
                        height: 'auto',
                    }}
                    sizes="100vw"
                    placeholder="blur"
                    {...(props as ImageProps)}
                />
            ) : (
                <Image
                    style={{
                        maxWidth: '100%',
                        height: 'auto',
                    }}
                    placeholder="blur"
                    {...(props as ImageProps)}
                />
            )}
        </>
    )
}

export default ImageArticle