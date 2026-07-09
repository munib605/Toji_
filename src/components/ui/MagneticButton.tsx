import { ReactNode, useRef, useState, MouseEvent } from 'react'
import { motion } from 'framer-motion'
import clsx from '@/utils/clsx'

interface MagneticButtonProps {
  children: ReactNode
  onClick?: () => void
  href?: string
  variant?: 'primary' | 'outline'
  className?: string
  type?: 'button' | 'submit'
  disabled?: boolean
}

/**
 * A button that subtly follows the cursor within its bounds ("magnetic" hover),
 * used for the hero and CTA actions.
 */
export function MagneticButton({
  children,
  onClick,
  href,
  variant = 'primary',
  className,
  type = 'button',
  disabled,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const relX = e.clientX - rect.left - rect.width / 2
    const relY = e.clientY - rect.top - rect.height / 2
    setOffset({ x: relX * 0.25, y: relY * 0.4 })
  }

  const reset = () => setOffset({ x: 0, y: 0 })

  const classes = clsx(variant === 'primary' ? 'btn-gradient' : 'btn-outline', className)

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 12, mass: 0.4 }}
      className="inline-block"
    >
      {href ? (
        <a href={href} className={classes} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
          {children}
        </a>
      ) : (
        <button type={type} onClick={onClick} disabled={disabled} className={classes}>
          {children}
        </button>
      )}
    </motion.div>
  )

  return content
}
