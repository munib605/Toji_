import { motion } from 'framer-motion'
import { TbCheck, TbSchool, TbMapPin } from 'react-icons/tb'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { education } from '@/data/education'
import { fadeUp, staggerContainer, viewportOnce } from '@/animations/variants'

export function Education() {
  return (
    <section id="education" className="container-section py-28">
      <SectionHeading
        eyebrow="Education"
        title="Academic background"
        description="The foundation that shaped my technical journey."
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer}
        className="mx-auto flex max-w-3xl flex-col gap-6"
      >
        {education.map((item, i) => (
          <motion.div
            key={item.id}
            custom={i}
            variants={fadeUp}
            whileHover={{ y: -4 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="relative flex flex-col rounded-2xl border border-white/10 bg-card p-7 backdrop-blur-md transition-shadow duration-300 hover:shadow-glow"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-primary text-white shadow-glow">
                  <TbSchool size={20} />
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-white">{item.degree}</h3>
                  <p className="text-sm text-gray-400">{item.institution}</p>
                </div>
              </div>

              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-accent-cyan">
                {item.duration}
              </span>
            </div>

            {item.location && (
              <div className="mt-3 flex items-center gap-1.5 text-xs text-gray-500">
                <TbMapPin size={14} />
                {item.location}
              </div>
            )}

            <p className="mt-4 text-sm text-gray-300">{item.description}</p>

            <ul className="mt-5 flex flex-wrap gap-2">
              {item.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300"
                >
                  <TbCheck className="shrink-0 text-accent-cyan" size={13} />
                  {highlight}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}