'use client'

import { useLayoutEffect, useRef, useState, Suspense, useCallback } from 'react'
import { useFrame } from '@react-three/fiber'
import PalmModel from './Palm'
import { moveFromAToBInLoop } from './lib/helpers'
import { Vector3, Euler, type Group } from 'three'

function randomDegrees() {
    const min = 0
    const max = 360
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const Trees: React.FC = () => {

    const [treesElementsState, setTreesElementsState] = useState<React.ReactElement[]>([])

    // trees on the left side
    const leftSideTreesRefs = useRef<Group[]>([])

    // trees on the right side
    const rightSideTreesRefs = useRef<Group[]>([])

    // the three fiber render() will trigger useFrame()
    useFrame((state, delta /*, xrFrame*/) => {
        moveFromAToBInLoop(delta, leftSideTreesRefs.current, 1, 0.2)
        moveFromAToBInLoop(delta, rightSideTreesRefs.current, 1, 0.2)
    })

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

    }, [])

    useLayoutEffect(() => {

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

    }, [createPalm])

    return (<Suspense>{treesElementsState}</Suspense>)

}

export default Trees