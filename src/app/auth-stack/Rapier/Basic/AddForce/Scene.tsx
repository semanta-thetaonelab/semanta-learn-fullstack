import React, { Suspense, useEffect, useRef, useState } from "react";

import * as THREE from "three"
import { Capsule, OrbitControls, PerspectiveCamera,} from "@react-three/drei";
import { CapsuleCollider, CuboidCollider, RapierRigidBody, RigidBody } from "@react-three/rapier";

// addForce method apply continue force to the given direction

const Scene = () => {
    const box=useRef<any>();
    const move=()=>{
        box.current?.addForce({x:60,y:0,z:0});
    }
    return (<>
        <OrbitControls />
        <PerspectiveCamera makeDefault position={[0,8,50]} rotation={[0,2,0]}/>
        <ambientLight intensity={0.5}/>
        <pointLight intensity={80}  position={[0,5,-2]} castShadow color={'red'}/>
        <pointLight intensity={120}  position={[0,5,2]} castShadow color={'#0aaef5'}/>

        <RigidBody type="dynamic" ref={box} gravityScale={1} position={[2,10,0]} colliders='cuboid'>
        <mesh castShadow onClick={()=>{move()}}>
            <sphereGeometry/>
            <meshStandardMaterial color={'red'} roughness={0}/>
        </mesh>
        </RigidBody>

        <RigidBody type="dynamic" gravityScale={20} position={[5,10,0]} colliders='cuboid'>
        <mesh castShadow onClick={()=>{move()}}>
            <boxGeometry/>
            <meshStandardMaterial color={'yellow'} roughness={100}/>
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