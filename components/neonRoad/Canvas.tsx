'use client'

import { useRef/*, Suspense, useState*/ } from 'react'
import type { PerspectiveCamera as PerspectiveCameraType } from 'three'
import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera/*, OrbitControls, PerformanceMonitor, PerformanceMonitorApi, StatsGl, Hud, useDetectGPU, useProgress*/ } from '@react-three/drei'
import NightSky from './NightSky'
import Sun from './Sun'
import SunLight from './SunLight'
import City from './City'
import Trees from './Trees'
import Terrains from './Terrains'
//import Loop from './Loop'
import { EffectComposer, Bloom } from '@react-three/postprocessing'

interface IProps extends React.PropsWithChildren {
    altText: string
    containerRef: React.MutableRefObject<HTMLDivElement>
}

const NeonRoadCanvas: React.FC<IProps> = (props) => {

    //const [canPlayState, setCanPlayState] = useState(false)

    // uncomment if you want to see what useDetectGPU returns
    //const gpuInfo = useDetectGPU()
    //console.log('useDetectGPU: ', gpuInfo)

    //const canvasRef = useRef<HTMLCanvasElement>(null)
    const cameraRef = useRef<PerspectiveCameraType>(null)

    // https://docs.pmnd.rs/react-three-fiber/tutorials/v8-migration-guide#expanded-gl-prop
    // https://threejs.org/docs/#api/en/renderers/WebGLRenderer
    //import { RenderProps } from '@react-three/fiber'
    /*const renderOptions: RenderProps = {
        gl: {}
    }*/

    /*const onCanvasCreatedHandler = (state: RootState) => {
        
        //console.log(state)
        
    }*/

    /*const onPerformanceChangeHandler = (api: PerformanceMonitorApi) => {
        console.log(api.averages)
        console.log(api.fps)
        console.log(api.refreshrate)
        console.log(api.frames)
    }*/

    /*function Loader() {
        //const { active, progress, errors, item, loaded, total } = useProgress()
        //console.log(active, progress, errors, item, loaded, total)
        if (progress === 100) {
            //setCanPlayState(true)
        }
        return <></>
    }*/

    const Fallback = () => {
        return (<>3D Canvas not supported on this device</>)
    }

    return (
        <>
            <Canvas
                // https://docs.pmnd.rs/react-three-fiber/tutorials/v8-migration-guide#new-pixel-ratio-default
                //dpr={Math.min(window.devicePixelRatio, 2)} // pixel ratio, should be 1 or 2
                // https://docs.pmnd.rs/react-three-fiber/api/canvas#render-defaults
                shadows={true} // true will set shadows to PCFsoft
                fallback={<Fallback />}
                aria-label={props.altText}
                role="img"
                gl={{ antialias: false }}
                //frameloop="never"
                //onCreated={onCanvasCreatedHandler}
                //ref={canvasRef}
                camera={cameraRef.current}
            >
                {/*<Suspense fallback={<Loader />}>*/}
                <PerspectiveCamera
                    makeDefault={true}
                    ref={cameraRef}
                    fov={75}
                    near={0.01}
                    far={3}
                    position={[0, 0.06, 1]}
                    aspect={props.containerRef.current.clientWidth / props.containerRef.current.clientHeight}
                />
                {/*<PerformanceMonitor onChange={onPerformanceChangeHandler} />*/}
                <color attach="background" args={['#2f0f30']} />
                <ambientLight color={'#ecd7e2'} intensity={15} />
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
                <Trees />
                <Terrains />
                {/*<Loop />*/}
                <EffectComposer>
                    <Bloom
                        luminanceThreshold={0.01}
                        intensity={0.7}
                    />
                </EffectComposer>
                {/*<axesHelper />*/}{/*enable for development*/}
                {/*<OrbitControls camera={cameraRef.current} />*/}{/*enable for development*/}
                {/*<StatsGl />*/}{/*enable for development*/}
                {/*GUI: https://github.com/pmndrs/leva*/}
                {/*</Suspense>*/}
            </Canvas>
        </>

    )
}

export default NeonRoadCanvas