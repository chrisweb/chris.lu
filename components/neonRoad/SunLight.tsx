'use client'

//import { useRef } from 'react'
import type { PropsWithChildren } from 'react'
import type { Vector3 } from '@react-three/fiber'
//import { DirectionalLightHelper } from 'three'
//import type { DirectionalLight } from 'three'
//import { useHelper } from '@react-three/drei'
// three.js tree shaking
//import { extend } from '@react-three/fiber'
//extend({ DirectionalLightHelper })

interface IProps extends PropsWithChildren {
    position: Vector3
    intensity: number
}

const SunLight: React.FC<IProps> = (props) => {

    // uncomment the next lines to use the helper
    // which helps to visualize the size and direction of your light
    // and finally uncomment the imports on top
    //const directionalLightRef = useRef<DirectionalLight>(null)

    //useHelper(directionalLightRef, DirectionalLightHelper)

    return (
        <directionalLight
            color="#a46b00"
            //ref={directionalLightRef}
            castShadow={true} // default is false
            position={props.position}
            intensity={props.intensity}
            shadow-mapSize={[1024 * 2, 1024 * 2]}
        >
            <orthographicCamera
                attach="shadow-camera"
                args={[-1, 1, 1, -1, 0.1, 3]}
            />
        </directionalLight>
    )

}

export default SunLight