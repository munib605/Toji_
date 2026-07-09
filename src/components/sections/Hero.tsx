import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  TbBrandGithub,
  TbBrandLinkedin,
  TbMail,
  TbArrowDown,
} from "react-icons/tb";
import { HeroScene } from "@/components/three/HeroScene";
import { DeveloperOrb } from "@/components/sections/DeveloperOrb";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { scrollToSection } from "@/utils/scrollTo";
import { fadeUp, staggerContainer } from "@/animations/variants";

const roles = [
  "MERN Stack Developer",
  "React Developer",
  "Node.js Developer",
  "Digital Crafts",
];

const socials = [
  {
    icon: TbBrandLinkedin,
    href: "https://www.linkedin.com/in/taimoorsaggo/",
    label: "LinkedIn",
  },
  { icon: TbBrandGithub, href: "https://github.com/Taimoor-saggo/My_portfolio", label: "GitHub" },
  { icon: TbMail, href: "mailto:taimooraslamsaggo", label: "Email" },
];

function useTypewriter(words: string[], typingSpeed = 70, pause = 1600) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index % words.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && text.length < current.length) {
      timeout = setTimeout(
        () => setText(current.slice(0, text.length + 1)),
        typingSpeed,
      );
    } else if (!deleting && text.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text.length > 0) {
      timeout = setTimeout(
        () => setText(current.slice(0, text.length - 1)),
        typingSpeed / 2,
      );
    } else if (deleting && text.length === 0) {
      setDeleting(false);
      setIndex((i) => i + 1);
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, index, words, typingSpeed, pause]);

  return text;
}

export function Hero() {
  const typedRole = useTypewriter(roles);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-24"
    >
      <HeroScene />
      <div className="pointer-events-none absolute inset-0 bg-noise" />

      <div className="container-section relative z-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="order-2 text-center lg:order-1 lg:text-left"
        >
          <motion.span
            variants={fadeUp}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-accent-cyan"
          >
            Available for new projects
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="text-3xl font-bold leading-[1.1] sm:text-3xl lg:text-5xl"
          >
            Hi, I&apos;m Toji Fushiguro —<br />
            <span className="text-gradient">{typedRole}</span>
            <span className="animate-blink text-accent-cyan">|</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-xl text-m text-gray-400 lg:mx-0"
          >
            I build modern digital experiences fast, accessible interfaces
            backed by clean, scalable APIs. Focused on shipping products that
            feel as good as they look.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start"
          >
            <MagneticButton
              onClick={() => scrollToSection("#projects")}
              variant="primary"
            >
              View Projects
            </MagneticButton>
            <MagneticButton href="/resume.pdf" variant="outline">
              Download Resume
            </MagneticButton>
            <MagneticButton
              onClick={() => scrollToSection("#contact")}
              variant="outline"
            >
              Contact Me
            </MagneticButton>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex items-center justify-center gap-4 lg:justify-start"
          >
            {socials.map(({ icon: SocialIcon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-accent-cyan/50 hover:text-white hover:shadow-glow-cyan"
              >
                <SocialIcon size={19} />
              </a>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
  className="order-1 mb-8 flex justify-center lg:order-2 lg:mb-0"
  initial={{ opacity: 0, scale: 0.85 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{
    duration: 0.9,
    ease: [0.22, 1, 0.36, 1],
    delay: 0.2,
  }}
>
  <DeveloperOrb />
</motion.div>
      </div>

      <motion.button
        onClick={() => scrollToSection("#about")}
        aria-label="Scroll to About section"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-gray-500 sm:flex"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <TbArrowDown size={18} />
      </motion.button>
    </section>
  );
}
