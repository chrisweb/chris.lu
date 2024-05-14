import { ImageResponse } from 'next/og'

// Route segment config
export const runtime = 'edge'

// Image metadata
export const size = {
    width: 1200,
    height: 630,
}

export const contentType = 'image/png'

export const alt = 'Chris.lu banner'

/*interface IImageProps {
    params: {
        slug: string
    }
    id: number
}*/

// Image generation
export default async function OGImage(/*props: IImageProps*/) {

    //console.log(props)

    // Font
    const permanentMarkerRegular = fetch(
        new URL('/public/assets/fonts/PermanentMarker-Regular.ttf', import.meta.url)
    ).then((res) => res.arrayBuffer())

    const imageData = await fetch(
        new URL('/public/assets/images/og_image_background_1200x630.jpg', import.meta.url)
    ).then((res) => res.arrayBuffer())

    return new ImageResponse(
        // ImageResponse JSX element
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {
                    // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element 
                    <img
                        // @ts-ignore: this is fine 🔥
                        src={imageData}
                        style={{
                            objectFit: 'cover',
                            objectPosition: 'center',
                        }}
                    />
                }
                <span
                    style={{
                        position: 'absolute',
                        width: '600',
                        height: '350',
                        left: '24%',
                        bottom: '0',
                        textAlign: 'center',
                        margin: 0,
                        transform: 'skew(351deg, 351deg)',
                        fontFamily: 'PermanentMarkerRegular',
                        fontWeight: 400,
                        fontStyle: 'normal',
                        fontSize: '150',
                        backgroundImage: 'linear-gradient(45deg in srgb, rgb(255, 0, 170) 20%, rgb(0, 255, 240) 80%)',
                        backgroundClip: 'text',
                        filter: 'drop-shadow(0px 0px 15px #2f0f30)',
                        color: 'transparent',
                    }}
                >
                    Chris.lu
                </span>
                <span
                    style={{
                        fontFamily: 'var(--main-frontFamily-default)',
                        fontWeight: 400,
                        fontStyle: 'normal',
                        fontSize: '50',
                        color: '#fff',
                        position: 'absolute',
                        width: '500',
                        height: '150',
                        left: '32%',
                        bottom: '-10%',
                    }}
                >
                    Web development
                </span>
            </div >
        ),
        // ImageResponse options
        {
            // For convenience, we can re-use the exported opengraph-image
            // size config to also set the ImageResponse's width and height.
            ...size,
            fonts: [
                {
                    name: 'PermanentMarkerRegular',
                    data: await permanentMarkerRegular,
                    style: 'normal',
                    weight: 400,
                },
            ],
        }
    )
}