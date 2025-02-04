"use client"
import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";
import { KeyboardControls } from "@react-three/drei";

const Drei = () => {

    return (
        <div className="h-full w-[100%] relative flex justify-center items-start">
            <KeyboardControls
                map={[
                    { name: "forward", keys: ["w", "ArrowUp"] },
                    { name: "backward", keys: ["s", "ArrowDown"] },
                    { name: "left", keys: ["a", "ArrowLeft"] },
                    { name: "right", keys: ["d", "ArrowRight"] },
                    { name: "cameraControls", keys: ["c"] },
                ]}
            >
                <Canvas className="bg-black">
                    <Scene />
                </Canvas>
            </KeyboardControls>
        </div>
    );
};

export default Drei;