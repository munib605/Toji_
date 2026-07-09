import { motion } from 'framer-motion'
import { fadeUp, viewportOnce } from '@/animations/variants'
import clsx from '@/utils/clsx'

interface SectionHeadingProps {
  eyebrow: string
  title: string
  description?: string
  align?: 'left' | 'center'
}

export function SectionHeading({ eyebrow, title, description, align = 'center' }: SectionHeadingProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={fadeUp}
      className={clsx('mb-14 max-w-2xl', align === 'center' ? 'mx-auto text-center' : 'text-left')}
    >
      <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-accent-cyan">
        {eyebrow}
      </span>
      <h2 className="text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">{title}</h2>
      {description && <p className="mt-4 text-base text-gray-400 sm:text-lg">{description}</p>}
    </motion.div>
  )
}
