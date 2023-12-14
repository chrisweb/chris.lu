'use client'

import { useTexture } from '@react-three/drei'

const Sun: React.FC = () => {

    const SUN_TEXTURE_PATH = '/assets/images/neonroad/sun_gradient-min.svg'

    const [sunTexture] = useTexture([
        SUN_TEXTURE_PATH,
    ])

    return (
        <mesh
            position={[0, 0.5, -1.6]}
            scale={[2.5, 2.5, 0]}
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