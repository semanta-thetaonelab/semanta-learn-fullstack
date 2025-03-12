import React, { Suspense, useEffect, useRef, useState } from "react";

import * as THREE from "three"
import { Capsule, OrbitControls, PerspectiveCamera, useGLTF, } from "@react-three/drei";
import { CapsuleCollider, CuboidCollider, RapierRigidBody, RigidBody, useFixedJoint, useRevoluteJoint } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";

// addForce method apply continue force to the given direction

const Scene = () => {
    const [sensor,setSensor]=useState(true);
    const box = useRef<any>();
    const rod1Ref = useRef<any>();
    const carBodyRef = useRef<any>();
    const w1Ref = useRef<any>();
    const w2Ref = useRef<any>();
    const w3Ref = useRef<any>();
    const w4Ref = useRef<any>();
    const carBody = useGLTF('/modals/jeep.glb');

    const wheel = useGLTF('/modals/tyre.glb');
    const wheel1 = wheel.scene.clone();
    const wheel2 = wheel.scene.clone();
    const wheel3 = wheel.scene.clone();
    const wheel4 = wheel.scene.clone();

    // front right
    useRevoluteJoint(
        carBodyRef,
        w1Ref,
        [
            [-1, -1, -0.2], // Rotate point from parant 
            [0.1, 0, 0], // Position of chid
            [1, 0, 0], // Rotation axis (Y-axis)
        ]
    );
    //front left
    useRevoluteJoint(
        carBodyRef,
        w2Ref,
        [
            [1, -1, -0.2], // Rotate point from parant 
            [-0.1, 0, 0], // Position of chid
            [1, 0, 0], // Rotation axis (Y-axis)
        ]
    );
    //back right
    useRevoluteJoint(
        carBodyRef,
        w3Ref,
        [
            [-1, -1, -3.33], // Rotate point from parant 
            [0.1, 0, 0], // Position of chid
            [1, 0, 0], // Rotation axis (Y-axis)
        ]
    );
    // back left
    useRevoluteJoint(
        carBodyRef,
        w4Ref,
        [
            [1, -1, -3.33], // Rotate point from parant 
            [-0.1, 0, 0], // Position of chid
            [1, 0, 0], // Rotation axis (Y-axis)
        ]
    );
    useEffect(()=>{
        if(w1Ref.current && w2Ref.current && w3Ref.current && w4Ref.current){
            const w1 = w1Ref.current.collider(0);
            const w2 = w2Ref.current.collider(0);
            const w3 = w3Ref.current.collider(0);
            const w4 = w4Ref.current.collider(0);
            
            setTimeout(()=>{
                setSensor(false);
                w1.setSensor(false);
                w2.setSensor(false);
                w3.setSensor(false);
                w4.setSensor(false);
            },1500)  
        }
    })
    // useFrame(()=>{
    //     console.clear()
    //     const position = carBodyRef.current.translation(); 
    //     // console.log(position)
    // })

    return (<>
        <OrbitControls />
        <PerspectiveCamera makeDefault position={[0, 8, 10]} rotation={[0, 2, 0]} />
        <ambientLight intensity={0.5} />
        <pointLight intensity={80} position={[0, 5, -2]} castShadow color={'red'} />
        <pointLight intensity={120} position={[0, 5, 2]} castShadow color={'#0aaef5'} />

        {carBody.scene && (
            <RigidBody type={sensor?"fixed":"dynamic"} position={[0, 5, 0]} colliders="trimesh" ref={carBodyRef}>
                {/* <CuboidCollider args={[1,1,1]}/> */}
                <group >
                    <primitive object={carBody.scene} />
                </group>
            </RigidBody>
        )}

        {wheel1 && (
            <RigidBody type="dynamic" position={[0, 3, 0]} colliders="trimesh" ref={w1Ref} sensor  canSleep={false}>
                {/* <CuboidCollider args={[1,1,1]}/> */}
                <group scale={0.2 / 15} position={[0,0,0]}>
                    <primitive object={wheel1} />
                </group>
            </RigidBody>
        )}
        {wheel2 && (
            <RigidBody type="dynamic" position={[0, 3, 0]} colliders="trimesh" ref={w2Ref} sensor  canSleep={false}>
                {/* <CuboidCollider args={[1,1,1]}/> */}
                <group scale={0.2 / 15}>
                    <primitive object={wheel2} />
                </group>
            </RigidBody>
        )}

        {wheel3 && (
            <RigidBody type="dynamic" position={[0, 3, 0]} colliders="trimesh" ref={w3Ref} sensor  canSleep={false}>
                {/* <CuboidCollider args={[1,1,1]}/> */}
                <group scale={0.2 / 15} onClick={() => { w3Ref.current.applyTorqueImpulse({ x: 110, y: 0, z: 0 }) }}>
                    <primitive object={wheel3} />
                </group>
            </RigidBody>
        )}
        {wheel4 && (
            <RigidBody type="dynamic" position={[0, 3, 0]} colliders="trimesh" ref={w4Ref} sensor  canSleep={false}>
                {/* <CuboidCollider args={[1,1,1]}/> */}
                <group scale={0.2 / 15} onClick={() => { w4Ref.current.applyTorqueImpulse({ x: 110, y: 0, z: 0 }) }}>
                    <primitive object={wheel4} />
                </group>
            </RigidBody>
        )}







        <RigidBody type="fixed">
            <mesh scale={[25, 1, 25]} receiveShadow>
                <boxGeometry />
                <meshStandardMaterial color={'yellow'} side={THREE.DoubleSide} />
            </mesh>
        </RigidBody>
    </>)
}
useGLTF.preload('/modals/jeep.glb');
useGLTF.preload('/modals/tyre.glb');
export default Scene;