import { ExperienceItem, StatItem, DashboardStat } from '@/types'

export const experience: ExperienceItem[] = [
  {
    role: 'Junior Full Stack Developer',
    duration: '1+ Year',
    type: 'Freelance / Contract',
    highlights: [
      'Built modern web applications end to end',
      'Implemented responsive, accessible UI',
      'Designed and consumed REST APIs',
      'Built authentication & authorization flows',
      'Designed relational and document database schemas',
      'Worked across the React ecosystem',
      'Wrote clean, maintainable architecture',
    ],
  },
]

export const stats: StatItem[] = [
  { label: 'Projects Completed', value: 12, suffix: '+' },
  { label: 'Technologies Learned', value: 20, suffix: '+' },
  { label: 'Client Satisfaction', value: 98, suffix: '%' },
  { label: 'Years of Experience', value: 1, suffix: '+' },
]

export const dashboardStats: DashboardStat[] = [
  { label: 'Total Projects', value: 12, suffix: '+', icon: 'TbFolders' },
  { label: 'Technologies Used', value: 20, suffix: '+', icon: 'TbStack2' },
  { label: 'GitHub Contributions', value: 640, suffix: '+', icon: 'TbBrandGithub' },
  { label: 'Visitors', value: 4200, suffix: '+', icon: 'TbUsers' },
  { label: 'Completed Projects', value: 12, suffix: '+', icon: 'TbCircleCheck' },
  { label: 'Happy Clients', value: 9, suffix: '+', icon: 'TbMoodSmile' },
]
