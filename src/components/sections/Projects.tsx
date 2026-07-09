import { motion } from 'framer-motion'
import { TbExternalLink, TbBrandGithub } from 'react-icons/tb'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { GlowCard } from '@/components/ui/GlowCard'
import { projects } from '@/data/projects'
import { fadeUp, staggerContainer, viewportOnce } from '@/animations/variants'

export function Projects() {
  return (
    <section id="projects" className="container-section py-28">
      <SectionHeading
        eyebrow="Projects"
        title="Selected work"
        description="A mix of production-style builds spanning e-commerce, health tech, and AI-powered tools."
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer}
        className="grid grid-cols-1 gap-8 md:grid-cols-2"
      >
        {projects.map((project, i) => (
          <motion.div key={project.id} custom={i} variants={fadeUp}>
            <GlowCard className="flex h-full flex-col overflow-hidden">
              <div className="relative aspect-[21/4] overflow-hidden bg-gradient-to-br from-accent-indigo/30 via-accent-violet/20 to-accent-cyan/20">
                <div className="absolute inset-0 flex items-center justify-center font-display text-2xl font-semibold text-white/40">
                  {project.title}
                </div>
                {project.featured && (
                  <span className="absolute right-4 top-4 rounded-full bg-gradient-primary px-3 py-1 text-xs font-medium text-white shadow-glow">
                    Featured
                  </span>
                )}
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-400">{project.description}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
                  {project.features.map((f) => (
                    <li key={f} className="flex items-center gap-1.5">
                      <span className="h-1 w-1 rounded-full bg-accent-cyan" />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex gap-3">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-gradient-primary px-4 py-2 text-xs font-medium text-white transition-transform duration-300 hover:scale-105"
                  >
                    <TbExternalLink size={14} /> Live Demo
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium text-white transition-all duration-300 hover:border-white/30 hover:bg-white/10"
                  >
                    <TbBrandGithub size={14} /> GitHub
                  </a>
                </div>
              </div>
            </GlowCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
