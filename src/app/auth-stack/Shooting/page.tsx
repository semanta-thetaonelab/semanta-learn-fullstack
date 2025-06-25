"use client"
import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";
import { Physics } from "@react-three/rapier";

const Drei = () => {

    return (
        <div className="h-full w-[100%] relative flex justify-center items-start">
            <Canvas className="bg-black">
                <Physics debug>
                  <Scene/>
                </Physics>
            </Canvas>
        </div>
    );
};

export default Drei;