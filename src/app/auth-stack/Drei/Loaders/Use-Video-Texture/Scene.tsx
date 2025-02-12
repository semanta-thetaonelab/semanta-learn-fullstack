import React, { Suspense, useEffect, useState } from "react";

import * as THREE from "three"
import { OrbitControls, PerspectiveCamera, useGLTF, useTexture, useVideoTexture } from "@react-three/drei";

const Scene = () => {
    const texture = useVideoTexture("/video/water.mp4",{
        start: true, // Auto-play the video
        loop: true,  // Loop the video
        muted: true, // Mute the video
      });
    const {DEG2RAD}=THREE.MathUtils;
    return (<>
        <OrbitControls/>
        <ambientLight intensity={2}/>
        <PerspectiveCamera position={[0,80,-200]} rotation={[-20,0,0]} far={2000}/>
        <mesh rotation={[88*DEG2RAD,0,0]} position={[0,0,0]}>
            <planeGeometry args={[1000,1000]}/>
            <meshStandardMaterial map={texture} roughness={0} side={THREE.DoubleSide} />
        </mesh>

    </>)
}
useGLTF.preload('/modals/monk.glb')
export default Scene;