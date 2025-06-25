import { useRevoluteJoint } from "@react-three/rapier";
import React from "react";

const RevoluteJoint = (props:any) =>{
  const joint:any = useRevoluteJoint(
    props.wallRef,
    props.doorRef,
    [
      [5, 1.5, 0], // Rotate point from parant 
      [0,0,0], // Position of chid
      [1, 0, 0], // Rotation axis (Y-axis)
    ]
  );
    return (
        <></>
    )
    
}

export default RevoluteJoint;