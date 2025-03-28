'use client'

import { Suspense } from 'react'
import { Canvas, type GLProps } from '@react-three/fiber'
import { PerspectiveCamera, SoftShadows, AdaptiveDpr /*, Loader, OrbitControls*//*, PerformanceMonitor, PerformanceMonitorApi/*, Hud, useDetectGPU, useProgress, StatsGl*/ } from '@react-three/drei'
import NightSky from './NightSky'
import Sun from './Sun'
import SunLight from './SunLight'
import City from './City'
import Landscape from './Landscape'
import { EffectComposer, Bloom } from '@react-three/postprocessing'

interface IProps extends React.PropsWithChildren {
    altText: string
    containerRef?: React.RefObject<HTMLDivElement | null>
}

const NeonRoadCanvas: React.FC<IProps> = (props) => {

    // uncomment if you want to see what useDetectGPU returns
    //const gpuInfo = useDetectGPU()
    //if (process.env.NODE_ENV === 'development') {
    //console.log('useDetectGPU: ', gpuInfo)
    //}

    /*const onCanvasCreatedHandler = (state: RootState) => {
        //if (process.env.NODE_ENV === 'development') {
        //console.log(state)
        //}
    }*/

    /*const onPerformanceChangeHandler = (api: PerformanceMonitorApi) => {
        if (process.env.NODE_ENV === 'development') {
            console.log(api.averages)
            console.log(api.fps)
            console.log(api.refreshrate)
            console.log(api.frames)
        }
    }*/

    /*function Loader() {
        //const { active, progress, errors, item, loaded, total } = useProgress()
        //if (process.env.NODE_ENV === 'development') {
        //console.log(active, progress, errors, item, loaded, total)
        //}
        if (progress === 100) {
            //setCanPlayState(true)
        }
        return <></>
    }*/

    const Fallback = () => {
        return (<>Sorry, this 3D animation can not be displayed on your device</>)
    }

    const aspect = (props.containerRef?.current?.clientWidth) ?
        props.containerRef.current.clientWidth / props.containerRef.current.clientHeight :
        2

    // Optimize renderer properties
    const glProps: GLProps = {
        powerPreference: 'high-performance',
        depth: false,
        //unpackColorSpace: 'srgb',
        //drawingBufferColorSpace: 'display-p3',
        //unpackColorSpace: 'display-p3',
    }

    return (
        <>
            <Canvas
                // https://docs.pmnd.rs/react-three-fiber/tutorials/v8-migration-guide#new-pixel-ratio-default
                //dpr={Math.min(window.devicePixelRatio, 2)} // pixel ratio, should be 1 or 2
                dpr={[1, 1.5]} // Limit pixel ratio to improve performance
                // https://docs.pmnd.rs/react-three-fiber/api/canvas#render-defaults
                shadows="soft"
                fallback={<Fallback />}
                aria-label={props.altText}
                role="img"
                gl={glProps}
                //onCreated={onCanvasCreatedHandler}
            >
                <Suspense fallback={<Fallback />}>
                    <AdaptiveDpr pixelated />
                    {/*<Loader />*/}
                    <PerspectiveCamera
                        makeDefault={true}
                        fov={75}
                        near={0.01}
                        far={3}
                        position={[0, 0.06, 1]}
                        aspect={aspect}
                    />
                    {/*<PerformanceMonitor onChange={onPerformanceChangeHandler} />*/}
                    <color attach="background" args={['#2f0f30']} />
                    <ambientLight color="#ecd7e2" intensity={15} />
                    <SoftShadows />
                    <NightSky
                        position={[0, 1, -2.1]}
                        scale={[20, 3, 1]}
                    />
                    <Sun
                        position={[0, 0.5, -1.6]}
                        scale={[2, 2, 0]}
                    />
                    <SunLight
                        position={[0, 0.5, -1.4]}
                        intensity={8}
                    />
                    <City
                        position={[0, 0.12, -1]}
                        scale={[0.8, 0.3, 0]}
                    />
                    <Landscape />
                    <EffectComposer>
                        <Bloom
                            luminanceThreshold={0.1}
                            intensity={0.6}
                            luminanceSmoothing={0.025}
                            // mipmap blur for better performance
                            mipmapBlur
                        />
                    </EffectComposer>
                    {/* the following components can be useful in development */}
                    {/*<axesHelper />*/}
                    {/*<OrbitControls camera={cameraRef.current} />*/}
                    {/*<StatsGl />*/}
                    {/* GUI: https://github.com/pmndrs/leva */}
                </Suspense>
            </Canvas>
            {/*<Loader />*/}
        </>
    )
}

NeonRoadCanvas.displayName = 'NeonRoadCanvas'

export default NeonRoadCanvas