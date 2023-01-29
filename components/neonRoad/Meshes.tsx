import { useRef } from 'react'
import { Object3D, Mesh, Group } from 'three'
import { useFrame, useLoader } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import PalmModel from './Palm'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const NeonRoadMesh: React.FC = () => {

    // TODO: for production image needs to be delivered by CDN not public folder
    const FLOOR_TEXTURE_PATH = './assets/images/grid13.png'
    //const FLOOR_TEXTURE_PATH = './assets/images/grid_from_example.png'
    // TODO: if we use avif though, we need to check if browser supports it
    //const FLOOR_TEXTURE_PATH = './assets/images/grid.avif'
    //const FLOOR_TEXTURE_PATH = './assets/images/grid2.avif'

    const DISPLACEMENT_MAP_PATH = './assets/images/displacement-map.png'

    //const floorTexture = useLoader(TextureLoader, FLOOR_TEXTURE_PATH)
    //const displacementMap = useLoader(TextureLoader, DISPLACEMENT_MAP_PATH)

    const PALM_SPRITE_LEFT_PATH = './assets/images/palm_sprite_left.png'
    const PALM_SPRITE_RIGHT_PATH = './assets/images/palm_sprite_right.png'

    const [floorTexture, displacementMap, palmLeftTexture, palmRightTexture] = useTexture([
        FLOOR_TEXTURE_PATH,
        DISPLACEMENT_MAP_PATH,
        PALM_SPRITE_LEFT_PATH,
        PALM_SPRITE_RIGHT_PATH,
    ])

    const displacementScale = 0.4

    const meshARef = useRef<Mesh>(null)
    const meshBRef = useRef<Mesh>(null)

    // 19 trees on the left side
    //const leftSideTreesRefs = useRef<Mesh[]>([])

    // 19 trees on the right side
    //const rightSideTreesRefs = useRef<Mesh[]>([])

    const leftSideTreesRefs = useRef<Group[]>([])
    const rightSideTreesRefs = useRef<Group[]>([])

    //const leftSideTreesRefs = useRef<Object3D[]>([])
    //const rightSideTreesRefs = useRef<Object3D[]>([])

    useFrame((state/*, delta, xrFrame*/) => {

        //console.log(state, delta, xrFrame)

        const newZPosition = (state.clock.elapsedTime * 0.1) % 2

        if (meshARef.current) {
            meshARef.current.position.z = newZPosition
        }
        if (meshBRef.current) {
            meshBRef.current.position.z = newZPosition - 2
        }

        // from position "-2.8" to "0.8" 
        let positionChange = -2.8

        leftSideTreesRefs.current.forEach((leftSideTreeRef) => {
            leftSideTreeRef.position.z = newZPosition + positionChange
            positionChange += 0.2
        })

        positionChange = -2.8

        console.log(rightSideTreesRefs)

        rightSideTreesRefs.current.forEach((rightSideTreeRef) => {
            rightSideTreeRef.position.z = newZPosition + positionChange
            positionChange += 0.2
        })

    })

    /*function TreeSprites({ amount, side }) {
        const spritesElements: React.ReactElement[] = []
        // from position "-2.8" to "0.8" 
        let positionChange = -2.8
        const palmTexture = side === 'right' ? palmRightTexture : palmLeftTexture
        for (let i = 0; i <= amount; i++) {
            spritesElements.push(
                <mesh
                    //rotation={[-Math.PI * 0.5, 0, 0]}
                    position={[side === 'right' ? 0.21 : -0.21, 0.05, positionChange]}
                    ref={ref => {
                        side === 'right' ? rightSideTreesRefs.current[i] = ref : leftSideTreesRefs.current[i] = ref
                    }}
                    scale={[0.1, 0.1, 0.1]}
                    castShadow={true} // default is false
                    key={side + i}
                >
                    <planeGeometry />
                    <meshBasicMaterial
                        map={palmTexture}
                        transparent={true}
                    //side={DoubleSide}
                    />
                </mesh>
            )
            positionChange += 0.2
        }
        return <>{spritesElements}</>
    }*/

    function TreeModels({ amount, side }) {
        const spritesElements: React.ReactElement[] = []
        // from position "-2.8" to "0.8" 
        let positionChange = -2.8
        for (let i = 0; i < amount; i++) {
            const xPosition = side === 'right' ? -0.21 : 0.21
            spritesElements.push(
                <PalmModel
                    //rotation={[-Math.PI * 0.5, 0, 0]}
                    position={[xPosition, 0, positionChange]}
                    ref={ref => {
                        side === 'right' ? rightSideTreesRefs.current[i] = ref : leftSideTreesRefs.current[i] = ref
                    }}
                    scale={[0.009, 0.009, 0.009]}
                    castShadow={true} // default is false
                    key={side + i}
                />
            )
            positionChange += 0.2
        }
        return <>{spritesElements}</>
    }

    return (
        <>
            <mesh
                rotation={[-Math.PI * 0.5, 0, 0]}
                position={[0, 0, 0]}
                ref={meshARef}
                receiveShadow={true} // default is false
            >
                <planeGeometry args={[1, 2, 24, 24]} />
                {/*<meshPhongMaterial <- more reflection but light is less beautiful, could experiment more with options like shininess */}
                <meshStandardMaterial
                    //color={'#ff00aa'}
                    map={floorTexture}
                    displacementMap={displacementMap}
                    displacementScale={displacementScale}
                    roughness={0.9}
                    metalness={0.9}
                />
            </mesh>
            <mesh
                rotation={[-Math.PI * 0.5, 0, 0]}
                position={[0, 0, -2]}
                ref={meshBRef}
                receiveShadow={true} // default is false
            >
                <planeGeometry args={[1, 2, 24, 24]} />
                {/*<meshPhongMaterial <- more reflection but light is less beautiful, could experiment more with options like shininess */}
                <meshStandardMaterial
                    //color={'#ff00aa'}
                    map={floorTexture}
                    displacementMap={displacementMap}
                    displacementScale={displacementScale}
                    roughness={0.9}
                    metalness={0.9}
                />
            </mesh>
            {/*<TreeSprites amount={19} side={'left'} />*/}
            {/*<TreeSprites amount={19} side={'right'} />*/}
            <TreeModels amount={19} side={'left'} />
            <TreeModels amount={19} side={'right'} />
        </>
    )
}

export default NeonRoadMesh