import React, { useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Sphere, Stars } from '@react-three/drei';
import * as THREE from 'three';

function Globe() {
    const globeRef = useRef();

    // Rotation animation
    useFrame(() => {
        if (globeRef.current) {
            globeRef.current.rotation.y += 0.002;
        }
    });

    return (
        <Sphere ref={globeRef} args={[2.2, 64, 64]}>
            <meshStandardMaterial
                color="#1E3A8A"
                emissive="#00D9FF"
                emissiveIntensity={0.5}
                wireframe={true}
                transparent={true}
                opacity={0.3}
            />
            {/* Inner solid sphere for depth */}
            <Sphere args={[2.18, 64, 64]}>
                <meshStandardMaterial color="#0A2342" />
            </Sphere>
        </Sphere>
    );
}

function SatelliteOrbit({ radius, speed, color = "#00D9FF" }) {
    const orbitRef = useRef();

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime() * speed;
        if (orbitRef.current) {
            orbitRef.current.position.x = Math.cos(t) * radius;
            orbitRef.current.position.z = Math.sin(t) * radius;
            orbitRef.current.position.y = Math.sin(t * 0.5) * (radius * 0.2);
        }
    });

    return (
        <mesh ref={orbitRef}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshBasicMaterial color={color} />
            <pointLight color={color} intensity={0.5} distance={2} />
        </mesh>
    );
}

export default function FloatingGlobe() {
    return (
        <div className="w-full h-full min-h-[500px] cursor-grab active:cursor-grabbing">
            <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
                <ambientLight intensity={0.4} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <pointLight position={[-10, -10, -10]} color="#00D9FF" intensity={0.5} />

                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

                <Globe />

                <SatelliteOrbit radius={3} speed={0.5} color="#00D9FF" />
                <SatelliteOrbit radius={3.5} speed={0.3} color="#00C9A7" />
                <SatelliteOrbit radius={3.2} speed={0.4} color="#FFB627" />

                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate={true}
                    autoRotateSpeed={0.5}
                />
            </Canvas>
        </div>
    );
}
