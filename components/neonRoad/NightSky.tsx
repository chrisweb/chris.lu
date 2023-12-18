'use client'

import type { PropsWithChildren } from 'react'
import type { Vector3 } from '@react-three/fiber'
import { Sparkles } from '@react-three/drei'

interface IProps extends PropsWithChildren {
    position: Vector3
    scale: number | [number, number, number] | THREE.Vector3
}

const NightSky: React.FC<IProps> = (props) => {

    return (
        <Sparkles
            count={400}
            size={1}
            position={props.position}
            scale={props.scale}
            speed={0}
        />
    )

}

export default NightSky