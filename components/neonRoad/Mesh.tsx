import { useRef } from 'react'
import { Mesh } from 'three'
import { PrimitiveProps, useFrame } from '@react-three/fiber'
import { useTexture, useGLTF } from '@react-three/drei'

const NeonRoadMesh: React.FC = () => {

    // TODO: for production image needs to be delivered by CDN not public folder
    const FLOOR_TEXTURE_PATH = './assets/images/grid9.png'
    //const FLOOR_TEXTURE_PATH = './assets/images/grid_from_example.png'
    // TODO: if we use avif though, we need to check if browser supports it
    //const FLOOR_TEXTURE_PATH = './assets/images/grid.avif'
    //const FLOOR_TEXTURE_PATH = './assets/images/grid2.avif'

    const DISPLACEMENT_MAP_PATH = './assets/images/displacement-map.png'

    //const floorTexture = useLoader(TextureLoader, FLOOR_TEXTURE_PATH)
    //const displacementMap = useLoader(TextureLoader, DISPLACEMENT_MAP_PATH)

    const [floorTexture, displacementMap] = useTexture([
        FLOOR_TEXTURE_PATH,
        DISPLACEMENT_MAP_PATH,
    ])

    const PALM_TREE_MODEL_PATH = './assets/3d_models/chris_palm.glb'
    //const PALM_TREE_MODEL_PATH = 'https://cdn.jsdelivr.net/gh/Sean-Bradley/React-Three-Fiber-Boilerplate@glTFLoader/public/models/monkey.glb'

    const [palmTree] = useGLTF([
        PALM_TREE_MODEL_PATH,
    ])

    const displacementScale = 0.4

    const meshARef = useRef<Mesh>(null)
    const meshBRef = useRef<Mesh>(null)
    const palmARef = useRef<PrimitiveProps>(null)

    useFrame((state, delta, xrFrame) => {
        //console.log(state, delta, xrFrame)
        const newZPosition = (state.clock.elapsedTime * 0.15) % 2
        if (meshARef.current) {
            // rotates the object
            meshARef.current.position.z = newZPosition
        }
        if (meshBRef.current) {
            // rotates the object
            meshBRef.current.position.z = newZPosition - 2
        }
    })

    return (
        <>
            <mesh
                rotation={[-Math.PI * 0.5, 0, 0]}
                position={[0, 0, 0]}
                ref={meshARef}
            >
                <planeGeometry args={[1, 2, 24, 24]} />
                <meshStandardMaterial
                    map={floorTexture}
                    displacementMap={displacementMap}
                    displacementScale={displacementScale}
                    roughness={0}
                />
            </mesh>
            <mesh
                rotation={[-Math.PI * 0.5, 0, 0]}
                position={[0, 0, -2]}
                ref={meshBRef}
            >
                <planeGeometry args={[1, 2, 24, 24]} />
                <meshStandardMaterial
                    map={floorTexture}
                    displacementMap={displacementMap}
                    displacementScale={displacementScale}
                    roughness={0}
                />
            </mesh>
            <primitive
                object={palmTree.scene}
                ref={palmARef}
            />
        </>
    )
}

export default NeonRoadMesh