"use client"
import { Canvas } from "@react-three/fiber";
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";


const Fiber = () => {

    return (
        <div className="h-full w-[100%] relative flex justify-center items-start">
            <Canvas className="bg-black">
                <mesh position={[3,0,0]} scale={0.4}> // here we initialize position three value x y z at same time and for scale it's scale each side xyz 
                    <sphereGeometry />
                    <meshNormalMaterial />
                </mesh>

                <mesh position-x={-3} position-y={-0.5} scale={[0.2,1,1.5]}> //here we initialize value individual
                    <boxGeometry />
                    <meshNormalMaterial />
                </mesh>
            </Canvas>
        </div>
    );
};

export default Fiber;