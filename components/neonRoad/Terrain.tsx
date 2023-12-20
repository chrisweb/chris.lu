'use client'

import { forwardRef } from 'react'
import type { Mesh } from 'three'
import type { MeshProps } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'

export interface IProps extends MeshProps {
    zPosition: number
}

const Terrain: React.FC<IProps> = forwardRef<Mesh, IProps>((props: IProps, terrainRef: React.MutableRefObject<Mesh>) => {

    const displacementScale = 0.5

    const FLOOR_TEXTURE_PATH = '/assets/images/neonroad/grid_4096x8192-min.png'
    const DISPLACEMENT_MAP_PATH = '/assets/images/neonroad/displacement_32x64-min.png'
    const EMISSIVE_MAP_PATH = '/assets/images/neonroad/emissive_map_4096x8192-min.png'

    const [floorTexture, displacementMap, emissiveMap] = useTexture([
        FLOOR_TEXTURE_PATH,
        DISPLACEMENT_MAP_PATH,
        EMISSIVE_MAP_PATH,
    ])

    return (
        <mesh
            rotation={[-Math.PI * 0.5, 0, 0]}
            position={[0, 0, props.zPosition]}
            ref={terrainRef}
            receiveShadow={true} // default is false
            castShadow={false}
        >
            <planeGeometry args={[1, 1, 32, 64]} />
            <meshStandardMaterial
                map={floorTexture}
                displacementMap={displacementMap}
                displacementScale={displacementScale}
                emissiveMap={emissiveMap}
                emissive={'#11166c'}
                emissiveIntensity={0.01}
                toneMapped={false}
                roughness={0.9}
                metalness={0.7}
            />
        </mesh>
    )

})

Terrain.displayName = 'TerrainMeshComponent'

export default Terrain