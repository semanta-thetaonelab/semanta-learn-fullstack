"use client"

import { Canvas } from "@react-three/fiber"
import { ScrollControls } from "@react-three/drei"
import CurveFollower from "./CurveFollower"


export default function App() {
  return (
    <Canvas camera={{ position: [0, 0, 20], fov: 50 }} className="bg-black">
      <ambientLight />
      <pointLight position={[10, 10, 10]} />

      {/* ScrollControls provides scroll.offset for useScroll */}
      <ScrollControls pages={2}>
        <CurveFollower />
      </ScrollControls>
    </Canvas>
  )
}