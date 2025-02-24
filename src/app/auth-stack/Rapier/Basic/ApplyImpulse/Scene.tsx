import React, { Suspense, useEffect, useRef, useState } from "react";

import * as THREE from "three"
import { Capsule, OrbitControls, PerspectiveCamera,} from "@react-three/drei";
import { CapsuleCollider, CuboidCollider, RapierRigidBody, RigidBody } from "@react-three/rapier";

// applyImpluse method apply one time force to the given direction

const Scene = () => {
    const box=useRef<any>();
    const box2=useRef<any>();
    const move=()=>{
        box.current?.applyImpulse({x:0,y:60,z:0},true); //by default it's apply force at center
        box2.current?.applyImpulseAtPoint({x:0,y:0,z:250},{x:2,y:0,z:2}); //apply force at given point the first parameter is the force and second is pointer
        //pass true Rapier uses sleeping optimization to improve performance. If a body is at rest for some time, it automatically goes to "sleep" (i.e., stops simulating physics).
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

        <RigidBody type="dynamic" ref={box2} gravityScale={20} position={[5,10,0]} colliders='cuboid'>
        <mesh castShadow onClick={()=>{move()}} scale={3}>
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