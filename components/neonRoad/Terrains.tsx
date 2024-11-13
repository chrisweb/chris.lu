'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import Terrain from './Terrain'
import { Mesh } from 'three'
import { moveFromAToBInLoop } from './lib/helpers'

const Terrains: React.FC = () => {

    const terrainsRefs = useRef<Mesh[]>([])

    // new three fiber 9 useUpdate (replaces useFrame)
    useFrame((state, delta /*, xrFrame*/) => {
        moveFromAToBInLoop(delta, terrainsRefs.current, 1, 1)
    })

    const terrainElements: React.ReactElement[] = []

    // the distance between the city (when the terrain comes
    // into view) and the bottom of the camera field of view
    // (at which point the terrain goes out of view) 
    // is approximately 2 units, so we need 3 terrains
    // panels (of 1x1 in size), to ensure the distance between
    // the camera and city is covered at all times
    const terrainsZStartPositions = [0.5, -0.5, -1.5]

    for (let i = 0; i < terrainsZStartPositions.length; i++) {

        const zPosition = terrainsZStartPositions[i]

        terrainElements.push(
            <Terrain
                zPosition={zPosition}
                key={i}
                ref={(terrainMesh) => {
                    terrainsRefs.current[i] = terrainMesh
                }}
            />
        )
    }

    return (<>{terrainElements}</>)
}

export default Terrains