import React from "react";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three"
import { OrbitControls } from "@react-three/drei";

const Scene =()=>{
    const woodTexter=useLoader(THREE.TextureLoader,'/img/wood.jpg');
    
    return(<>
    <OrbitControls/>
    <ambientLight intensity={2}/>
       <mesh position={[0,0,0]}>
        <boxGeometry args={[4,4,4]} />
        <meshStandardMaterial map={woodTexter} />
       </mesh>
    </>)
}
export default Scene;