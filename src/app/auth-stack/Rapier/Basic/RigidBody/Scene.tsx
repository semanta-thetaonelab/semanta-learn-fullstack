import React, { Suspense, useEffect, useRef, useState } from "react";

import * as THREE from "three"
import { OrbitControls, PerspectiveCamera,} from "@react-three/drei";
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
        <PerspectiveCamera makeDefault position={[0,8,20]} rotation={[0,2,0]}/>
        <ambientLight intensity={0.5}/>
        <pointLight intensity={80}  position={[0,5,-2]} castShadow color={'red'}/>
        <pointLight intensity={120}  position={[0,5,2]} castShadow color={'#0aaef5'}/>
        <RigidBody type="dynamic"ref={box} gravityScale={0.1}>
        <mesh position={[0,5,0]} onClick={()=>{move()}} castShadow>
            {/* <shapeGeometry/> */}
            <boxGeometry/>
            <meshStandardMaterial color={'red'} roughness={0}/>
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