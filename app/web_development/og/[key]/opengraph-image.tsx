import { ImageResponse } from 'next/og'
import { imageInfo } from '@/shared/image-info'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

// Image metadata
export const size = {
    width: 1200,
    height: 630,
}

export const contentType = 'image/png'

export const alt = 'Chris.lu article banner'

interface IImageProps {
    params: Promise<{
        key: string
    }>
}

// every banner is known upfront, so generate them all at build time
// instead of on demand (a request time fetch of our own deployment
// can not work while building, as the site is not deployed yet)
export function generateStaticParams() {
    return Object.keys(imageInfo).map(key => ({ key }))
}

// Image generation
export default async function Image(props: IImageProps) {
    const { key } = await props.params

    if (!Object.hasOwn(imageInfo, key)) {
        return new Response('Unknown image key', { status: 404 })
    }

    const imageTitle = imageInfo[key][0]
    const imagePath = imageInfo[key][1]
    const overlayPosition = imageInfo[key][2] ?? 'bottom'

    const antaRegular = readFile(
        join(process.cwd(), 'public/assets/fonts/Anta-Regular.ttf')
    )

    const imageFile = await readFile(
        join(process.cwd(), 'public/assets/images/app/web_development', imagePath, 'opengraph.jpg')
    )

    // satori (used by ImageResponse) needs an ArrayBuffer (not a Node.js Buffer) for the img src
    const imageData = new Uint8Array(imageFile).buffer

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
                    // eslint-disable-next-line @next/next/no-img-element
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
                        margin: 0,
                        padding: '30px 60px',
                        fontFamily: 'AntaRegular',
                        fontWeight: 400,
                        fontStyle: 'normal',
                        fontSize: '40',
                        textShadow: '0px 0px 10px black',
                        color: 'rgb(255 0 170)',
                        backgroundColor: 'rgb(0 0 0 0.7)',
                        ...overlayPosition === 'bottom' ? { bottom: '0px' } : { top: '0px' },
                    }}
                >
                    {imageTitle} | Chris.lu
                </div>
            </div>
        ),
        // ImageResponse options
        {
            // For convenience, we can re-use the exported opengraph-image
            // size config to also set the ImageResponse's width and height.
            ...size,
            fonts: [
                {
                    name: 'AntaRegular',
                    data: await antaRegular,
                    style: 'normal',
                    weight: 400,
                },
            ],
        }
    )
}