import { useScrollProgress } from '@/hooks/useScrollProgress'

export function ScrollProgress() {
  const progress = useScrollProgress()

  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-[3px] bg-transparent">
      <div
        className="h-full bg-gradient-primary transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
