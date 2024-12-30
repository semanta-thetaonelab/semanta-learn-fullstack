"use client"
import { Canvas, useFrame } from "@react-three/fiber";
import { useRouter } from "next/navigation";
import Scene from "./Scene";
import React, { useEffect, useState } from "react";

// useFrame hook is used to change positoon of mesh or rotation of mesh and animate it with fps
// this hook only used inside the canvas component so we create a component
const Fiber = () => {

    return (
        <div className="h-full w-[100%] relative flex justify-center items-start">
            <Canvas className="bg-black">
                <Scene/>
            </Canvas>
        </div>
    );
};

export default Fiber;