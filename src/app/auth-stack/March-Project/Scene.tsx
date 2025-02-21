import React, { Suspense, useEffect, useState } from "react";

import * as THREE from "three"
import { OrbitControls, PerspectiveCamera, useGLTF } from "@react-three/drei";
import { chairs } from "../../../../utils/sits";
const {DEG2RAD}=THREE.MathUtils;
const Scene = () => {
    const chair = useGLTF('/modals/sillon.glb');
    const [camera,setCamera]=useState({
        position:{x:-5.1,y:48,z:50},
        rotation:{x:90,y:0,z:0}
    });

    return (<>
        <OrbitControls />
        <ambientLight intensity={0.9} />
        <directionalLight color={'#fafafa'} castShadow position={[-9,14,0]} intensity={2} rotation={[DEG2RAD*80,0,0]}/>
        <PerspectiveCamera 
         makeDefault 
         position={[camera.position.x,camera.position.y,camera.position.z]}
         rotation={[DEG2RAD*camera.rotation.x,DEG2RAD*camera.rotation.y,DEG2RAD*camera.rotation.z]}
         />
        
        <mesh rotation={[DEG2RAD*0,0,0]} position={[-3.8,6,-10]}>
            <planeGeometry args={[33.5,14]}/>
            <meshStandardMaterial side={THREE.DoubleSide}/>
        </mesh>


        {chair?.scene && (<>
        {chairs.map((obj,idx)=>{
        const clonedScene = chair.scene.clone(); // Clone the model for each chair

        return(
            <mesh 
             position={[obj.position.x,obj.position.y,obj.position.z]} 
             rotation={[obj.rotation.x,obj.rotation.y,obj.rotation.z]}
             castShadow
             receiveShadow
             >
                <primitive object={clonedScene} key={obj.sitNo}/>
            </mesh>
        )})}
        </>)}
        
       
    </>)
}
useGLTF.preload('/modals/sillon.glb');
export default Scene;