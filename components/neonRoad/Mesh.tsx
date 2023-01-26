import { useRef } from 'react'
import { Mesh, Sprite } from 'three'
import { useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'

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

    const PALM_SPRITE_LEFT_PATH = './assets/images/palm_sprite_right.png'
    const PALM_SPRITE_RIGHT_PATH = './assets/images/palm_sprite_left.png'

    const [floorTexture, displacementMap, palmRightTexture, palmLeftTexture] = useTexture([
        FLOOR_TEXTURE_PATH,
        DISPLACEMENT_MAP_PATH,
        PALM_SPRITE_LEFT_PATH,
        PALM_SPRITE_RIGHT_PATH,
    ])

    const displacementScale = 0.4

    const meshARef = useRef<Mesh>(null)
    const meshBRef = useRef<Mesh>(null)
    const spriteARef = useRef<Sprite>(null)
    const spriteBRef = useRef<Sprite>(null)
    const spriteCRef = useRef<Sprite>(null)
    const spriteDRef = useRef<Sprite>(null)
    const spriteERef = useRef<Sprite>(null)
    const spriteFRef = useRef<Sprite>(null)
    const spriteGRef = useRef<Sprite>(null)
    const spriteHRef = useRef<Sprite>(null)
    const spriteIRef = useRef<Sprite>(null)
    const spriteJRef = useRef<Sprite>(null)
    const spriteKRef = useRef<Sprite>(null)
    const spriteLRef = useRef<Sprite>(null)
    const spriteMRef = useRef<Sprite>(null)
    const spriteNRef = useRef<Sprite>(null)
    const spriteORef = useRef<Sprite>(null)
    const spritePRef = useRef<Sprite>(null)
    const spriteQRef = useRef<Sprite>(null)
    const spriteRRef = useRef<Sprite>(null)
    const spriteSRef = useRef<Sprite>(null)

    const spriteTRef = useRef<Sprite>(null)

    useFrame((state/*, delta, xrFrame*/) => {
        //console.log(state, delta, xrFrame)
        const newZPosition = (state.clock.elapsedTime * 0.15) % 2
        if (meshARef.current) {
            meshARef.current.position.z = newZPosition
        }
        if (meshBRef.current) {
            meshBRef.current.position.z = newZPosition - 2
        }
        if (spriteARef.current) {
            spriteARef.current.position.z = newZPosition - 0.8
        }
        if (spriteBRef.current) {
            spriteBRef.current.position.z = newZPosition - 0.6
        }
        if (spriteCRef.current) {
            spriteCRef.current.position.z = newZPosition - 0.4
        }
        if (spriteDRef.current) {
            spriteDRef.current.position.z = newZPosition - 0.2
        }
        if (spriteERef.current) {
            spriteERef.current.position.z = newZPosition
        }
        if (spriteFRef.current) {
            spriteFRef.current.position.z = newZPosition + 0.2
        }
        if (spriteGRef.current) {
            spriteGRef.current.position.z = newZPosition + 0.4
        }
        if (spriteHRef.current) {
            spriteHRef.current.position.z = newZPosition + 0.6
        }
        if (spriteIRef.current) {
            spriteIRef.current.position.z = newZPosition + 0.8
        }

        if (spriteJRef.current) {
            spriteJRef.current.position.z = newZPosition - 2.8
        }
        if (spriteKRef.current) {
            spriteKRef.current.position.z = newZPosition - 2.6
        }
        if (spriteLRef.current) {
            spriteLRef.current.position.z = newZPosition - 2.4
        }
        if (spriteMRef.current) {
            spriteMRef.current.position.z = newZPosition - 2.2
        }
        if (spriteNRef.current) {
            spriteNRef.current.position.z = newZPosition - 2
        }
        if (spriteORef.current) {
            spriteORef.current.position.z = newZPosition - 1.8
        }
        if (spritePRef.current) {
            spritePRef.current.position.z = newZPosition - 1.6
        }
        if (spriteQRef.current) {
            spriteQRef.current.position.z = newZPosition - 1.4
        }
        if (spriteRRef.current) {
            spriteRRef.current.position.z = newZPosition - 1.2
        }
        if (spriteSRef.current) {
            spriteSRef.current.position.z = newZPosition - 1
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

            <sprite
                position={[-0.21, 0.05, -0.8]}
                scale={[0.1, 0.1, 0.1]}
                ref={spriteARef}
            >
                <spriteMaterial
                    map={palmLeftTexture}
                />
            </sprite>
            <sprite
                position={[-0.21, 0.05, -0.6]}
                scale={[0.1, 0.1, 0.1]}
                ref={spriteBRef}
            >
                <spriteMaterial
                    map={palmLeftTexture}
                />
            </sprite>
            <sprite
                position={[-0.21, 0.05, -0.4]}
                scale={[0.1, 0.1, 0.1]}
                ref={spriteCRef}
            >
                <spriteMaterial
                    map={palmLeftTexture}
                />
            </sprite>
            <sprite
                position={[-0.21, 0.05, -0.2]}
                scale={[0.1, 0.1, 0.1]}
                ref={spriteDRef}
            >
                <spriteMaterial
                    map={palmLeftTexture}
                />
            </sprite>
            <sprite
                position={[-0.21, 0.05, 0]}
                scale={[0.1, 0.1, 0.1]}
                ref={spriteERef}
            >
                <spriteMaterial
                    map={palmLeftTexture}
                />
            </sprite>
            <sprite
                position={[-0.21, 0.05, 0.2]}
                scale={[0.1, 0.1, 0.1]}
                ref={spriteFRef}
            >
                <spriteMaterial
                    map={palmLeftTexture}
                />
            </sprite>
            <sprite
                position={[-0.21, 0.05, 0.4]}
                scale={[0.1, 0.1, 0.1]}
                ref={spriteGRef}
            >
                <spriteMaterial
                    map={palmLeftTexture}
                />
            </sprite>
            <sprite
                position={[-0.21, 0.05, 0.6]}
                scale={[0.1, 0.1, 0.1]}
                ref={spriteHRef}
            >
                <spriteMaterial
                    map={palmLeftTexture}
                />
            </sprite>
            <sprite
                position={[-0.21, 0.05, 0.8]}
                scale={[0.1, 0.1, 0.1]}
                ref={spriteIRef}
            >
                <spriteMaterial
                    map={palmLeftTexture}
                />
            </sprite>
            <sprite
                position={[-0.21, 0.05, -2.8]}
                scale={[0.1, 0.1, 0.1]}
                ref={spriteJRef}
            >
                <spriteMaterial
                    map={palmLeftTexture}
                />
            </sprite>
            <sprite
                position={[-0.21, 0.05, -2.6]}
                scale={[0.1, 0.1, 0.1]}
                ref={spriteKRef}
            >
                <spriteMaterial
                    map={palmLeftTexture}
                />
            </sprite>
            <sprite
                position={[-0.21, 0.05, -2.4]}
                scale={[0.1, 0.1, 0.1]}
                ref={spriteLRef}
            >
                <spriteMaterial
                    map={palmLeftTexture}
                />
            </sprite>
            <sprite
                position={[-0.21, 0.05, -2.2]}
                scale={[0.1, 0.1, 0.1]}
                ref={spriteMRef}
            >
                <spriteMaterial
                    map={palmLeftTexture}
                />
            </sprite>
            <sprite
                position={[-0.21, 0.05, -2]}
                scale={[0.1, 0.1, 0.1]}
                ref={spriteNRef}
            >
                <spriteMaterial
                    map={palmLeftTexture}
                />
            </sprite>
            <sprite
                position={[-0.21, 0.05, -1.8]}
                scale={[0.1, 0.1, 0.1]}
                ref={spriteORef}
            >
                <spriteMaterial
                    map={palmLeftTexture}
                />
            </sprite>
            <sprite
                position={[-0.21, 0.05, -1.6]}
                scale={[0.1, 0.1, 0.1]}
                ref={spritePRef}
            >
                <spriteMaterial
                    map={palmLeftTexture}
                />
            </sprite>
            <sprite
                position={[-0.21, 0.05, -1.4]}
                scale={[0.1, 0.1, 0.1]}
                ref={spriteQRef}
            >
                <spriteMaterial
                    map={palmLeftTexture}
                />
            </sprite>
            <sprite
                position={[-0.21, 0.05, -1.2]}
                scale={[0.1, 0.1, 0.1]}
                ref={spriteRRef}
            >
                <spriteMaterial
                    map={palmLeftTexture}
                />
            </sprite>
            <sprite
                position={[-0.21, 0.05, -1]}
                scale={[0.1, 0.1, 0.1]}
                ref={spriteSRef}
            >
                <spriteMaterial
                    map={palmLeftTexture}
                />
            </sprite>


            
            <sprite
                position={[0.21, 0.05, 0.8]}
                scale={[0.1, 0.1, 0.1]}
                ref={spriteTRef}
            >
                <spriteMaterial
                    map={palmRightTexture}
                />
            </sprite>
        </>
    )
}

export default NeonRoadMesh