import React, { Suspense, useEffect, useRef, useState } from "react";

import * as THREE from "three"
import { Box, Capsule, OrbitControls, PerspectiveCamera, useGLTF, useKeyboardControls, } from "@react-three/drei";
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
    const stoper1Ref = useRef<any>();
    const stoper2Ref = useRef<any>();

    const [stoper1Size, setStoper1Size] = useState(0.24);
    const [stoper2Size, setStoper2Size] = useState(0.24);
    const [rocks, setRocks] = useState<any[]>();
    const [houses,setHouses]=useState<any[]>();

    const AutumnPineTree = useGLTF('/modals/Autumn pine.glb');
    const AutumnNormalTree = useGLTF('/modals/Autumn Tree.glb');
    const Rock = useGLTF('/modals/Rock.glb');
    // const TreeRock = useGLTF ('/modals/Trees Rock.glb')
    const carBody = useGLTF('/modals/jeep.glb');
    const wheel = useGLTF('/modals/tyre.glb');

    const House = useGLTF('/modals/House.glb');

    const wheel1 = wheel.scene.clone();
    const wheel2 = wheel.scene.clone();
    const wheel3 = wheel.scene.clone();
    const wheel4 = wheel.scene.clone();

    const [dropCar, setDropCar] = useState(false);
    // wheel rod
    useRevoluteJoint(
        carBodyRef,
        rod1Ref,
        [
            [0, -1.3, 0], // Rotate point from parant 
            [0, 0, 0], // Position of chid
            [0, 1, 0], // Rotation axis (Y-axis)
        ]
    );

    // useSpringJoint(carBodyRef, rod1Ref, [
    //     new THREE.Vector3(-2.5, -1.2, -3), // Anchor point on the first body (box)
    //     new THREE.Vector3(-0.4, 0, 0), // Anchor point on the second body (sphere) but it's don't change the second body postion 
    //     0.1, // Rest length of the spring
    //     300, // Stiffness (spring strength)
    //     3000, //  resistance Damping 
    // ]);

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
            [-1.1, -1.3, -3.33], // Rotate point from parant 
            [0.1, 0, 0], // Position of chid
            [1, 0, 0], // Rotation axis (Y-axis)
        ]
    );
    // back left
    useRevoluteJoint(
        carBodyRef,
        w4Ref,
        [
            [1.1, -1.3, -3.33], // Rotate point from parant 
            [-0.1, 0, 0], // Position of chid
            [1, 0, 0], // Rotation axis (Y-axis)
        ]
    );
    // rotation stoper 1
    useFixedJoint(stoper1Ref, carBodyRef, [ //second ref is parent if it's move then handle ref will be move
        [0.2, 0.8, 0.5], // body1Anchor (top of the handle)
        [0, 0, 0, 1], // body1LocalFrame (no rotation)
        [0, -0.50, 0], // body2Anchor (bottom of the hammerhead)
        [0, 0, 0, 1], // body2LocalFrame (no rotation)
    ]);
    // rotation stoper 2
    useFixedJoint(stoper2Ref, carBodyRef, [ //second ref is parent if it's move then handle ref will be move
        [-0.2, 0.8, 0.5], // body1Anchor (top of the handle)
        [0, 0, 0, 1], // body1LocalFrame (no rotation)
        [0, -0.50, 0], // body2Anchor (bottom of the hammerhead)
        [0, 0, 0, 1], // body2LocalFrame (no rotation)
    ]);

    useEffect(() => {
        setTimeout(() => {
            setDropCar(true);
        }, 2000)
    }, [])

    useEffect(() => {
        setTimeout(() => {
            addRock();
        }, 1500)
        setTimeout(()=>{
            aadHouses();
        },2500)
    }, [])

    const forward = useKeyboardControls((state) => state.forward);
    const backward = useKeyboardControls((state) => state.backward);
    const left = useKeyboardControls((state) => state.left);
    const right = useKeyboardControls((state) => state.right);
    const hardBreak = useKeyboardControls((state) => state.break);

    useFrame(() => {
        if (!right && !left) {
            setStoper1Size(0.24);
            setStoper2Size(0.24);
        } else if (right) {
            setStoper1Size(0.1);
            setStoper2Size(0.29);
        } else if (left) {
            setStoper2Size(0.1);
            setStoper1Size(0.29);
        }

        if (forward) {
            const localDirection = new THREE.Vector3();
            const rotation = carBodyRef.current.rotation();
            localDirection.set(0, 0, 50.5); // Forward direction in local space
            localDirection.applyQuaternion(rotation); // Apply the object's rotation to move in local space
            carBodyRef.current.applyImpulse(localDirection);

            // w3Ref.current?.applyTorqueImpulse({ x: 10, y: 0, z: 0 });
            // w4Ref.current?.applyTorqueImpulse({ x: 10, y: 0, z: 0 });
        } else if (backward) {
            const localDirection = new THREE.Vector3();
            const rotation = carBodyRef.current.rotation();
            localDirection.set(0, 0, -50.5); // Forward direction in local space
            localDirection.applyQuaternion(rotation); // Apply the object's rotation to move in local space
            carBodyRef.current.applyImpulse(localDirection);

        }

        // const rotation = carBodyRef.current.rotation();
        // const pos = carBodyRef.current.translation();
        // cameraRef.current.position.lerp({ x: pos.x, y: pos.y + 8, z: rotation.y +30 }, 0.1)
        // cameraRef.current.lookAt(pos.x, pos.y, pos.z)
    })
    const rendomElement = () => {
        return Math.floor(Math.random() * 2);
    }

    const addRock = async () => {
        const ele: any[] = [];

        for (let i = 0; i < 100; i++) {
            const nag = Math.floor(Math.random() * 2);
            const clone = await rendomElement() ? Rock.scene.clone() : AutumnPineTree.scene.clone();
            ele.push(
                <RigidBody density={5000} name="rock" type="kinematicPosition" colliders="hull"
                    position={[
                        rendomElement() ? Math.floor(Math.random() * (-400 - 5 + 1)) + -5 : Math.floor(Math.random() * (400 - 5 + 1)) + 5,
                        1.7,
                        rendomElement() ? Math.floor(Math.random() * (-400 - 5 + 1)) + -5 : Math.floor(Math.random() * (400 - 5 + 1)) + 5,
                    ]}
                >
                    {/* <pointLight intensity={100}  position={[0, 4, -2]} castShadow color={'white'} /> */}
                    <group scale={2}>
                        <primitive object={clone} />
                    </group>
                </RigidBody>
            )
        }
        setRocks(ele);

    }

    const aadHouses=()=>{
        const ele:any[]=[];
        const clone = House.scene.clone();

        for(let i=0 ; i<30 ; i++){
            ele.push(
                <RigidBody sensor name="House" type="kinematicPosition" colliders="hull" 
                position={[
                    rendomElement() ? -(Math.floor(Math.random() * (450 - 5 + 1)) + 405) : Math.floor(Math.random() * (450 - 5 + 1)) + 405,
                    1.7,
                    rendomElement() ? -(Math.floor(Math.random() * (450 - 5 + 1)) + 405) : Math.floor(Math.random() * (450 - 5 + 1)) + 405,
                ]}
                >
                {/* <CuboidCollider args={[1,1,1]}/> */}
                <group scale={15}>
                    <primitive object={clone}/>
                </group>
            </RigidBody>
            )
        }
        setHouses(ele);
    }

    return (<>
        <OrbitControls />

        <ambientLight intensity={2} />
        <pointLight intensity={80} position={[0, 5, -2]} castShadow color={'red'} />
        {/* <pointLight intensity={120} position={[0, 5, 2]} castShadow color={'#0aaef5'} /> */}
        {/* <pointLight intensity={5020} position={[0, 20, 2]} castShadow color={'#0aaef5'} /> */}

        <RigidBody>
            <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 5, -15]} rotation={[0, 2, 0]} />
        </RigidBody>
        {carBody.scene && (
            <RigidBody angularDamping={100} name="car" friction={0} type={dropCar ? "dynamic" : "fixed"} colliders="trimesh" position={[0, 5, 0]} ref={carBodyRef} gravityScale={2}

            >
                <pointLight intensity={100} position={[0, 5, -2]} castShadow color={'white'} />
                {/* <CuboidCollider args={[1,1,1]}/> */}
                <group>
                    <primitive object={carBody.scene} />
                </group>
            </RigidBody>
        )}

        {/*wheel rod */}
        <RigidBody
            ref={rod1Ref}
            angularDamping={10}
            position={[0, 3, 0]}
            // sensor
            canSleep={false}
            enabledRotations={[false, true, false]}
            density={9000}
        >
            <mesh onClick={() => { }}>
                <boxGeometry args={[0.9, 0.1, 0.5]} />
                <meshStandardMaterial color="white" />
            </mesh>
        </RigidBody>

        {/* stpoer 1 */}

        <RigidBody position={[0, 2, 5]} type="dynamic" ref={stoper1Ref} density={100}>
            <CuboidCollider args={[0.1, 0.2, stoper1Size]} />
        </RigidBody>

        {/* stpoer 2 */}

        <RigidBody position={[0, 2, 0]} type="dynamic" ref={stoper2Ref} density={100}>
            <CuboidCollider args={[0.1, 0.2, stoper2Size]} />
        </RigidBody>

        {wheel1 && (
            <RigidBody
                type="dynamic"
                position={[-1.5, 3, 0]}
                colliders="ball"
                density={50}
                ref={w1Ref}
                gravityScale={2}
                // linearDamping={3}
                // angularDamping={5}
                canSleep={false}
                friction={12}
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
                friction={12}
                density={50}
                type="dynamic"
                position={[1.5, 3, 0]}
                colliders="ball"
                ref={w2Ref}
                gravityScale={2}
                canSleep={false}
            // linearDamping={3}
            // angularDamping={5}
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
                density={50}
                type="dynamic"
                position={[-1.5, 3, -3]}
                colliders="ball"
                canSleep={false}
                ref={w3Ref}
                gravityScale={2}
                friction={10}
            // linearDamping={3}
            // angularDamping={5}
            // enabledRotations={[true, false, false]}
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
                gravityScale={2}
                // linearDamping={3}
                // angularDamping={5}
                density={50}
                friction={10}
            // enabledRotations={[true, false, false]}
            >
                <group scale={0.2 / 15}>
                    <primitive object={wheel4} />
                </group>
            </RigidBody>
        )}

        {rocks?.map((rock) => (rock))}
        {houses?.map((house) => (house))}

        <RigidBody type="fixed" density={200} friction={0.5}>
            <mesh scale={[50025, 1, 50025]} receiveShadow>
                <boxGeometry />
                <meshStandardMaterial color={'#07a809'} side={THREE.DoubleSide} />
            </mesh>
        </RigidBody>
    </>)
}
useGLTF.preload('/modals/Rock.glb');
useGLTF.preload('/modals/jeep.glb');
useGLTF.preload('/modals/tyre.glb');
export default Scene;