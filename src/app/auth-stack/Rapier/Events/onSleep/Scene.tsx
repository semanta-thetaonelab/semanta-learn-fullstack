import React, { Suspense, useEffect, useRef, useState } from "react";

import * as THREE from "three"
import { Capsule, OrbitControls, PerspectiveCamera,} from "@react-three/drei";
import { CapsuleCollider, CuboidCollider, RigidBody } from "@react-three/rapier";

// onSleep event is trigger when the object stop movement

const Scene = () => {
    const box=useRef<any>();
    const move=()=>{
        box.current?.applyImpulse({x:120,y:0,z:0}); // only apply force each call to roatate not move
    }
    
    return (<>
        <OrbitControls />
        <PerspectiveCamera makeDefault position={[0,8,50]} rotation={[0,2,0]}/>
        <ambientLight intensity={0.5}/>
        <pointLight intensity={80}  position={[0,5,-2]} castShadow color={'red'}/>
        <pointLight intensity={120}  position={[0,5,2]} castShadow color={'#0aaef5'}/>

        <RigidBody type="dynamic" gravityScale={1} ref={box} position={[-2,10,0]} colliders='cuboid' name="ball">
        <mesh castShadow onClick={()=>{move()}}>
            <sphereGeometry/>
            <meshStandardMaterial color={'red'} roughness={0}/>
        </mesh>
        </RigidBody>

        <RigidBody type="dynamic" gravityScale={2} position={[5,10,0]} colliders='cuboid' friction={5} name="cube"
         onSleep={()=>{console.log('Rigid body is sleeping')}}
        >
        <mesh castShadow scale={2}>
            <boxGeometry/>
            <meshStandardMaterial color={'yellow'} roughness={0}/>
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