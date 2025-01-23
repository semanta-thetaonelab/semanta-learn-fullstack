import React, { Suspense, useEffect, useState } from "react";

import * as THREE from "three"
import { OrbitControls, useGLTF,useAnimations } from "@react-three/drei";

const Scene = () => {
    const animationNames=['Idle','Walk','Run']
    const [mode,setMode]=useState('Idle');
    const modal = useGLTF('/modals/character.glb');
    const animations=useAnimations(modal.animations,modal.scene);
    let idx=0;
    useEffect(()=>{
        animations.actions['Run']?.play();
    },[mode])
    return (<>
        <OrbitControls />
        <ambientLight intensity={2} />

        <Suspense fallback={
            <mesh>
                <boxGeometry args={[0.5, 0.5, 0.5]} />
                <meshBasicMaterial color={'white'} wireframe />
            </mesh>
        }>
           <primitive object={modal.scene}/>
        </Suspense>
    </>)
}
useGLTF.preload('/modals/monk.glb')
export default Scene;