'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { ArrowRight, Mail, Phone, MapPin, Download, FileText } from 'lucide-react';
import { GithubIcon as Github, LinkedinIcon as Linkedin } from '@/components/icons/BrandIcons';
import Navbar from '@/components/Navbar';
import Stats from '@/components/Stats';
import ProjectCard from '@/components/ProjectCard';
import TiltCard from '@/components/3d/TiltCard';
import { HeroSceneDynamic, SkillOrbCanvasDynamic } from '@/components/3d/DynamicImports';
import Timeline from '@/components/Timeline';
import DeepDive from '@/components/DeepDive';
import ContactForm from '@/components/ContactForm';
import ScrollProgress from '@/components/animations/ScrollProgress';
import AnimateIn, { StaggerContainer, StaggerItem } from '@/components/animations/AnimateIn';
import SectionHeading from '@/components/animations/SectionHeading';
import { personalInfo, projects, skillCategories } from '@/data/portfolioData';

// Scroll-reactive parallax line divider
function ParallaxDivider() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0.3, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.4, 1], [0, 1, 0.3]);
  return (
    <div ref={ref} className="relative h-px overflow-visible">
      <motion.div
        className="h-px bg-linear-to-r from-transparent via-emerald-500/60 to-transparent w-full origin-center"
        style={{ scaleX, opacity }}
      />
    </div>
  );
}

