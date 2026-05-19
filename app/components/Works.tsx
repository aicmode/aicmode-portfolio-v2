'use client'
import { motion } from 'framer-motion'
import AnimateIn from './AnimateIn'

/* ── Data ── */
const projects = [
  {
    id: 1,
    number: '01',
    title: 'Pulse Festival',
    genre: 'Music Festival / Event',
    tags: ['Music', 'Event', 'Web'],
    description: 'A high-energy music festival landing page built for immersive digital experiences and bold visual storytelling.',
    dot: '#ff2d6b',
    url: 'https://aicmode.github.io/Pulse/',
  },
  {
    id: 2,
    number: '02',
    title: 'NOIR Café',
    genre: 'Café / Branding',
    tags: ['Branding', 'F&B', 'Web'],
    description: 'Dark aesthetic café branding fusing moody visuals with a refined typographic identity.',
    dot: '#c9a227',
    url: 'https://aicmode.github.io/noir-cafe/',
  },
  {
    id: 3,
    number: '03',
    title: 'Lumi Tails',
    genre: 'Pet Care / E-commerce',
    tags: ['E-commerce', 'Pet', 'Web'],
    description: 'Playful yet polished e-commerce experience for a premium pet care brand with a pastel-neon identity.',
    dot: '#e879f9',
    url: 'https://aicmode.github.io/Lumi-Tails/',
  },
  {
    id: 4,
    number: '04',
    title: 'AURA',
    genre: 'Beauty / Wellness',
    tags: ['Beauty', 'Wellness', 'Brand'],
    description: 'Serene beauty and wellness brand with a clean, aspirational visual language and spa-inspired palette.',
    dot: '#38bdf8',
    url: 'https://aicmode.github.io/AURA/',
  },
  {
    id: 5,
    number: '05',
    title: 'Tsuki Usagi Wagashi',
    genre: 'Japanese Sweets / Culture',
    tags: ['Japanese', 'Culture', 'EC'],
    description: 'Traditional Japanese wagashi brand reimagined with contemporary digital elegance and artisanal craftsmanship.',
    dot: '#c084fc',
    url: 'https://aicmode.github.io/tsuki-usagi-wagashi/',
  },
] as const

/* ── Arrow icon ── */
function ArrowUpRight() {
  return (
    <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 7l-10 10M17 7H7m10 0v10" />
    </svg>
  )
}

/* ── Project card ── */
function ProjectCard({ project, index }: { project: (typeof projects)[number]; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 52, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 1.0, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }}
      className="group relative flex flex-col"
      style={{
        background: '#0f0f0f',
        border: '1px solid rgba(255,255,255,0.06)',
        transition: 'border-color 0.4s ease, box-shadow 0.45s ease',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = `${project.dot}35`
        el.style.boxShadow = `0 0 60px ${project.dot}12, 0 24px 64px rgba(0,0,0,0.8)`
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = 'rgba(255,255,255,0.06)'
        el.style.boxShadow = 'none'
      }}
    >
      {/* Neon top accent */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(to right, transparent, ${project.dot}80, transparent)` }}
      />

      <div className="flex flex-col flex-1 p-7 md:p-9">
        {/* Top row: number + dot */}
        <div className="flex items-center justify-between mb-6">
          <span
            className="font-mono text-[10px] tracking-[0.4em]"
            style={{ color: 'rgba(255,255,255,0.18)' }}
          >
            {project.number}
          </span>
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{
              background: project.dot,
              boxShadow: `0 0 8px ${project.dot}bb`,
            }}
          />
        </div>

        {/* Genre */}
        <p
          className="text-[9px] tracking-[0.45em] uppercase mb-3"
          style={{ color: 'rgba(255,255,255,0.28)' }}
        >
          {project.genre}
        </p>

        {/* Title */}
        <h3
          className="font-bold text-white leading-tight mb-4"
          style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)', letterSpacing: '-0.01em' }}
        >
          {project.title}
        </h3>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tags.map(tag => (
            <span
              key={tag}
              className="text-[8px] tracking-[0.22em] uppercase px-2.5 py-1"
              style={{
                border: `1px solid ${project.dot}28`,
                color: `${project.dot}88`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Description */}
        <p
          className="text-[11px] leading-relaxed flex-1"
          style={{ color: 'rgba(255,255,255,0.3)', letterSpacing: '0.02em' }}
        >
          {project.description}
        </p>

        {/* Footer: accent line + LIVE SITE */}
        <div
          className="flex items-center justify-between mt-8 pt-6"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <div
            className="h-px flex-1 mr-4"
            style={{
              background: `linear-gradient(to right, ${project.dot}55, transparent)`,
              maxWidth: '48px',
            }}
          />

          <motion.a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 select-none"
            style={{
              padding: '10px 20px',
              minHeight: '42px',
              border: '1px solid rgba(255,255,255,0.12)',
              color: 'rgba(255,255,255,0.45)',
              fontSize: '9px',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'color 0.3s ease, border-color 0.3s ease, background 0.3s ease, box-shadow 0.35s ease',
            }}
            whileHover={{
              color: 'rgba(255,255,255,0.95)',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement
              el.style.borderColor = 'rgba(255,255,255,0.3)'
              el.style.background = 'rgba(255,255,255,0.05)'
              el.style.boxShadow = `0 0 20px rgba(255,255,255,0.06), 0 0 40px ${project.dot}12`
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement
              el.style.borderColor = 'rgba(255,255,255,0.12)'
              el.style.background = 'transparent'
              el.style.boxShadow = 'none'
            }}
          >
            <span>Live Site</span>
            <motion.span
              style={{ display: 'flex' }}
              whileHover={{ x: 2, y: -2 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            >
              <ArrowUpRight />
            </motion.span>
          </motion.a>
        </div>
      </div>
    </motion.article>
  )
}

/* ── Works section ── */
export default function Works() {
  return (
    <section id="works" className="py-28 md:py-44 px-4 md:px-12 bg-[#080808]">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <AnimateIn>
          <div className="mb-16 md:mb-24">
            <div className="flex items-center gap-4 mb-5">
              <p className="text-[10px] tracking-[0.55em] text-zinc-600 uppercase">
                Selected Works
              </p>
              <div style={{
                flex: 1,
                height: '1px',
                background: 'linear-gradient(to right, rgba(255,255,255,0.06), transparent)',
                maxWidth: '80px',
              }} />
              <span className="font-mono text-[10px] text-zinc-700">
                {String(projects.length).padStart(2, '0')}
              </span>
            </div>
            <h2
              className="font-black text-white leading-none mb-5"
              style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', letterSpacing: '-0.02em' }}
            >
              Works
            </h2>
            <p className="text-[11px] tracking-[0.22em] uppercase" style={{ color: '#2a2a2a' }}>
              Web Design · Branding · Creative Direction
            </p>
          </div>
        </AnimateIn>

        {/* Grid: 1 col mobile, 2 col PC */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* Footer label */}
        <AnimateIn delay={400}>
          <div
            className="mt-14 md:mt-20 pt-8 flex items-center gap-4"
            style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
          >
            <span className="text-[8px] tracking-[0.5em] text-zinc-800 uppercase font-mono">
              AICMODE
            </span>
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, rgba(255,255,255,0.04), transparent)' }} />
            <span className="text-[8px] tracking-[0.4em] text-zinc-800 uppercase font-mono">
              {new Date().getFullYear()}
            </span>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
