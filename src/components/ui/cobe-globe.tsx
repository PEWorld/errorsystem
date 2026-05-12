"use client"

import { useEffect, useRef, useCallback } from "react"
import createGlobe from "cobe"

const markers: { location: [number, number]; size: number }[] = []

interface GlobeProps {
  className?: string
  speed?: number
}

export function Globe({ className = "", speed = 0.003 }: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointerInteracting = useRef<{ x: number; y: number } | null>(null)
  const dragOffset = useRef({ phi: 0, theta: 0 })
  const phiOffsetRef = useRef(0)
  const thetaOffsetRef = useRef(0)
  const isPausedRef = useRef(false)

  const handlePointerUp = useCallback(() => {
    if (pointerInteracting.current !== null) {
      phiOffsetRef.current += dragOffset.current.phi
      thetaOffsetRef.current += dragOffset.current.theta
      dragOffset.current = { phi: 0, theta: 0 }
    }
    pointerInteracting.current = null
    if (canvasRef.current) canvasRef.current.style.cursor = "grab"
    isPausedRef.current = false
  }, [])

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!pointerInteracting.current) return
      dragOffset.current = {
        phi: (e.clientX - pointerInteracting.current.x) / 300,
        theta: (e.clientY - pointerInteracting.current.y) / 1000,
      }
    }
    window.addEventListener("pointermove", onMove, { passive: true })
    window.addEventListener("pointerup", handlePointerUp, { passive: true })
    return () => {
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerup", handlePointerUp)
    }
  }, [handlePointerUp])

  useEffect(() => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    let globe: ReturnType<typeof createGlobe> | null = null
    let animId: number
    let phi = 0

    function init() {
      const width = canvas.offsetWidth
      if (width === 0 || globe) return

      globe = createGlobe(canvas, {
        devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
        width,
        height: width,
        phi: 0,
        theta: 0.25,
        dark: 0,
        diffuse: 1.4,
        mapSamples: 16000,
        mapBrightness: 10,
        baseColor: [0.965, 0.953, 0.937],  // ~#f6f4ef (matches bg)
        markerColor: [0.08, 0.08, 0.08],    // near-black dots
        glowColor: [0.965, 0.953, 0.937],
        markers,
      })

      const animate = () => {
        if (!isPausedRef.current) phi += speed
        globe!.update({
          phi: phi + phiOffsetRef.current + dragOffset.current.phi,
          theta: 0.25 + thetaOffsetRef.current + dragOffset.current.theta,
        })
        animId = requestAnimationFrame(animate)
      }
      animate()
      setTimeout(() => { if (canvas) canvas.style.opacity = "1" })
    }

    if (canvas.offsetWidth > 0) {
      init()
    } else {
      const ro = new ResizeObserver(entries => {
        if (entries[0]?.contentRect.width > 0) { ro.disconnect(); init() }
      })
      ro.observe(canvas)
      return () => ro.disconnect()
    }

    return () => {
      cancelAnimationFrame(animId)
      globe?.destroy()
    }
  }, [speed])

  return (
    <div className={`relative aspect-square select-none ${className}`}>
      <canvas
        ref={canvasRef}
        onPointerDown={e => {
          pointerInteracting.current = { x: e.clientX, y: e.clientY }
          if (canvasRef.current) canvasRef.current.style.cursor = "grabbing"
          isPausedRef.current = true
        }}
        style={{
          width: "100%",
          height: "100%",
          cursor: "grab",
          opacity: 0,
          transition: "opacity 1.2s ease",
          touchAction: "none",
        }}
      />
    </div>
  )
}
