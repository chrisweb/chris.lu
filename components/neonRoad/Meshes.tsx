'use client'

import { useRef, useCallback, useEffect } from 'react'
import type { Mesh, Group } from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import PalmModel from './Palm'

const NeonRoadMesh: React.FC = () => {

    const three = useThree()

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

    // terrains
    const terrainARef = useRef<Mesh>(null)
    const terrainBRef = useRef<Mesh>(null)
    const terrainCRef = useRef<Mesh>(null)

    // 19 trees on the left side
    const leftSideTreesRefs = useRef<Group[]>([])

    // 19 trees on the right side
    const rightSideTreesRefs = useRef<Group[]>([])

    // animation request animation frame
    const requestAnimationFrameRef = useRef(null)
    const animationTimestampRef = useRef(0)

    // visibility API
    const animate = useRef(true)

    const setAnimate = useCallback(() => {
        animate.current = !document.hidden
    }, [document.hidden])

    useEffect(() => {
        // https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API
        document.addEventListener('visibilitychange', setAnimate)
        return () => {
            document.removeEventListener('visibilitychange', setAnimate)
        }
    })

    useEffect(() => {
        requestAnimationFrameRef.current = requestAnimationFrame(loop)
        return () => {
            cancelAnimationFrame(requestAnimationFrameRef.current)
        }
    }, [animate])

    // custom loop
    function loop(timeStamp: number) {

        // only animate if visible
        if (!animate.current) {
            requestAnimationFrameRef.current = requestAnimationFrame(loop)
            return
        }

        // if elapsed time < 60 frames per second => skip
        const framesPerSecond = 1000 / 30

        if ((timeStamp - animationTimestampRef.current) < framesPerSecond) {
            requestAnimationFrameRef.current = requestAnimationFrame(loop)
            return
        }

        animationTimestampRef.current = timeStamp

        three.advance(timeStamp/1000)

        requestAnimationFrameRef.current = requestAnimationFrame(loop)

    }

    useFrame((state, delta /*, xrFrame*/) => {

        // speed is just a value we use to make the
        // terrain move slower or faster
        // increase the number to increase the speed
        const speed = 0.05
        const newZPosition = delta * speed

        // the distance between the city (when the terrain comes
        // into view) and the bottom of the camera view field
        // (at which point the terrain goes out of view) 
        // is approximativly 2 units, so we need 3 terrains
        // pnaels (of 1x1 in size), to ensure the distance between
        // the camera and city is covered at all times
        // we put the first terrain panel, at where the camera 
        // is (at +1) minus half a panel which is the panels
        // center (+1 - 0.5 = 0.5) the second one at one unit
        // from the first one so -0.5 and the third one at -1.5
        // so behind the city (which is at -1, minus half a panel)
        if (terrainARef.current) {
            terrainARef.current.position.z += newZPosition
            if (terrainARef.current.position.z >= 1.5) {
                terrainARef.current.position.z = -1.5
            }
        }
        if (terrainBRef.current) {
            terrainBRef.current.position.z += newZPosition
            if (terrainBRef.current.position.z >= 1.5) {
                terrainBRef.current.position.z = -1.5
            }
        }
        if (terrainCRef.current) {
            terrainCRef.current.position.z += newZPosition
            if (terrainCRef.current.position.z >= 1.5) {
                terrainCRef.current.position.z = -1.5
            }
        }

        // we put the first three at the end of first terrain
        // so where the city is, one on each side
        // between two threes we want 0.2 units, so we
        // need 20 trees (on each side) to cover the 2 units
        leftSideTreesRefs.current.forEach((leftSideTreeRef) => {
            leftSideTreeRef.position.z += newZPosition
            if (leftSideTreeRef.position.z >= 1.5) {
                leftSideTreeRef.position.z = -1.5
            }
        })

        rightSideTreesRefs.current.forEach((rightSideTreeRef) => {
            rightSideTreeRef.position.z += newZPosition
            if (rightSideTreeRef.position.z >= 1.5) {
                rightSideTreeRef.position.z = -1.5
            }
        })

    })

    function TreeModels({ amount, side }) {
        const spritesElements: React.ReactElement[] = []
        let positionChange = -1.5
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