export default function Home() {
  // Hero scroll tracking — drives the 3D orb and hero parallax
  const heroRef  = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const smoothHeroProgress = useSpring(heroScrollProgress, { stiffness: 60, damping: 20 });

  // Hero text parallax
  const heroY   = useTransform(smoothHeroProgress, [0, 1], [0, 160]);
  const heroOpa = useTransform(smoothHeroProgress, [0, 0.65], [1, 0]);

  return (
    <>
      <ScrollProgress />
      <Navbar />

      <main className="flex-1 w-full bg-grid-pattern relative min-h-screen">
        {/* Glow Radial Accents */}
        <div className="absolute top-0 left-1/4 w-150 h-150 bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-[30%] right-10 w-125 h-125 bg-emerald-500/3 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 space-y-24 md:space-y-32 py-24 md:py-36">

          {/* ── 1. HERO SECTION ── */}
          <section
            ref={heroRef}
            id="hero"
            className="flex flex-col gap-6 items-start relative max-w-4xl pt-10"
            style={{ minHeight: '80vh' }}
          >
            {/* Full-viewport 3D scene */}
            <div className="fixed inset-0 -z-10 pointer-events-none">
              <HeroSceneDynamic scrollYProgress={smoothHeroProgress} />
            </div>

            {/* Parallax hero content */}
            <motion.div
              style={{ y: heroY, opacity: heroOpa }}
              className="relative z-10 flex flex-col gap-6 items-start"
            >
              {/* Availability badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, type: 'spring', stiffness: 120 }}
                className="flex items-center gap-2 bg-zinc-900/80 border border-zinc-800 px-3.5 py-1 rounded-full text-xs font-mono text-zinc-300"
              >
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse mr-1" />
                {personalInfo.availability}
              </motion.div>

              {/* Main heading — word-by-word reveal */}
              <div className="overflow-hidden">
                <motion.h1
                  className="text-4xl sm:text-6xl md:text-7xl font-heading font-bold tracking-tight text-white leading-[1.05]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.01 }}
                >
                  {["Hi,", "I'm"].map((word, i) => (
                    <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
                      <motion.span
                        className="inline-block"
                        initial={{ y: '110%' }}
                        animate={{ y: 0 }}
                        transition={{ type: 'spring', stiffness: 90, damping: 16, delay: 0.2 + i * 0.1 }}
                      >
                        {word}
                      </motion.span>
                    </span>
                  ))}
                  {" "}
                  <span className="inline-block overflow-hidden">
                    <motion.span
                      className="inline-block text-transparent bg-clip-text bg-linear-to-r from-white via-zinc-200 to-emerald-400"
                      initial={{ y: '110%' }}
                      animate={{ y: 0 }}
                      transition={{ type: 'spring', stiffness: 90, damping: 16, delay: 0.4 }}
                    >
                      {personalInfo.name}
                    </motion.span>
                  </span>
                </motion.h1>
              </div>

              <motion.h2
                className="text-xl sm:text-2xl font-heading text-zinc-400 font-semibold tracking-wide"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6, type: 'spring' }}
              >
                {personalInfo.subtitle}
              </motion.h2>

              <motion.p
                className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-2xl font-sans"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75, duration: 0.6, type: 'spring' }}
              >
                {personalInfo.valueProp}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-wrap gap-4 mt-6 w-full sm:w-auto"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.6, type: 'spring' }}
              >
                <Link
                  href="#projects"
                  className="btn-transition flex items-center justify-center gap-2 w-full sm:w-auto bg-white text-black hover:bg-emerald-500 hover:text-white px-6 py-3.5 rounded-full text-sm font-semibold uppercase tracking-wider cursor-pointer"
                >
                  View Projects
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href={personalInfo.resumePath}
                  download="Dikshant_Dak_Resume.pdf"
                  className="btn-transition flex items-center justify-center gap-2 w-full sm:w-auto bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 text-white px-6 py-3.5 rounded-full text-sm font-semibold uppercase tracking-wider cursor-pointer"
                >
                  Download Resume
                  <Download className="w-4 h-4" />
                </a>
                <Link
                  href="#contact"
                  className="btn-transition flex items-center justify-center gap-2 w-full sm:w-auto bg-transparent border border-transparent hover:border-zinc-800 text-zinc-400 hover:text-white px-6 py-3.5 rounded-full text-sm font-semibold uppercase tracking-wider cursor-pointer"
                >
                  Contact Me
                </Link>
              </motion.div>
            </motion.div>

            {/* Scroll-down indicator */}
            <motion.div
              className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6 }}
            >
              <motion.div
                className="w-px h-12 bg-linear-to-b from-transparent to-emerald-500/60"
                animate={{ scaleY: [0, 1, 0], originY: 0 }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              />
              <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">scroll</span>
            </motion.div>
          </section>

          {/* ── 2. STATS ── */}
          <section className="pt-4">
            <ParallaxDivider />
            <div className="pt-12">
              <AnimateIn direction="none">
                <Stats />
              </AnimateIn>
            </div>
          </section>

          {/* ── 3. PROJECTS ── */}
          <section id="projects" className="scroll-mt-24 space-y-10">
            <ParallaxDivider />
            <div className="pt-6">
              <SectionHeading
                eyebrow="Case Studies"
                heading="Featured Engineering Work"
                subtext="Real-world software built to solve concrete performance, orchestration, and business problems."
              />

              <StaggerContainer className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8" staggerDelay={0.15} childDelay={0.1}>
                {projects.map((project) => (
                  <StaggerItem key={project.slug} direction="up">
                    <TiltCard intensity={10}>
                      <ProjectCard project={project} />
                    </TiltCard>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </section>

          {/* ── 4. EXPERTISE ── */}
          <section id="expertise" className="scroll-mt-24 space-y-10">
            <ParallaxDivider />
            <div className="pt-6">
              <SectionHeading
                eyebrow="Core Competencies"
                heading="Technical Capabilities"
                subtext="Proficiency metrics across core layers of high-performance web engineering."
              />

              <StaggerContainer className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.1} childDelay={0.1}>
                {skillCategories.map((category, catIdx) => {
                  const orbShapes = ['icosahedron', 'octahedron', 'torus', 'sphere', 'box', 'icosahedron'] as const;
                  const orbColors = ['#22c55e', '#34d399', '#10b981', '#4ade80', '#6ee7b7', '#a3e635'];
                  const shape = orbShapes[catIdx % orbShapes.length];
                  const color = orbColors[catIdx % orbColors.length];

                  return (
                    <StaggerItem key={catIdx} direction="up">
                      <TiltCard intensity={8}>
                        <div className="border border-zinc-800 bg-primary/30 rounded-2xl flex flex-col justify-between overflow-hidden h-full">
                          <SkillOrbCanvasDynamic shape={shape} color={color} />
                          <div className="p-6 pt-2">
                            <h3 className="font-heading font-bold text-white text-lg border-b border-zinc-900 pb-3 mb-4 flex items-center justify-between">
                              <span>{category.category}</span>
                              <span className="text-[10px] font-mono text-zinc-500 uppercase">Stack layer {catIdx + 1}</span>
                            </h3>
                            <div className="space-y-4">
                              {category.skills.map((skill) => (
                                <div key={skill.name} className="space-y-1">
                                  <div className="flex justify-between text-xs">
                                    <span className="font-sans text-zinc-300 font-medium">{skill.name}</span>
                                    <span className="font-mono text-zinc-500">{skill.info || `${skill.level}%`}</span>
                                  </div>
                                  <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden">
                                    <motion.div
                                      className="h-full bg-emerald-500/80 rounded-full"
                                      initial={{ width: 0 }}
                                      whileInView={{ width: `${skill.level}%` }}
                                      viewport={{ once: true, margin: '-100px' }}
                                      transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </TiltCard>
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>
            </div>
          </section>

          {/* ── 5. DEEP DIVE ── */}
          <section id="deep-dive" className="scroll-mt-24 space-y-10">
            <ParallaxDivider />
            <div className="pt-6">
              <SectionHeading
                eyebrow="Architectural Rationale"
                heading="Engineering Choices"
                subtext="Why I use these technologies, and the architectural principles behind my choices."
              />
              <AnimateIn delay={0.2} direction="up" className="mt-10">
                <DeepDive />
              </AnimateIn>
            </div>
          </section>

          {/* ── 6. EXPERIENCE / TIMELINE ── */}
          <section id="experience" className="scroll-mt-24 space-y-10">
            <ParallaxDivider />
            <div className="pt-6">
              <SectionHeading
                eyebrow="Work History"
                heading="Professional Journey"
                subtext="Employment history, consulting contracts, and relevant educational qualifications."
              />
              <AnimateIn delay={0.1} direction="up" className="mt-10">
                <Timeline />
              </AnimateIn>
            </div>
          </section>

          {/* ── 7. ABOUT ── */}
          <section id="about" className="scroll-mt-24 space-y-10">
            <ParallaxDivider />
            <div className="pt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

              <div className="lg:col-span-6 space-y-6">
                <SectionHeading
                  eyebrow="Philosophy"
                  heading="Engineering Mindset"
                />
                <AnimateIn delay={0.25} direction="up">
                  <p className="text-sm md:text-base text-zinc-400 leading-relaxed font-sans">
                    I view programming as a tool for creating tangible business impact, not just writing code. My approach is centered around systems that are easy to reason about, maintain, and scale.
                  </p>
                </AnimateIn>
                <AnimateIn delay={0.35} direction="up">
                  <p className="text-sm md:text-base text-zinc-400 leading-relaxed font-sans">
                    From optimizing Puppeteer instances inside cluster pools to designing row-level constraint ledgers in PostgreSQL, I enjoy writing code that is clean, type-safe, and highly performant.
                  </p>
                </AnimateIn>
                <AnimateIn delay={0.45} direction="up">
                  <div className="border border-zinc-800 bg-primary/20 p-5 rounded-xl flex items-center gap-4">
                    <FileText className="w-10 h-10 text-emerald-500 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-white truncate">Dikshant_Dak_Resume.pdf</h4>
                      <p className="text-xs text-zinc-500">PDF Document &bull; 2 Pages</p>
                    </div>
                    <a
                      href={personalInfo.resumePath}
                      download="Dikshant_Dak_Resume.pdf"
                      className="btn-transition p-2.5 rounded-full border border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-white hover:bg-emerald-500 cursor-pointer"
                      aria-label="Download PDF Resume"
                    >
                      <Download className="w-4 h-4" />
                    </a>
                  </div>
                </AnimateIn>
              </div>

              <AnimateIn delay={0.3} direction="left" className="lg:col-span-6">
                <div className="relative border border-zinc-800 rounded-2xl overflow-hidden aspect-3/4 bg-primary flex flex-col justify-between shadow-xl">
                  <div className="bg-zinc-900/50 border-b border-zinc-800 px-4 py-3 flex items-center justify-between">
                    <span className="text-xs font-mono text-zinc-500">PDF Reader - Resume</span>
                    <a
                      href={personalInfo.resumePath}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-emerald-400 hover:text-white flex items-center gap-1 cursor-pointer font-medium"
                    >
                      <span>View Fullscreen</span>
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                  <div className="flex-1 p-6 font-mono text-[10px] text-zinc-500 leading-relaxed select-none overflow-y-hidden bg-dot-pattern">
                    <div className="text-center border-b border-zinc-900 pb-4 mb-4">
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider">{personalInfo.name}</h3>
                      <p className="text-[9px] text-zinc-400 mt-1">{personalInfo.email} | {personalInfo.phone}</p>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <span className="text-white uppercase font-bold tracking-wider text-[9px] block border-b border-zinc-900 pb-1 mb-1">Summary</span>
                        <p className="text-[9px]">Full Stack Developer with hands-on experience building production-grade web and mobile applications using React.js, Next.js, Node.js, Express, GraphQL, and PostgreSQL...</p>
                      </div>
                      <div>
                        <span className="text-white uppercase font-bold tracking-wider text-[9px] block border-b border-zinc-900 pb-1 mb-1">Experience</span>
                        <div className="flex justify-between text-[9px] font-semibold text-zinc-300">
                          <span>TDC Consultancy - Full Stack Developer</span>
                          <span>2023 - Present</span>
                        </div>
                        <p className="text-[9px] mt-0.5">&bull; Built and optimized backend job processing pipelines using BullMQ...</p>
                      </div>
                      <div>
                        <span className="text-white uppercase font-bold tracking-wider text-[9px] block border-b border-zinc-900 pb-1 mb-1">Projects</span>
                        <p className="text-[9px] font-semibold text-zinc-300">SkyTrek Adventure</p>
                        <p className="text-[9px]">&bull; Integrated PayU payment checkout and WhatsApp API notifications...</p>
                        <p className="text-[9px] font-semibold text-zinc-300 mt-1">Astro Analysts</p>
                        <p className="text-[9px]">&bull; Decoupled dynamic PDF rendering pipelines via Apache Kafka brokers...</p>
                      </div>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-primary to-transparent pointer-events-none" />
                  </div>
                </div>
              </AnimateIn>
            </div>
          </section>

          {/* ── 8. CONTACT ── */}
          <section id="contact" className="scroll-mt-24 space-y-10">
            <ParallaxDivider />
            <div className="pt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

              <div className="lg:col-span-5 space-y-6">
                <SectionHeading
                  eyebrow="Let's Connect"
                  heading="Get In Touch"
                  subtext="Let's discuss collaboration. I am open to consulting projects, technical advising, or full-time opportunities."
                />

                <StaggerContainer className="space-y-4 pt-4 border-t border-zinc-900" staggerDelay={0.12} childDelay={0.2}>
                  <StaggerItem>
                    <div className="flex items-center gap-3.5 text-zinc-400">
                      <Mail className="w-5 h-5 text-emerald-500 shrink-0" />
                      <a href={`mailto:${personalInfo.email}`} className="text-sm hover:text-white transition-colors">
                        {personalInfo.email}
                      </a>
                    </div>
                  </StaggerItem>
                  <StaggerItem>
                    <div className="flex items-center gap-3.5 text-zinc-400">
                      <Phone className="w-5 h-5 text-emerald-500 shrink-0" />
                      <a href={`tel:${personalInfo.phone}`} className="text-sm hover:text-white transition-colors">
                        {personalInfo.phone}
                      </a>
                    </div>
                  </StaggerItem>
                  <StaggerItem>
                    <div className="flex items-center gap-3.5 text-zinc-400">
                      <MapPin className="w-5 h-5 text-emerald-500 shrink-0" />
                      <span className="text-sm">Udaipur, Rajasthan, India</span>
                    </div>
                  </StaggerItem>
                </StaggerContainer>

                <AnimateIn delay={0.4} direction="up">
                  <div className="flex gap-4 pt-4">
                    <motion.a
                      href={personalInfo.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-zinc-400 hover:text-white transition-colors bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 p-3 rounded-full cursor-pointer shadow-lg"
                      aria-label="GitHub Profile"
                    >
                      <Github className="w-5 h-5" />
                    </motion.a>
                    <motion.a
                      href={personalInfo.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-zinc-400 hover:text-white transition-colors bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 p-3 rounded-full cursor-pointer shadow-lg"
                      aria-label="LinkedIn Profile"
                    >
                      <Linkedin className="w-5 h-5" />
                    </motion.a>
                  </div>
                </AnimateIn>
              </div>

              <AnimateIn delay={0.3} direction="left" className="lg:col-span-7">
                <ContactForm />
              </AnimateIn>
            </div>
          </section>

        </div>

        {/* FOOTER */}
        <AnimateIn direction="up" className="border-t border-zinc-900 bg-primary/30 py-8 relative">
          <footer className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-zinc-500 text-xs font-mono">
              &copy; 2026 {personalInfo.name}. All rights reserved.
            </div>
            <div className="flex items-center gap-6 text-xs font-mono text-zinc-500">
              <Link href="#hero" className="hover:text-white transition-colors">Back to top</Link>
            </div>
          </footer>
        </AnimateIn>
      </main>
    </>
  );
}
