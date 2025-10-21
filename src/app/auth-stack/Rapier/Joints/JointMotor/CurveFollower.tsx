"use client"
import * as THREE from "three"
import { useFrame } from "@react-three/fiber"
import React, { useRef, useMemo, useState, useEffect } from "react"
import { OrbitControls, PerspectiveCamera } from "@react-three/drei"

const CurveFollower = () => {
  const meshRef = useRef<THREE.Mesh>(null!)
  const [play,setPlay]=useState(true);
  const cameraRef = useRef<any>();
  const [curves,setCurves]=useState<any>([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(-20, 0, 0),
    new THREE.Vector3(-20, 0, -20),
  ])

  useEffect(()=>{
      setTimeout(()=>{
        setPlay(!play)
      },3000)
  },[play]);

   useEffect(()=>{
    setTimeout(()=>{
      setCurves((prev:any)=>{
         return[...prev,new THREE.Vector3(0, 0, -20),]
      })
    },10000)
   },[])

   useEffect
  
  const curve = new THREE.CatmullRomCurve3(
    curves,
    true,
    "centripetal"
  )

  const tRef = useRef(0)

  const points = useMemo(() => curve.getPoints(250), [curve])
  const geometry:any = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points])

  useFrame((state, delta) => {
    if(play){
      tRef.current += delta * (0.1)
    tRef.current %= 1

    const position = curve.getPointAt(tRef.current)
    const tangent = curve.getTangentAt(tRef.current)

    if (meshRef.current && play) {
      meshRef.current.position.copy(position)
      const up = new THREE.Vector3(1, 0, 0)
      const axis = new THREE.Vector3().crossVectors(up, tangent).normalize()
      const radians = Math.acos(up.dot(tangent))
      meshRef.current.quaternion.setFromAxisAngle(axis, radians)
    }
    }
  })

  // useFrame(()=>{
  //   if(meshRef?.current){
  //     cameraRef.current.lookAt(meshRef?.current?.position)
  //   }
  // })

  return (
    <>
    <PerspectiveCamera
            ref={cameraRef}
            makeDefault
            position={[-10, 10, -10]}
        />
      <mesh ref={meshRef}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>
      <OrbitControls/>

      {/* This <line> will only work inside Canvas */}
      <line geometry={geometry}>
        <lineBasicMaterial color="hotpink" linewidth={2} />
      </line>
    </>
  )
}

export default CurveFollower
