'use client'

import { useRef, useLayoutEffect, useMemo, useCallback } from 'react'
import type { Mesh, CanvasTexture } from 'three'
import { useTexture } from '@react-three/drei'
import { createNoise2D, type NoiseFunction2D } from 'simplex-noise'

type refType = (ref: Mesh) => void

export interface ITerrainProps extends Partial<Mesh> {
    zPosition: number
    ref: refType
}

const Terrain: React.FC<ITerrainProps> = (props) => {

    const FLOOR_TEXTURE_PATH = '/assets/images/neonroad/grid_4096x8192-min.png'
    const EMISSIVE_MAP_PATH = '/assets/images/neonroad/emissive_map_4096x8192-min.png'

    const [floorTexture, emissiveMap] = useTexture([
        FLOOR_TEXTURE_PATH,
        EMISSIVE_MAP_PATH,
    ])

    // https://threejs.org/docs/#api/en/textures/Texture.anisotropy
    //import { useThree } from '@react-three/fiber'
    //const { gl } = useThree()
    //console.log(gl.capabilities.getMaxAnisotropy())

    // I assume react compiler will add a useMemo if needed
    const floorTextureClone = floorTexture.clone()

    // when using 1 the image is very blurry, 2 is good, 4 is great
    // default is 1
    floorTextureClone.anisotropy = 2

    const displacementScale = 0.5
    const width = 32
    const height = 64

    const offscreenCanvas = useMemo(() => {
        return new OffscreenCanvas(width, height)
    }, [width, height])

    const displacementMapRef = useRef<CanvasTexture>(null)

    const inRange = (value: number, range: [number, number]) => value >= range[0] && value <= range[1]

    const noise2D = useMemo<NoiseFunction2D>(() => {
        return createNoise2D()
    }, [])

    const procedurallyGenerateDisplacementMap = useCallback(() => {

        if (!displacementMapRef.current) return

        const ctx = offscreenCanvas.getContext('2d')

        offscreenCanvas.width = width
        offscreenCanvas.height = height

        for (let x = 0; x < width; x++) {

            const nx = x / width

            for (let y = 0; y < height; y++) {

                const ny = y / width

                let frequency = 0
                let amplitude = 0
                let seaLevelModifier = 0
                let limitHeightSteps = 0

                if (x <= 4 || x >= 27) {

                    // outer mountains
                    frequency = 10
                    amplitude = 1
                    seaLevelModifier = 0.4
                    limitHeightSteps = 6

                } else if (inRange(x, [4, 6]) || inRange(x, [25, 27])) {

                    // hills
                    frequency = 8
                    amplitude = 0.4
                    seaLevelModifier = 0.5
                    limitHeightSteps = 12

                } else if (inRange(x, [6, 9]) || inRange(x, [22, 25])) {

                    // road edge
                    frequency = 6
                    amplitude = 0.15
                    seaLevelModifier = 0.5
                    limitHeightSteps = 24

                }

                let elevation: number

                if (inRange(x, [9, 22])) {

                    // road (is just flat)
                    elevation = 0

                } else if (y < 2 || y > (height - 2)) {

                    // the top and bottom of a terrain are flat
                    // so that the previous and next terrain
                    // have the same start / end elevation
                    if (x <= 4 || x >= 27) {
                        elevation = 0.2
                    } else {
                        elevation = 0.05
                    }

                } else {

                    // value2d will a number between -1 and 1 (but never -1 or 1)
                    const value2d = noise2D(nx * frequency, ny * frequency) * amplitude

                    // to convert "-1 to 1" range to "0 to 1" range do (x + 1) / 2
                    elevation = (value2d + 1) / 2

                    // lower sea level
                    elevation = elevation - seaLevelModifier

                    // limit the amount of different heights that are possible
                    elevation = Math.round(elevation * limitHeightSteps) / limitHeightSteps

                }

                if (ctx !== null) {

                    // grayscale: red, green, blue in percent
                    const colorInPercent = (elevation * 100).toFixed(2)

                    ctx.fillStyle = `rgb(${colorInPercent}%, ${colorInPercent}%, ${colorInPercent}%)`

                    ctx.fillRect(x, y, 1, 1)

                }

            }

        }

        displacementMapRef.current.needsUpdate = true

    }, [noise2D, offscreenCanvas])

    // fixes a problem where using useEffect would create
    // displacement maps after the texture update so that
    // the result was a flat surface with no displacement
    useLayoutEffect(() => {
        const displacementMap = displacementMapRef.current
        procedurallyGenerateDisplacementMap()
        return () => {
            // I don't know if this is necessary, but it's better to be safe than sorry
            // cleanup: dispose of the canvas texture and remove the canvas element from dom
            if (displacementMap !== null) {
                displacementMap.dispose()
            }
            //canvas?.remove()
        }
    }, [procedurallyGenerateDisplacementMap])

    /*useFrame(() => {
        procedurallyGenerateDisplacementMap()
    })*/

    return (
        <mesh
            rotation={[-Math.PI * 0.5, 0, 0]}
            position={[0, 0, props.zPosition]}
            receiveShadow={true} // default is false
            ref={props.ref}
        >
            <planeGeometry args={[1, 1, 16, 32]} />
            <meshStandardMaterial
                map={floorTextureClone}
                displacementScale={displacementScale}
                emissiveMap={emissiveMap}
                emissive="#11166c"
                emissiveIntensity={0.02}
                toneMapped={false} // default true
                roughness={0.75}
                metalness={0.7}
            >
                <canvasTexture
                    ref={displacementMapRef}
                    attach="displacementMap"
                    args={[offscreenCanvas]}
                />
            </meshStandardMaterial>
        </mesh>
    )

}

Terrain.displayName = 'TerrainMeshComponent'

export default Terrain