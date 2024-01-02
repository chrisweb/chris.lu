'use client'

import { forwardRef, useRef, useEffect } from 'react'
import { createNoise2D } from 'simplex-noise'
import type { Mesh, CanvasTexture } from 'three'

interface IProps {
    amplitude1: number
    amplitude2: number
    amplitude3: number
    frequency1: number
    frequency2: number
    frequency3: number
}

//const Terrain = forwardRef<Mesh>((_: unknown, terrainRef) => {
const Terrain = forwardRef<Mesh, IProps>((props: IProps, terrainRef) => {

    const displacementScale = 0.4

    const canvasRef = useRef<HTMLCanvasElement>(document.createElement('canvas'))
    const displacementMapRef = useRef<CanvasTexture>(null)

    document.body.append(canvasRef.current)

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

        const frequency = props.frequency1

        //const elevations: number[][] = []

        for (let x = 0; x < width; x++) {

            const nx = x / width

            //elevations[x] = []

            for (let y = 0; y < height; y++) {

                const ny = y / width

                // returns a value between -1 and 1
                const value2d = noise2D(nx * frequency, ny * frequency)

                //console.log(value2d)

                // to convert "-1 to 1" range to "0 to 1" range do (x + 1) / 2
                //elevations[x][y] = (value2d + 1) / 2
                const elevation = (value2d + 1) / 2

                if (ctx !== null) {

                    // grayscale = red, green, blue in percent
                    const colorInPercent = (elevation * 100).toFixed(2)

                    ctx.fillStyle = `rgb(${colorInPercent}%, ${colorInPercent}%, ${colorInPercent}%)`

                    ctx.fillRect(x, y, 1, 1)

                }

            }

        }

        /*for (let a = 0; a < width; a++) {

            for (let b = 0; b < height; b++) {

                if (ctx !== null) {

                    // grayscale = red, green, blue in percent
                    const colorInPercent = (elevations[a][b] * 100).toFixed(2)

                    ctx.fillStyle = `rgb(${colorInPercent}%, ${colorInPercent}%, ${colorInPercent}%)`

                    ctx.fillRect(a, b, 1, 1)

                }

            }

        }*/

        displacementMapRef.current!.needsUpdate = true

    }

    useEffect(() => {
        draw()
    }, [props.amplitude1, props.amplitude2, props.amplitude3, props.frequency1])

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
                displacementScale={displacementScale}
                color={'magenta'}
                wireframe={true}
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