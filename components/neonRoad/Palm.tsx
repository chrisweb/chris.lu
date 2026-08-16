'use client'

// the palm gltf was originally converted using: https://github.com/pmndrs/gltfjsx
// command: npx gltfjsx@6.5.3 palm.gltf --transform --types
// this version has been heavily modified since: all palms are now rendered
// using two instanced meshes (trunk + merged leaves) instead of 9 meshes
// per palm, which reduces draw calls (and shadow pass cost) massively
import { useMemo, useEffect, useRef } from 'react'
import { Object3D, MathUtils } from 'three'
import type { Mesh, MeshStandardMaterial, InstancedMesh } from 'three'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import { GLTF } from 'three-stdlib'
import { moveFromAToBInLoop, randomDegrees } from './lib/helpers'

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

const AMOUNT_OF_TREES_PER_SIDE = 12
const PALM_COUNT = AMOUNT_OF_TREES_PER_SIDE * 2
const PALM_SCALE = 0.009

const Palms: React.FC = () => {

    const { nodes, materials } = useGLTF(PALM_GLTF_PATH) as unknown as GLTFResult

    const trunksRef = useRef<InstancedMesh>(null)
    const leavesRef = useRef<InstancedMesh>(null)

    // the 8 leaf meshes share one material, so they can be merged
    // into a single geometry (their transforms are baked in)
    const leavesGeometry = useMemo(() => mergeGeometries([
        nodes.Feuille_1_feuilles_0.geometry,
        nodes.Feuille_2_feuilles_0.geometry,
        nodes.Feuille_3_feuilles_0.geometry,
        nodes.Feuille_4_feuilles_0.geometry,
        nodes.Feuille_5_feuilles_0.geometry,
        nodes.Feuille_6_feuilles_0.geometry,
        nodes.Feuille_7_feuilles_0.geometry,
        nodes.Feuille_8_feuilles_0.geometry,
    ]), [nodes])

    useEffect(() => {
        return () => {
            leavesGeometry.dispose()
        }
    }, [leavesGeometry])

    // one transform holder per palm, the animation loop mutates their
    // position and the matrices get copied to the instanced meshes
    const { leftSideTrees, rightSideTrees, allTrees } = useMemo(() => {

        const left: Object3D[] = []
        const right: Object3D[] = []

        for (const side of ['left', 'right'] as const) {
            let positionZ = -1.5

            for (let i = 0; i < AMOUNT_OF_TREES_PER_SIDE; i++) {
                const dummy = new Object3D()
                dummy.position.set(side === 'left' ? 0.21 : -0.21, 0, positionZ)
                dummy.rotation.y = MathUtils.degToRad(randomDegrees())
                dummy.scale.setScalar(PALM_SCALE)
                if (side === 'left') {
                    left.push(dummy)
                } else {
                    right.push(dummy)
                }
                positionZ += 0.2
            }
        }

        return { leftSideTrees: left, rightSideTrees: right, allTrees: [...left, ...right] }
    }, [])

    useFrame((_, delta) => {

        moveFromAToBInLoop(delta, leftSideTrees, 1, 0.2)
        moveFromAToBInLoop(delta, rightSideTrees, 1, 0.2)

        const trunks = trunksRef.current
        const leaves = leavesRef.current

        if (!trunks || !leaves) return

        for (let i = 0; i < allTrees.length; i++) {
            const dummy = allTrees[i]
            dummy.updateMatrix()
            trunks.setMatrixAt(i, dummy.matrix)
            leaves.setMatrixAt(i, dummy.matrix)
        }

        trunks.instanceMatrix.needsUpdate = true
        leaves.instanceMatrix.needsUpdate = true
    })

    // frustumCulled is disabled because the default culling test does not
    // take the individual instance transforms into account
    return (
        <>
            <instancedMesh
                ref={trunksRef}
                args={[nodes.tronc_tronc1_0.geometry, materials.tronc1, PALM_COUNT]}
                castShadow={true}
                frustumCulled={false}
            />
            <instancedMesh
                ref={leavesRef}
                args={[leavesGeometry, materials.feuilles, PALM_COUNT]}
                castShadow={true}
                frustumCulled={false}
            />
        </>
    )
}

useGLTF.preload(PALM_GLTF_PATH)

export default Palms
