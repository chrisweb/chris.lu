'use client'

import { useEffect, useRef, PropsWithChildren } from 'react'
import type { Mesh, Group } from 'three'
import { useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import PalmModel from './Palm'

interface IProps extends PropsWithChildren {
    capFps?: boolean
}

const NeonRoadMesh: React.FC<IProps> = ({ capFps = false }) => {

    const displacementScale = 0.5

    const FLOOR_TEXTURE_PATH = '/assets/images/neonroad/grid_4096x8192-min.png'
    const DISPLACEMENT_MAP_PATH = '/assets/images/neonroad/displacement_32x64-min.png'
    const SUN_TEXTURE_PATH = '/assets/images/neonroad/sun_gradient-min.svg'
    const CITY_TEXTURE_PATH = '/assets/images/neonroad/city_texture-min.png'

    const [floorTexture, displacementMap, sunTexture, cityTexture] = useTexture([
        FLOOR_TEXTURE_PATH,
        DISPLACEMENT_MAP_PATH,
        SUN_TEXTURE_PATH,
        CITY_TEXTURE_PATH,
    ])

    const terrainARef = useRef<Mesh>(null)
    const terrainBRef = useRef<Mesh>(null)
    const terrainCRef = useRef<Mesh>(null)

    const animate = useRef(true)

    // 19 trees on the left side
    const leftSideTreesRefs = useRef<Group[]>([])

    // 19 trees on the right side
    const rightSideTreesRefs = useRef<Group[]>([])

    const setAnimate = () => {
        animate.current = !document.hidden
    }

    useEffect(() => {
        // https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API
        document.addEventListener('visibilitychange', setAnimate)
        return () => {
            document.removeEventListener('visibilitychange', setAnimate)
        }
    })

    let lastTime = 0

    useFrame((state, delta /*, xrFrame*/) => {

        if (!animate.current) {
            return
        }

        const elapsedTime = state.clock.getElapsedTime()

        if (elapsedTime - lastTime <= 0.016 && capFps) {
            return
        }

        lastTime = elapsedTime

        // speed is just a value we use to make the
        // terrain move slower or faster
        // increase the number to increase the speed
        const speed = 0.1
        const distance = delta * speed

        // the distance between the city (when the terrain comes
        // into view) and the bottom of the camera view field
        // (at which point the terrain goes out of view) 
        // is approximativly 2 units, so we need 3 terrains
        // pnaels (of 1x1 in size), we put the first one
        // at 1 unit from the city which is -0.5, the second
        // one again 1 units away at 0.5 and the thirs one
        // at 1.5, when a terrainr reaches 1.5 gets removed
        // and put back at the start which is -1.5
        if (terrainARef.current) {
            terrainARef.current.position.z += distance
            if (terrainARef.current.position.z >= 1.5) {
                terrainARef.current.position.z = -1.5
            }
        }
        if (terrainBRef.current) {
            terrainBRef.current.position.z += distance
            if (terrainBRef.current.position.z >= 1.5) {
                terrainBRef.current.position.z = -1.5
            }
        }
        if (terrainCRef.current) {
            terrainCRef.current.position.z += distance
            if (terrainCRef.current.position.z >= 1.5) {
                terrainCRef.current.position.z = -1.5
            }
        }

        // we put the first three at the end of first terrain
        // so where the city is, one on each side
        // between two threes we want 0.2 units, so we
        // need 20 trees (on each side) to cover the 2 units
        leftSideTreesRefs.current.forEach((leftSideTreeRef) => {
            leftSideTreeRef.position.z += distance
            if (leftSideTreeRef.position.z >= 1.5) {
                leftSideTreeRef.position.z = -1.5
            }
        })

        rightSideTreesRefs.current.forEach((rightSideTreeRef) => {
            rightSideTreeRef.position.z += distance
            if (rightSideTreeRef.position.z >= 1.5) {
                rightSideTreeRef.position.z = -1.5
            }
        })

    })

    function TreeModels({ amount, side }) {
        const spritesElements: React.ReactElement[] = []
        // from position "-2.8" to "0.8" 
        let positionChange = -2.8
        for (let i = 0; i < amount; i++) {
            const xPosition = side === 'right' ? -0.21 : 0.21
            spritesElements.push(
                <PalmModel
                    position={[xPosition, 0, positionChange]}
                    ref={ref => {
                        side === 'right' ? rightSideTreesRefs.current[i] = ref : leftSideTreesRefs.current[i] = ref
                    }}
                    scale={[0.009, 0.009, 0.009]}
                    castShadow={true} // default is false
                    receiveShadow={false}
                    key={side + i}

                />
            )
            positionChange += 0.2
        }
        return <>{spritesElements}</>
    }

    function Terrain({ positionZ, terrainRef }) {

        return (
            <mesh
                rotation={[-Math.PI * 0.5, 0, 0]}
                position={[0, 0, positionZ]}
                ref={terrainRef}
                receiveShadow={true} // default is false
                castShadow={false}
            >
                <planeGeometry args={[1, 1, 32, 64]} />
                <meshStandardMaterial
                    map={floorTexture}
                    displacementMap={displacementMap}
                    displacementScale={displacementScale}
                    emissiveMap={displacementMap}
                    emissive={'#650044'}
                    emissiveIntensity={0.1}
                    toneMapped={false}
                    roughness={0.9}
                    metalness={0.7}
                />
            </mesh>
        )
    }

    function Sun() {
        return (
            <mesh
                position={[0, 0.5, -1.6]}
                scale={[2.5, 2.5, 0]}
                castShadow={false}
                receiveShadow={false}
            >
                <planeGeometry />
                <meshBasicMaterial
                    map={sunTexture}
                    transparent={true}
                />
            </mesh>
        )
    }

    function City() {
        return (
            <mesh
                position={[0, 0.18, -1]}
                scale={[1, 0.4, 0]}
                castShadow={false}
                receiveShadow={false}
            >
                <planeGeometry />
                <meshBasicMaterial
                    map={cityTexture}
                    transparent={true}
                />
            </mesh>
        )
    }

    return (
        <>
            <Terrain positionZ={0.5} terrainRef={terrainARef} />
            <Terrain positionZ={-0.5} terrainRef={terrainBRef} />
            <Terrain positionZ={-1.5} terrainRef={terrainCRef} />
            <TreeModels amount={20} side={'left'} />
            <TreeModels amount={20} side={'right'} />
            <Sun />
            <City />
        </>
    )
}

export default NeonRoadMesh