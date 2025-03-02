'use client'

import { useRef, useMemo, memo, Suspense } from 'react'
import { useFrame } from '@react-three/fiber'
import Terrain from './Terrain'
import PalmModel from './Palm'
import { Mesh, Vector3, Euler, type Group } from 'three'
import { moveFromAToBInLoop, randomDegrees } from './lib/helpers'

interface TreeData {
    id: string
    position: Vector3
    rotation: Euler
    side: string
    index: number
}

const Landscape: React.FC = () => {

    const terrainsRefs = useRef<Mesh[]>([])
    const leftSideTreesRefs = useRef<Group[]>([])
    const rightSideTreesRefs = useRef<Group[]>([])

    const terrainData = useMemo(() => [
        { id: 0, zPosition: 0.5 },
        { id: 1, zPosition: -0.5 },
        { id: 2, zPosition: -1.5 }
    ], [])

    const treeData = useMemo(() => {

        const data: TreeData[] = []
        const sides = ['left', 'right']
        const amountOfTreesPerSide = 12

        sides.forEach((side) => {
            let positionZ = -1.5

            for (let i = 0; i < amountOfTreesPerSide; i++) {
                data.push({
                    id: `${i.toString()}-${side}`,
                    position: new Vector3(side === 'left' ? 0.21 : -0.21, 0, positionZ),
                    rotation: new Euler(0, randomDegrees(), 0),
                    side,
                    index: i
                })
                positionZ += 0.2
            }
        })

        return data
    }, [])

    const palmScale = useMemo(() => new Vector3(0.009, 0.009, 0.009), [])

    useFrame((_, delta) => {
        moveFromAToBInLoop(delta, terrainsRefs.current, 1, 1)
        moveFromAToBInLoop(delta, leftSideTreesRefs.current, 1, 0.2)
        moveFromAToBInLoop(delta, rightSideTreesRefs.current, 1, 0.2)
    })

    return (
        <>
            <Suspense fallback={null}>
                {terrainData.map(terrain => (
                    <Terrain
                        key={terrain.id}
                        zPosition={terrain.zPosition}
                        ref={(terrainMesh) => {
                            terrainsRefs.current[terrain.id] = terrainMesh
                        }}
                    />
                ))}
                {treeData.map(tree => (
                    <PalmModel
                        key={tree.id}
                        position={new Vector3(...tree.position)}
                        scale={palmScale}
                        rotation={tree.rotation}
                        ref={(palmMesh) => {
                            if (tree.side === 'left') {
                                leftSideTreesRefs.current[tree.index] = palmMesh
                            } else {
                                rightSideTreesRefs.current[tree.index] = palmMesh
                            }
                        }}
                    />
                ))}
            </Suspense>
        </>
    )
}

export default memo(Landscape)