import React, { Suspense, useEffect, useState } from "react";

import * as THREE from "three"
import { OrbitControls, useGLTF, useAnimations, useTexture, Billboard, Text, Image } from "@react-three/drei";

//Forces a mesh (e.g., text, plane) to always face the camera.

const Scene = () => {
    const texture = useTexture("/img/wood.jpg");

    return (<>
        <OrbitControls />
        <ambientLight intensity={2} />
        <Image url="/img/wood.jpg" scale={[2, 2]} side={THREE.DoubleSide}/>;

    </>)
}
export default Scene;