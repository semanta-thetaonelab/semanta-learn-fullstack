"use client"
import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";

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