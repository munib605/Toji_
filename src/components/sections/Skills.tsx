import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Icon } from '@/components/ui/Icon'
import { skills, skillCategories } from '@/data/skills'
import { staggerContainer, scaleIn, viewportOnce } from '@/animations/variants'
import clsx from '@/utils/clsx'

type CategoryId = (typeof skillCategories)[number]['id'] | 'all'

export function Skills() {
  const [active, setActive] = useState<CategoryId>('all')

  const filtered = active === 'all' ? skills : skills.filter((s) => s.category === active)

  return (
    <section id="skills" className="container-section py-28">
      <SectionHeading
        eyebrow="Skills"
        title="Tools I build with"
        description="A snapshot of the technologies I use to design, build, and ship full-stack products."
      />

      {/* Filter tabs */}
      <div className="mb-12 flex flex-wrap items-center justify-center gap-2">
        {[{ id: 'all', label: 'All' }, ...skillCategories].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActive(cat.id as CategoryId)}
            className={clsx(
              'rounded-full border px-5 py-2 text-sm font-medium transition-all duration-300',
              active === cat.id
                ? 'border-transparent bg-gradient-primary text-white shadow-glow'
                : 'border-white/10 bg-white/5 text-gray-400 hover:border-white/20 hover:text-white',
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <motion.div
        key={active}
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        viewport={viewportOnce}
        className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((skill, i) => (
            <motion.div
              key={skill.name}
              custom={i}
              variants={scaleIn}
              layout
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="group relative flex flex-col items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.08] backdrop-blur-md p-8 text-center  transition-all duration-300 hover:border-accent-violet/40 hover:shadow-glow-violet animate-float-slow"
              style={{ animationDelay: `${(i % 6) * 0.3}s` }}
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-primary opacity-0 transition-opacity duration-300 group-hover:opacity-[0.08]" />
              <Icon
                name={skill.icon}
                size={30}
                className="relative text-gray-300 transition-colors duration-300 group-hover:text-accent-cyan"
              />
              <span className="relative text-xs font-medium text-gray-300 sm:text-sm">{skill.name}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
