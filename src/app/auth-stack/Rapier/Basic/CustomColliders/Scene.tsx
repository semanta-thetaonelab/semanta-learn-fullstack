import React, { Suspense, useEffect, useRef, useState } from "react";

import * as THREE from "three"
import { Capsule, OrbitControls, PerspectiveCamera,} from "@react-three/drei";
import { CapsuleCollider, CuboidCollider, RigidBody } from "@react-three/rapier";

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
        <PerspectiveCamera makeDefault position={[0,8,50]} rotation={[0,2,0]}/>
        <ambientLight intensity={0.5}/>
        <pointLight intensity={80}  position={[0,5,-2]} castShadow color={'red'}/>
        <pointLight intensity={120}  position={[0,5,2]} castShadow color={'#0aaef5'}/>

        <RigidBody type="dynamic" ref={box} gravityScale={3} position={[2,10,0]} colliders={false}>
        <CuboidCollider args={[1,2,1]} />
        <mesh castShadow>
            <sphereGeometry/>
            <meshStandardMaterial color={'red'} roughness={0}/>
        </mesh>
        </RigidBody>

        <RigidBody type="dynamic" ref={box} gravityScale={3} position={[5,10,0]} colliders={false}>
        <CapsuleCollider args={[1,2]} />
        <mesh castShadow>
            <sphereGeometry/>
            <meshStandardMaterial color={'red'} roughness={0}/>
        </mesh>
        </RigidBody>


        <RigidBody type="fixed">
        <mesh scale={[25,1,25]} receiveShadow>
            <boxGeometry/>
            <meshStandardMaterial color={'yellow'} side={THREE.DoubleSide}/>
        </mesh>
        </RigidBody>
    </>)
}
export default Scene;