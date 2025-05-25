"use client"

import { useRef } from "react"
import { Text } from "@react-three/drei"
import type * as THREE from "three"

interface ShapeProps {
  scale?: number
  color?: string
  wireframe?: boolean
}

export function Cube({ scale = 1, color = "#1e88e5", wireframe = false }: ShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null)

  return (
    <group>
      <mesh ref={meshRef} castShadow receiveShadow scale={scale}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={color} wireframe={wireframe} />
      </mesh>
      <Text position={[0, -1.5 * scale, 0]} fontSize={0.2} color="black" anchorX="center" anchorY="middle">
        Kubus
      </Text>
      <Text position={[0, 1.5 * scale, 0]} fontSize={0.15} color="black" anchorX="center" anchorY="middle">
        {`Volume = s³`}
      </Text>
    </group>
  )
}

export function Sphere({ scale = 1, color = "#e53935", wireframe = false }: ShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null)

  return (
    <group>
      <mesh ref={meshRef} castShadow receiveShadow scale={scale}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshStandardMaterial color={color} wireframe={wireframe} />
      </mesh>
      <Text position={[0, -1.5 * scale, 0]} fontSize={0.2} color="black" anchorX="center" anchorY="middle">
        Bola
      </Text>
      <Text position={[0, 1.5 * scale, 0]} fontSize={0.15} color="black" anchorX="center" anchorY="middle">
        {`Volume = 4/3 πr³`}
      </Text>
    </group>
  )
}

export function Cylinder({ scale = 1, color = "#43a047", wireframe = false }: ShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null)

  return (
    <group>
      <mesh ref={meshRef} castShadow receiveShadow scale={scale}>
        <cylinderGeometry args={[0.5, 0.5, 1.5, 32]} />
        <meshStandardMaterial color={color} wireframe={wireframe} />
      </mesh>
      <Text position={[0, -1.5 * scale, 0]} fontSize={0.2} color="black" anchorX="center" anchorY="middle">
        Silinder
      </Text>
      <Text position={[0, 1.5 * scale, 0]} fontSize={0.15} color="black" anchorX="center" anchorY="middle">
        {`Volume = πr²t`}
      </Text>
    </group>
  )
}

export function Cone({ scale = 1, color = "#fb8c00", wireframe = false }: ShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null)

  return (
    <group>
      <mesh ref={meshRef} castShadow receiveShadow scale={scale}>
        <coneGeometry args={[0.7, 1.5, 32]} />
        <meshStandardMaterial color={color} wireframe={wireframe} />
      </mesh>
      <Text position={[0, -1.5 * scale, 0]} fontSize={0.2} color="black" anchorX="center" anchorY="middle">
        Kerucut
      </Text>
      <Text position={[0, 1.5 * scale, 0]} fontSize={0.15} color="black" anchorX="center" anchorY="middle">
        {`Volume = 1/3 πr²t`}
      </Text>
    </group>
  )
}

export function Torus({ scale = 1, color = "#8e24aa", wireframe = false }: ShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null)

  return (
    <group>
      <mesh ref={meshRef} castShadow receiveShadow scale={scale}>
        <torusGeometry args={[0.5, 0.2, 16, 100]} />
        <meshStandardMaterial color={color} wireframe={wireframe} />
      </mesh>
      <Text position={[0, -1.5 * scale, 0]} fontSize={0.2} color="black" anchorX="center" anchorY="middle">
        Torus
      </Text>
      <Text position={[0, 1.5 * scale, 0]} fontSize={0.15} color="black" anchorX="center" anchorY="middle">
        {`Volume = 2π²Rr²`}
      </Text>
    </group>
  )
}
