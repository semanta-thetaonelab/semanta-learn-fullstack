import { useSpringJoint } from "@react-three/rapier";
import React from "react";
import * as THREE from "three";

const SpringJoint = (props:any) =>{
  useSpringJoint(props.parent, props.child, [
    new THREE.Vector3(-3, -1, 0), // Anchor point on the first body (box)
    new THREE.Vector3(-1, 0, 0), // Anchor point on the second body (sphere) but it's don't change the second body postion 
    1, // Rest length of the spring
    40, // Stiffness (spring strength)
    5, //  resistance Damping 
  ]);
  
  return(<></>)
}
export default SpringJoint