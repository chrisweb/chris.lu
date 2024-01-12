import Image, { ImageProps } from 'next/image'

const ImageArticle: React.FC<ImageProps> = (props): JSX.Element => {

    //console.log(props)

    return (
        <>
            {props.alt.substring(0, 6) === 'banner' ? (
                <Image
                    style={{
                        width: '100%',
                        height: 'auto',
                    }}
                    sizes="100vw"
                    priority
                    quality={100}
                    placeholder="blur"
                    {...(props as ImageProps)}
                />
            ) : (
                <Image
                    quality={90}
                    placeholder="blur"
                    {...(props as ImageProps)}
                />
            )}
        </>
    )
}

export default ImageArticle