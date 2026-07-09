import { motion } from 'framer-motion'
import { TbCode, TbBulb, TbRocket, TbBooks } from 'react-icons/tb'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { GlowCard } from '@/components/ui/GlowCard'
import { stats } from '@/data/experience'
import { fadeUp, staggerContainer, viewportOnce } from '@/animations/variants'
import { useCountUp } from '@/hooks/useCountUp'

const pillars = [
  {
    icon: TbCode,
    title: 'Clean, Scalable Code',
    text: 'I write maintainable, well-structured code across the stack, built to grow with the product.',
  },
  {
    icon: TbBulb,
    title: 'Problem-Solving Mindset',
    text: 'Every feature starts as a problem worth understanding deeply before a single line is written.',
  },
  {
    icon: TbBooks,
    title: 'Continuous Learning',
    text: 'The web moves fast — I stay close to it, picking up tools and patterns as they prove useful.',
  },
  {
    icon: TbRocket,
    title: 'End-to-End Ownership',
    text: 'From database schema to pixel-perfect UI, I care about the whole experience, not just my slice.',
  },
]

function StatCard({ label, value, suffix }: { label: string; value: number; suffix?: string }) {
  const { ref, value: animated } = useCountUp(value)

  return (
    <GlowCard className="p-6 text-center" glowColor="6,182,212">
      <div ref={ref} className="font-display text-4xl font-bold text-gradient sm:text-5xl">
        {animated}
        {suffix}
      </div>
      <p className="mt-2 text-sm text-gray-400">{label}</p>
    </GlowCard>
  )
}

export function About() {
  return (
    <section id="about" className="container-section py-28">
      <SectionHeading
        eyebrow="About Me"
        title="The developer behind the code"
        description="A little about who I am, how I work, and what drives me."
      />

      <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
        >
          <motion.p variants={fadeUp} className="text-base leading-relaxed text-gray-300 sm:text-lg">
            I&apos;m a Junior MERN Stack Developer with a passion for building products that feel
            effortless to use. My work spans the full stack  from crafting responsive, accessible
            interfaces in React and TypeScript, to designing REST APIs and database schemas that
            hold up under real usage.
          </motion.p>
          <motion.p variants={fadeUp} className="mt-4 text-base leading-relaxed text-gray-300 sm:text-lg">
            I approach every project with a problem-solving mindset: understanding the &quot;why&quot;
            before the &quot;how,&quot; and writing clean, scalable code that&apos;s built to last.
            Continuous improvement isn&apos;t a buzzword for me  it&apos;s how I stay sharp in a field
            that never stops moving.
          </motion.p>

          <motion.div variants={staggerContainer} className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                custom={i}
                variants={fadeUp}
                className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4"
              >
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-primary">
                  <pillar.icon size={18} className="text-white" />
                </span>
                <div>
                  <h4 className="text-sm font-semibold text-white">{pillar.title}</h4>
                  <p className="mt-1 text-xs text-gray-400">{pillar.text}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="grid grid-cols-2 gap-5"
        >
          {stats.map((stat, i) => (
            <motion.div key={stat.label} custom={i} variants={fadeUp}>
              <StatCard {...stat} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
