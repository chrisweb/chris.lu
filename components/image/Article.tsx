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
                    placeholder="blur"
                    //quality={90} // default is 75
                    {...(props as ImageProps)}
                />
            ) : (
                <Image
                    fill
                    sizes="100vw"
                    style={{ objectFit: 'cover' }}
                    placeholder="blur"
                    {...(props as ImageProps)}
                />
            )}
        </>
    )
}

export default ImageArticle