import React, { Suspense, useEffect, useState } from "react";

import * as THREE from "three"
import { OrbitControls, PositionalAudio,} from "@react-three/drei";

//Forces a mesh (e.g., text, plane) to always face the camera.

const Scene = () => {
   const [Play,setPlay]=useState(false);

    return (<>
        <OrbitControls />
        <ambientLight intensity={2} />

        <group position={[0,0,0]}>
        {Play && <PositionalAudio url="/sounds/Tera_Mera_Viah_1.mp3" autoplay loop/>}
        <mesh onClick={()=>setPlay(true)} >
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial color={'orange'}/>
        </mesh>
        </group>

    </>)
}
export default Scene;