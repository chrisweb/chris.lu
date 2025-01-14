'use client'

import { useLayoutEffect, useRef, useState, Suspense, useCallback } from 'react'
import { useFrame } from '@react-three/fiber'
import Terrain from './Terrain'
import { Mesh } from 'three'
import { moveFromAToBInLoop } from './lib/helpers'
import PalmModel from './Palm'
import { Vector3, Euler, type Group } from 'three'

const Terrains: React.FC = () => {

    const [terrainElementsState, setTerrainElementsState] = useState<React.ReactElement[]>([])
    const [treesElementsState, setTreesElementsState] = useState<React.ReactElement[]>([])

    const terrainsRefs = useRef<Mesh[]>([])

    // movement for trees on the left side
    const leftSideTreesRefs = useRef<Group[]>([])

    // movement for trees on the right side
    const rightSideTreesRefs = useRef<Group[]>([])

    useFrame((state, delta /*, xrFrame*/) => {
        moveFromAToBInLoop(delta, terrainsRefs.current, 1, 1)
    })
    useFrame((state, delta /*, xrFrame*/) => {
        moveFromAToBInLoop(delta, leftSideTreesRefs.current, 1, 0.2)
    })
    useFrame((state, delta /*, xrFrame*/) => {
        moveFromAToBInLoop(delta, rightSideTreesRefs.current, 1, 0.2)
    })

    const createTerrain = useCallback((i: number, zPosition: number) => {
        return (
            <Terrain
                zPosition={zPosition}
                key={i}
                ref={(terrainMesh) => {
                    terrainsRefs.current[i] = terrainMesh
                }}
            />
        )
    }, [])

    const randomDegrees = useCallback(() => {
        const min = 0
        const max = 360
        return Math.floor(Math.random() * (max - min + 1) + min)
    }, [])

    const createPalm = useCallback((i: number, side: string, positionChange: number) => {

        const position = new Vector3(side === 'left' ? 0.21 : -0.21, 0, positionChange)
        const scale = new Vector3(0.009, 0.009, 0.009)
        const rotation = new Euler(0, randomDegrees(), 0)

        return (
            <PalmModel
                key={i.toString() + side}
                position={position}
                scale={scale}
                rotation={rotation}
                ref={(palmMesh) => {
                    if (side === 'left') {
                        leftSideTreesRefs.current[i] = palmMesh
                    } else {
                        rightSideTreesRefs.current[i] = palmMesh
                    }
                }}
            />
        )

    }, [randomDegrees])

    useLayoutEffect(() => {

        // TERRAINS
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

            terrainElements.push(createTerrain(i, zPosition))
        }

        setTerrainElementsState(terrainElements)

        // TREES
        const treesElements: React.ReactElement[] = []

        const sides = ['left', 'right']
        const amountOfTreesPerSide = 12

        sides.forEach((side) => {

            let positionChange = -1.5

            for (let i = 0; i < amountOfTreesPerSide; i++) {
                treesElements.push(createPalm(i, side, positionChange))
                positionChange += 0.2
            }

        })

        setTreesElementsState(treesElements)

    }, [createTerrain, createPalm])

    return (<Suspense>{terrainElementsState}{treesElementsState}</Suspense>)
}

export default Terrains