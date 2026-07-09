import { Project } from '@/types'

export const projects: Project[] = [
  {
    id: 'ecommerce-platform',
    title: 'E-Commerce Platform',
    description:
      'A modern full-stack e-commerce platform featuring product browsing, shopping cart, secure authentication, wishlist, order management, payment integration, and an intuitive, responsive user experience.',
    image: '/projects/ecommerce.jpg',
    technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Tailwind CSS'],
    features: ['Product Catalog', 'Cart & Wishlist', 'Secure Auth', 'Order Management', 'Payment Integration'],
    liveUrl: '#',
    githubUrl: '#',
    featured: true,
  },
  {
    id: 'fitness-tracker',
    title: 'Fitness Tracking App',
    description:
      'A comprehensive fitness application providing workout plans, nutrition tracking, calorie management, AI-powered food scanning, barcode/camera scanning, and detailed progress analytics.',
    image: '/projects/fitness.jpg',
    technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'TensorFlow', 'Tailwind CSS'],
    features: ['Workout Plans', 'AI Food Scanning', 'Macro Tracking', 'Progress Analytics', 'Barcode Scanner'],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 'nutrition-platform',
    title: 'Nutrition & Dietitian Platform',
    description:
      'A complete nutrition consultation platform where clients submit health concerns, receive personalized diet plans, schedule consultations, and monitor progress through interactive dashboards.',
    image: '/projects/nutrition.jpg',
    technologies: ['React', 'TypeScript', 'Express.js', 'MongoDB'],
    features: ['Client Dashboard', 'Appointment Booking', 'Progress Charts', 'Secure Messaging', 'Admin Panel'],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 'ai-content-generator',
    title: 'AI Content Generator',
    description:
      'AI-powered platform for generating marketing content, blog articles, product descriptions, social captions, emails, and SEO-friendly copy using advanced language models.',
    image: '/projects/ai-content.jpg',
    technologies: ['Next.js', 'OpenAI API', 'Tailwind CSS', 'Supabase'],
    features: ['AI Copywriting', 'SEO Content', 'Template Library', 'Export & Share', 'Usage Analytics'],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 'blogging-platform',
    title: 'Blogging Platform',
    description:
      'A modern blogging platform where users can create, edit, publish, search, categorize, and comment on posts, complete with authentication, profiles, and an admin dashboard.',
    image: '/projects/blog.jpg',
    technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'JWT'],
    features: ['Rich Text Editor', 'Categories & Tags', 'Comments', 'User Profiles', 'Admin Dashboard'],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 'developer-portfolio',
    title: 'Developer Portfolio Website',
    description:
      'A modern full-stack developer portfolio featuring live content management, project showcase, skills, pricing, client reviews, and a secure contact system, all powered by a custom REST API and database.',
    image: '/projects/portfolio.jpg',
    technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'Framer Motion'],
    features: ['Live Content via API', 'Client Reviews', 'Contact Form', 'Responsive Design', 'Smooth Animations'],
    liveUrl: '#',
    githubUrl: '#',
  },
]
