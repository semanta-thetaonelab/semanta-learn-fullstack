"use client"
import { Canvas } from "@react-three/fiber";
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";

//* from this site we can learn more about canvas


const Fiber = () => {

    return (
        <div className="h-full w-[100%] relative flex justify-center items-start">
            <Canvas className="bg-black">
                <></>
            </Canvas>
        </div>
    );
};

export default Fiber;