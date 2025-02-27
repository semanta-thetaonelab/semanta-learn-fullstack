import React, { Suspense, useEffect, useRef, useState } from "react";

import * as THREE from "three"
import { Capsule, OrbitControls, PerspectiveCamera, useKeyboardControls,} from "@react-three/drei";
import { CapsuleCollider, CuboidCollider, RigidBody } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";

// on kinematicVelocity react like this...
// Not affected by forces or collisions.
// It can move.
// It can rotate.

const Scene = () => {
    const box=useRef<any>();
    const ball=useRef<any>();
    const f=useKeyboardControls((state)=>state.forward);
    const b=useKeyboardControls((state)=>state.backward);
    const r=useKeyboardControls((state)=>state.left);
    const l=useKeyboardControls((state)=>state.right);
    const rotate=useKeyboardControls((state)=>state.rotate);
    useEffect(()=>{
        // rotate?rotateObj():move()
        // rotateObj();
        move();
    },[f,b,r,l]);

    const move=()=>{
        const rigidBody = box.current;
        const position = rigidBody.translation(); // Returns a { x, y, z } vector

        if(f){
            rigidBody.setTranslation({ x: position.x, y: position.y, z: (position.z)-0.1 }, true);
        }else if(b){
            rigidBody.setTranslation({ x: position.x, y: position.y, z: position.z+0.1 }, true);
        }else if(r){
            rigidBody.setAngvel({ x: 0, y: 0, z: -1 }, true);
        }else if(l){
            rigidBody.setAngvel({ x:0, y: 0, z: 1 }, true);
        }
        // console.log("Position:", position);
    }

    useFrame(()=>{
        const rigidBody = box.current;
        const position = rigidBody.translation(); // Returns a { x, y, z } vector
        if(f){
            rigidBody.setTranslation({ x: position.x-0.1, y: position.y, z: (position.z)-0.1 }, true);
        }else if(b){
            rigidBody.setTranslation({ x: position.x+0.1, y: position.y, z: position.z+0.1 }, true);
        }else if(r){
            rigidBody.setAngvel({ x: 0, y: 0, z: -1 }, true);
        }else if(l){
            rigidBody.setAngvel({ x:0, y: 0, z: 0 }, true);
        }
    })

    
    return (<>
        <OrbitControls />
        <PerspectiveCamera makeDefault position={[0,8,50]} rotation={[0,2,0]}/>
        <ambientLight intensity={0.5}/>
        <pointLight intensity={80}  position={[0,5,-2]} castShadow color={'red'}/>
        <pointLight intensity={120}  position={[0,5,2]} castShadow color={'#0aaef5'}/>

        <RigidBody type="kinematicVelocity" gravityScale={1} ref={box} position={[-2,1,-5]} rotation={[0,0.5,0]} colliders='cuboid' name="bar" canSleep={false}>
        <mesh castShadow onClick={()=>{}} scale={[5,1,1]}>
            <boxGeometry/>
            <meshStandardMaterial color={'red'} roughness={0}/>
        </mesh>
        </RigidBody>

        <RigidBody type="dynamic" gravityScale={1} ref={ball} position={[-2,5,0]} colliders='cuboid' name="ball" canSleep={false}>
        <mesh castShadow onClick={()=>{
            ball.current.applyImpulse({x:0,y:0,z:-1350},true)
        }} scale={2}>
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