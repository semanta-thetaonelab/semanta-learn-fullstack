import React, { Suspense, useEffect, useState } from "react";

import * as THREE from "three"
import { OrbitControls, useGLTF, useAnimations, useTexture } from "@react-three/drei";

const Scene = () => {
    const texture = useTexture("/img/wood.jpg");

    return (<>
        <OrbitControls />
        <ambientLight intensity={2} />
        <mesh>
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial map={texture} />
        </mesh>

    </>)
}
useGLTF.preload('/modals/monk.glb')
export default Scene;