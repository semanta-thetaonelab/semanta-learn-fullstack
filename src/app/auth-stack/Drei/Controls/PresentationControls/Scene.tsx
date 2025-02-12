import React, { Suspense, useEffect, useState } from "react";

import * as THREE from "three"
import {useTexture, PresentationControls } from "@react-three/drei";

//Forces a mesh (e.g., text, plane) to always face the camera.

const Scene = () => {
    const texture = useTexture("/img/wood.jpg");
    const {DEG2RAD}=THREE.MathUtils
    return (<>
        <ambientLight intensity={2.5} color={'#fa7769'}/>
        <directionalLight intensity={3.1} color={'#2e62e6'} position={[0,0,20]}/>
          <PresentationControls
           global //by default when cursure inside the mesh we are able to roatate but when it's true we able to rotate out side cursure 
           polar={[0*DEG2RAD,360*DEG2RAD]} //vertical rotation [min,max]
           azimuth={[0*DEG2RAD,360*DEG2RAD]} // horizotal rotation [min,max]
           snap={{mass:10,tension:500}} // back to the default roatation
          >
          <mesh>
                <boxGeometry args={[1, 1, 1]}/>
                <meshStandardMaterial map={texture} roughness={0}/>
            </mesh> 
          </PresentationControls> 
    </>)
}
export default Scene;