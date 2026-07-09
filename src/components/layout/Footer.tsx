import { TbBrandGithub, TbBrandLinkedin, TbBrandInstagram, TbMail, TbCode, TbHeartFilled } from 'react-icons/tb'
import { navItems } from '@/data/navigation'
import { scrollToSection } from '@/utils/scrollTo'

const socials = [
  { icon: TbBrandGithub, href: 'https://github.com/Taimoor-saggo/My_portfolio', label: 'GitHub' },
  { icon: TbBrandLinkedin, href: 'https://www.linkedin.com/in/taimoorsaggo/', label: 'LinkedIn' },
  { icon: TbBrandInstagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: TbMail, href: 'mailto:taimoorsaggo@gmail.com', label: 'Email' },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-white/10 bg-bg-secondary/60">
      <div className="container-section py-14">
        <div className="flex flex-col items-center gap-10 md:flex-row md:items-start md:justify-between">
          <div className="text-center md:text-left">
            <a href="#home" className="inline-flex items-center gap-2 font-display text-lg font-semibold">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary">
                <TbCode className="h-5 w-5 text-white" />
              </span>
              Toji<span className="text-gradient">.dev</span>
            </a>
            <p className="mt-3 max-w-xs text-sm text-gray-400">
              MERN Stack Developer building modern, scalable digital experiences.
            </p>
          </div>

          <div className="text-center md:text-left">
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-widest text-gray-300">Quick Links</h4>
            <ul className="flex flex-col gap-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection(item.href)
                    }}
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-widest text-gray-300">Connect</h4>
            <div className="flex items-center justify-center gap-3 md:justify-start">
              {socials.map(({ icon: SocialIcon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 transition-all duration-300 hover:-translate-y-1 hover:border-accent-violet/50 hover:text-white hover:shadow-glow-violet"
                >
                  <SocialIcon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-gray-500 md:flex-row">
          <p>© {year} Toji Fushiguro. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Designed &amp; developed with <TbHeartFilled className="text-accent-violet" />
          </p>
        </div>
      </div>
    </footer>
  )
}
