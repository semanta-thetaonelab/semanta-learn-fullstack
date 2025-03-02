import React, { Suspense, useEffect, useRef, useState } from "react";

import * as THREE from "three"
import { Box, Capsule, OrbitControls, PerspectiveCamera,} from "@react-three/drei";
import { CapsuleCollider, CuboidCollider, RigidBody, useSpringJoint,} from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
const {DEG2RAD}=THREE.MathUtils;

//defination
// In React Rapier, useSpringJoint is a hook that creates a spring 
// joint between two physics bodies. A spring joint applies a force 
// that pulls the two bodies together, simulating effects like springs,
//  dampers, and elastic connections.

// Example
// Bungee jumping (if the damping is low, the object bounces more).
// A car suspension system (if the damping is high, it stabilizes quickly).

const Scene = () => {

  const boxRef = useRef(null);
  const sphereRef = useRef(null);

  useSpringJoint(boxRef, sphereRef, [
    new THREE.Vector3(-5, -1, 0), // Anchor point on the first body (box)
    new THREE.Vector3(-5, -1, 0), // Anchor point on the second body (sphere) but it's don't change the second body postion 
    0, // Rest length of the spring
    10, // Stiffness (spring strength)
    0.5, //  resistance Damping 
  ]);

    return (<>
        <OrbitControls />
        <PerspectiveCamera makeDefault position={[0,15,50]} rotation={[0,2,0]}/>
        <ambientLight intensity={0.5}/>
        <pointLight intensity={80}  position={[0,5,-2]} castShadow color={'red'}/>
        <pointLight intensity={120}  position={[0,5,2]} castShadow color={'#0aaef5'}/>

        {/* floor */}
        {/* <RigidBody type="fixed" colliders="cuboid" position={[0,0,0]}>
          <mesh scale={[30,1,30]}>
            <boxGeometry/>
            <meshStandardMaterial color="yellow"/>
          </mesh>
        </RigidBody> */}

      {/* Static Box (Anchor Point) */}
      <RigidBody type="fixed" ref={boxRef}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="red" />
        </mesh>
      </RigidBody>

      {/* Sphere (Attached via Spring) */}
      <RigidBody ref={sphereRef}>
        <mesh position={[-5, -1, 0]}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial color="blue" />
        </mesh>
      </RigidBody>



    </>)
}
export default Scene;