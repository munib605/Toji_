type ClassValue = string | number | boolean | undefined | null

export default function clsx(...values: ClassValue[]): string {
  return values.filter(Boolean).join(' ')
}
