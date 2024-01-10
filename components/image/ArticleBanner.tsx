import Image, { ImageProps } from 'next/image'



const ImageArticleBanner: React.FC<ImageProps> = (props): JSX.Element => {

    //console.log(props)

    return (
        <>
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
        </>
    )
}

export default ImageArticleBanner