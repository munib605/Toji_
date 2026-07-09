import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { TbMail, TbBrandLinkedin, TbBrandGithub, TbBrandInstagram, TbSend, TbCircleCheck } from 'react-icons/tb'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { slideInLeft, slideInRight, viewportOnce } from '@/animations/variants'
import { ContactFormData } from '@/types'
import { sendContactMessage } from '@/services/contactService'

const contactLinks = [
  { icon: TbMail, label: 'Email', value: 'taimoorsaggo@gmail.com', href: 'mailto:taimoorsaggo@gmail.com' },
  { icon: TbBrandLinkedin, label: 'LinkedIn', value: 'taimooraslamsaggo', href: 'https://www.linkedin.com/in/taimoorsaggo/' },
  { icon: TbBrandGithub, label: 'GitHub', value: 'Ragner6', href: 'https://github.com/Ragner6/My-Portfolio' },
  { icon: TbBrandInstagram, label: 'Instagram', value: 'taimoor', href: 'https://instagram.com' },
]

export function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle')
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>()

  const onSubmit = async (data: ContactFormData) => {
    setStatus('sending')
    try {
      await sendContactMessage(data)
      setStatus('success')
      toast.success("Message sent — I'll get back to you soon!")
      reset()
      setTimeout(() => setStatus('idle'), 2500)
    } catch {
      setStatus('idle')
      toast.error("Couldn't send your message. Try emailing me directly.")
    }
  }

  return (
    <section id="contact" className="container-section py-28">
      <SectionHeading
        eyebrow="Contact"
        title="Let's build something together"
        description="Have a project in mind, or just want to say hi? My inbox is always open."
      />

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={slideInLeft}
          className="lg:col-span-2"
        >
          <p className="text-sm leading-relaxed text-gray-400">
            I typically reply within 24 hours. If I&apos;m unavailable on WhatsApp, email is the
            fastest way to reach me — every message here goes straight to my inbox.
          </p>

          <div className="mt-8 space-y-4">
            {contactLinks.map(({ icon: LinkIcon, label, value, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-all duration-300 hover:border-accent-violet/40 hover:bg-white/[0.06]"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gradient-primary transition-transform duration-300 group-hover:scale-110">
                  <LinkIcon size={19} className="text-white" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-500">{label}</p>
                  <p className="text-sm font-medium text-white">{value}</p>
                </div>
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={slideInRight}
          className="lg:col-span-3"
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-card p-8 backdrop-blur-md"
          >
            <AnimatePresence>
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-bg-secondary/95 backdrop-blur-sm"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                  >
                    <TbCircleCheck size={52} className="text-accent-cyan" />
                  </motion.div>
                  <p className="text-sm font-medium text-white">Message sent successfully!</p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs uppercase tracking-widest text-gray-500">Name</label>
                <input
                  {...register('name', { required: 'Please enter your name' })}
                  placeholder="Enter Your Name"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:border-accent-violet/50"
                />
                {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>}
              </div>

              <div>
                <label className="mb-2 block text-xs uppercase tracking-widest text-gray-500">Email</label>
                <input
                  type="email"
                  {...register('email', {
                    required: 'Please enter your email',
                    pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' },
                  })}
                  placeholder="Enter your email"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:border-accent-violet/50"
                />
                {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
              </div>
            </div>

            <div className="mt-5">
              <label className="mb-2 block text-xs uppercase tracking-widest text-gray-500">Subject</label>
              <input
                {...register('subject', { required: 'Please add a subject' })}
                placeholder="Project inquiry"
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:border-accent-violet/50"
              />
              {errors.subject && <p className="mt-1 text-xs text-red-400">{errors.subject.message}</p>}
            </div>

            <div className="mt-5">
              <label className="mb-2 block text-xs uppercase tracking-widest text-gray-500">Message</label>
              <textarea
                {...register('message', {
                  required: 'Please write a message',
                  minLength: { value: 10, message: 'Message is too short' },
                })}
                rows={5}
                placeholder="Tell me about your project..."
                className="w-full resize-none rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:border-accent-violet/50"
              />
              {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message.message}</p>}
            </div>

            <div className="mt-7">
              <MagneticButton type="submit" variant="primary" className="w-full !justify-center" disabled={status === 'sending'}>
                <TbSend size={16} /> {status === 'sending' ? 'Sending...' : 'Send Message'}
              </MagneticButton>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
