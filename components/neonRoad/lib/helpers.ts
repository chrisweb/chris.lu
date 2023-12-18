import type { MutableRefObject } from 'react'
import type { Mesh, Group } from 'three'

interface IProps {
    delta: number
    objectsRef: MutableRefObject<Mesh[] | Group[]>
    cameraZPosition: number
    distanceToNextObject: number
}

const moveFromAToBInLoop = ({ delta, objectsRef, cameraZPosition, distanceToNextObject }: IProps) => {

    const objectsBehindCamera = []

    // when using "frameloop = never", the delta is not
    // in seconds but milliseconds so need to ajust the speed
    /*if (three.frameloop === 'never') {
        speed = 0.00005
    }*/
    const speed = 0.05
    const newZPosition = delta * speed

    // move all the objects by newZPosition
    for (let i = 0; i < objectsRef.current.length; i++) {

        const object = objectsRef.current[i]

        object.position.z += newZPosition

        // check if object is behind the camera
        // if cameraZPosition is at z = +1 and
        // if an object 1 unit long, then 0.5 is its center
        // so if object z > (camera pos + half object length)
        // object z > +1.5 then it is outside of the field of view
        // and gets removed
        const removeWhenAtZ = cameraZPosition + (distanceToNextObject / 2)

        if (object.position.z > removeWhenAtZ) {
            objectsBehindCamera.push(object)
        }

    }

    for (let i = 0; i < objectsBehindCamera.length; i++) {

        // order objecta by their z position
        // from highest z position to lowest
        objectsRef.current.sort((a, b) => b.position.z - a.position.z)

        // get the last object (if there is one)
        // last object is the one closest to the sun
        // and hence furthest away from the camera
        const lastObject = objectsRef.current[objectsRef.current.length - 1]

        const nextObject = objectsBehindCamera[i]

        // if there are no visible objects (if deltatime is very big
        // it might happen that all objects are out of the field of view)
        // we put the first objects, at where the camera - distance to
        // the objects center
        if (objectsBehindCamera.length === objectsRef.current.length) {
            nextObject.position.z = cameraZPosition - (distanceToNextObject / 2)
        } else {
            // if there at least one object in front of the camera
            // then the next object is placed behind the last object
            nextObject.position.z = lastObject.position.z - distanceToNextObject
        }

        objectsBehindCamera.pop()

    }

}

export { moveFromAToBInLoop }