'use client'

import type { PropsWithChildren } from 'react'
import type { Vector3 } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'

interface IProps extends PropsWithChildren {
    position: Vector3
    scale: Vector3
}

const Sun: React.FC<IProps> = (props) => {

    const SUN_TEXTURE_PATH = '/assets/images/neonroad/sun_gradient-min.svg'

    const [sunTexture] = useTexture([
        SUN_TEXTURE_PATH,
    ])

    return (
        <mesh
            position={props.position}
            scale={props.scale}
            castShadow={false}
            receiveShadow={false}
        >
            <planeGeometry />
            <meshBasicMaterial
                map={sunTexture}
                transparent={true}
            />
        </mesh>
    )
}

export default Sun