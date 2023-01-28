'use client'

import { useRef } from 'react'
import { PerspectiveCamera, SpotLightHelper, PCFSoftShadowMap, BasicShadowMap } from 'three'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stats, useHelper } from '@react-three/drei'
import Meshes from './Meshes'

const NeonRoadCanvas: React.FC = () => {

    const canvasContainerRef = useRef<HTMLDivElement>(null)

    let sizes = {
        width: 0,
        height: 0,
    }

    if (typeof window !== 'undefined') {
        sizes = {
            width: window.innerWidth,
            height: window.innerHeight / 2,
        }
    }

    // basic camera
    const camera = new PerspectiveCamera(75, sizes.width / sizes.height, 0.01, 20)

    camera.position.x = 0
    camera.position.y = 0.06
    camera.position.z = 1

    function Lights() {
        const spotLightRef = useRef(null)
        if (spotLightRef.current) {
            spotLightRef.current.target.position.set([0, -1, 0])
        }
        useHelper(spotLightRef, SpotLightHelper, '#fff400')
        return (
            <spotLight
                color="#ffa700"
                intensity={10}
                position={[0, 2, -4]}
                distance={20}
                angle={Math.PI/8} // default is Math.PI/3
                ref={spotLightRef}
                castShadow={true} // default is false
                //shadowBias={0.001}
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                shadow-camera-far={500}
                shadow-camera-left={-100}
                shadow-camera-right={100}
                shadow-camera-top={100}
                shadow-camera-bottom={-100}
            />
        )
    }

    return (
        // TODO: add the accessibility package: https://docs.pmnd.rs/a11y/introduction
        <>
            <div id="canvas-container" ref={canvasContainerRef} style={{ width: '100vw', height: 'calc(100vh/2)' }}>
                {/* to set the pixel ratio use: dpr={} */}
                <Canvas
                    camera={camera}
                    dpr={Math.min(window.devicePixelRatio, 2)}
                    aria-label="Chris.lu header image, displaying an 80s style sunset"
                    role="img"
                    shadows={{ type: PCFSoftShadowMap }}
                    //shadows={{ type: BasicShadowMap }}
                >
                    <Meshes />
                    <Lights />
                    <OrbitControls camera={camera} />
                    <ambientLight color={'#ffffff'} intensity={40} />
                    <Stats />
                </Canvas>
            </div>
        </>
    )
}

export default NeonRoadCanvas