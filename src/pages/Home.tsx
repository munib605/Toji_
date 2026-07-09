import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Skills } from '@/components/sections/Skills'
import { Projects } from '@/components/sections/Projects'
import { Education } from '@/components/sections/Education'
// import { Reviews } from '@/components/sections/Reviews'
import { Experience } from '@/components/sections/Experience'
import { Dashboard } from '@/components/sections/Dashboard'
import { Contact } from '@/components/sections/Contact'

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Education />
      {/* <Reviews /> */}
      <Experience />
      <Dashboard />
      <Contact />
    </>
  )
}
