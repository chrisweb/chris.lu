'use client'

import { useMemo, useEffect } from 'react'
import type { RefObject } from 'react'
import { MeshStandardMaterial, PlaneGeometry, DataTexture, RedFormat, LinearFilter, SRGBColorSpace } from 'three'
import type { Mesh } from 'three'
import { useTexture } from '@react-three/drei'
import { createNoise2D } from 'simplex-noise'

export interface ITerrainProps {
    zPositions: number[]
    // refs to the terrain meshes, used by the animation loop
    meshesRef: RefObject<Mesh[]>
}

const FLOOR_TEXTURE_PATH = '/assets/images/neonroad/grid_4096x8192-min.png'
const EMISSIVE_MAP_PATH = '/assets/images/neonroad/emissive_map_4096x8192-min.png'

// displacement map resolution (x = across the road, y = along the road)
const WIDTH = 32
const HEIGHT = 64

const inRange = (value: number, range: [number, number]) =>
    value >= range[0] && value <= range[1]

// procedurally generate a grayscale heightmap, one byte per pixel
function generateDisplacementData(): Uint8Array {

    const noise2D = createNoise2D()
    const data = new Uint8Array(WIDTH * HEIGHT)

    for (let x = 0; x < WIDTH; x++) {
        const nx = x / WIDTH

        for (let y = 0; y < HEIGHT; y++) {
            const ny = y / HEIGHT

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
                // road (flat)
                elevation = 0
            } else if (y < 2 || y > HEIGHT - 2) {
                // top/bottom flat seam for continuity
                elevation = x <= 4 || x >= 27 ? 0.2 : 0.05
            } else {
                // value2d in [-1, 1)
                const value2d = noise2D(nx * frequency, ny * frequency) * amplitude
                elevation = (value2d + 1) / 2 // -> [0, 1)
                elevation = elevation - seaLevelModifier // lower sea level
                elevation = Math.round(elevation * limitHeightSteps) / limitHeightSteps // quantize
            }

            // rows are stored bottom-up (texture v axis), so flip y
            data[(HEIGHT - 1 - y) * WIDTH + x] = Math.round(Math.min(Math.max(elevation, 0), 1) * 255)
        }
    }

    return data
}

const Terrain: React.FC<ITerrainProps> = (props) => {

    const [floorTexture, emissiveMap] = useTexture([
        FLOOR_TEXTURE_PATH,
        EMISSIVE_MAP_PATH,
    ], (textures) => {
        const [floor, emissive] = Array.isArray(textures) ? textures : [textures]
        // the material below is created imperatively (not via JSX props), so
        // r3f's automatic sRGB assignment for color textures does not apply,
        // without this the terrain is decoded as linear and far too bright
        floor.colorSpace = SRGBColorSpace
        emissive.colorSpace = SRGBColorSpace
        // when using 1 the image is very blurry, 2 is good, 4 is great (default is 1)
        floor.anisotropy = 2
        floor.needsUpdate = true
        emissive.needsUpdate = true
    })

    // single channel data texture, shared by all terrain tiles
    const displacementMap = useMemo(() => {
        const texture = new DataTexture(generateDisplacementData(), WIDTH, HEIGHT, RedFormat)
        // sample smoothly like the canvas texture this replaced
        texture.magFilter = LinearFilter
        texture.minFilter = LinearFilter
        texture.needsUpdate = true
        return texture
    }, [])

    // one geometry and one material shared by all terrain tiles
    const geometry = useMemo(() => new PlaneGeometry(1, 1, 16, 32), [])

    const material = useMemo(() => new MeshStandardMaterial({
        map: floorTexture,
        displacementMap: displacementMap,
        displacementScale: 0.5,
        emissiveMap: emissiveMap,
        emissive: '#11166c',
        emissiveIntensity: 0.02,
        toneMapped: false,
        roughness: 0.75,
        metalness: 0.7,
    }), [floorTexture, emissiveMap, displacementMap])

    // dispose the resources created here (the useTexture textures are cached
    // by drei and must not be disposed)
    useEffect(() => {
        return () => {
            geometry.dispose()
            material.dispose()
            displacementMap.dispose()
        }
    }, [geometry, material, displacementMap])

    return (
        <>
            {props.zPositions.map((zPosition, index) => (
                <mesh
                    key={zPosition}
                    geometry={geometry}
                    material={material}
                    rotation={[-Math.PI * 0.5, 0, 0]}
                    position={[0, 0, zPosition]}
                    receiveShadow={true}
                    ref={(terrainMesh: Mesh | null) => {
                        if (terrainMesh) {
                            props.meshesRef.current[index] = terrainMesh
                        }
                    }}
                />
            ))}
        </>
    )
}

Terrain.displayName = 'TerrainMeshComponent'

export default Terrain
