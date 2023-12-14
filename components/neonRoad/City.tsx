'use client'

import { useTexture } from '@react-three/drei'

const City: React.FC = () => {

    const CITY_TEXTURE_PATH = '/assets/images/neonroad/city_texture-min.png'

    const [cityTexture] = useTexture([
        CITY_TEXTURE_PATH,
    ])

    return (
        <mesh
            position={[0, 0.18, -1]}
            scale={[1, 0.4, 0]}
            castShadow={false}
            receiveShadow={false}
        >
            <planeGeometry />
            <meshBasicMaterial
                map={cityTexture}
                transparent={true}
            />
        </mesh>
    )
}

export default City