import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";

import * as THREE from "three"
import { OrbitControls, Image, Svg, CurveModifier, Line } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

//Forces a mesh (e.g., text, plane) to always face the camera.

const Scene = () => {
    const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-2, 0, 0),
        new THREE.Vector3(-1, 1, 0),
        new THREE.Vector3(0, 1.5, 0),
        new THREE.Vector3(1, 1, 0),
        new THREE.Vector3(2, 0, 0),
    ]);

    const meshRef = useRef<THREE.Mesh>(null);
    const [progress, setProgress] = useState(0);

    useFrame((_, delta) => {
        // Increase progress over time, looping back when it reaches 1
        setProgress((prev) => (prev + delta * 0.2) % 1);

        if (meshRef.current) {
            // Get the position on the curve based on progress
            const point = curve.getPointAt(progress);
            if (point) {
                meshRef.current.position.copy(point);

                // Calculate tangent to rotate the object along the curve
                const tangent = curve.getTangentAt(progress).normalize();
                const up = new THREE.Vector3(0, 1, 0);
                const quaternion = new THREE.Quaternion().setFromUnitVectors(up, tangent);
                meshRef.current.quaternion.copy(quaternion);
            }
        }
    });

    return (
        <>
            <Line
                points={curve.getPoints(100)} // Convert curve to points
                color="blue"
                lineWidth={3} // Adjust thickness
            />
            <CurveModifier curve={curve}>
                <mesh ref={meshRef}>
                    <ambientLight intensity={2} />
                    <sphereGeometry args={[0.2, 16, 16]} />
                    <meshStandardMaterial color="red" />
                </mesh>
            </CurveModifier>

        </>
    )
}
export default Scene;