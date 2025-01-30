import React, { Suspense, useEffect, useState } from "react";

import * as THREE from "three"
import { OrbitControls, useCubeTexture } from "@react-three/drei";

const Scene = () => {
  const envMap = useCubeTexture(["/px.jpg", "/nx.jpg", "/py.jpg", "/ny.jpg", "/pz.jpg", "/nz.jpg"], {
    path: "/img/env/",
  });

  return (
    <>
      <OrbitControls />
      <ambientLight intensity={3}/>
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial envMap={envMap} metalness={1} roughness={0} />
      </mesh>
    </>
  );
}
export default Scene;