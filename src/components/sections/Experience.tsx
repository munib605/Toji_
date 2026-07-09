import { motion } from 'framer-motion'
import { TbCircleCheck } from 'react-icons/tb'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { experience } from '@/data/experience'
import { fadeUp, staggerContainer, viewportOnce } from '@/animations/variants'

export function Experience() {
  return (
    <section id="experience" className="container-section py-28">
      <SectionHeading eyebrow="Experience" title="Where I've grown" align="center" />

      <div className="mx-auto max-w-3xl">
        {experience.map((role) => (
          <motion.div
            key={role.role}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeUp}
            className="relative rounded-2xl border border-white/10 bg-card p-8 backdrop-blur-md"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-xl font-semibold text-white">{role.role}</h3>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-accent-cyan">
                {role.duration} · {role.type}
              </span>
            </div>

            <motion.ul
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={staggerContainer}
              className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2"
            >
              {role.highlights.map((h, i) => (
                <motion.li key={h} custom={i} variants={fadeUp} className="flex items-start gap-2 text-sm text-gray-300">
                  <TbCircleCheck className="mt-0.5 shrink-0 text-accent-violet" size={16} />
                  {h}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
