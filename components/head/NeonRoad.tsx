'use client'

import { useRef } from 'react'
import { Canvas, useLoader } from '@react-three/fiber'
import { PerspectiveCamera, TextureLoader } from 'three'
import { OrbitControls, Stats, useTexture } from '@react-three/drei'

/*interface IProps {

}*/

const NeonRoad: React.FC/*<IProps>*/ = () => {

    const canvasContainerRef = useRef<HTMLDivElement>(null)

    let sizes = {
        width: 0,
        height: 0,
    }

    if (typeof window !== 'undefined') {
        sizes = {
            //width: window.innerWidth,
            //height: window.innerHeight,
            //width: canvasContainerRef.current.innerWidth,
            //height: canvasContainerRef.current.innerHeight,
            width: window.innerWidth,
            height: window.innerHeight / 2,
        }
    }

    const camera = new PerspectiveCamera(
        // field of view
        75,
        // aspect ratio
        sizes.width / sizes.height,
        // near plane: it's low since we want our mesh to be visible even from very close
        0.01,
        // far plane: how far we're rendering
        20
    )

    camera.position.x = 0
    camera.position.y = 0.06
    camera.position.z = 1.1

    // TODO: for production image needs to be delivered by CDN not public folder
    //const FLOOR_TEXTURE_PATH = './assets/images/grid.png'
    //const FLOOR_TEXTURE_PATH = './assets/images/grid_from_example.png'
    // TODO: if we use avif though, we need to check if browser supports it
    const FLOOR_TEXTURE_PATH = './assets/images/grid.avif'

    const DISPLACEMENT_MAP_PATH = './assets/images/displacement-map.png'

    const floorTexture = useLoader(TextureLoader, FLOOR_TEXTURE_PATH)
    const displacementMap = useLoader(TextureLoader, DISPLACEMENT_MAP_PATH)

    /*const [floorTexture, displacementMap] = useTexture([
        FLOOR_TEXTURE_PATH,
        DISPLACEMENT_MAP_PATH,
      ])*/

    const displacementScale = 0.4

    return (
        <>
            <div id="canvas-container" ref={canvasContainerRef} style={{width: '100vw', height: 'calc(100vh/2)'}}>
                {/* to set the pixel ratio use: dpr={} */}
                <Canvas camera={camera}>
                    <mesh
                        rotation={[-Math.PI * 0.5, 0.0, 0]}
                        position={[0, 0, 0.15]}
                    >
                        <planeGeometry args={[1, 2, 24, 24]} />
                        {/*<meshBasicMaterial wireframe color="0xffffff" />*/}
                        <meshStandardMaterial
                            map={floorTexture}
                            displacementMap={displacementMap}
                            displacementScale={displacementScale}
                        />
                        <ambientLight color={0xffffff} intensity={10} />
                    </mesh>
                    {/*<perspectiveCamera args={[
                        // field of view
                        75,
                        // aspect ratio
                        sizes.width / sizes.height,
                        // near plane: it's low since we want our mesh to be visible even from very close
                        0.01,
                        // far plane: how far we're rendering
                        20
                    ]} position={[0, 0.06, 0.1]} />*/}
                    <OrbitControls camera={camera} />
                    <Stats />
                </Canvas>
            </div>
        </>
    )
}

export default NeonRoad