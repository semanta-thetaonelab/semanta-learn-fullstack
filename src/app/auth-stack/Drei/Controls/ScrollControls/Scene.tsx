import React, { Suspense, useEffect, useState } from "react";

import * as THREE from "three"
import { Scroll, ScrollControls, useScroll, useTexture} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

//Forces a mesh (e.g., text, plane) to always face the camera.
function PageThreeObject(){
    const scroll = useScroll(); // Get scroll progress (0 to 1), must used inside of ScrollControls
    const [scrollVal,setScrollVal]=useState(0);
    useFrame(() => {
       if(scroll.offset!==scrollVal){
        setScrollVal(scroll.offset)
       } 
    });
    useEffect(()=>{
       console.clear(); 
       console.log(scroll.offset.toFixed(2),"Page No=>",(scrollVal*(3-1)+1).toFixed(2))
    },[scrollVal])
    return(
        <mesh position={[0,-5*3,0]}> //-5*Number of pages 
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={"yellow"} />
        </mesh>
    )
}
const Scene = () => {
    const texture = useTexture("/img/wood.jpg");
    return (<>
        <ambientLight intensity={2} />
        <ScrollControls pages={3} damping={0}>
        <Scroll>
        <group>
            <mesh>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial map={texture} />
            </mesh>
        </group>
        <PageThreeObject />
        </Scroll>
        <Scroll html>
          <div style={{ position: "absolute", top: "10vh", left: "5vw",color:"white",width:'100vw',fontSize:'31px' }}>
            Scroll Down
          </div>
        </Scroll>
      </ScrollControls>

    </>)
}
export default Scene;