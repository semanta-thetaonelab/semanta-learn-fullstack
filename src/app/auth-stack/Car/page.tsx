"use client"
import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";
import { Physics } from "@react-three/rapier";
import { KeyboardControls } from "@react-three/drei";

// to enable physic into the canvas world wrap the whole objects into physic component
// to debub pass debug prop in to physic component
const Drei = () => {

    return (
        <div className="h-full w-[100%] relative flex justify-center items-start">
            <KeyboardControls
                map={[
                    { name: "forward", keys: ["w", "ArrowUp"] },
                    { name: "backward", keys: ["s", "ArrowDown"] },
                    { name: "left", keys: ["a", "ArrowLeft"] },
                    { name: "right", keys: ["d", "ArrowRight"] },
                    { name: "break", keys: [" "] },
                ]}
            >
                <Canvas className="bg-black" shadows>
                    <Physics >
                    <Scene/>
                    </Physics>
                </Canvas>
            </KeyboardControls>
        </div>
    );
};

export default Drei;