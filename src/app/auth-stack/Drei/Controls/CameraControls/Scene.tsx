import React, { Suspense, useEffect, useRef, useState } from "react";

import * as THREE from "three"
import { OrbitControls, useTexture, useKeyboardControls, CameraControls } from "@react-three/drei";

//Forces a mesh (e.g., text, plane) to always face the camera.

const Scene = () => {
    const texture = useTexture("/img/wood.jpg");
    const camera=useRef();
    const top = useKeyboardControls((state) => state.forward);
    const down = useKeyboardControls((state) => state.backward);
    const left = useKeyboardControls((state) => state.left);
    const right = useKeyboardControls((state) => state.right);
    const cameraControls = useKeyboardControls((state) => state.cameraControls);
    const {DEG2RAD}=THREE.MathUtils
    useEffect(()=>{
        //rotate the camrea
        if(right && cameraControls){
          //horizontal   
          camera?.current?.rotate(45*DEG2RAD,0,true);
        }else if(left && cameraControls){
            //horizontal 
            camera?.current?.rotate(-45*DEG2RAD,0,true);
        }else if(top && cameraControls){
            camera?.current?.rotate(0,45*DEG2RAD,true);
        }else if(down && cameraControls){
            camera?.current?.rotate(0,-45*DEG2RAD,true);
        }    
        
        //move camera
        else if(right){
            //horizontal   
            camera?.current?.truck(1,0,true);
          }else if(left){
              //horizontal 
              camera?.current?.truck(-1,0,true);
          }else if(top){
              camera?.current?.truck(0,1,true);
          }else if(down){
              camera?.current?.truck(0,-1,true);
          }
    },[top,down,left,right,right])
    return (<>
        <CameraControls ref={camera} smoothTime={0.8}/>
        <ambientLight intensity={2} />
            <mesh>
                <boxGeometry args={[1, 1, 1]}/>
                <meshStandardMaterial map={texture} />
            </mesh>

    </>)
}
export default Scene;