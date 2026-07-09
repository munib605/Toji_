import { useEffect, useState } from 'react'

export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement
      const max = scrollHeight - clientHeight
      setProgress(max > 0 ? (scrollTop / max) * 100 : 0)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return progress
}
