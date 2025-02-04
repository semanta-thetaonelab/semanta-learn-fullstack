import React, { Suspense, useEffect, useState } from "react";

import * as THREE from "three"
import { OrbitControls, useGLTF, useAnimations, useTexture, Billboard, Text, useKeyboardControls } from "@react-three/drei";

//Forces a mesh (e.g., text, plane) to always face the camera.

const Scene = () => {
    const texture = useTexture("/img/wood.jpg");
    const forward = useKeyboardControls((state) => state.forward);
    const backward = useKeyboardControls((state) => state.backward);
    const left = useKeyboardControls((state) => state.left);
    const right = useKeyboardControls((state) => state.right);
    useEffect(()=>{
        console.clear()
        console.log({forward,backward,left,right})
    },[forward,backward,left,right,right])
    return (<>
        <OrbitControls />
        <ambientLight intensity={2} />

        <group>
            <mesh>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial map={texture} />
            </mesh>
        </group>

    </>)
}
useGLTF.preload('/modals/monk.glb')
export default Scene;