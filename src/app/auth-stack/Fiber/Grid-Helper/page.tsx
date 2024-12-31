"use client"
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";

//what is grid helper?
//grid helper add a virtual floor at canvas. Defalut value is 10 * 10


const Fiber = () => {
 
    return (
        <div className="h-full w-[100%] relative flex justify-center items-start">
            <Canvas className="bg-black" 
            camera={{fov:75, near:0.1,far:2000,position:[0,0,65],zoom:5}}
            >
                <OrbitControls />
                <gridHelper args={[20,20,'red','yellow']}/> // first two args define size, third one define center line color, forth one is define grid color
                
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