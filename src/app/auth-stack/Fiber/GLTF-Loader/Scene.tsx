import React, { Suspense } from "react";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three"
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import Modal1 from "./Modal";
const Scene = () => {
    const modal = useLoader(GLTFLoader, '/modals/monk.glb');

    return (<>
        <OrbitControls />
        <ambientLight intensity={2} />

        <Suspense fallback={
            <mesh>
                <boxGeometry args={[0.5, 0.5, 0.5]} />
                <meshBasicMaterial color={'white'} wireframe />
            </mesh>
        }>
            <Modal1 />
        </Suspense>
    </>)
}
export default Scene;