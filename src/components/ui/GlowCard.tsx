import { ReactNode, useRef, useState } from 'react'
import type { MouseEvent, CSSProperties } from 'react'
import { motion } from 'framer-motion'
import clsx from '@/utils/clsx'

interface GlowCardProps {
  children: ReactNode
  className?: string
  glowColor?: string
}

/**
 * A glassmorphic card that tracks the pointer to render a soft radial glow
 * beneath the cursor, and lifts slightly on hover.
 */
export function GlowCard({ children, className, glowColor = '139,92,246' }: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 50, y: 50 })

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    setPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={clsx(
        'group relative overflow-hidden rounded-2xl border border-white/10 bg-card backdrop-blur-md',
        className,
      )}
      style={
        {
          '--glow-x': `${pos.x}%`,
          '--glow-y': `${pos.y}%`,
        } as CSSProperties
      }
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(280px circle at var(--glow-x) var(--glow-y), rgba(${glowColor},0.15), transparent 70%)`,
        }}
      />
      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/5 group-hover:ring-white/10 transition-all" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}
