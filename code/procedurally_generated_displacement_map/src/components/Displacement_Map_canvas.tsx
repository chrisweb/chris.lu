import { useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera, OrbitControls } from '@react-three/drei'
import type { PerspectiveCamera as PerspectiveCameraType, Mesh } from 'three'
import Terrain from './Terrain_04_frequency_and_octaves'

const Displacement_Map_canvas: React.FC = () => {

    const cameraRef = useRef<PerspectiveCameraType>(null!)
    const terrainRef = useRef<Mesh>(null)

    const [amplitude1State, setAmplitude1State] = useState<number>(1)
    const [amplitude2State, setAmplitude2State] = useState<number>(0.5)
    const [amplitude3State, setAmplitude3State] = useState<number>(0.25)
    const [frequency1State, setFrequency1State] = useState<number>(1)
    const [frequency2State, setFrequency2State] = useState<number>(2)
    const [frequency3State, setFrequency3State] = useState<number>(4)

    const width = 600
    const height = 300
    const aspect = width / height

    const amplitude1ChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
        setAmplitude1State(parseFloat(event.currentTarget.value))
    }

    const amplitude2ChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
        setAmplitude2State(parseFloat(event.currentTarget.value))
    }

    const amplitude3ChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
        setAmplitude3State(parseFloat(event.currentTarget.value))
    }

    const frequency1ChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
        setFrequency1State(parseFloat(event.currentTarget.value))
    }

    const frequency2ChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
        setFrequency2State(parseFloat(event.currentTarget.value))
    }

    const frequency3ChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
        setFrequency3State(parseFloat(event.currentTarget.value))
    }

    return (
        <>
            <div style={{ position: 'relative', width: width + 'px', height: height + 'px' }}>
                <Canvas
                    gl={{ antialias: false }}
                    camera={cameraRef.current}
                >
                    <PerspectiveCamera
                        makeDefault={true}
                        ref={cameraRef}
                        fov={75}
                        near={0.01}
                        far={3}
                        position={[0, 0.4, 0.7]}
                        aspect={aspect}
                    />
                    <ambientLight
                        color={'#fff'}
                        intensity={50}
                    />
                    <Terrain
                        ref={terrainRef}
                        amplitude1={amplitude1State}
                        amplitude2={amplitude2State}
                        amplitude3={amplitude3State}
                        frequency1={frequency1State}
                        frequency2={frequency2State}
                        frequency3={frequency3State}
                    />
                    <OrbitControls camera={cameraRef.current} />
                </Canvas>
            </div>
            <h5>Amplitude (octave 1): </h5>
            <input type="range" id="amplitude1" min="0.05" max="1" value={amplitude1State} step="0.05" onChange={amplitude1ChangeHandler} />
            <input type="text" readOnly={true} value={amplitude1State} />
            <h5>Amplitude (octave 2): </h5>
            <input type="range" id="amplitude2" min="0.05" max="1" value={amplitude2State} step="0.05" onChange={amplitude2ChangeHandler} />
            <input type="text" readOnly={true} value={amplitude2State} />
            <h5>Amplitude (octave 3): </h5>
            <input type="range" id="amplitude3" min="0.05" max="1" value={amplitude3State} step="0.05" onChange={amplitude3ChangeHandler} />
            <input type="text" readOnly={true} value={amplitude3State} />
            <h5>Frequency (octave 1): </h5>
            <input type="range" id="frequency1" min="1" max="10" value={frequency1State} step="1" onChange={frequency1ChangeHandler} />
            <input type="text" readOnly={true} value={frequency1State} />
            <h5>Frequency (octave 2): </h5>
            <input type="range" id="frequency2" min="1" max="10" value={frequency2State} step="1" onChange={frequency2ChangeHandler} />
            <input type="text" readOnly={true} value={frequency2State} />
            <h5>Frequency (octave 3): </h5>
            <input type="range" id="frequency3" min="1" max="10" value={frequency3State} step="1" onChange={frequency3ChangeHandler} />
            <input type="text" readOnly={true} value={frequency3State} />
        </>
    )

}

export { Displacement_Map_canvas }