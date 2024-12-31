"use client"
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";


const Fiber = () => {
 
    return (
        <div className="h-full w-[100%] relative flex justify-center items-start">
            <Canvas className="bg-black" 
            camera={{fov:75, near:0.1,far:2000,position:[0,0,65],zoom:5}}
            >
                <OrbitControls />
                
            </Canvas>
        </div>
    );
};

export default Fiber;