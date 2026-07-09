import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

/**
 * Animates a number from 0 to `target` once the referenced element scrolls into view.
 */
export function useCountUp(target: number, duration = 1600) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return

    let start: number | null = null
    let frame: number

    const step = (timestamp: number) => {
      if (start === null) start = timestamp
      const elapsed = timestamp - start
      const progress = Math.min(elapsed / duration, 1)
      // ease-out-cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.floor(eased * target))

      if (progress < 1) {
        frame = requestAnimationFrame(step)
      } else {
        setValue(target)
      }
    }

    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [inView, target, duration])

  return { ref, value }
}
