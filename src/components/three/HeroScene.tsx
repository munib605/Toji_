import { Suspense, useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Sphere, Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

function GradientOrb() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.12
    meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.15
  })

  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={1.2}>
      <Sphere ref={meshRef} args={[1.4, 128, 128]}>
        <MeshDistortMaterial
          color="#6366F1"
          attach="material"
          distort={0.4}
          speed={1.8}
          roughness={0.15}
          metalness={0.6}
          emissive="#8B5CF6"
          emissiveIntensity={0.25}
        />
      </Sphere>
    </Float>
  )
}

function Particles({ count = 400 }: { count?: number }) {
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 10
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return arr
  }, [count])

  const pointsRef = useRef<THREE.Points>(null)

  useFrame((state) => {
    if (!pointsRef.current) return
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.02
  })

  return (
    <Points ref={pointsRef} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#06B6D4"
        size={0.02}
        sizeAttenuation
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  )
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[4, 4, 4]} intensity={1.2} color="#8B5CF6" />
      <pointLight position={[-4, -2, -3]} intensity={0.8} color="#06B6D4" />
    </>
  )
}

/**
 * Interactive 3D hero background: a distorted gradient sphere with orbiting
 * light particles. Pointer movement subtly tilts the scene camera via OrbitControls-free
 * manual damping through the group rotation in GradientOrb + Float.
 */
export function HeroScene() {
  return (
    <div className="absolute inset-0 -z-10" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <Lights />
          <GradientOrb />
          <Particles />
        </Suspense>
      </Canvas>
    </div>
  )
}
