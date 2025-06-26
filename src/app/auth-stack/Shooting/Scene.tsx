import React, { Suspense, useEffect, useRef, useState } from "react";

import * as THREE from "three"
import { Billboard, Box, OrbitControls, PerspectiveCamera, Plane, PositionalAudio, Text, useGLTF, useKeyboardControls, useTexture, useVideoTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { CapsuleCollider, CuboidCollider, RigidBody } from "@react-three/rapier";
import FixedJoint from "./Joints/FixedJoint";
const { DEG2RAD } = THREE.MathUtils;
import { Vector3 } from "three";
import Stairs from "./GLB-Modals/Stairs";
// https://poly.pizza/m/5EGWBMpuXq

const Scene = () => {
    const playerBodyRef: any = useRef();
    const footSensor: any = useRef();
    const upWardSensor: any = useRef();
    const frontSensor: any = useRef();
    const [joint, setJoint] = useState(true);
    const [touchGround, setTouchGround] = useState(false);
    const currentRotation = useRef(0);
    const [pushUP,setPushUp]=useState(false);
    const [front,setFront]=useState(false)
    // let touchGround=false;
    const forward = useKeyboardControls((state) => state.forward);
    const backward = useKeyboardControls((state) => state.backward);
    const left = useKeyboardControls((state) => state.left);
    const right = useKeyboardControls((state) => state.right);

    const controlMoves=()=>{
        if(forward && backward){
            return new Vector3(0, touchGround ? 0 : -0.2, forward ? -0.5 : backward ? 0.5 : 0);
        }
        if((!touchGround && !pushUP) ){
            return new Vector3(0, touchGround ? 0 : -0.2, forward ? -0.5 : backward ? 0.5 : 0);
        }
        if(pushUP && (forward || backward)){
            return new Vector3(0, touchGround ? 0 : 0.3, forward ? -0.5 : backward ? 0.5 : 0);
        }
    }

    useFrame((state, delta) => {
        //forward and backward movement
        if (playerBodyRef.current) {
            const rigidBody = playerBodyRef.current;
            const position = rigidBody.translation();
            const rotation = rigidBody.rotation(); // Quaternion
            // const localDirection = new Vector3(0, touchGround ? 0 : -0.2, forward ? -0.5 : backward ? 0.5 : 0);
            const localDirection = new Vector3(0, touchGround ? 0 : -0.2, forward ? -0.5 : backward ? 0.5 : 0);
            localDirection.applyQuaternion(rotation);
            const newPosition = new Vector3(position.x, position.y, position.z).add(
                localDirection.multiplyScalar(0.2)
            );
            rigidBody.setNextKinematicTranslation(newPosition);
        }
        //left and right rotation
        if (playerBodyRef.current && (left || right)) {
            
            left?currentRotation.current += DEG2RAD * 2:right?currentRotation.current -= DEG2RAD * 2:null// 20 degrees
            const quat = new THREE.Quaternion().setFromAxisAngle(
                new THREE.Vector3(0, 1, 0), // Y axis
                currentRotation.current
            );
            playerBodyRef.current.setNextKinematicRotation(quat);
        }
    })
    return (<>
        <OrbitControls />
        <PerspectiveCamera position={[0, 5, 20]} makeDefault />
        <ambientLight intensity={1.9} />
        {/* <directionalLight color={'#fafafa'} castShadow position={[-9, 14, 0]} intensity={2} rotation={[DEG2RAD * 80, 0, 0]} /> */}

        {/* player body */}
        <RigidBody type="kinematicPosition" position={[0, 5, 0]} ref={playerBodyRef}>
            <CapsuleCollider args={[0.5, 0.5]} />
        </RigidBody>

        {/* foot sensor */}
        <RigidBody
            type="dynamic"
            ref={footSensor}
            sensor
            onIntersectionEnter={() => { setTouchGround(true) }}
            onIntersectionExit={() => { setTouchGround(false) }}
            canSleep={false}
        >
            <CuboidCollider args={[0.2, 0.1 / 3, 0.2]} />
        </RigidBody>

        {/* push up sensor */}
        <RigidBody 
             type="dynamic" 
             ref={upWardSensor} 
             sensor 
             canSleep={false}
             onIntersectionEnter={() => { setPushUp(true) }}
             onIntersectionExit={() => { setPushUp(false) }}
        >
            <CuboidCollider args={[0.1, 0.2, 0.1]} />
        </RigidBody>
        {/* front sensor */}
        <RigidBody 
             type="dynamic" 
             ref={frontSensor} 
             sensor 
             canSleep={false}
             onIntersectionEnter={() => { setPushUp(true) }}
             onIntersectionExit={() => { setPushUp(false) }}
        >
            <CuboidCollider args={[0.2, 0.2, 0.2]} />
        </RigidBody>

        {(joint) && <FixedJoint parent={playerBodyRef} child={footSensor} pp={{ x: 0, y: 0, z: 0 }} cp={{ x: 0, y: -1.1, z: 0 }} />}
        {(joint) && <FixedJoint parent={playerBodyRef} child={upWardSensor} pp={{ x: 0, y: 0, z: 0 }} cp={{ x: 0, y: -0.8, z: -0.7 }} />}
        {(joint) && <FixedJoint parent={playerBodyRef} child={frontSensor} pp={{ x: 0, y: 0, z: 0 }} cp={{ x: 0, y: 0, z: -0.9 }} />}

        {/* floor */}
        <RigidBody type="fixed">
            <Box scale={[500, 3, 500]}>
                <meshStandardMaterial color="#297a04" />
            </Box>
        </RigidBody>
        {/* stairs */}
        <Stairs/>
    </>)
}
useGLTF.preload('/modals/sillon.glb');
export default Scene;