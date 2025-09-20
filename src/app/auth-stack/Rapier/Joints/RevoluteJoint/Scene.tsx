import React, { Suspense, useEffect, useRef, useState } from "react";

import * as THREE from "three"
import { Box, Capsule, OrbitControls, PerspectiveCamera,} from "@react-three/drei";
import { CapsuleCollider, CuboidCollider, RigidBody, useFixedJoint, useRevoluteJoint,  } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
const {DEG2RAD}=THREE.MathUtils;

//What is Revolte Joint?
// A Revolute Joint in React Rapier (which is based on the Rapier physics engine) 
// is a type of joint that allows two rigid bodies to rotate around a single axis 
// while restricting their movement in other directions. It is commonly used to 
// simulate hinges, axles, and rotating mechanisms.

//real life example..
// truck hanger
// door

const Scene = () => {
  const doorRef:any = useRef(null);
  const wallRef = useRef(null);
  const ball =useRef<any>(null);
  const [pos,setPos]=useState(5)
  const joint:any = useRevoluteJoint(
    wallRef,
    doorRef,
    [
      [pos, 1.5, 0], // Rotate point from parant 
      [0,0,0], // Position of chid
      [1, 0, 0], // Rotation axis (Y-axis)
    ],
  );
  useEffect(()=>{
    setInterval(()=>{setPos(10)},200)
  },[])
  // console.log(joint?.current || '')

    return (<>
        <OrbitControls />
        <PerspectiveCamera makeDefault position={[0,15,50]} rotation={[0,2,0]}/>
        <ambientLight intensity={0.5}/>
        <pointLight intensity={80}  position={[0,5,-2]} castShadow color={'red'}/>
        <pointLight intensity={120}  position={[0,5,2]} castShadow color={'#0aaef5'}/>

        {/* floor */}
        <RigidBody type="fixed" colliders="cuboid">
          <mesh scale={[30,1,30]}>
            <boxGeometry/>
            <meshStandardMaterial color="yellow"/>
          </mesh>
        </RigidBody>

        {/* wall */}
        <RigidBody type="fixed" ref={wallRef} colliders="cuboid" position={[-5,3,-10]} rotation={[0,0,0]} sensor >
        <mesh scale={[1,5,1]}>
            <boxGeometry/>
            <meshStandardMaterial color="blue"/>
          </mesh>
        </RigidBody>

         {/* door */}
        <RigidBody type="dynamic" ref={doorRef} colliders="cuboid" canSleep={false}>
        <mesh scale={[3,5,0.2]} onClick={()=>{doorRef.current.applyTorqueImpulse({x:110,y:0,z:0})}} position={[0,0,0]}>
            <boxGeometry/>
            <meshStandardMaterial color="blue"/>
          </mesh>
        </RigidBody>

        <RigidBody position={[-1,4,0]} type="dynamic" ref={ball} mass={10}>
          <mesh scale={1} onClick={()=>{ball.current.applyImpulse({x:0,y:0,z:-100},true)}}>
            <sphereGeometry/>
            <meshStandardMaterial color="red"/>
          </mesh>
        </RigidBody>
    </>)
}
export default Scene;