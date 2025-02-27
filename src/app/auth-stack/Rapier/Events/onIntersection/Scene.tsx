import React, { Suspense, useEffect, useRef, useState } from "react";

import * as THREE from "three"
import { Capsule, OrbitControls, PerspectiveCamera,} from "@react-three/drei";
import { CapsuleCollider, CuboidCollider, RapierRigidBody, RigidBody } from "@react-three/rapier";

//on onIntersection we the Rigid body allow a object that he can pass through him but the detected that

const Scene = () => {
    const box=useRef<any>();
    const move=()=>{
        box.current?.applyImpulse({x:130,y:0,z:0}); // only apply force each call to roatate not move
    }
    
    return (<>
        <OrbitControls />
        <PerspectiveCamera makeDefault position={[0,12,60]} rotation={[0,2,0]}/>
        <ambientLight intensity={0.5}/>
        <pointLight intensity={80}  position={[0,5,-2]} castShadow color={'red'}/>
        <pointLight intensity={120}  position={[0,5,2]} castShadow color={'#0aaef5'}/>

        <RigidBody type="dynamic" ref={box} position={[-2,10,0]} colliders='cuboid' name="ball" canSleep={false} userData={{name:'ABC',team:'20'}}>
        <mesh castShadow onClick={()=>{move()}} scale={1}>
            <sphereGeometry/>
            <meshStandardMaterial color={'red'} roughness={0}/>
        </mesh>
        </RigidBody>

        {/* wall-1 */}
        <RigidBody type="dynamic" gravityScale={2} position={[26,20,0]} colliders='cuboid' mass={5} friction={5} name="cube"
         onCollisionEnter={(e)=>{
            const rigidBody:any = e.rigidBody;

            if (rigidBody) {
              // Apply an impulse (force) in the upward direction
              rigidBody?.applyImpulse({ x: -350, y: 0, z: 0 }, true);
            }
         }}
        >
        <mesh castShadow scale={6}>
            <boxGeometry/>
            <meshStandardMaterial color={'yellow'} roughness={0}/>
        </mesh>
        </RigidBody>

         {/* wall-2 */}
        <RigidBody type="dynamic" gravityScale={2} position={[-26,20,0]} colliders='cuboid' mass={5} friction={5} name="cube"
         onCollisionEnter={(e)=>{
            const rigidBody:any = e.rigidBody;

            if (rigidBody) {
              // Apply an impulse (force) in the upward direction
              rigidBody?.applyImpulse({ x: 450, y: 0, z: 0 }, true);
            }
         }}
         
        >
        <mesh castShadow scale={6}>
            <boxGeometry/>
            <meshStandardMaterial color={'yellow'} roughness={0}/>
        </mesh>
        </RigidBody>

        <RigidBody position={[-15,2.7,0]} type="fixed" sensor
         onIntersectionEnter={(e)=>{
            console.log(e.colliderObject?.name)
            e.rigidBody?.applyImpulse({ x: 140, y: 0, z: 0 },true)
         }}
         onIntersectionExit={(e)=>{

         }}
        >
            <CuboidCollider args={[0.5,2,5]}/>
        </RigidBody>
        {/* floor */}
        <RigidBody type="fixed">
        <mesh scale={[60,1,60]} receiveShadow>
            <boxGeometry/>
            <meshStandardMaterial color={'yellow'} side={THREE.DoubleSide}/>
        </mesh>
        </RigidBody>
    </>)
}
export default Scene;