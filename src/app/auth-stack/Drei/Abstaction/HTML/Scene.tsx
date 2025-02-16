import React, { Suspense, useEffect, useState } from "react";

import * as THREE from "three"
import { Html, OrbitControls} from "@react-three/drei";

//Forces a mesh (e.g., text, plane) to always face the camera.

const Scene = () => {

    return (<>
        <OrbitControls />
        <ambientLight intensity={2} />
        <mesh>
            <boxGeometry />
            <meshStandardMaterial color={'red'}/>
                    {/* HTML inside the 3D Object */}
        <Html position={[0, 1, 0]} 
         center // always  make it cennter
         occlude //Makes the HTML hide when behind 3D objects.
         distanceFactor={10} //  Adjusts the scaling based on distance.
        >
          <div style={{ color: "black", background: "white", padding: "5px", borderRadius: "5px",width:"80px" }}>
            Hello, 3D World!
          </div>
        </Html>
        </mesh>

    </>)
}
export default Scene;