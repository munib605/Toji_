import { IconType } from 'react-icons'
import * as SiIcons from 'react-icons/si'
import * as TbIcons from 'react-icons/tb'

const registry: Record<string, IconType> = {
  ...SiIcons,
  ...TbIcons,
} as unknown as Record<string, IconType>

interface IconProps {
  name: string
  className?: string
  size?: number
}

export function Icon({ name, className, size = 22 }: IconProps) {
  const Component = registry[name]
  if (!Component) return null
  return <Component className={className} size={size} aria-hidden="true" />
}
