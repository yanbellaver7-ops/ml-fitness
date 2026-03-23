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

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    container.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xf0f4f8)
    scene.fog = new THREE.Fog(0xf0f4f8, 10, 30)

    const camera = new THREE.PerspectiveCamera(42, W / H, 0.1, 100)
    camera.position.set(0, 1.4, 5.2)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.06
    controls.autoRotate = true
    controls.autoRotateSpeed = 1.2
    controls.enableZoom = true
    controls.minDistance = 2.5
    controls.maxDistance = 9
    controls.target.set(0, 1, 0)

    // ── Materials ──────────────────────────────────────────────────
    // Outer skin — white translucent
    const skinMat = new THREE.MeshPhysicalMaterial({
      color: 0xddeeff,
      metalness: 0.0,
      roughness: 0.15,
      transmission: 0.55,
      thickness: 0.5,
      transparent: true,
      opacity: 0.78,
      side: THREE.FrontSide,
      depthWrite: false,
    })

    // Internal anatomy — blue glow
    const anatomyMat = new THREE.MeshPhysicalMaterial({
      color: 0x1a8ccc,
      emissive: new THREE.Color(0x0a5588),
      emissiveIntensity: 0.6,
      metalness: 0.3,
      roughness: 0.2,
    })

    // Ribs / spine — brighter blue
    const boneMat = new THREE.MeshPhysicalMaterial({
      color: 0x44bbee,
      emissive: new THREE.Color(0x1166aa),
      emissiveIntensity: 0.8,
      metalness: 0.5,
      roughness: 0.1,
    })

    // Organs — deeper blue
    const organMat = new THREE.MeshPhysicalMaterial({
      color: 0x2277bb,
      emissive: new THREE.Color(0x0a3366),
      emissiveIntensity: 0.5,
      metalness: 0.1,
      roughness: 0.4,
      transparent: true,
      opacity: 0.9,
    })

    const group = new THREE.Group()

    function mesh(geo: THREE.BufferGeometry, mat: THREE.Material, x: number, y: number, z: number, rx = 0, ry = 0, rz = 0) {
      const m = new THREE.Mesh(geo, mat)
      m.position.set(x, y, z)
      m.rotation.set(rx, ry, rz)
      m.castShadow = true
      m.receiveShadow = true
      group.add(m)
      return m
    }

    // ── OUTER BODY (skin layer) ──────────────────────────────────
    // Head
    mesh(new THREE.SphereGeometry(0.24, 32, 32), skinMat, 0, 2.78, 0)
    // Neck
    mesh(new THREE.CylinderGeometry(0.10, 0.12, 0.24, 20), skinMat, 0, 2.48, 0)
    // Upper torso (chest)
    mesh(new THREE.CapsuleGeometry(0.30, 0.65, 12, 24), skinMat, 0, 1.88, 0)
    // Lower torso (abdomen)
    mesh(new THREE.CapsuleGeometry(0.26, 0.40, 12, 24), skinMat, 0, 1.22, 0)
    // Pelvis
    mesh(new THREE.SphereGeometry(0.29, 20, 16), skinMat, 0, 0.86, 0)
    // Shoulder L/R
    mesh(new THREE.SphereGeometry(0.14, 16, 16), skinMat, -0.46, 2.10, 0)
    mesh(new THREE.SphereGeometry(0.14, 16, 16), skinMat,  0.46, 2.10, 0)
    // Upper arm L/R
    mesh(new THREE.CapsuleGeometry(0.095, 0.42, 8, 16), skinMat, -0.52, 1.78, 0, 0, 0, 0.22)
    mesh(new THREE.CapsuleGeometry(0.095, 0.42, 8, 16), skinMat,  0.52, 1.78, 0, 0, 0, -0.22)
    // Elbow L/R
    mesh(new THREE.SphereGeometry(0.09, 12, 12), skinMat, -0.68, 1.48, 0)
    mesh(new THREE.SphereGeometry(0.09, 12, 12), skinMat,  0.68, 1.48, 0)
    // Forearm L/R
    mesh(new THREE.CapsuleGeometry(0.08, 0.40, 8, 16), skinMat, -0.72, 1.16, 0, 0, 0, 0.18)
    mesh(new THREE.CapsuleGeometry(0.08, 0.40, 8, 16), skinMat,  0.72, 1.16, 0, 0, 0, -0.18)
    // Wrist/Hand L/R
    mesh(new THREE.SphereGeometry(0.085, 12, 12), skinMat, -0.80, 0.88, 0)
    mesh(new THREE.SphereGeometry(0.085, 12, 12), skinMat,  0.80, 0.88, 0)
    // Upper leg L/R
    mesh(new THREE.CapsuleGeometry(0.125, 0.58, 8, 16), skinMat, -0.19, 0.33, 0, 0, 0, 0.05)
    mesh(new THREE.CapsuleGeometry(0.125, 0.58, 8, 16), skinMat,  0.19, 0.33, 0, 0, 0, -0.05)
    // Knee L/R
    mesh(new THREE.SphereGeometry(0.11, 12, 12), skinMat, -0.20, -0.12, 0.06)
    mesh(new THREE.SphereGeometry(0.11, 12, 12), skinMat,  0.20, -0.12, 0.06)
    // Lower leg L/R
    mesh(new THREE.CapsuleGeometry(0.095, 0.56, 8, 16), skinMat, -0.20, -0.56, 0)
    mesh(new THREE.CapsuleGeometry(0.095, 0.56, 8, 16), skinMat,  0.20, -0.56, 0)
    // Ankle/Foot L/R
    mesh(new THREE.CapsuleGeometry(0.085, 0.22, 8, 16), skinMat, -0.20, -0.96, 0.10, Math.PI/2, 0, 0)
    mesh(new THREE.CapsuleGeometry(0.085, 0.22, 8, 16), skinMat,  0.20, -0.96, 0.10, Math.PI/2, 0, 0)

    // ── INTERNAL ANATOMY (blue) ──────────────────────────────────
    // Skull interior
    mesh(new THREE.SphereGeometry(0.185, 24, 24), anatomyMat, 0, 2.78, 0)

    // Spine vertebrae
    for (let i = 0; i < 18; i++) {
      const y = 2.32 - i * 0.096
      const scale = 1 - i * 0.015
      const v = new THREE.Mesh(
        new THREE.CylinderGeometry(0.038 * scale, 0.044 * scale, 0.055, 8),
        boneMat
      )
      v.position.set(0, y, -0.05)
      group.add(v)
      // Spinous process
      const sp = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.03, 0.06), boneMat)
      sp.position.set(0, y, -0.085)
      group.add(sp)
    }

    // Rib cage
    const ribRadii = [0.235, 0.245, 0.250, 0.248, 0.240, 0.225, 0.205]
    const ribYStart = 2.15
    ribRadii.forEach((r, i) => {
      const y = ribYStart - i * 0.092
      const tubeMat = boneMat
      // Full rib ring (torus)
      const rib = new THREE.Mesh(
        new THREE.TorusGeometry(r, 0.014, 8, 32),
        tubeMat
      )
      rib.position.set(0, y, 0)
      rib.rotation.x = Math.PI / 2
      group.add(rib)
    })

    // Sternum
    mesh(new THREE.CapsuleGeometry(0.028, 0.42, 6, 12), boneMat, 0, 1.88, 0.22)

    // Clavicles L/R
    mesh(new THREE.CapsuleGeometry(0.022, 0.32, 6, 12), boneMat, -0.22, 2.22, 0.10, 0, 0, Math.PI/7)
    mesh(new THREE.CapsuleGeometry(0.022, 0.32, 6, 12), boneMat,  0.22, 2.22, 0.10, 0, 0, -Math.PI/7)

    // Pelvis bone
    const pelvisGeo = new THREE.TorusGeometry(0.22, 0.030, 10, 28)
    const pelvis = new THREE.Mesh(pelvisGeo, boneMat)
    pelvis.position.set(0, 0.86, 0)
    pelvis.rotation.x = Math.PI / 2.4
    group.add(pelvis)

    // Femur L/R (thigh bone)
    mesh(new THREE.CapsuleGeometry(0.048, 0.52, 8, 16), boneMat, -0.18, 0.33, 0, 0, 0, 0.05)
    mesh(new THREE.CapsuleGeometry(0.048, 0.52, 8, 16), boneMat,  0.18, 0.33, 0, 0, 0, -0.05)
    // Tibia L/R
    mesh(new THREE.CapsuleGeometry(0.034, 0.50, 8, 16), boneMat, -0.20, -0.56, 0)
    mesh(new THREE.CapsuleGeometry(0.034, 0.50, 8, 16), boneMat,  0.20, -0.56, 0)
    // Humerus L/R
    mesh(new THREE.CapsuleGeometry(0.032, 0.38, 8, 16), boneMat, -0.52, 1.78, 0, 0, 0, 0.22)
    mesh(new THREE.CapsuleGeometry(0.032, 0.38, 8, 16), boneMat,  0.52, 1.78, 0, 0, 0, -0.22)
    // Radius/Ulna L/R
    mesh(new THREE.CapsuleGeometry(0.024, 0.36, 8, 16), boneMat, -0.72, 1.16, 0, 0, 0, 0.18)
    mesh(new THREE.CapsuleGeometry(0.024, 0.36, 8, 16), boneMat,  0.72, 1.16, 0, 0, 0, -0.18)

    // ── ORGANS ──────────────────────────────────────────────────
    // Heart
    mesh(new THREE.SphereGeometry(0.088, 16, 16), organMat, -0.06, 1.92, 0.10)
    // Lungs L/R
    mesh(new THREE.CapsuleGeometry(0.095, 0.28, 8, 16), organMat, -0.18, 1.88, 0.04)
    mesh(new THREE.CapsuleGeometry(0.082, 0.24, 8, 16), organMat,  0.18, 1.88, 0.04)
    // Liver
    mesh(new THREE.SphereGeometry(0.12, 14, 14), organMat, 0.10, 1.42, 0.06)
    // Stomach
    mesh(new THREE.SphereGeometry(0.085, 12, 12), organMat, -0.10, 1.38, 0.08)
    // Intestines (coiled approximation)
    mesh(new THREE.TorusGeometry(0.12, 0.040, 8, 20), organMat, 0, 1.08, 0.05, Math.PI/2, 0, 0)
    mesh(new THREE.TorusGeometry(0.085, 0.030, 8, 20), organMat, 0, 0.94, 0.05, Math.PI/2, 0, 0)
    // Kidneys L/R
    mesh(new THREE.SphereGeometry(0.058, 10, 10), organMat, -0.18, 1.52, -0.04)
    mesh(new THREE.SphereGeometry(0.058, 10, 10), organMat,  0.18, 1.52, -0.04)
    // Bladder
    mesh(new THREE.SphereGeometry(0.06, 10, 10), organMat, 0, 0.78, 0.06)

    scene.add(group)
    group.position.y = -1.0

    // ── LIGHTS ──────────────────────────────────────────────────
    // Ambient
    scene.add(new THREE.AmbientLight(0xc8e0ff, 1.8))

    // Main key light (top-front)
    const keyLight = new THREE.DirectionalLight(0xffffff, 3.5)
    keyLight.position.set(1.5, 5, 4)
    keyLight.castShadow = true
    keyLight.shadow.mapSize.set(2048, 2048)
    scene.add(keyLight)

    // Blue fill light (anatomy glow)
    const fillLight = new THREE.DirectionalLight(0x44aaff, 2.0)
    fillLight.position.set(-2, 2, 1)
    scene.add(fillLight)

    // Rim light
    const rimLight = new THREE.DirectionalLight(0x88ccff, 1.5)
    rimLight.position.set(0, 3, -3)
    scene.add(rimLight)

    // Point light for glow inside body
    const innerGlow = new THREE.PointLight(0x0066cc, 2.5, 5)
    innerGlow.position.set(0, 1.5, 0)
    scene.add(innerGlow)

    // ── GROUND SHADOW PLANE ───────────────────────────────────
    const ground = new THREE.Mesh(
      new THREE.CircleGeometry(1.2, 64),
      new THREE.MeshBasicMaterial({ color: 0xc0d8f0, transparent: true, opacity: 0.25 })
    )
    ground.rotation.x = -Math.PI / 2
    ground.position.y = -1.0
    scene.add(ground)

    // Grid rings on ground
    for (let r = 0.35; r <= 1.4; r += 0.35) {
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(r, r + 0.006, 64),
        new THREE.MeshBasicMaterial({ color: 0x88bbdd, transparent: true, opacity: 0.25, side: THREE.DoubleSide })
      )
      ring.rotation.x = -Math.PI / 2
      ring.position.y = -0.995
      scene.add(ring)
    }

    // Animate inner glow pulsing
    let t = 0
    let animId: number

    function animate() {
      animId = requestAnimationFrame(animate)
      t += 0.016
      innerGlow.intensity = 2.0 + Math.sin(t * 1.8) * 0.5
      controls.update()
      renderer.render(scene, camera)
    }
    animate()

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
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={containerRef} className="w-full h-full" />
}
