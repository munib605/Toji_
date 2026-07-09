import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { TbCode, TbMenu2, TbX } from 'react-icons/tb'
import { navItems } from '@/data/navigation'
import { useScrolled } from '@/hooks/useScrolled'
import { useActiveSection } from '@/hooks/useActiveSection'
import { scrollToSection } from '@/utils/scrollTo'
import { MagneticButton } from '@/components/ui/MagneticButton'
import clsx from '@/utils/clsx'

export function Navbar() {
  const scrolled = useScrolled(24)
  const activeId = useActiveSection(navItems.map((n) => n.href.replace('#', '')))
  const [open, setOpen] = useState(false)

  // const handleNavClick = (href: string) => {
  //   setOpen(false)
  //   scrollToSection(href)
  // }

  const handleNavClick = (href: string) => {
  if (open) {
    setOpen(false)
    setTimeout(() => scrollToSection(href), 300)
  } else {
    scrollToSection(href)
  }
}

  return (
    <header
      className={clsx(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled ? 'border-b border-white/10 bg-bg/70 backdrop-blur-xl' : 'bg-transparent',
      )}
    >
      <nav className="container-section flex h-20 items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault()
            handleNavClick('#home')
          }}
          className="group flex items-center gap-2 font-display text-lg font-semibold tracking-tight"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary shadow-glow transition-transform duration-300 group-hover:rotate-12">
            <TbCode className="h-5 w-5 text-white" />
          </span>
          Toji<span className="text-gradient">.dev</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const isActive = activeId === item.href.replace('#', '')
            return (
              <li key={item.href} className="relative">
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick(item.href)
                  }}
                  className={clsx(
                    'relative block px-4 py-2 text-sm font-medium transition-colors',
                    isActive ? 'text-white' : 'text-gray-400 hover:text-white',
                  )}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full bg-gradient-primary"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              </li>
            )
          })}
        </ul>

        <div className="hidden md:block">
          <MagneticButton href="#contact" variant="primary" className="!px-5 !py-2.5 !text-sm">
            Let&apos;s Talk
          </MagneticButton>
        </div>

        {/* Mobile toggle */}
        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <TbX size={20} /> : <TbMenu2 size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-white/10 bg-bg/95 backdrop-blur-xl md:hidden"
          >
            <ul className="container-section flex flex-col gap-1 py-4">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavClick(item.href)
                    }}
                    className={clsx(
                      'block rounded-lg px-4 py-3 text-sm font-medium transition-colors',
                      activeId === item.href.replace('#', '')
                        ? 'bg-white/10 text-white'
                        : 'text-gray-400 hover:bg-white/5 hover:text-white',
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
