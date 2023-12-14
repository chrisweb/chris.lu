'use client'

import { useRef/*, useMemo*/ } from 'react'
import type { Mesh } from 'three'
import { useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'

interface ITerrain {
    zPosition: number
    ref: React.MutableRefObject<Mesh>
}

type TerrainsType = ITerrain[]

const Terrains: React.FC = () => {

    //const terrains = useMemo(() => {

    const displacementScale = 0.5

    const FLOOR_TEXTURE_PATH = '/assets/images/neonroad/grid_4096x8192-min.png'
    const DISPLACEMENT_MAP_PATH = '/assets/images/neonroad/displacement_32x64-min.png'

    const [floorTexture, displacementMap] = useTexture([
        FLOOR_TEXTURE_PATH,
        DISPLACEMENT_MAP_PATH,
    ])

    // terrains
    const terrainARef = useRef<Mesh>(null)
    const terrainBRef = useRef<Mesh>(null)
    const terrainCRef = useRef<Mesh>(null)

    // the three fiber render() will trigger useFrame()
    useFrame((state, delta /*, xrFrame*/) => {

        //console.log(state, delta)

        // speed is just a value we use to make the
        // terrain move slower or faster
        // increase the number to increase the speed
        //let speed = 0.05
        const speed = 0.05

        // when using frameloop = never, the delta is not
        // in seconds but milliseconds so need to ajust the speed
        /*if (three.frameloop === 'never') {
            speed = 0.00005
        }*/
        //const speed = 0.05
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

    })

    console.log('terrainARef.current: ', terrainARef.current)

    const terrainElements: React.ReactElement[] = []

    const terrainSetups: TerrainsType = [
        {
            zPosition: terrainARef.current === null ? 0.5 : terrainARef.current.position.z,
            ref: terrainARef,
        },
        {
            zPosition: terrainBRef.current === null ? -0.5 : terrainBRef.current.position.z,
            ref: terrainBRef,
        },
        {
            zPosition: terrainCRef.current === null ? -1.5 : terrainCRef.current.position.z,
            ref: terrainCRef,
        },
    ]

    for (let i = 0; i < terrainSetups.length; i++) {

        const terrainSetup = terrainSetups[i]

        terrainElements.push(
            <mesh
                rotation={[-Math.PI * 0.5, 0, 0]}
                position={[0, 0, terrainSetup.zPosition]}
                ref={terrainSetup.ref}
                receiveShadow={true} // default is false
                castShadow={false}
                key={i}
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

    return (<>{terrainElements}</>)

    //}, [])

    //return (<>{terrains}</>)
}

export default Terrains