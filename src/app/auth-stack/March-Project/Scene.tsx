import React, { Suspense, useEffect, useRef, useState } from "react";

import * as THREE from "three"
import { Box, OrbitControls, PerspectiveCamera, PositionalAudio, useGLTF, useVideoTexture } from "@react-three/drei";
import { chairs } from "../../../../utils/sits";
import { useFrame } from "@react-three/fiber";
const { DEG2RAD } = THREE.MathUtils;


const Scene = () => {
    const chair = useGLTF('/modals/sillon.glb');
    const [camera, setCamera] = useState<any>({
        position: { x: -5.1, y: 48, z: 50 },
        rotation: { x: 0, y: 0, z: 0 }
    });
    const [audio, setAudio] = useState(false)
    const chairRef = useRef<Map<number, THREE.Mesh>>(new Map());
    const cameraRef = useRef<any>();
    const screnRef=useRef<any>();
    const texture = useVideoTexture("/video/Movie.mp4", {
        start: true, // Auto-play the video
        loop: true,  // Loop the video
        muted: true, // Mute the video
    });
    const changeCamera = (whom: string, idx: number) => {
        //    console.log(chairRef.current.get(idx));
        const selected = chairRef.current.get(idx);
        const y = (selected?.position.y || 0) + 1;
        const z = (selected?.position.z || 0) - 1;
        const x = (selected?.position.x || 0);

        cameraRef.current.position.x = x;
        cameraRef.current.position.y = y;
        cameraRef.current.position.z = z;

        const listener = new THREE.AudioListener();
        cameraRef.current.add(listener);
        
    }
        useFrame(()=>{
            cameraRef.current.lookAt(-3.8,8,-20)
        })

    return (<>
        <OrbitControls
            // minDistance={0}
            // maxDistance={50}
        />

        <ambientLight intensity={0.9} />
        <directionalLight color={'#fafafa'} castShadow position={[-9, 14, 0]} intensity={2} rotation={[DEG2RAD * 80, 0, 0]} />

        {audio &&
            <Box scale={0.2} position={[-20, 14, -23]}>
                <PositionalAudio url="/sounds/Movie audio.mp3" autoplay loop distance={0.3}/>
            </Box>
        }


        {audio &&
            <Box scale={0.2} position={[12, 14, -23]}>
                <PositionalAudio url="/sounds/Movie audio.mp3" autoplay loop distance={0.3}/>
            </Box>
        }


        {audio &&
            <Box scale={0.2} position={[12, 18, 33]}>
                <PositionalAudio url="/sounds/Movie audio.mp3" autoplay loop distance={0.3}/>
            </Box>
        }


        {audio &&
            <Box scale={0.2} position={[-20, 18, 33]}>
                <PositionalAudio url="/sounds/Movie audio.mp3" autoplay loop distance={0.3}/>
            </Box>
        }


        <PerspectiveCamera
            ref={cameraRef}
            makeDefault
            position={[camera.position.x, camera.position.y, camera.position.z]}
            rotation={[DEG2RAD * camera.rotation.x, DEG2RAD * camera.rotation.y, DEG2RAD * camera.rotation.z]}
        />

        <mesh rotation={[DEG2RAD * 0, 0, 0]} position={[-2.8, 6, -23]} onClick={()=>setAudio(true)}>
            <planeGeometry args={[33.5, 14]} />
            <meshStandardMaterial map={texture}/>
        </mesh>


        {chair?.scene && (<>
            {chairs.map((obj, idx) => {
                const clonedScene = chair.scene.clone(); // Clone the model for each chair

                return (
                    <mesh
                        position={[obj.position.x, obj.position.y, obj.position.z]}
                        rotation={[obj.rotation.x, obj.rotation.y, obj.rotation.z]}
                        castShadow
                        receiveShadow
                        ref={(el) => {
                            if (el) chairRef.current.set(idx, el);
                        }}
                        onClick={(e) => {
                            e.stopPropagation()
                            changeCamera('position', idx)
                        }}
                    >
                        <primitive object={clonedScene} key={obj.sitNo} />
                    </mesh>
                )
            })}
        </>)}


    </>)
}
useGLTF.preload('/modals/sillon.glb');
export default Scene;