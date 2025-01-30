import React, { Suspense, useEffect, useState } from "react";

import * as THREE from "three"
import { OrbitControls, Detailed } from "@react-three/drei";
//Switches models based on camera distance (LOD - Level of Detail).
const Scene = () => {


    return (<>
        <OrbitControls />
        <ambientLight intensity={2} />

        <Detailed distances={[10, 20, 280]}>
            <mesh>
                <sphereGeometry args={[1, 64, 64]} />
                <meshStandardMaterial color="red" />
            </mesh>
            <mesh>
                <sphereGeometry args={[5, 5, 5]} />
                <meshStandardMaterial color="blue" />
            </mesh>
        </Detailed>

    </>)
}
export default Scene;