'use client'

import { useRef, memo, Suspense } from 'react'
import { useFrame } from '@react-three/fiber'
import Terrain from './Terrain'
import Palms from './Palm'
import type { Mesh } from 'three'
import { moveFromAToBInLoop } from './lib/helpers'

// three tiles get moved in a loop to create an endless road
const terrainZPositions = [0.5, -0.5, -1.5]

const Landscape: React.FC = () => {

    const terrainMeshesRef = useRef<Mesh[]>([])

    useFrame((_, delta) => {
        moveFromAToBInLoop(delta, terrainMeshesRef.current, 1, 1)
    })

    return (
        <Suspense fallback={null}>
            <Terrain zPositions={terrainZPositions} meshesRef={terrainMeshesRef} />
            <Palms />
        </Suspense>
    )
}

export default memo(Landscape)
