'use client'

import { useLayoutEffect, useRef, useState, Suspense, useCallback } from 'react'
import { useFrame } from '@react-three/fiber'
import Terrain from './Terrain'
import { Mesh } from 'three'
import { moveFromAToBInLoop } from './lib/helpers'

const Terrains: React.FC = () => {

    const [terrainElementsState, setTerrainElementsState] = useState<React.ReactElement[]>([])

    const terrainsRefs = useRef<Mesh[]>([])

    useFrame((state, delta /*, xrFrame*/) => {
        const terrains = terrainsRefs.current
        moveFromAToBInLoop(delta, terrains, 1, 1)
    })

    const createTerrains = useCallback(() => {

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

        return terrainElements

    }, [])

    useLayoutEffect(() => {
        setTerrainElementsState(createTerrains())
    }, [createTerrains])

    return (<Suspense>{terrainElementsState}</Suspense>)
}

export default Terrains