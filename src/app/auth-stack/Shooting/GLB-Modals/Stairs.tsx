import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import React from "react";

const Stairs = () =>{
    const modal=useGLTF('/shooting-game/objects/stairs.glb')
    return(<>
      <RigidBody colliders="trimesh" type="fixed" position={[0,2,-20]}>
        <group scale={1/30}>
            <primitive object={modal.scene}/>
        </group>
      </RigidBody>
    </>)
}

export default Stairs;