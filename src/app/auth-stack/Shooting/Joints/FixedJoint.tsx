import { useFixedJoint } from "@react-three/rapier";
import React from "react";


const FixedJoint = (props:any) => {
    useFixedJoint(props.child, props.parent, [ //second ref is parent if it's move then handle ref will be move
        [props.pp.x, props.pp.y, props.pp.z], // body1Anchor (top of the handle)
        [0, 0, 0, 1], // body1LocalFrame (no rotation)
        [props.cp.x, props.cp.y, props.cp.z], // body2Anchor (bottom of the hammerhead)
        [0, 0, 0, 1], // body2LocalFrame (no rotation)
    ]);
}

export default FixedJoint;