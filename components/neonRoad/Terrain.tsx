'use client'

import { forwardRef } from 'react'
import type { Mesh } from 'three'
import type { MeshProps } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'

export interface IProps extends MeshProps {
    zPosition: number
}

const Terrain: React.FC<IProps> = forwardRef<Mesh, IProps>((props: IProps, terrainRef: React.MutableRefObject<Mesh>) => {

    const FLOOR_TEXTURE_PATH = '/assets/images/neonroad/grid_4096x8192-min.png'
    const DISPLACEMENT_MAP_PATH = '/assets/images/neonroad/displacement_map_32x64-min.png'
    //const DISPLACEMENT_MAP_PATH = '/assets/images/neonroad/displacement_map_128x256.png'
    const EMISSIVE_MAP_PATH = '/assets/images/neonroad/emissive_map_4096x8192-min.png'

    const [floorTexture, displacementMap, emissiveMap] = useTexture([
        FLOOR_TEXTURE_PATH,
        DISPLACEMENT_MAP_PATH,
        EMISSIVE_MAP_PATH,
    ])

    // https://threejs.org/docs/#api/en/textures/Texture.anisotropy
    //import { useThree } from '@react-three/fiber'
    //const { gl } = useThree()
    //console.log(gl.capabilities.getMaxAnisotropy())
    
    floorTexture.anisotropy = 2

    // https://threejs.org/examples/#webgl_materials_texture_filters
    // https://threejs.org/docs/#api/en/textures/Texture.magFilter
    // https://threejs.org/docs/index.html#api/en/constants/Textures
    //import { NearestFilter , NearestMipmapNearestFilter } from 'three'
    //floorTexture.magFilter = NearestFilter
    //floorTexture.minFilter = NearestMipmapNearestFilter

    const displacementScale = 0.5

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
                //toneMapped={false}
                roughness={0.75}
                metalness={0.7}
            />
        </mesh>
    )

})

Terrain.displayName = 'TerrainMeshComponent'

export default Terrain