"use client"

import { useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera, Environment } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Cube, Sphere, Cylinder, Cone, Torus } from "@/components/3d-shapes"
import type * as THREE from "three"

type Shape = "cube" | "sphere" | "cylinder" | "cone" | "torus"

interface Viewer3DProps {
  initialShape?: Shape
  showControls?: boolean
}

export function Viewer3D({ initialShape = "cube", showControls = true }: Viewer3DProps) {
  const [shape, setShape] = useState<Shape>(initialShape)
  const [scale, setScale] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [autoRotate, setAutoRotate] = useState(true)

  return (
    <div className="w-full h-[400px] relative">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} castShadow />
        <pointLight position={[-10, -10, -10]} />

        <SceneContent shape={shape} scale={scale} rotation={rotation} autoRotate={autoRotate} />

        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          autoRotate={autoRotate}
          autoRotateSpeed={1}
        />
        <Environment preset="sunset" />
      </Canvas>

      {showControls && (
        <div className="absolute bottom-4 left-0 right-0 flex flex-col items-center space-y-4 px-4">
          <div className="bg-background/80 backdrop-blur-sm p-3 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between mb-4">
              <Button variant={shape === "cube" ? "default" : "outline"} size="sm" onClick={() => setShape("cube")}>
                Kubus
              </Button>
              <Button variant={shape === "sphere" ? "default" : "outline"} size="sm" onClick={() => setShape("sphere")}>
                Bola
              </Button>
              <Button
                variant={shape === "cylinder" ? "default" : "outline"}
                size="sm"
                onClick={() => setShape("cylinder")}
              >
                Silinder
              </Button>
              <Button variant={shape === "cone" ? "default" : "outline"} size="sm" onClick={() => setShape("cone")}>
                Kerucut
              </Button>
              <Button variant={shape === "torus" ? "default" : "outline"} size="sm" onClick={() => setShape("torus")}>
                Torus
              </Button>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-sm">Ukuran</span>
                  <span className="text-sm">{scale.toFixed(1)}x</span>
                </div>
                <Slider value={[scale]} min={0.5} max={2} step={0.1} onValueChange={(value) => setScale(value[0])} />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Rotasi Otomatis</span>
                <Button
                  variant={autoRotate ? "default" : "outline"}
                  size="sm"
                  onClick={() => setAutoRotate(!autoRotate)}
                >
                  {autoRotate ? "Aktif" : "Nonaktif"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

interface SceneContentProps {
  shape: Shape
  scale: number
  rotation: number
  autoRotate: boolean
}

function SceneContent({ shape, scale, rotation, autoRotate }: SceneContentProps) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (groupRef.current && !autoRotate) {
      groupRef.current.rotation.y = rotation
    }
  })

  return (
    <group ref={groupRef}>
      {shape === "cube" && <Cube scale={scale} />}
      {shape === "sphere" && <Sphere scale={scale} />}
      {shape === "cylinder" && <Cylinder scale={scale} />}
      {shape === "cone" && <Cone scale={scale} />}
      {shape === "torus" && <Torus scale={scale} />}
    </group>
  )
}
