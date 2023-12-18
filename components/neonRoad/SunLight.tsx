'use client'

import type { PropsWithChildren } from 'react'
import type { Vector3 } from '@react-three/fiber'

interface IProps extends PropsWithChildren {
    position: Vector3
}

const SunLight: React.FC<IProps> = (props) => {

    // uncomment the next lines to use the spotlight helper
    // which helps to visualize the size and direction of your light
    // uncomment also the line that sets the ref, inside of spotLight
    // put the two imports on top
    /*import { SpotLightHelper, SpotLight } from 'three'
    import { useHelper } from '@react-three/drei'
    // three.js three shaking
    extend({ SpotLightHelper, SpotLight })
    const spotLightRef = useRef<SpotLight>(null)
    useHelper(spotLightRef, SpotLightHelper, '#fff400')*/
    return (
        <spotLight
            color="#cc8000"
            intensity={80}
            position={props.position}
            distance={20}
            angle={Math.PI / 9} // default is Math.PI/3
            //ref={spotLightRef}
            castShadow={true} // default is false
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
        />
    )

}

export default SunLight