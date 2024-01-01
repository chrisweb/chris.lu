'use client'

import { forwardRef, useRef, useEffect } from 'react'
import { createNoise2D } from 'simplex-noise'
import type { Mesh, CanvasTexture } from 'three'
import { useTexture } from '@react-three/drei'

interface IProps {
    amplitude1: number
    amplitude2: number
    amplitude3: number
    frequency: number
}

//const Terrain = forwardRef<Mesh>((_: unknown, terrainRef) => {
const Terrain = forwardRef<Mesh, IProps>((props: IProps, terrainRef) => {

    const FLOOR_TEXTURE_PATH = './grid.png'

    const [floorTexture] = useTexture([
        FLOOR_TEXTURE_PATH,
    ])

    floorTexture.anisotropy = 2

    const displacementScale = 0.4

    const canvasRef = useRef<HTMLCanvasElement>(document.createElement('canvas'))
    const displacementMapRef = useRef<CanvasTexture>(null)

    document.body.append(canvasRef.current)

    /*const convertRange = (value: number, r1: [number, number], r2: [number, number]) => {
        // https://stackoverflow.com/a/14224813/656689
        return (value - r1[0]) * (r2[1] - r2[0]) / (r1[1] - r1[0]) + r2[0]
    }*/

    //const inRange = (value: number, range: [number, number]) => value >= range[0] && value <= range[1]

    const draw = () => {

        const width = 32
        const height = 64

        const noise2D = createNoise2D()

        //const canvas = canvasRef.current
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')

        canvas.width = width
        canvas.height = height

        canvas.style.width = (width * 4) + 'px'
        canvas.style.height = (height * 4) + 'px'

        //const amplitudes = [1, 0.5, 0.25]
        //const frequencies = [1, 2, 4]
        const amplitudes = [props.amplitude1, props.amplitude2, props.amplitude3]
        const frequency = props.frequency
        const octaves = amplitudes.length

        const maximum = amplitudes[0] + amplitudes[1] + amplitudes[2]

        for (let x = 0; x < width; x++) {

            for (let y = 0; y < height; y++) {

                let value = 0

                for (let i = 0; i < octaves; i++) {

                    // returns a value between -1 and 1
                    const value2d = noise2D(x * frequency, y * frequency)

                    //console.log(value2d)

                    // to convert "-1 to 1" range to "0 to 1" range do (x + 1) / 2
                    const valueNewRange = (value2d + 1) / 2
                    //const valueNewRange = convertRange(value2d, [-1,1], [0,1])

                    value += valueNewRange * amplitudes[i]

                }

                //console.log(value)

                const rgbColor = value / maximum

                // closer to the road make the mountains half as high
                /*if (inRange(x, [4, 7]) || inRange(x, [24, 27])) {
                    rgbColor = value2d / 1.3
                }

                // close to the road make the mountains 
                if (inRange(x, [7, 9]) || inRange(x, [22, 24])) {
                    rgbColor = value2d / 5
                }

                // the road itself is pure black
                if (inRange(x, [9, 22])) {
                    rgbColor = 0
                }*/

                //console.log('rgbColor: ', rgbColor)

                if (ctx !== null) {

                    // grayscale = red, green, blue in percent
                    const colorInPercent = (rgbColor * 100).toFixed(2)

                    //console.log('colorInPercent: ', colorInPercent)

                    ctx.fillStyle = `rgb(${colorInPercent}%, ${colorInPercent}%, ${colorInPercent}%)`

                    ctx.fillRect(x, y, 1, 1)
                    //ctx.fillRect((x * 4), (y * 4), (1 * 4), (1 * 4))

                }

            }


        }

        displacementMapRef.current!.needsUpdate = true

        /*setTimeout(() => {
            requestAnimationFrame(draw)
        }, 200)*/

    }

    useEffect(() => {
        draw()
    }, [props.amplitude1, props.amplitude2, props.amplitude3, props.frequency])

    return (
        <mesh
            rotation={[-Math.PI * 0.5, 0, 0]}
            position={[0, 0, 0]}
            ref={terrainRef}
            receiveShadow={true} // default is false
            castShadow={false}
        >
            <planeGeometry args={[1, 1, 32, 64]} />
            <meshStandardMaterial
                map={floorTexture}
                displacementScale={displacementScale}
                toneMapped={false}
            >
                <canvasTexture
                    ref={displacementMapRef}
                    attach="displacementMap"
                    image={canvasRef.current}
                />
            </meshStandardMaterial>
        </mesh>
    )

})

Terrain.displayName = 'TerrainMeshComponent'

export default Terrain