'use client'

import { useRef } from 'react'
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

    // trees on the left side
    const leftSideTreesRefs = useRef<Group[]>([])

    // trees on the right side
    const rightSideTreesRefs = useRef<Group[]>([])

    // the three fiber render() will trigger useFrame()
    useFrame((state, delta /*, xrFrame*/) => {
        moveFromAToBInLoop(delta,leftSideTreesRefs.current,1,0.2)
        moveFromAToBInLoop(delta, rightSideTreesRefs.current, 1, 0.2)
    })

    const treesElements: React.ReactElement[] = []

    const sides = ['left', 'right']
    const amountOfTreesPerSide = 12

    sides.forEach((side) => {

        let positionChange = -1.5

        for (let i = 0; i < amountOfTreesPerSide; i++) {

            const position = new Vector3(side === 'right' ? -0.21 : 0.21, 0, positionChange)
            const scale = new Vector3(0.009, 0.009, 0.009)
            const rotation = new Euler(0, randomDegrees(), 0)

            treesElements.push(
                <PalmModel
                    position={position}
                    ref={treeGroup => {
                        if (side === 'right') {
                            rightSideTreesRefs.current[i] = treeGroup;
                        } else {
                            leftSideTreesRefs.current[i] = treeGroup;
                        }
                    }}
                    scale={scale}
                    castShadow={true} // default is false
                    receiveShadow={false}
                    key={side + '_' + i.toString()}
                    rotation={rotation}
                />
            )

            positionChange += 0.2

        }

    })

    return (<>{treesElements}</>)

}

export default Trees