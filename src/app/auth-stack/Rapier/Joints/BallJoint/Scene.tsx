import React, { Suspense, useEffect, useRef, useState } from "react";

import * as THREE from "three"
import { Box, Capsule, Example, OrbitControls, PerspectiveCamera,} from "@react-three/drei";
import { CapsuleCollider, CuboidCollider, RigidBody, useSphericalJoint ,} from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
const {DEG2RAD}=THREE.MathUtils;
import { Vector3 } from "three";

// Example
// 1️⃣ Robot Arm Joint → A robot’s shoulder or wrist joint rotates freely.
// 2️⃣ Hanging Lamp → A lamp attached to the ceiling swings naturally.
// 3️⃣ Ball-and-Socket Joint → The hip or shoulder joint in the human body!

const Scene = () => {

  // Connect the sphere to the box using a ball joint
  const boxRef = useRef(null);
  const sphereRef:any = useRef(null);

  // Define the spherical (ball) joint
  useSphericalJoint(boxRef, sphereRef, [
    new Vector3(0, 0, 0), // Anchor point on the box (bottom center) of parent
    new Vector3(0, 3, 0),  // Anchor point on the sphere (top center) of child
  ]);


    return (<>
        <OrbitControls />
        <PerspectiveCamera makeDefault position={[0,15,50]} rotation={[0,2,0]}/>
        <ambientLight intensity={0.5}/>
        <pointLight intensity={80}  position={[0,5,-2]} castShadow color={'red'}/>
        <pointLight intensity={120}  position={[0,5,2]} castShadow color={'#0aaef5'}/>

{/* Static Box (Anchor Point) */}
      <RigidBody type="fixed" ref={boxRef}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="red" />
        </mesh>
      </RigidBody>

      {/* Sphere (Attached via Ball Joint) */}
      <RigidBody ref={sphereRef} canSleep={false}>
        <mesh position={[0, 0, 0]} onClick={()=>{ // always give the position 0 so it's take joint position
          sphereRef.current.applyImpulse({x:0,y:0,z:-10})
        }}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial color="blue" />
        </mesh>
      </RigidBody>



    </>)
}
export default Scene;