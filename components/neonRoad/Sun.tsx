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
    ], (textures) => {
        const texture = Array.isArray(textures) ? textures[0] : textures
        texture.generateMipmaps = false
    })

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
                depthWrite={false}
                toneMapped={false}
            />
        </mesh>
    )
}

export default Sun