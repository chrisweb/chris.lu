'use client'

//import { useRef } from 'react'
import type { PropsWithChildren } from 'react'
//import { extend } from '@react-three/fiber'
import type { Vector3 } from '@react-three/fiber'
//import { SpotLightHelper, SpotLight } from 'three'
//import { useHelper } from '@react-three/drei'
// three.js three shaking
//extend({ SpotLightHelper, SpotLight })

interface IProps extends PropsWithChildren {
    position: Vector3
    intensity: number
    distance: number
}

const SunLight: React.FC<IProps> = (props) => {

    // uncomment the next lines to use the spotlight helper
    // which helps to visualize the size and direction of your light
    // also uncomment the line that sets the ref
    // and finally uncomment the imports on top
    //const spotLightRef = useRef<SpotLight>(null)

    //useHelper(spotLightRef, SpotLightHelper, '#fff400')

    return (
        <spotLight
            color="#cc6100"
            intensity={props.intensity}
            position={props.position}
            distance={props.distance}
            angle={Math.PI / 9} // default is Math.PI/3
            //ref={spotLightRef}
            castShadow={true} // default is false
            shadow-mapSize-width={1024*2}
            shadow-mapSize-height={1024*2}
        />
    )

}

export default SunLight