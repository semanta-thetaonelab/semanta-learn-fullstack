import React, { Suspense, useEffect, useState } from "react";

import * as THREE from "three"
import { OrbitControls, Image, Svg, Text3D } from "@react-three/drei";

//Forces a mesh (e.g., text, plane) to always face the camera.

const Scene = () => {

    return (<>
        <OrbitControls />
        <ambientLight intensity={10} />
        <group>
        <directionalLight position={[-5,0,0]} rotation={[0,0,6]} intensity={5} color={'blue'}/>
        <pointLight intensity={50} position={[0,0,2]} color={'red'}/>
        <Text3D font={'/font/Merriweather_Bold.json'} size={0.5} >
          Theta One
        <meshStandardMaterial color="blue"   
        roughness={0}
         metalness={1.5}/>
        </Text3D>
        </group>
    </>)
}
export default Scene;