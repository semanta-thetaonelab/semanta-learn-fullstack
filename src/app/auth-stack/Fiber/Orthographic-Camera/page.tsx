"use client"
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";

//what is group?
//group merge many mesh into a single mesh 

const Fiber = () => {
 
    return (
        <div className="h-full w-[100%] relative flex justify-center items-start">
            <Canvas className="bg-black" 
            // orthographic if we pass orthographic as props it will be enabled
            camera={{fov:125, near:0.1,far:2000,position:[0,0,5],
            zoom:5}}
            >
                <OrbitControls />
                <group rotation={[0.2,0.3,1]}>
                    <mesh position={[1, 0, 0]} scale={0.4}>
                        <sphereGeometry />
                        <meshNormalMaterial />
                    </mesh>

                    <mesh position-x={-1} position-y={-0.5} scale={[0.2, 1, 1.5]}>
                        <boxGeometry />
                        <meshNormalMaterial />
                    </mesh>
                </group>
            </Canvas>
        </div>
    );
};

export default Fiber;