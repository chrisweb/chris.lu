'use client'

import { useRef/*, useMemo*/ } from 'react'
import type { Group, Object3DEventMap } from 'three'
import { useFrame } from '@react-three/fiber'
import PalmModel from './Palm'

interface ITreeModel {
    xPosition: number
    zPosition: number
}

const Trees: React.FC = () => {

    //const palms = useMemo(() => {

    // 19 trees on the left side
    const leftSideTreesRefs = useRef<Group<Object3DEventMap>[]>([])

    // 19 trees on the right side
    const rightSideTreesRefs = useRef<Group<Object3DEventMap>[]>([])

    // the three fiber render() will trigger useFrame()
    useFrame((state, delta /*, xrFrame*/) => {

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

        // we put the first three at the end of first terrain
        // so where the city is, one on each side
        // between two threes we want 0.2 units, so we
        // need 20 trees (on each side) to cover the 2 units
        leftSideTreesRefs.current.forEach((leftSideTree) => {
            leftSideTree.position.z += newZPosition
            if (leftSideTree.position.z >= 1.5) {
                leftSideTree.position.z = -1.5
            }
        })

        rightSideTreesRefs.current.forEach((rightSideTree) => {
            rightSideTree.position.z += newZPosition
            if (rightSideTree.position.z >= 1.5) {
                rightSideTree.position.z = -1.5
            }
        })

    })

    const treesElements: React.ReactElement[] = []
    const sides = ['left', 'right']
    const amountOfTreesPerSide = 20

    sides.forEach((side) => {

        let positionChange = -1.5

        for (let i = 0; i < amountOfTreesPerSide; i++) {

            const treeModelSetup: ITreeModel = {
                xPosition: side === 'right' ? -0.21 : 0.21,
                zPosition: positionChange,
            }

            treesElements.push(
                <PalmModel
                    position={[treeModelSetup.xPosition, 0, treeModelSetup.zPosition]}
                    ref={ref => {
                        side === 'right' ? rightSideTreesRefs.current[i] = ref : leftSideTreesRefs.current[i] = ref
                    }}
                    scale={[0.009, 0.009, 0.009]}
                    castShadow={true} // default is false
                    receiveShadow={false}
                    key={side + i}
                //rotation={[0, 0, 0]}
                />
            )

            positionChange += 0.2

        }

    })

    return (<>{treesElements}</>)

    //}, [])

    //return <>{palms}</>

}

export default Trees