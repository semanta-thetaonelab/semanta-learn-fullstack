import React, { Suspense, useEffect, useRef, useState } from "react";

import * as THREE from "three"
import { Capsule, OrbitControls, PerspectiveCamera,} from "@react-three/drei";
import { CapsuleCollider, CuboidCollider, RapierRigidBody, RigidBody } from "@react-three/rapier";

//on collision Enter or Exit it's detected it's hit by whome object...

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

        <RigidBody type="dynamic" ref={box} position={[-2,10,0]} colliders='cuboid' name="ball" canSleep={false}>
        <mesh castShadow onClick={()=>{move()}} scale={1}>
            <sphereGeometry/>
            <meshStandardMaterial color={'red'} roughness={0}/>
        </mesh>
        </RigidBody>

        <RigidBody type="dynamic" gravityScale={2} position={[12.1,20,0]} colliders='cuboid' mass={5} friction={5} name="cube"
         onCollisionEnter={(e)=>{
            console.log(e.colliderObject,'Enter colliderObject') // return the mesh who cause the collision
            console.log(e.colliderObject?.name,'Enter colliderObject') // return the mesh name who cause the collision
            console.log(e.rigidBodyObject,'Enter rigidBodyObject') // return the mesh Rigid Body as object who cause the collision
            console.log(e.rigidBody,'Enter rigidBody') // return the mesh Rigid Body 
            console.log(e.manifold.normal(),'manifold.normal'); // The direction of the collision force.
            
            const rigidBody:any = e.rigidBody;

            if (rigidBody) {
              // Apply an impulse (force) in the upward direction
              rigidBody?.applyImpulse({ x: -180, y: 0, z: 0 }, true);
            }
         }}

        //  onCollisionExit={(e)=>{
        //     console.log(e.colliderObject,'Exit')
        //     console.log(e.colliderObject?.name,'Exit')
        //  }}
         
        >
        <mesh castShadow scale={6}>
            <boxGeometry/>
            <meshStandardMaterial color={'yellow'} roughness={0}/>
        </mesh>
        </RigidBody>

        <RigidBody type="dynamic" position={[0,5,0]} scale={[3,0.2,3]}>
        <mesh castShadow scale={6}>
            <boxGeometry/>
            <meshStandardMaterial color={'yellow'} roughness={0}/>
        </mesh>
        </RigidBody>
        <RigidBody type="fixed">
        <mesh scale={[55,1,55]} receiveShadow>
            <boxGeometry/>
            <meshStandardMaterial color={'yellow'} side={THREE.DoubleSide}/>
        </mesh>
        </RigidBody>
    </>)
}
export default Scene;