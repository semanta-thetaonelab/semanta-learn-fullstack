import React, { Suspense, useEffect, useRef, useState } from "react";

import * as THREE from "three"
import { Capsule, OrbitControls, PerspectiveCamera,} from "@react-three/drei";
import { CapsuleCollider, CuboidCollider, RigidBody } from "@react-three/rapier";

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

const Scene = () => {
    const box=useRef<any>();
    const move=()=>{
        box.current?.applyImpulse({x:-150,y:10,z:0}); // only apply force each call to roatate not move
    }
    
    return (<>
        <OrbitControls />
        <PerspectiveCamera makeDefault position={[0,8,50]} rotation={[0,2,0]}/>
        <ambientLight intensity={0.5}/>
        <pointLight intensity={80}  position={[0,5,-2]} castShadow color={'red'}/>
        <pointLight intensity={120}  position={[0,5,2]} castShadow color={'#0aaef5'}/>

    </>)
}
export default Scene;