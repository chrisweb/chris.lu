'use client'

import type { PropsWithChildren } from 'react'
import type { Vector3 } from '@react-three/fiber'
import { Sparkles } from '@react-three/drei'
import type { Vector3 as THREEVector3 } from 'three'

interface IProps extends PropsWithChildren {
    position: Vector3
    scale: number | [number, number, number] | THREEVector3
}

const NightSky: React.FC<IProps> = (props) => {

    return (
        <Sparkles
            count={600}
            size={0.6}
            position={props.position}
            scale={props.scale}
            speed={0}
        />
    )

}

export default NightSky