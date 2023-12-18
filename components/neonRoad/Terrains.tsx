'use client'

import { useRef } from 'react'
import { Mesh } from 'three'
import { useFrame } from '@react-three/fiber'
import Terrain from './Terrain'
import { moveFromAToBInLoop } from './lib/helpers'

const Terrains: React.FC = () => {

    //const terrains = useMemo(() => {

    const terrainsRef = useRef<Mesh[]>([])

    // the three fiber render() will trigger useFrame()
    useFrame((state, delta /*, xrFrame*/) => {

        moveFromAToBInLoop({
            delta,
            objectsRef: terrainsRef,
            cameraZPosition: 1,
            distanceToNextObject: 1
        })

    })

    const terrainElements: React.ReactElement[] = []

    // the distance between the city (when the terrain comes
    // into view) and the bottom of the camera field of view
    // (at which point the terrain goes out of view) 
    // is approximativly 2 units, so we need 3 terrains
    // pnaels (of 1x1 in size), to ensure the distance between
    // the camera and city is covered at all times
    const terrainsZStartPositions = [0.5, -0.5, -1.5]

    for (let i = 0; i < terrainsZStartPositions.length; i++) {

        const zPosition = terrainsZStartPositions[i]

        terrainElements.push(
            <Terrain
                zPosition={zPosition}
                key={i}
                ref={ref => {
                    terrainsRef.current[i] = ref
                }}
            />
        )

    }

    return (<>{terrainElements}</>)

    //}, [])

    //return (<>{terrains}</>)

}

export default Terrains