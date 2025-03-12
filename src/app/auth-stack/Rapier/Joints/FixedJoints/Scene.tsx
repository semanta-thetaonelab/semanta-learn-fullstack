import React, { Suspense, useEffect, useRef, useState } from "react";

import * as THREE from "three"
import { Box, Capsule, OrbitControls, PerspectiveCamera,} from "@react-three/drei";
import { RigidBody, useFixedJoint,  } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";

//1.What is fixed joints
// A FixedJoint in React Three Rapier is a type of constraint that rigidly 
// connects two physics bodies, meaning they move as a single unit. This is 
// useful when you want two objects to be physically connected without any 
// relative movement or rotation between them.

//2.Real life example
// Imagine you're creating a hammer in a physics simulation. 
// The handle (wooden stick) and head (metal part) need to be 
// rigidly attached. Using a FixedJoint, you can connect these 
// two pieces so that they always move together.

//important *
//don't give rigid body type to chlid,
//don't need to give position to child or parent 
// declear it inside of useFixedJoint,

const Scene = () => {
    const handleRef = useRef<any>(null);
    const headRef = useRef<any>(null);

    useFixedJoint(headRef,handleRef ,[ //second ref is parent if it's move then handle ref will be move
        [0, 1, 0], // body1Anchor (top of the handle)
        [0, 0, 0, 1], // body1LocalFrame (no rotation)
        [0, -0.50, 0], // body2Anchor (bottom of the hammerhead)
        [0, 0, 0, 1], // body2LocalFrame (no rotation)
      ]);

      useFrame(()=>{
        const position = handleRef.current.translation();
        handleRef.current.setTranslation({ x: position.x, y: position.y, z: (position.z)+0.001 }, true);
        handleRef.current.setAngvel({ x: 0, y: 0, z: -1 }, true);
        // console.clear();
        // console.log(position)
        
      })
    return (<>
        <OrbitControls />
        <PerspectiveCamera makeDefault position={[0,0,10]} rotation={[0,2,0]}/>
        <ambientLight intensity={0.5}/>
        <pointLight intensity={80}  position={[0,5,-2]} castShadow color={'red'}/>
        <pointLight intensity={120}  position={[0,5,2]} castShadow color={'#0aaef5'}/>

        <RigidBody ref={handleRef} colliders="cuboid" type="kinematicVelocity">
        <Box args={[0.2, 2, 0.2]} castShadow receiveShadow>
          <meshStandardMaterial color="brown" />
        </Box>
      </RigidBody>

      {/* Head */}
      <RigidBody ref={headRef} colliders="cuboid">
        <Box args={[0.6, 0.3, 0.3]} castShadow receiveShadow>
          <meshStandardMaterial color="gray" roughness={0}/>
        </Box>
      </RigidBody>

    </>)
}
export default Scene;