import React, { Suspense, useEffect, useRef, useState } from "react";

import * as THREE from "three"
import { Box, Capsule, Example, OrbitControls, PerspectiveCamera,} from "@react-three/drei";
import { CapsuleCollider, CuboidCollider, RigidBody, usePrismaticJoint, useSphericalJoint ,} from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
const {DEG2RAD}=THREE.MathUtils;
import { Vector3 } from "three";


// Here’s a React Three Fiber and React Rapier example using usePrismaticJoint....
// A prismatic joint allows movement along a single axis while restricting 
// rotation and movement in other directions. A real-life example is a drawer 
// in a cabinet, which only moves in and out along a straight path.

const Scene = () => {

  const bodyA = useRef(null);
  const bodyB = useRef(null);
  const joint = useRef<any>(null);

  joint.current=usePrismaticJoint(bodyA, bodyB, [ [0, 0, 0], [0, 0, 0], [1, 0, 0] ]);

  useEffect(()=>{
    if(joint.current){
      // console.log("Joint created:", joint.current);
      setTimeout(()=>{
        // joint.current.configureMotorVelocity(2.0, 0.5);
      // Optionally set max motor force by adjusting damping or reconfiguring.
      // Example: set Spring (force) model for stable driving (if needed)
      // joint.current.configureMotorModel(RAPIER.MotorModel.ForceBased);
      // Set limits: between 0 and 3 meters
      // joint.current.setLimits(0.0, 3.0);
      },5000)
    }
    
  },[])
    return (<>
        <OrbitControls />
        <PerspectiveCamera makeDefault position={[0,15,50]} rotation={[0,2,0]}/>
        <ambientLight intensity={0.5}/>
        <pointLight intensity={80}  position={[0,5,-2]} castShadow color={'red'}/>
        <pointLight intensity={120}  position={[0,5,2]} castShadow color={'#0aaef5'}/>

      {/* Fixed base (like a cabinet) */}
      <RigidBody ref={bodyA} type="fixed" sensor>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[3, 1, 3]} />
          <meshStandardMaterial color="gray" />
        </mesh>
      </RigidBody>

      {/* Movable drawer */}
      <RigidBody ref={bodyB} type="dynamic">
        <mesh position={[-5, 0, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="brown" />
        </mesh>
      </RigidBody>
    </>)
}
export default Scene;