"use client"
import { Canvas } from "@react-three/fiber";
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";

// what is mesh ?
// mesh hold the object. it's create with shape and metarial
// there have more shapes and metarial you can explore on website or chat gpt
// also exlpore geomertise https://threejs.org/docs/#api/en/geometries/BoxGeometry
// also exlpore metarials https://threejs.org/docs/#api/en/materials/LineBasicMaterial
const Fiber = () => {

    return (
        <div className="h-full w-[100%] relative flex justify-center items-start">
            <Canvas className="bg-black">
                <mesh>
                    <sphereGeometry />
                    <meshNormalMaterial />
                </mesh>
            </Canvas>
        </div>
    );
};

export default Fiber;