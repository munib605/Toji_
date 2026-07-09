import { SkillItem } from '@/types'

export const skills: SkillItem[] = [
  // Frontend
  // { name: 'HTML5', icon: 'SiHtml5', category: 'frontend' },
  // { name: 'CSS3', icon: 'SiCss3', category: 'frontend' },
  // { name: 'JavaScript', icon: 'SiJavascript', category: 'frontend' },
  { name: 'TypeScript', icon: 'SiTypescript', category: 'frontend' },
  { name: 'React', icon: 'SiReact', category: 'frontend' },
  // { name: 'Next.js', icon: 'SiNextdotjs', category: 'frontend' },
  { name: 'Tailwind CSS', icon: 'SiTailwindcss', category: 'frontend' },
  // { name: 'Bootstrap', icon: 'SiBootstrap', category: 'frontend' },
  // { name: 'Redux', icon: 'SiRedux', category: 'frontend' },
  { name: 'Framer Motion', icon: 'SiFramer', category: 'frontend' },

  // Backend
  { name: 'Node.js', icon: 'SiNodedotjs', category: 'backend' },
  { name: 'Express.js', icon: 'SiExpress', category: 'backend' },
  { name: 'REST APIs', icon: 'TbApi', category: 'backend' },
  // { name: 'JWT Auth', icon: 'SiJsonwebtokens', category: 'backend' },

  // Database
  { name: 'MongoDB', icon: 'SiMongodb', category: 'database' },
  // { name: 'Firebase', icon: 'SiFirebase', category: 'database' },
  // { name: 'Supabase', icon: 'SiSupabase', category: 'database' },

  // Tools
  // { name: 'Git', icon: 'SiGit', category: 'tools' },
  { name: 'GitHub', icon: 'SiGithub', category: 'tools' },
  { name: 'VS Code', icon: 'SiVisualstudiocode', category: 'tools' },
  // { name: 'Postman', icon: 'SiPostman', category: 'tools' },
  { name: 'Figma', icon: 'SiFigma', category: 'tools' },
  // { name: 'npm', icon: 'SiNpm', category: 'tools' },
  // { name: 'Vite', icon: 'SiVite', category: 'tools' },

  // Other
  { name: 'Responsive Design', icon: 'TbDeviceMobile', category: 'other' },
  { name: 'UI/UX', icon: 'TbLayoutGrid', category: 'other' },
  // { name: 'API Integration', icon: 'TbPlugConnected', category: 'other' },
  // { name: 'Authentication', icon: 'TbShieldLock', category: 'other' },
  // { name: 'Deployment', icon: 'TbCloudUpload', category: 'other' },
]

export const skillCategories = [
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'database', label: 'Database' },
  { id: 'tools', label: 'Tools' },
  { id: 'other', label: 'Other' },
] as const
