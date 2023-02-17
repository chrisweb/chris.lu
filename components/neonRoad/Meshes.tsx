'use client'

import { useEffect, useRef } from 'react'
import { Mesh, Group } from 'three'
import { useFrame } from '@react-three/fiber'
import { useTexture, useAspect } from '@react-three/drei'
import PalmModel from './Palm'

const NeonRoadMesh: React.FC = () => {

    const displacementScale = 0.5

    const terrainARef = useRef<Mesh>(null)
    const terrainBRef = useRef<Mesh>(null)

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

    useFrame((state/*, delta, xrFrame*/) => {

        //console.log(state, delta, xrFrame)

        if (!animate.current) {
            return
        }

        const newZPosition = (state.clock.elapsedTime * 0.07) % 2

        if (terrainARef.current) {
            terrainARef.current.position.z = newZPosition
        }
        if (terrainBRef.current) {
            terrainBRef.current.position.z = newZPosition - 2
        }

        // from position "-2.8" to "0.8" 
        let positionChange = -2.8

        leftSideTreesRefs.current.forEach((leftSideTreeRef) => {
            leftSideTreeRef.position.z = newZPosition + positionChange
            positionChange += 0.2
        })

        positionChange = -2.8

        rightSideTreesRefs.current.forEach((rightSideTreeRef) => {
            rightSideTreeRef.position.z = newZPosition + positionChange
            positionChange += 0.2
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
                    //rotation={[-Math.PI * 0.5, 0, 0]}
                    position={[xPosition, 0, positionChange]}
                    ref={ref => {
                        side === 'right' ? rightSideTreesRefs.current[i] = ref : leftSideTreesRefs.current[i] = ref
                    }}
                    scale={[0.009, 0.009, 0.009]}
                    castShadow={true} // default is false
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
            >
                <planeGeometry args={[1, 2, 32, 32]} />
                <meshStandardMaterial
                    map={floorTexture}
                    displacementMap={displacementMap}
                    displacementScale={displacementScale}
                    roughness={0.9}
                    metalness={0.9}
                />
            </mesh>
        )
    }

    function Sun() {
        return (
            <mesh
                position={[0, 0.5, -2]}
                scale={[3, 3, 3]}
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
        const cityScale = useAspect(1024, 256, 0.2)
        return (
            <mesh
                position={[0, 0.14, -1.5]}
                scale={cityScale}
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
            <Terrain positionZ={0} terrainRef={terrainARef} />
            <Terrain positionZ={-2} terrainRef={terrainBRef} />
            <TreeModels amount={19} side={'left'} />
            <TreeModels amount={19} side={'right'} />
            <Sun />
            <City />
        </>
    )
}

export default NeonRoadMesh