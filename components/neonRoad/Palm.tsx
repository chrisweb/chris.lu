'use client'

// this file is based on an auto-generated version using: https://github.com/pmndrs/gltfjsx
import { forwardRef } from 'react'
import type { Mesh, Group, MeshStandardMaterial } from 'three'
import { useGLTF } from '@react-three/drei'
import type { GLTF } from 'three-stdlib'
import type { GroupProps } from '@react-three/fiber'

// types for the gltf version
type GLTFResult = GLTF & {
    nodes: {
        tronc_tronc1_0: Mesh
        Feuille_1_feuilles_0: Mesh
        Feuille_2_feuilles_0: Mesh
        Feuille_3_feuilles_0: Mesh
        Feuille_4_feuilles_0: Mesh
        Feuille_5_feuilles_0: Mesh
        Feuille_6_feuilles_0: Mesh
        Feuille_7_feuilles_0: Mesh
        Feuille_8_feuilles_0: Mesh
    }
    materials: {
        tronc1: MeshStandardMaterial
        feuilles: MeshStandardMaterial
    }
}

const PALM_GLTF_PATH = '/assets/3d_models/palm/palm.gltf'

// code for the gltf version
const PalmModel = forwardRef<Group, GroupProps>((props, ref) => {
    
    // second parameter is false to disable draco (wasm decompression tool)
    // modern browsers support the CSP directive 'wasm-unsafe-eval'
    // but older browsers require the 'unsafe-eval' directive
    // when draco is disabled there is no need for wasm, so also no need for 'unsafe-eval'
    const { nodes, materials } = useGLTF(PALM_GLTF_PATH, false) as GLTFResult

    return (
        <group name={'PalmModel'} {...props} ref={ref}>
            <mesh
                castShadow={true} // default is false
                geometry={nodes.tronc_tronc1_0.geometry}
                material={materials.tronc1}
            />
            <mesh
                castShadow={true} // default is false
                geometry={nodes.Feuille_1_feuilles_0.geometry}
                material={materials.feuilles}
            />
            <mesh
                castShadow={true} // default is false
                geometry={nodes.Feuille_2_feuilles_0.geometry}
                material={materials.feuilles}
            />
            <mesh
                castShadow={true} // default is false
                geometry={nodes.Feuille_3_feuilles_0.geometry}
                material={materials.feuilles}
            />
            <mesh
                castShadow={true} // default is false
                geometry={nodes.Feuille_4_feuilles_0.geometry}
                material={materials.feuilles}
            />
            <mesh
                castShadow={true} // default is false
                geometry={nodes.Feuille_5_feuilles_0.geometry}
                material={materials.feuilles}
            />
            <mesh
                castShadow={true} // default is false
                geometry={nodes.Feuille_6_feuilles_0.geometry}
                material={materials.feuilles}
            />
            <mesh
                castShadow={true} // default is false
                geometry={nodes.Feuille_7_feuilles_0.geometry}
                material={materials.feuilles}
            />
            <mesh
                castShadow={true} // default is false
                geometry={nodes.Feuille_8_feuilles_0.geometry}
                material={materials.feuilles}
            />
        </group>
    )
})

PalmModel.displayName = 'PalmGroupComponent'

// see useGLTF comment (above)
useGLTF.preload(PALM_GLTF_PATH, false)

export default PalmModel