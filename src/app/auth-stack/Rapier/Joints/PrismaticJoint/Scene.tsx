import React, { Suspense, useEffect, useRef, useState } from "react";

import * as THREE from "three"
import { Box, Capsule, Example, OrbitControls, PerspectiveCamera,} from "@react-three/drei";
import { CapsuleCollider, CuboidCollider, RigidBody, usePrismaticJoint, useSphericalJoint ,} from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
const {DEG2RAD}=THREE.MathUtils;
import { Vector3 } from "three";


// =====================================================
// PRISMATIC JOINT — All UnitImpulseJoint Methods Demo
// =====================================================
// A prismatic joint allows movement along a single axis while restricting
// rotation and movement in other directions. A real-life example is a drawer
// in a cabinet, which only moves in and out along a straight path.


// ─────────────────────────────────────────────
// 1. limitsEnabled() — Check if limits are active
// ─────────────────────────────────────────────
const LimitsEnabledExample = ({position}:{position:[number,number,number]}) => {

  const bodyA = useRef(null);
  const bodyB = useRef(null);

  const joint = usePrismaticJoint(bodyA, bodyB, [
    [0, 0, 0],   // body1 anchor
    [0, 0, 0],   // body2 anchor
    [1, 0, 0],   // axis — slides along X
  ]);

  useEffect(() => {
    if (joint.current) {
      // Check if limits are enabled (default: false)
      const enabled = joint.current.limitsEnabled();
      console.log("1. limitsEnabled():", enabled); // false
    }
  }, []);

  return (
    <group position={position}>
      <RigidBody ref={bodyA} type="fixed">
        <mesh>
          <boxGeometry args={[2, 0.5, 2]} />
          <meshStandardMaterial color="gray" />
        </mesh>
      </RigidBody>
      <RigidBody ref={bodyB} type="dynamic">
        <mesh position={[2, 0, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#4CAF50" />
        </mesh>
      </RigidBody>
    </group>
  );
};


// ─────────────────────────────────────────────────────
// 2. limitsMin() / limitsMax() — Get current limits
// ─────────────────────────────────────────────────────
const LimitsMinMaxExample = ({position}:{position:[number,number,number]}) => {

  const bodyA = useRef(null);
  const bodyB = useRef(null);

  const joint = usePrismaticJoint(bodyA, bodyB, [
    [0, 0, 0],
    [0, 0, 0],
    [1, 0, 0],
    [-3, 3],      // limits: min=-3, max=3
  ]);

  useEffect(() => {
    if (joint.current) {
      // Read back the limits we set
      const min = joint.current.limitsMin();
      const max = joint.current.limitsMax();
      console.log("2. limitsMin():", min);  // -3
      console.log("2. limitsMax():", max);  //  3
      console.log("   limitsEnabled():", joint.current.limitsEnabled()); // true (auto-enabled by passing limits)
    }
  }, []);

  return (
    <group position={position}>
      <RigidBody ref={bodyA} type="fixed">
        <mesh>
          <boxGeometry args={[2, 0.5, 2]} />
          <meshStandardMaterial color="gray" />
        </mesh>
      </RigidBody>
      <RigidBody ref={bodyB} type="dynamic">
        <mesh position={[2, 0, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#2196F3" />
        </mesh>
      </RigidBody>
    </group>
  );
};


// ──────────────────────────────────────────────────────
// 3. setLimits(min, max) — Set limits at runtime
// ──────────────────────────────────────────────────────
const SetLimitsExample = ({position}:{position:[number,number,number]}) => {

  const bodyA = useRef(null);
  const bodyB = useRef(null);

  const joint = usePrismaticJoint(bodyA, bodyB, [
    [0, 0, 0],
    [0, 0, 0],
    [1, 0, 0],
  ]);

  useEffect(() => {
    if (joint.current) {
      // Dynamically set limits at runtime
      joint.current.setLimits(0, 2);
      console.log("3. setLimits(-2, 5) applied");
      console.log("   limitsEnabled():", joint.current.limitsEnabled()); // true
      console.log("   limitsMin():", joint.current.limitsMin());         // -2
      console.log("   limitsMax():", joint.current.limitsMax());         //  5
    }
  }, []);

  return (
    <group position={position}>
      <RigidBody ref={bodyA} type="fixed">
        <mesh>
          <boxGeometry args={[2, 0.5, 2]} />
          <meshStandardMaterial color="gray" />
        </mesh>
      </RigidBody>
      <RigidBody ref={bodyB} type="dynamic">
        <mesh position={[2, 0, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#FF9800" />
        </mesh>
      </RigidBody>
    </group>
  );
};


// ─────────────────────────────────────────────────────────────────
// 4. configureMotor(targetPos, targetVel, stiffness, damping)
//    Full motor configuration — drives joint like a spring-damper
// ─────────────────────────────────────────────────────────────────
const ConfigureMotorExample = ({position}:{position:[number,number,number]}) => {

  const bodyA = useRef(null);
  const bodyB = useRef(null);

  const joint = usePrismaticJoint(bodyA, bodyB, [
    [0, 0, 0],
    [0, 0, 0],
    [1, 0, 0],
  ]);

  useFrame(() => {
    if (joint.current) {
      // Full motor: tries to reach targetPos=3 at targetVel=1
      // with stiffness=100 (spring force) and damping=10 (resistance)
      joint.current.configureMotor(
        5,    // targetPos — where we want the joint to be(max position)
        20,    // targetVel — desired velocity(time)
        100,  // stiffness — how strongly it pulls toward targetPos
        5    // damping   — how much it resists motion (prevents oscillation)
      );
    }
  });

  return (
    <group position={position}>
      <RigidBody ref={bodyA} type="fixed" sensor>
        <mesh>
          <boxGeometry args={[2, 0.5, 2]} />
          <meshStandardMaterial color="gray" />
        </mesh>
      </RigidBody>
      <RigidBody ref={bodyB} type="dynamic">
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#E91E63" />
        </mesh>
      </RigidBody>
    </group>
  );
};


// ──────────────────────────────────────────────────────────────────────
// 5. configureMotorPosition(targetPos, stiffness, damping)
//    Position-driven motor — pulls body to a target position
// ──────────────────────────────────────────────────────────────────────
const ConfigureMotorPositionExample = ({position}:{position:[number,number,number]}) => {

  const bodyA = useRef(null);
  const bodyB = useRef(null);

  const joint = usePrismaticJoint(bodyA, bodyB, [
    [0, 0, 0],
    [0, 0, 0],
    [0, 1, 0],  // axis — slides along Y (up/down like an elevator)
  ]);

  const [goUp, setGoUp] = useState(false);

  // Oscillate up and down every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => setGoUp(prev => !prev), 2000);
    return () => clearInterval(interval);
  }, []);

  useFrame(() => {
    if (joint.current) {
      // Drives the joint to targetPos like a spring
      // Great for elevator / platform behavior
      joint.current.configureMotorPosition(
        goUp ? 5 : 2,  // targetPos — oscillate between 0 and 5
        200,            // stiffness — spring strength
        20              // damping   — prevents bouncing
      );
    }
  });

  return (
    <group position={position}>
      <RigidBody ref={bodyA} type="fixed">
        <mesh>
          <boxGeometry args={[2, 0.2, 2]} />
          <meshStandardMaterial color="gray" />
        </mesh>
      </RigidBody>
      <RigidBody ref={bodyB} type="dynamic">
        <mesh>
          <boxGeometry args={[1.5, 0.3, 1.5]} />
          <meshStandardMaterial color="#9C27B0" />
        </mesh>
      </RigidBody>
    </group>
  );
};


// ──────────────────────────────────────────────────────────────────────
// 6. configureMotorVelocity(targetVel, factor)
//    Velocity-driven motor — spins at constant speed like a conveyor
// ──────────────────────────────────────────────────────────────────────
const ConfigureMotorVelocityExample = ({position}:{position:[number,number,number]}) => {

  const bodyA = useRef(null);
  const bodyB = useRef(null);

  const joint = usePrismaticJoint(bodyA, bodyB, [
    [0, 0, 0],
    [0, 0, 0],
    [1, 0, 0],
    [-5, 5],     // limits so it doesn't fly away
  ]);

  const [direction, setDirection] = useState(1);

  // Reverse direction every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => setDirection(prev => prev * -1), 3000);
    return () => clearInterval(interval);
  }, []);

  useFrame(() => {
    if (joint.current) {
      // Drives the joint at a constant velocity
      // factor = damping coefficient (how aggressively it maintains speed)
      joint.current.configureMotorVelocity(
        2 * direction,  // targetVel — speed along the axis
        50              // factor    — force applied to maintain velocity
      );
    }
  });

  return (
    <group position={position}>
      <RigidBody ref={bodyA} type="fixed" sensor>
        <mesh>
          <boxGeometry args={[2, 0.5, 2]} />
          <meshStandardMaterial color="gray" />
        </mesh>
      </RigidBody>
      <RigidBody ref={bodyB} type="dynamic">
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#00BCD4" />
        </mesh>
      </RigidBody>
    </group>
  );
};


// ──────────────────────────────────────────────────────────────────────
// 7. configureMotorModel(model) — Set the motor model type
//    AccelerationBased = 0, ForceBased = 1
// ──────────────────────────────────────────────────────────────────────
const ConfigureMotorModelExample = ({position}:{position:[number,number,number]}) => {

  const bodyA = useRef(null);
  const bodyB = useRef(null);

  const joint = usePrismaticJoint(bodyA, bodyB, [
    [0, 0, 0],
    [0, 0, 0],
    [1, 0, 0],
    [-4, 4],
  ]);

  useFrame(() => {
    if (joint.current) {
      // AccelerationBased (0) — motor force is independent of body mass
      //   Same stiffness/damping values move heavy and light objects equally
      // ForceBased (1) — motor applies raw force, heavier objects move slower
      joint.current.configureMotorModel(0); // 0 = AccelerationBased

      // Now the motor behaves consistently regardless of body mass
      joint.current.configureMotorPosition(3, 100, 10);
    }
  });

  return (
    <group position={position}>
      <RigidBody ref={bodyA} type="fixed" sensor>
        <mesh>
          <boxGeometry args={[2, 0.5, 2]} />
          <meshStandardMaterial color="gray" />
        </mesh>
      </RigidBody>
      <RigidBody ref={bodyB} type="dynamic" mass={10}>
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#FFEB3B" />
        </mesh>
      </RigidBody>
    </group>
  );
};


// ═══════════════════════════════
//         MAIN SCENE
// ═══════════════════════════════

const Scene = () => {
  return (<>
    <OrbitControls />
    <PerspectiveCamera makeDefault position={[0, 10, 30]} />
    <ambientLight intensity={0.5} />
    <pointLight intensity={80} position={[0, 5, -2]} castShadow color={'red'} />
    <pointLight intensity={120} position={[0, 5, 2]} castShadow color={'#0aaef5'} />

    {/* 1. limitsEnabled() — just checks if limits are on */}
    <LimitsEnabledExample position={[-12, 5, 0]} />

    {/* 2. limitsMin() / limitsMax() — reads limit values */}
    <LimitsMinMaxExample position={[-4, 5, 0]} />

    {/* 3. setLimits() — sets limits at runtime */}
    <SetLimitsExample position={[4, 5, 0]} />

    {/* 4. configureMotor() — full spring-damper motor */}
    <ConfigureMotorExample position={[12, 5, 0]} />

    {/* 5. configureMotorPosition() — elevator / platform */}
    <ConfigureMotorPositionExample position={[-8, -3, 0]} />

    {/* 6. configureMotorVelocity() — conveyor belt */}
    <ConfigureMotorVelocityExample position={[0, -3, 0]} />

    {/* 7. configureMotorModel() — acceleration vs force based */}
    <ConfigureMotorModelExample position={[8, -3, 0]} />
  </>);
};

export default Scene;
