import React, { Suspense, useEffect, useState } from "react";

import * as THREE from "three"
import { OrbitControls, Image, Svg } from "@react-three/drei";

//Forces a mesh (e.g., text, plane) to always face the camera.

const Scene = () => {

    return (<>
        <OrbitControls />
        <ambientLight intensity={2} />
        <Svg src="/next.svg" scale={[2, 2,2]}/>;
    </>)
}
export default Scene;