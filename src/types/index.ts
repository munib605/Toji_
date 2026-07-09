export interface NavItem {
  label: string
  href: string
}

export interface SkillItem {
  name: string
  icon: string
  category: 'frontend' | 'backend' | 'database' | 'tools' | 'other'
}

export interface Project {
  id: string
  title: string
  description: string
  image: string
  technologies: string[]
  features: string[]
  liveUrl: string
  githubUrl: string
  featured?: boolean
}

// export interface PricingTier {
//   id: string
//   name: string
//   price: string
//   period?: string
//   description: string
//   features: string[]
//   highlighted?: boolean
// }
export interface EducationItem {
  id: string
  degree: string
  institution: string
  duration: string
  location?: string
  description: string
  highlights: string[]
  current?: boolean
}

export interface Review {
  id: string
  name: string
  country: string
  rating: number
  message: string
  avatar: string
}

export interface ExperienceItem {
  role: string
  duration: string
  type: string
  highlights: string[]
}

export interface StatItem {
  label: string
  value: number
  suffix?: string
}

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export interface DashboardStat {
  label: string
  value: number
  suffix?: string
  icon: string
}
