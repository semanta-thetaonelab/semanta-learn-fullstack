"use client"
import {useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
const Scene = () => {
    const box = useRef();
    useFrame((_,delta)=>{

    });
    const three=useThree();
    console.log(three);
    return (
        <>
        <ambientLight intensity={5}/>
       <mesh ref={box} scale={[1, 1, 1]} > 
            <planeGeometry />
            <meshStandardMaterial color={'orange'} side={THREE.DoubleSide}/>
        </mesh>
        </>

    );
};

export default Scene;