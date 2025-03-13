import React, { Suspense, useEffect, useRef, useState } from "react";

import * as THREE from "three"
import { Capsule, OrbitControls, PerspectiveCamera, useKeyboardControls,} from "@react-three/drei";
import { CapsuleCollider, CuboidCollider, RigidBody } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";
// on kinematicPosition react like this...
// Not affected by forces or collisions.
// Moves based on manually set position.
// Other objects react to it, but it does not react back.

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
        move()
    },[f,b,r,l]);

    const move=()=>{
        const rigidBody = box.current;
        const position = rigidBody.translation(); // Returns a { x, y, z } vector

        if(f){
            rigidBody.setTranslation({ x: position.x, y: position.y, z: (position.z)-7.1 }, true);
        }else if(b){
            rigidBody.setTranslation({ x: position.x, y: position.y, z: position.z+7.1 }, true);
        }else if(r){
            rigidBody.setTranslation({ x: position.x+0.1, y: position.y, z: position.z }, true);
        }else if(l){
            rigidBody.setTranslation({ x: position.x-0.1, y: position.y, z: position.z }, true);
        }
        // console.log("Position:", position);
    }

    const moveLocal=()=>{
        if (box.current) {
            const rigidBody = box.current;
            
            // Get current position and rotation
            const position = rigidBody.translation();
            const rotation = rigidBody.rotation(); // Quaternion
    
            // Define local movement direction (e.g., forward in Z direction)
            const localDirection = new Vector3(0, 0, 1); // Forward
    
            // Rotate local direction by the body's rotation to get world direction
            localDirection.applyQuaternion(rotation);
    
            // Compute new position
            const newPosition = new Vector3(position.x, position.y, position.z).add(
              localDirection.multiplyScalar(3.1)
            );
    
            // Apply the movement
            rigidBody.setNextKinematicTranslation(newPosition);
          }
    }

    // useFrame((state,delta) => {
    //     console.clear();
    //     const currentRotation = box.current.rotation(); 
    //     console.log(currentRotation)
    //     const newRotation = new THREE.Quaternion();
    //     newRotation.setFromEuler(new THREE.Euler(0, state.clock.elapsedTime*-4, 0));
    //     box.current.setNextKinematicRotation(newRotation);
    //   });

    return (
    <>
        <OrbitControls />
        <PerspectiveCamera makeDefault position={[0,8,50]} rotation={[0,2,0]}/>
        <ambientLight intensity={0.5}/>
        <pointLight intensity={80}  position={[0,5,-2]} castShadow color={'red'}/>
        <pointLight intensity={120}  position={[0,5,2]} castShadow color={'#0aaef5'}/>

        <RigidBody type="kinematicPosition" gravityScale={1} ref={box} rotation={[0,0.3,0]} position={[-2,1,-5]} colliders='cuboid' name="bar" canSleep={false}>
        <mesh castShadow onClick={()=>{}} scale={[5,1,1]}>
            <boxGeometry/>
            <meshStandardMaterial color={'red'} roughness={0}/>
        </mesh>
        </RigidBody>

        <RigidBody type="dynamic" gravityScale={1} ref={ball} position={[-2,5,0]} colliders='cuboid' name="ball" canSleep={false}>
        <mesh castShadow onClick={()=>{
            ball.current.applyImpulse({x:0,y:0,z:-350},true)
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