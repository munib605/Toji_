import { useEffect, useRef } from 'react'
import type { PointerEvent } from 'react'

/**
 * Circular developer portrait with continuous auto-rotation on the Y axis.
 * Dragging (or moving the pointer across) the orb adds angular velocity that
 * decays with friction, giving the rotation natural inertia.
 */
export function DeveloperOrb() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const rotationRef = useRef(0)
  const velocityRef = useRef(0.25) // base auto-rotation speed (deg/frame)
  const lastPointerX = useRef<number | null>(null)

  useEffect(() => {
    let frame: number
    const FRICTION = 0.96
    const BASE_SPEED = 0.15

    const animate = () => {
      // Blend user-imparted velocity back toward the base auto-rotate speed
      velocityRef.current = velocityRef.current * FRICTION + BASE_SPEED * (1 - FRICTION)
      rotationRef.current += velocityRef.current

      if (wrapperRef.current) {
        wrapperRef.current.style.transform = `rotateY(${rotationRef.current}deg)`
      }
      frame = requestAnimationFrame(animate)
    }

    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [])

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (lastPointerX.current !== null) {
      const delta = e.clientX - lastPointerX.current
      velocityRef.current += delta * 0.6
    }
    lastPointerX.current = e.clientX
  }

  const handlePointerLeave = () => {
    lastPointerX.current = null
  }

  return (
    
    <div className="relative mx-auto flex h-[220px] w-[220px] items-center justify-center sm:h-[280px] sm:w-[280px] lg:h-[360px] lg:w-[360px]">
      {/* Animated gradient ring */}
      <div className="absolute inset-0 animate-spin-slow rounded-full bg-gradient-primary bg-[length:200%_200%] opacity-70 blur-[2px]" />
      <div className="absolute inset-[6px] rounded-full bg-bg" />

      {/* Soft glow */}
      <div className="absolute inset-0 rounded-full bg-accent-violet/30 blur-3xl" />

      <div
        className="absolute inset-3 animate-float rounded-full [perspective:900px]"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <div
          ref={wrapperRef}
          className="relative h-full w-full rounded-full [transform-style:preserve-3d] will-change-transform"
        >
          {/* Fallback avatar shown behind the image; visible if the image 404s */}
          <div className="absolute inset-0 flex items-center justify-center rounded-full bg-gradient-primary text-6xl font-display font-bold text-white/90">
            AR
          </div>
          <img
            src="/image/developer-portrait.jpg"
            alt="Portrait of the developer"
            className="relative h-full w-full rounded-full border border-white/10 object-cover shadow-glow-violet"
            draggable={false}
            onError={(e) => {
              e.currentTarget.style.visibility = 'hidden'
            }}
          />
        </div>
      </div>
    </div>
  )
}
