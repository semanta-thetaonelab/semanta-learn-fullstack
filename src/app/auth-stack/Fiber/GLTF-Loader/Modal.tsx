import React, { Suspense } from "react";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three"
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
const Modal1 =()=>{
    const modal = useLoader(GLTFLoader,'/modals/monk.glb');

    return <primitive object={modal.scene}/>
    
}
export default Modal1;