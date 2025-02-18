import React, { Suspense, useEffect, useRef, useState } from "react";

import * as THREE from "three"
import { OrbitControls,} from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

//Forces a mesh (e.g., text, plane) to always face the camera.

const Scene = () => {
    const box:any=useRef();
    const move=()=>{
        console.log(box?.current);
        // box?.current?.rotation._x=box?.current?.rotation._x+5
        // box.current.position.x+=5
    }
    return (<>
        <OrbitControls />
        <perspectiveCamera position={[100,0,550]} />
        <ambientLight intensity={2}/>
        <pointLight intensity={5} color={'blue'} position={[0,5,-5]} castShadow/>
        <RigidBody type="dynamic"ref={box} gravityScale={0.1}>
        <mesh position={[0,5,0]} onClick={()=>{move()}} castShadow>
            {/* <shapeGeometry/> */}
            <boxGeometry/>
            <meshStandardMaterial color={'red'}/>
        </mesh>
        </RigidBody>
        <RigidBody type="fixed">
        <mesh scale={[10,1,10]} receiveShadow>
            <boxGeometry/>
            <meshStandardMaterial color={'yellow'} side={THREE.DoubleSide}/>
        </mesh>
        </RigidBody>
    </>)
}
export default Scene;