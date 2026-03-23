'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default function BodyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const W = container.clientWidth
    const H = container.clientHeight

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.shadowMap.enabled = true
    container.appendChild(renderer.domElement)

    // Scene & Camera
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100)
    camera.position.set(0, 1.2, 4.5)

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.autoRotate = true
    controls.autoRotateSpeed = 1.5
    controls.enableZoom = true
    controls.minDistance = 2
    controls.maxDistance = 8
    controls.target.set(0, 1, 0)

    // Materials
    const skinMat = new THREE.MeshPhysicalMaterial({
      color: 0x44aadd,
      metalness: 0.1,
      roughness: 0.3,
      transmission: 0.15,
      transparent: true,
      opacity: 0.92,
    })

    const boneMat = new THREE.MeshPhysicalMaterial({
      color: 0x88ddff,
      metalness: 0.2,
      roughness: 0.2,
      emissive: new THREE.Color(0x112244),
      emissiveIntensity: 0.3,
    })

    const ribMat = new THREE.MeshPhysicalMaterial({
      color: 0xaaddff,
      metalness: 0.4,
      roughness: 0.2,
      emissive: new THREE.Color(0x224466),
      emissiveIntensity: 0.5,
    })

    // Build body
    const group = new THREE.Group()

    function addPart(geo: THREE.BufferGeometry, mat: THREE.Material, x: number, y: number, z: number, rx = 0, ry = 0, rz = 0) {
      const mesh = new THREE.Mesh(geo, mat)
      mesh.position.set(x, y, z)
      mesh.rotation.set(rx, ry, rz)
      mesh.castShadow = true
      group.add(mesh)
      return mesh
    }

    // Head
    addPart(new THREE.SphereGeometry(0.22, 32, 32), skinMat, 0, 2.72, 0)
    // Neck
    addPart(new THREE.CylinderGeometry(0.09, 0.11, 0.22, 16), skinMat, 0, 2.44, 0)
    // Torso
    addPart(new THREE.CapsuleGeometry(0.28, 0.75, 8, 16), skinMat, 0, 1.8, 0)
    // Abs
    addPart(new THREE.CapsuleGeometry(0.24, 0.35, 8, 16), skinMat, 0, 1.2, 0)
    // Pelvis
    addPart(new THREE.SphereGeometry(0.26, 16, 12), skinMat, 0, 0.88, 0)

    // Arms
    addPart(new THREE.CapsuleGeometry(0.09, 0.38, 8, 16), skinMat, -0.44, 1.9, 0, 0, 0, 0.25)
    addPart(new THREE.CapsuleGeometry(0.09, 0.38, 8, 16), skinMat, 0.44, 1.9, 0, 0, 0, -0.25)
    addPart(new THREE.CapsuleGeometry(0.075, 0.36, 8, 16), skinMat, -0.62, 1.48, 0, 0, 0, 0.35)
    addPart(new THREE.CapsuleGeometry(0.075, 0.36, 8, 16), skinMat, 0.62, 1.48, 0, 0, 0, -0.35)
    addPart(new THREE.SphereGeometry(0.08, 12, 12), skinMat, -0.76, 1.18, 0)
    addPart(new THREE.SphereGeometry(0.08, 12, 12), skinMat, 0.76, 1.18, 0)

    // Legs
    addPart(new THREE.CapsuleGeometry(0.115, 0.55, 8, 16), skinMat, -0.17, 0.35, 0, 0, 0, 0.04)
    addPart(new THREE.CapsuleGeometry(0.115, 0.55, 8, 16), skinMat, 0.17, 0.35, 0, 0, 0, -0.04)
    addPart(new THREE.SphereGeometry(0.1, 12, 12), skinMat, -0.19, -0.1, 0.06)
    addPart(new THREE.SphereGeometry(0.1, 12, 12), skinMat, 0.19, -0.1, 0.06)
    addPart(new THREE.CapsuleGeometry(0.09, 0.52, 8, 16), skinMat, -0.19, -0.52, 0)
    addPart(new THREE.CapsuleGeometry(0.09, 0.52, 8, 16), skinMat, 0.19, -0.52, 0)
    addPart(new THREE.CapsuleGeometry(0.08, 0.2, 8, 16), skinMat, -0.19, -0.92, 0.08, Math.PI / 2, 0, 0)
    addPart(new THREE.CapsuleGeometry(0.08, 0.2, 8, 16), skinMat, 0.19, -0.92, 0.08, Math.PI / 2, 0, 0)

    // Ribs
    const ribPositions: [number, number, number, number, number, number][] = [
      [0, 2.08, 0, Math.PI / 2, 0, 0],
      [0, 1.96, 0, Math.PI / 2, 0, 0],
      [0, 1.84, 0, Math.PI / 2, 0, 0],
      [0, 1.72, 0, Math.PI / 2, 0, 0],
      [0, 1.60, 0, Math.PI / 2, 0, 0],
      [0, 1.50, 0, Math.PI / 2, 0, 0],
    ]
    ribPositions.forEach(([x, y, z, rx, ry, rz]) => {
      addPart(new THREE.TorusGeometry(0.22 - (2.08 - y) * 0.04, 0.016, 8, 24), ribMat, x, y, z, rx, ry, rz)
    })

    // Spine
    for (let i = 0; i < 14; i++) {
      const v = new THREE.Mesh(new THREE.SphereGeometry(0.038, 8, 8), boneMat)
      v.position.set(0, 2.25 - i * 0.1, -0.04)
      group.add(v)
    }

    scene.add(group)
    group.position.y = -1.0

    // Lights
    scene.add(new THREE.AmbientLight(0x224466, 1.2))
    const dirLight = new THREE.DirectionalLight(0x66ccff, 3)
    dirLight.position.set(2, 4, 3)
    dirLight.castShadow = true
    scene.add(dirLight)
    const rimLight = new THREE.DirectionalLight(0x0044ff, 1.5)
    rimLight.position.set(-3, 2, -2)
    scene.add(rimLight)
    const pointLight = new THREE.PointLight(0x00aaff, 2, 10)
    pointLight.position.set(0, 2, 2)
    scene.add(pointLight)

    // Ground glow
    const glow = new THREE.Mesh(
      new THREE.CircleGeometry(0.8, 64),
      new THREE.MeshBasicMaterial({ color: 0x0066cc, transparent: true, opacity: 0.15 })
    )
    glow.rotation.x = -Math.PI / 2
    glow.position.y = -1.0
    scene.add(glow)

    // Grid rings
    for (let r = 0.3; r <= 1.2; r += 0.3) {
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(r, r + 0.005, 64),
        new THREE.MeshBasicMaterial({ color: 0x003366, transparent: true, opacity: 0.4, side: THREE.DoubleSide })
      )
      ring.rotation.x = -Math.PI / 2
      ring.position.y = -0.99
      scene.add(ring)
    }

    // Animate
    let animId: number
    function animate() {
      animId = requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    // Resize
    const handleResize = () => {
      const W = container.clientWidth
      const H = container.clientHeight
      camera.aspect = W / H
      camera.updateProjectionMatrix()
      renderer.setSize(W, H)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', handleResize)
      controls.dispose()
      renderer.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="w-full h-full"
      style={{ background: 'transparent' }}
    />
  )
}
