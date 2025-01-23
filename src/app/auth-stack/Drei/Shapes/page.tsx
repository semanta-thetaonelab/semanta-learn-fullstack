"use client"
import { Box, Circle, Cone, Cylinder, Dodecahedron, Icosahedron, Octahedron, OrbitControls, Plane, Polyhedron, Ring, Sphere, Tetrahedron, Torus, TorusKnot, Tube } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three"
const Drei = () => {

    const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-1, 0, 0),
        new THREE.Vector3(0, 1, 0),
        new THREE.Vector3(1, 0, 0),
      ]);
      
    return (
        <div className="h-full w-[100%] relative flex justify-center items-start">
            <Canvas className="bg-black">
                <OrbitControls />

                <ambientLight intensity={5} />
                <Box args={[3, 3, 3]} position={[0, 0, 0]}>
                    <meshStandardMaterial color="blue" />
                </Box>


                <Circle args={[1, 50]} position={[5, 0, 0]}>
                    <meshStandardMaterial color="red" side={THREE.DoubleSide} />
                </Circle>

                <Cone args={[1, 3, 52]} position={[-5, 0, 0]}>
                    <meshStandardMaterial color="yellow" />
                </Cone>

                <Cylinder args={[1, 1, 2, 32]} position={[-10, 0, 0]}>
                    <meshStandardMaterial color="green" wireframe />
                </Cylinder>

                <Dodecahedron args={[2, 2]} position={[10, 0, 0]}>
                    <meshStandardMaterial color="purple" wireframe />
                </Dodecahedron>

                <Icosahedron args={[1, 0]} position={[-15, 0, 0]}>
                    <meshStandardMaterial color="cyan" />
                </Icosahedron>

                <Octahedron args={[1, 0]} position={[15, 0, 0]}>
                    <meshStandardMaterial color="orange" wireframe />
                </Octahedron>

                <Plane args={[2, 2]} position={[-20, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} >
                    <meshStandardMaterial color="gray" side={THREE.DoubleSide} />
                </Plane>

                <Ring args={[0.2, 1, 20]} position={[20, 0, 0]}>
                    <meshStandardMaterial color="gold" side={THREE.DoubleSide} />
                </Ring>

                <Sphere args={[1, 32, 32]} position={[-25, 0, 0]}>
                    <meshStandardMaterial color="skyblue" wireframe />
                </Sphere>

                <Tetrahedron args={[2, 0]} position={[25, 0, 0]}>
                    <meshStandardMaterial color="teal" wireframe />
                </Tetrahedron>

                <Torus args={[1, 0.4, 16, 32]} position={[-30, 0, 0]}>
                    <meshStandardMaterial color="purple" />
                </Torus>

                <TorusKnot args={[1, 0.3, 100, 16]} position={[30, 0, 0]}>
                    <meshStandardMaterial color="lime" />
                </TorusKnot>

                <Tube args={[curve, 20, 0.2, 8, false]} position={[-40,0,0]}>
                    <meshStandardMaterial color="hotpink" side={THREE.DoubleSide}/>
                </Tube>
            </Canvas>
        </div>
    );
};

export default Drei;