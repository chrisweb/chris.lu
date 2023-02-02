'use client'

import { useRef } from 'react'
import { PerspectiveCamera, PCFSoftShadowMap } from 'three'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useDetectGPU } from '@react-three/drei'
import Meshes from './Meshes'

const NeonRoadCanvas: React.FC = () => {

    const canvasContainerRef = useRef<HTMLDivElement>(null)

    const gpuInfo = useDetectGPU()

    let sizes = {
        width: 0,
        height: 0,
    }

    let camera: PerspectiveCamera

    const sceneSetup = () => {

        if (typeof window !== 'undefined') {
            sizes = {
                width: window.innerWidth,
                height: window.innerHeight / 2,
            }
        }

        // basic camera
        camera = new PerspectiveCamera(75, sizes.width / sizes.height, 0.01, 20)

        camera.position.x = 0
        camera.position.y = 0.06
        camera.position.z = 1

    }

    function Lights() {
        const spotLightRef = useRef(null)
        if (spotLightRef.current) {
            spotLightRef.current.target.position.set([0, -1, 0])
        }
        // uncomment the next lines to use the spotlight helper which helps to visualize the size and direction of your light
        //import { SpotLightHelper } from 'three'
        //import { useHelper } from '@react-three/drei'
        //useHelper(spotLightRef, SpotLightHelper, '#fff400')
        return (
            <spotLight
                color="#ffa700"
                intensity={10}
                position={[0, 2, -4]}
                distance={20}
                angle={Math.PI / 8} // default is Math.PI/3
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

    // https://docs.pmnd.rs/react-three-fiber/tutorials/v8-migration-guide#expanded-gl-prop
    // https://threejs.org/docs/#api/en/renderers/WebGLRenderer
    //import { RenderProps } from '@react-three/fiber'
    /*const renderOptions: RenderProps = {
        gl: {}
    }*/

    if (typeof window !== 'undefined') {
        console.log('useDetectGPU: ', gpuInfo)
        sceneSetup()
    }

    // to enable stats import the module
    //import { Stats } from '@react-three/drei'
    // then add <Stats /> into the <Canvas></Canvas>

    return (
        // TODO: add the accessibility package: https://docs.pmnd.rs/a11y/introduction
        <>
            <div id="canvas-container" ref={canvasContainerRef} style={{ width: '100vw', height: 'calc(100vh/2)' }}>
                <Canvas
                    camera={camera}
                    // https://docs.pmnd.rs/react-three-fiber/tutorials/v8-migration-guide#new-pixel-ratio-default
                    //dpr={Math.min(window.devicePixelRatio, 2)} // pixel ratio, should be 1 or 2
                    aria-label="Chris.lu header image, displaying an 80s style sunset"
                    role="img"
                    // https://docs.pmnd.rs/react-three-fiber/api/canvas#render-defaults
                    //shadows={{ type: BasicShadowMap }} 
                    shadows={{ type: PCFSoftShadowMap }}
                >
                    <Meshes />
                    <Lights />
                    <OrbitControls camera={camera} />
                    <ambientLight color={'#ffffff'} intensity={40} />
                </Canvas>
            </div>
        </>
    )
}

export default NeonRoadCanvas