import { EducationItem } from '@/types'

export const education: EducationItem[] = [
  {
    id: 'bs-computer-science',
    degree: 'BS Software Engineerring',
    institution: 'Virtual University of Pakistan',
    duration: '2022 — 2026',
    location: 'Pakistan, Lahore',
    description: 'Focused on software engineering, web technologies, and database systems.',
    highlights: [
      'Data Structures & Algorithms',
      'Web Development (MERN Stack)',
      'Database Systems',
      'Software Engineering',
      'Object-Oriented Programming',
    ],
    current: true,
  },
  {
    id: 'intermediate',
    degree: 'Intermediate (Pre-Engineering)',
    institution: 'Fazaia Degree College, Rafiqui',
    duration: '2019 — 2021',
    // location: 'City, Country',
    description: 'Built a strong foundation in mathematics and physics.',
    highlights: ['Mathematics', 'Physics', 'Chemistry'],
  },
]