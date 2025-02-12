import React, { Suspense, useEffect, useState } from "react";

import * as THREE from "three"
import { OrbitControls, useGLTF, useAnimations, useTexture, Billboard, Text } from "@react-three/drei";

//Forces a mesh (e.g., text, plane) to always face the camera.

const Scene = () => {
    const texture = useTexture("/img/wood.jpg");

    return (<>
        <OrbitControls 
         enabled={true} // enable & disable orbital controls, default is true
         enableZoom={true} // enable & disable zoom, default is true
         enableRotate={true} // enable & disable rotation,defalut is true
         enablePan={true}//enable & disable panning, default is true

         minPolarAngle={0} // control min rotation on vertical(up,down) angle
         maxPolarAngle={Math.PI / 3} // control max rotation on vertical angle
         minAzimuthAngle={0} // control min rotation on horizontal(left,right) angle
         maxAzimuthAngle={Math.PI / 3}// control max rotation on horizontal angle
         enableDamping={true} //imidiate stop when while rotation,panning stop,default is true
        //  dampingFactor={0.5} // damping smoothness
        minDistance={5} //min zoom in
        maxDistance={30}//max zomm out
        zoomSpeed={0.5} // speed of zoom
        panSpeed={1.8} //pan sensitivity
        screenSpacePanning={true} // Enables panning in screen space instead of world space
        keyPanSpeed={0.7}//panning speed on key board
        autoRotate={true}
        autoRotateSpeed={6}
        />
        <ambientLight intensity={2} />

        <group>
            <mesh>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial map={texture} />
            </mesh>
        </group>

    </>)
}
useGLTF.preload('/modals/monk.glb')
export default Scene;