import React, { Suspense, useEffect, useRef, useState } from "react";

import * as THREE from "three"
import { Box, Capsule, OrbitControls, PerspectiveCamera, useGLTF, } from "@react-three/drei";
import { CapsuleCollider, CuboidCollider, RapierRigidBody, RigidBody, useFixedJoint, useRevoluteJoint, useSpringJoint } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";

// addForce method apply continue force to the given direction

const Scene = () => {
    const rod1Ref = useRef<any>();
    const carBodyRef = useRef<any>();
    const w1Ref = useRef<any>();
    const w2Ref = useRef<any>();
    const w3Ref = useRef<any>();
    const w4Ref = useRef<any>();
    const cameraRef = useRef<any>();

    const carBody = useGLTF('/modals/jeep.glb');
    const wheel = useGLTF('/modals/tyre.glb');
    const wheel1 = wheel.scene.clone();
    const wheel2 = wheel.scene.clone();
    const wheel3 = wheel.scene.clone();
    const wheel4 = wheel.scene.clone();

    // rod 1 
    useRevoluteJoint(
        carBodyRef,
        rod1Ref,
        [
            [0, -1.3, 0], // Rotate point from parant 
            [0, 0, 0], // Position of chid
            [0, 1, 0], // Rotation axis (Y-axis)
        ]
    );

    // front right
    useRevoluteJoint(
        rod1Ref,
        w1Ref,
        [
            [-1.1, 0, 0], // Rotate point from parant 
            [0, 0, 0], // Position of chid
            [1, 0, 0], // Rotation axis (Y-axis)
        ]
    );
    //front left
    useRevoluteJoint(
        rod1Ref,
        w2Ref,
        [
            [1.1, 0, 0], // Rotate point from parant 
            [0, 0, 0], // Position of chid
            [1, 0, 0], // Rotation axis (Y-axis)
        ]
    );
    //back right
    useRevoluteJoint(
        carBodyRef,
        w3Ref,
        [
            [-1.1, -1.2, -3.33], // Rotate point from parant 
            [0.1, 0, 0], // Position of chid
            [1, 0, 0], // Rotation axis (Y-axis)
        ]
    );
    // back left
    useRevoluteJoint(
        carBodyRef,
        w4Ref,
        [
            [1.1, -1.2, -3.33], // Rotate point from parant 
            [-0.1, 0, 0], // Position of chid
            [1, 0, 0], // Rotation axis (Y-axis)
        ]
    );

    // useFrame(() => {
    //     const pos =carBodyRef.current.translation();
    //     cameraRef.current.position.lerp({ x: pos.x , y: pos.y+3, z: pos.z-10 }, 0.1)
    //     cameraRef.current.lookAt(pos.x, pos.y, pos.z)
    // })
    return (<>
        <OrbitControls />
        <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 8, 15]} rotation={[0, 2, 0]} />
        <ambientLight intensity={0.5} />
        <pointLight intensity={80} position={[0, 5, -2]} castShadow color={'red'} />
        <pointLight intensity={120} position={[0, 5, 2]} castShadow color={'#0aaef5'} />

        {carBody.scene && (
            <RigidBody angularDamping={100} name="car" friction={0} type="dynamic" position={[0, 5, 0]} colliders="trimesh" ref={carBodyRef} gravityScale={5}
                canSleep={false}
            >
                {/* <CuboidCollider args={[1,1,1]}/> */}
                <group onClick={() => {
                    w3Ref.current?.applyTorqueImpulse({ x: 10, y: 0, z: 0 });
                    w4Ref.current?.applyTorqueImpulse({ x: 10, y: 0, z: 0 });
                }}>
                    <primitive object={carBody.scene} />
                </group>
            </RigidBody>
        )}
        
        <RigidBody
            ref={rod1Ref}
            angularDamping={105}
            position={[0, 3, 0]}
            sensor
            canSleep={false}
            enabledRotations={[false, true, false]}
        >
            <mesh onClick={() => { rod1Ref.current?.applyTorqueImpulse({ x: 0, y: 10, z: 0 }) }}>
                <boxGeometry args={[0.5, 0.1, 0.5]} />
                <meshStandardMaterial color="white" />
            </mesh>
        </RigidBody>

        {wheel1 && (
            <RigidBody
                type="dynamic"
                position={[-1.5, 5, 0]}
                colliders="ball"
                ref={w1Ref}
                canSleep={false}
                gravityScale={5}
                linearDamping={3}
                angularDamping={5}
            // sensor
            >
                {/* <CuboidCollider args={[1,1,1]}/> */}
                <group scale={0.2 / 15}>
                    <primitive object={wheel1} />
                </group>
            </RigidBody>
        )}
        {wheel2 && (
            <RigidBody
                type="dynamic"
                position={[1.5, 5, 0]}
                colliders="ball"
                ref={w2Ref}
                canSleep={false}
                gravityScale={5}
                linearDamping={3}
                angularDamping={5}
            // enabledRotations={[true, true, false]}
            // sensor
            >
                {/* <CuboidCollider args={[1,1,1]}/> */}
                <group scale={0.2 / 15}>
                    <primitive object={wheel2} />
                </group>
            </RigidBody>
        )}

        {wheel3 && (
            <RigidBody
                type="dynamic"
                position={[-1.5, 3, -3]}
                colliders="ball"
                ref={w3Ref}
                canSleep={false}
                gravityScale={5}
                linearDamping={3}
                angularDamping={5}
            >
                <group scale={0.2 / 15}>
                    <primitive object={wheel3} />
                </group>
            </RigidBody>
        )}
        {wheel4 && (
            <RigidBody
                type="dynamic"
                position={[1.5, 3, -3]}
                colliders="ball"
                ref={w4Ref}
                canSleep={false}
                gravityScale={5}
                linearDamping={3}
                angularDamping={5}
            >
                <group scale={0.2 / 15}>
                    <primitive object={wheel4} />
                </group>
            </RigidBody>
        )}

        <RigidBody type="fixed" density={200}>
            <mesh scale={[125, 1, 125]} receiveShadow>
                <boxGeometry />
                <meshStandardMaterial color={'yellow'} side={THREE.DoubleSide} />
            </mesh>
        </RigidBody>
    </>)
}
useGLTF.preload('/modals/jeep.glb');
useGLTF.preload('/modals/tyre.glb');
export default Scene;