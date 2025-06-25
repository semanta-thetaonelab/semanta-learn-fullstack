import React, { Suspense, useEffect, useRef, useState } from "react";

import * as THREE from "three"
import { Billboard, Box, OrbitControls, PerspectiveCamera, Plane, PositionalAudio, Text, useGLTF, useTexture, useVideoTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { CapsuleCollider, CuboidCollider, RigidBody } from "@react-three/rapier";
const { DEG2RAD } = THREE.MathUtils;


const Scene = () => {



    return (<>
        <OrbitControls />
        <PerspectiveCamera position={[0, 30, 150]} makeDefault />
        <ambientLight intensity={0.9} />
        <directionalLight color={'#fafafa'} castShadow position={[-9, 14, 0]} intensity={2} rotation={[DEG2RAD * 80, 0, 0]} />
        
        <RigidBody type="kinematicPosition" position={[0,5,0]}>
            <CapsuleCollider args={[0.5,0.5]} />
        </RigidBody>


        {/* floor */}
        <RigidBody type="fixed">
            <Box scale={[500, 1, 500]}>
                <meshStandardMaterial color="#297a04" />
            </Box>
        </RigidBody>
    </>)
}
useGLTF.preload('/modals/sillon.glb');
export default Scene;