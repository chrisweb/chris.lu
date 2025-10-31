'use client'

import { useRef, useLayoutEffect, useMemo, useCallback } from 'react'
import type { Ref, RefObject } from 'react'
import type { Mesh, CanvasTexture, Texture } from 'three'
import { useTexture } from '@react-three/drei'
import { createNoise2D, type NoiseFunction2D } from 'simplex-noise'

export interface ITerrainProps {
    zPosition: number
    // Use a non-reserved prop name to avoid forwardRef
    meshRef?: Ref<Mesh>
}

function isRefObject<T>(ref: Ref<T>): ref is RefObject<T> {
    return typeof ref === 'object' && ref !== null && 'current' in ref
}

function assignRef<T>(ref: Ref<T> | undefined, value: T | null) {
    if (!ref) return
    if (typeof ref === 'function') {
        ref(value)
    } else {
        if (isRefObject<T | null>(ref)) {
            ref.current = value
        }
    }
}

const Terrain: React.FC<ITerrainProps> = (props) => {
    const FLOOR_TEXTURE_PATH = '/assets/images/neonroad/grid_4096x8192-min.png'
    const EMISSIVE_MAP_PATH = '/assets/images/neonroad/emissive_map_4096x8192-min.png'

    const [floorTexture, emissiveMap] = useTexture([
        FLOOR_TEXTURE_PATH,
        EMISSIVE_MAP_PATH,
    ])

    // Clone once per source texture change
    const floorTextureClone = useMemo<Texture>(() => {
        const clone = floorTexture.clone()
        // when using 1 the image is very blurry, 2 is good, 4 is great (default is 1)
        clone.anisotropy = 2
        return clone
    }, [floorTexture])

    const displacementScale = 0.5
    const width = 32
    const height = 64

    const offscreenCanvas = useMemo<OffscreenCanvas | HTMLCanvasElement>(() => {
        // Prefer OffscreenCanvas when available
        if (typeof OffscreenCanvas !== 'undefined') {
            return new OffscreenCanvas(width, height)
        }
        // Fallback to regular canvas in environments without OffscreenCanvas
        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        return canvas
    }, [width, height])

    const displacementMapRef = useRef<CanvasTexture>(null)

    const inRange = (value: number, range: [number, number]) =>
        value >= range[0] && value <= range[1]

    const noise2D = useMemo<NoiseFunction2D>(() => createNoise2D(), [])

    const procedurallyGenerateDisplacementMap = useCallback(() => {
        if (!displacementMapRef.current) return

        const ctx = offscreenCanvas.getContext('2d', { willReadFrequently: true })
        if (!ctx || !('fillStyle' in ctx)) return

        for (let x = 0; x < width; x++) {
            const nx = x / width

            for (let y = 0; y < height; y++) {
                const ny = y / height // fixed: divide by height

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
                } else if (y < 2 || y > height - 2) {
                    // top/bottom flat seam for continuity
                    elevation = x <= 4 || x >= 27 ? 0.2 : 0.05
                } else {
                    // value2d in [-1, 1)
                    const value2d = noise2D(nx * frequency, ny * frequency) * amplitude
                    elevation = (value2d + 1) / 2 // -> [0, 1)
                    elevation = elevation - seaLevelModifier // lower sea level
                    elevation = Math.round(elevation * limitHeightSteps) / limitHeightSteps // quantize
                }

                // grayscale fill
                const colorInPercent = (elevation * 100).toFixed(2)
                ctx.fillStyle = `rgb(${colorInPercent}%, ${colorInPercent}%, ${colorInPercent}%)`
                ctx.fillRect(x, y, 1, 1)
            }
        }

        displacementMapRef.current.needsUpdate = true
    }, [noise2D, offscreenCanvas, width, height])

    // Ensure the displacement map is ready before first paint
    useLayoutEffect(() => {
        const displacementMap = displacementMapRef.current
        procedurallyGenerateDisplacementMap()
        return () => {
            if (displacementMap) displacementMap.dispose()
        }
    }, [procedurallyGenerateDisplacementMap])

    // Local ref + bridge to external meshRef
    const localMeshRef = useRef<Mesh | null>(null)
    const setMeshRef = useCallback(
        (node: Mesh | null) => {
            localMeshRef.current = node
            assignRef(props.meshRef, node)
        },
        [props.meshRef]
    )

    return (
        <mesh
            rotation={[-Math.PI * 0.5, 0, 0]}
            position={[0, 0, props.zPosition]}
            receiveShadow={true}
            ref={setMeshRef}
        >
            <planeGeometry args={[1, 1, 16, 32]} />
            <meshStandardMaterial
                map={floorTextureClone}
                displacementScale={displacementScale}
                emissiveMap={emissiveMap}
                emissive="#11166c"
                emissiveIntensity={0.02}
                toneMapped={false}
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