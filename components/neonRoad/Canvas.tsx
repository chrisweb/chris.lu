'use client'

import { useEffect, useCallback, useRef } from 'react'
import { PerspectiveCamera, PCFSoftShadowMap, Matrix4 } from 'three'
import { Canvas } from '@react-three/fiber'
import { /*OrbitControls, useDetectGPU,*/ Text, GradientTexture, Hud, Sparkles } from '@react-three/drei'
import Meshes from './Meshes'
import Image from 'next/image'

interface IWindowSizes {
    width: number
    height: number
}

const altText = 'Chris.lu header image, displaying an 80s style landscape and sunset'

const FallbackImage: React.FC = () => {

    return (
        <Image
            src="/assets/images/neonroad/fallback-min.png"
            alt={altText}
            fill
            style={{ objectFit: 'cover' }}
            sizes="100vw"
            priority
            quality={80}
        />
    )
}

const NeonRoadCanvas: React.FC = () => {

    // uncomment if you want to see what useDetectGPU returns
    //const gpuInfo = useDetectGPU()
    //console.log('useDetectGPU: ', gpuInfo)

    const windowSizesRef = useRef<IWindowSizes>({
        width: 0,
        height: 0,
    })

    const cameraRef = useRef<PerspectiveCamera>(null)

    const sceneSetup = () => {

        if (typeof window !== 'undefined') {
            windowSizesRef.current = {
                width: window.innerWidth,
                height: window.innerHeight / 2,
            }
        }

        // basic camera
        cameraRef.current = new PerspectiveCamera(75, windowSizesRef.current.width / windowSizesRef.current.height, 0.01, 20)

        cameraRef.current.position.x = 0
        cameraRef.current.position.y = 0.06
        cameraRef.current.position.z = 1

    }

    sceneSetup()

    function Sunshine() {

        // uncomment the next lines to use the spotlight helper
        // which helps to visualize the size and direction of your light
        // uncomment also the line that sets the ref, inside of spotLight
        // put the two imports on top and if not already done also uncomment
        // the "OrbitControls" inside of the canvas element
        /*import { SpotLightHelper, SpotLight } from 'three'
        import { useHelper } from '@react-three/drei'
        const spotLightRef = useRef<SpotLight>(null)
        useHelper(spotLightRef, SpotLightHelper, '#fff400')*/
        return (
            <spotLight
                color="#ffa700"
                intensity={10}
                position={[0, 2, -4]}
                distance={20}
                angle={Math.PI / 8} // default is Math.PI/3
                //ref={spotLightRef}
                castShadow={true} // default is false
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

    // to enable stats import the module
    //import { Stats } from '@react-three/drei'
    // then add <Stats /> into the <Canvas></Canvas>

    // "skew" like transform for the text
    const chrisTextMatrix = new Matrix4()
    chrisTextMatrix.makeShear(0.2, 0, 0.4, 0, 0, 0)
    chrisTextMatrix.setPosition(0, -0.4, 0)

    return (
        // TODO: add the accessibility package: https://docs.pmnd.rs/a11y/introduction
        <>
            <Canvas
                camera={cameraRef.current}
                // https://docs.pmnd.rs/react-three-fiber/tutorials/v8-migration-guide#new-pixel-ratio-default
                //dpr={Math.min(window.devicePixelRatio, 2)} // pixel ratio, should be 1 or 2
                // https://docs.pmnd.rs/react-three-fiber/api/canvas#render-defaults
                //shadows={{ type: BasicShadowMap }} 
                shadows={{ type: PCFSoftShadowMap }}
                fallback={<FallbackImage />}
                aria-label={'canvas:' + altText}
                role="img"
                gl={{ antialias: false }}
            >
                <color attach="background" args={['#2f0f30']} />
                <Sparkles count={400} size={2} position={[0, 1, -2.1]} scale={[30, 5, 1]} speed={0} />
                {/*<axesHelper />*/}{/*enable for development*/}
                {/*<OrbitControls camera={cameraRef.current} />*/}{/*enable for development*/}
                <ambientLight color={'#ffffff'} intensity={40} />
                <Meshes />
                <Sunshine />
                <Hud>
                    <Text
                        fontSize={windowSizesRef.current.width / windowSizesRef.current.height > 1 ? 0.5 : 0.3}
                        maxWidth={200}
                        lineHeight={1}
                        letterSpacing={0.02}
                        font='/assets/fonts/PermanentMarker-Regular.ttf'
                        matrixAutoUpdate={false}
                        matrix={chrisTextMatrix}
                    >
                        <meshBasicMaterial
                            transparent
                            opacity={1}
                            toneMapped={false}
                        >
                            <GradientTexture
                                stops={[0, 1]}
                                colors={['#00feff', '#ff00aa']}
                            />
                        </meshBasicMaterial>
                        Chris.lu
                    </Text>
                </Hud>
            </Canvas>
        </>
    )
}

export default NeonRoadCanvas