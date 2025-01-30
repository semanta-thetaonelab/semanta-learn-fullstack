import React, { Suspense, useEffect, useState } from "react";

import * as THREE from "three"
import { OrbitControls, useGLTF, useAnimations, useTexture, Billboard, Text } from "@react-three/drei";

//Forces a mesh (e.g., text, plane) to always face the camera.

const Scene = () => {
    const texture = useTexture("/img/wood.jpg");

    return (<>
        <OrbitControls />
        <ambientLight intensity={2} />

        <group>
        <Billboard follow>
                    <Text fontSize={0.5} color="white" position={[0,2,0]}>I always face you!</Text>
                </Billboard>
            <mesh>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial map={texture} />
            </mesh>
        </group>

    </>)
}
useGLTF.preload('/modals/monk.glb')
export default Scene;