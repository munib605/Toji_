import { motion } from 'framer-motion'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { GlowCard } from '@/components/ui/GlowCard'
import { Icon } from '@/components/ui/Icon'
import { dashboardStats } from '@/data/experience'
import { fadeUp, staggerContainer, viewportOnce } from '@/animations/variants'
import { useCountUp } from '@/hooks/useCountUp'

function DashboardCard({ label, value, suffix, icon }: (typeof dashboardStats)[number]) {
  const { ref, value: animated } = useCountUp(value)

  return (
    <GlowCard className="p-6" glowColor="99,102,241">
      <div className="flex items-center justify-between">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-primary">
          <Icon name={icon} size={20} className="text-white" />
        </span>
      </div>
      <div ref={ref} className="mt-5 font-display text-3xl font-bold text-white">
        {animated.toLocaleString()}
        <span className="text-gradient">{suffix}</span>
      </div>
      <p className="mt-1 text-sm text-gray-400">{label}</p>
    </GlowCard>
  )
}

export function Dashboard() {
  return (
    <section id="dashboard" className="container-section py-28">
      <SectionHeading
        eyebrow="Analytics"
        title="A snapshot in numbers"
        description="A quick overview of the work behind this portfolio."
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer}
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {dashboardStats.map((stat, i) => (
          <motion.div key={stat.label} custom={i} variants={fadeUp}>
            <DashboardCard {...stat} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
