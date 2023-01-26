'use client'

import { useRef } from 'react'
import { PerspectiveCamera } from 'three'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stats } from '@react-three/drei'
import Mesh from './Mesh'

/*interface IProps {

}*/

const NeonRoadCanvas: React.FC/*<IProps>*/ = () => {

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

    return (
        <>
            <div id="canvas-container" ref={canvasContainerRef} style={{ width: '100vw', height: 'calc(100vh/2)' }}>
                {/* to set the pixel ratio use: dpr={} */}
                <Canvas
                    camera={camera}
                    dpr={Math.min(window.devicePixelRatio, 2)}
                >
                    <Mesh />
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
                    <ambientLight color={0xffffff} intensity={5} />
                    <Stats />
                </Canvas>
            </div>
        </>
    )
}

export default NeonRoadCanvas