import React, { Suspense, useEffect, useRef, useState } from "react";

import * as THREE from "three"
import { Box, Capsule, OrbitControls, PerspectiveCamera,} from "@react-three/drei";
import { CapsuleCollider, CuboidCollider, RigidBody, useFixedJoint, useRevoluteJoint,  } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
const {DEG2RAD}=THREE.MathUtils;

const Scene = () => {
  const doorRef = useRef(null);
  const wallRef = useRef(null);
  const joint = useRevoluteJoint(
    wallRef,
    doorRef,
    [
      [1, 0, 0], // Rotate point from parant 
      [2,0,0], // Position of child
      [0, 0.2, 0], // Rotation axis (Y-axis)
    ]
  )

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
        <RigidBody type="fixed" ref={wallRef} colliders="cuboid" position={[-5,3,-10]} rotation={[0,0,0]}>
        <mesh scale={[1,5,1]}>
            <boxGeometry/>
            <meshStandardMaterial color="blue"/>
          </mesh>
        </RigidBody>

         {/* door */}
        <RigidBody type="dynamic" ref={doorRef} colliders="cuboid">
        <mesh scale={[3,5,0.2]}>
            <boxGeometry/>
            <meshStandardMaterial color="blue"/>
          </mesh>
        </RigidBody>

        <></>
    </>)
}
export default Scene;