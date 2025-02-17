"use client"
import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";
import { Physics } from "@react-three/rapier";

// to enable physic into the canvas world wrap the whole objects into physic component
// to debub pass debug prop in to physic component
const Drei = () => {

    return (
        <div className="h-full w-[100%] relative flex justify-center items-start">
            <Canvas className="bg-black" shadows>
                <Physics debug={true}>
                  <Scene/>
                </Physics>
            </Canvas>
        </div>
    );
};

export default Drei;