'use client'

import type { PropsWithChildren } from 'react'
import type { Vector3 } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'

interface IProps extends PropsWithChildren {
    position: Vector3
    scale: Vector3
}

const City: React.FC<IProps> = (props) => {

    const CITY_TEXTURE_PATH = '/assets/images/neonroad/city_texture-min.png'

    const [cityTexture] = useTexture([
        CITY_TEXTURE_PATH,
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
                map={cityTexture}
                transparent={true}
            />
            {props.children}
        </mesh>
    )
}

export default City