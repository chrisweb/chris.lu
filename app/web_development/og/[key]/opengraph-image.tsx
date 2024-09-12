import { ImageResponse } from 'next/og'
import { imageInfo } from '@/shared/image-info'

// Route segment config
export const runtime = 'edge'

// Image metadata
export const size = {
    width: 1200,
    height: 630,
}

export const contentType = 'image/png'

export const alt = `Chris.lu article banner`

interface IImageProps {
    params: {
        key: string
    }
}

// Image generation
export default async function OGImage(props: IImageProps) {

    if (!props.params.key) {
        return
    }

    if (!imageInfo[props.params.key]) {
        return
    }

    const imageTitle = imageInfo[props.params.key][0]
    const imagePath = imageInfo[props.params.key][1]

    const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : `http://localhost:${process.env.PORT ?? 3000}`

    // Font
    const permanentMarkerRegular = fetch(
        new URL('/public/assets/fonts/PermanentMarker-Regular.ttf', import.meta.url)
    ).then((res) => res.arrayBuffer())

    // using new URL(myPath, import.meta.url) did not work
    const imageData = await fetch(
        baseUrl + '/assets/images/app/web_development/' + imagePath + '/opengraph.jpg'
    ).then((res) => res.arrayBuffer())

    return new ImageResponse(
        // ImageResponse JSX element
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
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
                <div
                    style={{
                        width: '100%',
                        display: 'flex',
                        position: 'absolute',
                        left: '0px',
                        bottom: '0px',
                        margin: 0,
                        padding: '0px 27px 27px 27px',
                        fontFamily: 'PermanentMarkerRegular',
                        fontWeight: 400,
                        fontStyle: 'normal',
                        fontSize: '50',
                        textShadow: '0px 0px 10px black',
                        color: 'rgb(255 0 170)',
                        backgroundColor: 'rgb(0 0 0 0.9)',
                    }}
                >
                    {imageTitle} | Chris.lu
                </div>
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