'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import type { CSSProperties } from 'react'
import AnimateIn from './AnimateIn'

const cinematicEase = [0.12, 0.88, 0.18, 1] as const

const projects = [
  {
    id: 1,
    number: '01',
    title: 'Pulse',
    genre: 'festival system',
    tags: ['magenta / blue'],
    description: 'Sound, velocity, and nightlife contrast.',
    accent: '#ff2d6b',
    secondary: '#1c86a8',
    shadow: 'rgba(255,45,107,0.14)',
    thumbnail: '/works/pulse.svg',
    url: 'https://aicmode.github.io/Pulse/',
    featured: true,
    wide: false,
  },
  {
    id: 2,
    number: '02',
    title: 'NOIR Café',
    genre: 'hospitality identity',
    tags: ['gold / espresso'],
    description: 'Evening hospitality with editorial restraint.',
    accent: '#c99b3a',
    secondary: '#2a160f',
    shadow: 'rgba(201,155,58,0.12)',
    thumbnail: '/works/noir-cafe.svg',
    url: 'https://aicmode.github.io/noir-cafe/',
    featured: false,
    wide: false,
  },
  {
    id: 3,
    number: '03',
    title: 'LUMI Grooming',
    genre: 'premium care',
    tags: ['steel cyan / silver'],
    description: 'Precision grooming with a restrained metallic edge.',
    accent: '#8faab4',
    secondary: '#3c444b',
    shadow: 'rgba(143,170,180,0.1)',
    thumbnail: '/works/lumi-grooming.svg',
    url: 'https://aicmode.github.io/Lumi-Tails/',
    featured: false,
    wide: false,
  },
  {
    id: 4,
    number: '04',
    title: 'AURA',
    genre: 'beauty ritual',
    tags: ['smoke violet / pearl'],
    description: 'A beauty ritual treated like a fashion film.',
    accent: '#9b8fb6',
    secondary: '#d8d2de',
    shadow: 'rgba(155,143,182,0.11)',
    thumbnail: '/works/aura.svg',
    url: 'https://aicmode.github.io/AURA/',
    featured: false,
    wide: false,
  },
  {
    id: 5,
    number: '05',
    title: 'Tsuki Usagi Wagashi',
    genre: 'cultural commerce',
    tags: ['moon pink / plum'],
    description: 'Seasonal craft under a darker moon.',
    accent: '#d99ab8',
    secondary: '#2a1021',
    shadow: 'rgba(217,154,184,0.11)',
    thumbnail: '/works/tsuki-usagi-wagashi.svg',
    url: 'https://aicmode.github.io/tsuki-usagi-wagashi/',
    featured: false,
    wide: true,
  },
] as const

function ArrowUpRight() {
  return (
    <motion.svg
      className="h-3.5 w-3.5 flex-shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
      variants={{
        rest: { x: 0, y: 0 },
        hover: { x: 3, y: -3 },
      }}
      transition={{ duration: 0.85, ease: cinematicEase }}
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M17 7l-10 10M17 7H7m10 0v10" />
    </motion.svg>
  )
}

function ProjectCard({ project, index }: { project: (typeof projects)[number]; index: number }) {
  const layoutClass = project.featured
    ? 'xl:col-span-2'
    : project.wide
      ? 'md:col-span-2 xl:col-span-2'
      : ''

  return (
    <motion.article
      initial={{ opacity: 0, y: 88, scale: 0.992, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 1.35, delay: index * 0.1, ease: cinematicEase }}
      whileHover="hover"
      animate="rest"
      className={`works-card group relative min-h-[540px] overflow-hidden border border-white/[0.06] bg-[#030304] sm:min-h-[600px] lg:min-h-[660px] ${layoutClass}`}
      style={{
        '--work-accent': project.accent,
        '--work-secondary': project.secondary,
        '--work-shadow': project.shadow,
      } as CSSProperties}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 z-10 opacity-70"
        variants={{
          rest: { opacity: 0.28 },
          hover: { opacity: 0.5 },
        }}
        transition={{ duration: 1.35, ease: cinematicEase }}
        style={{
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.045), transparent 22%), radial-gradient(circle at 18% 0%, var(--work-accent), transparent 30%), radial-gradient(circle at 86% 10%, var(--work-secondary), transparent 28%)',
        }}
      />

      <div className="pointer-events-none absolute inset-0 z-20 bg-[linear-gradient(180deg,rgba(0,0,0,0.12)_0%,rgba(2,2,3,0.46)_39%,rgba(1,1,2,0.97)_100%)]" />
      <div className="works-card-noise pointer-events-none absolute inset-0 z-30 opacity-[0.1]" />

      <motion.div
        className="absolute inset-x-0 top-0 h-[45%] overflow-hidden sm:h-[52%]"
        variants={{
          rest: { scale: 1 },
          hover: { scale: 1.018 },
        }}
        transition={{ duration: 1.6, ease: cinematicEase }}
      >
        <motion.div
          className="relative h-full w-full"
          variants={{
            rest: { y: 0 },
            hover: { y: -10 },
          }}
          transition={{ duration: 1.6, ease: cinematicEase }}
        >
          <Image
            src={project.thumbnail}
            alt={`${project.title} thumbnail`}
            fill
            sizes={project.featured || project.wide ? '(min-width: 1280px) 66vw, (min-width: 768px) 100vw, 100vw' : '(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw'}
            className="object-cover"
          />
        </motion.div>
      </motion.div>

      <div className="absolute inset-x-4 top-4 z-40 flex items-start justify-between gap-4 sm:inset-x-7 sm:top-7">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] text-white/44">{project.number}</span>
          <span className="mt-1.5 h-px w-8 bg-white/16 sm:w-10" />
        </div>
        <span className="max-w-[48%] text-right text-[9px] lowercase leading-5 tracking-[0.22em] text-white/42 sm:tracking-[0.34em]">
          {project.genre}
        </span>
      </div>

      <div className="relative z-40 flex min-h-[540px] flex-col justify-end px-4 pb-5 pt-36 sm:min-h-[600px] sm:p-7 md:p-8 lg:min-h-[660px] lg:p-10">
        <motion.div
          variants={{
            rest: { y: 0 },
            hover: { y: -7 },
          }}
          transition={{ duration: 1.2, ease: cinematicEase }}
        >
          <div className="mb-6 flex flex-wrap gap-2 sm:mb-8">
            {project.tags.map(tag => (
              <span
                key={tag}
                className="border border-white/10 bg-black/30 px-3 py-1.5 text-[9px] lowercase tracking-[0.18em] text-white/52 sm:px-3.5 sm:py-2 sm:tracking-[0.26em]"
              >
                {tag}
              </span>
            ))}
          </div>

          <h3 className="works-title max-w-full text-[clamp(3.6rem,17vw,5.35rem)] font-black leading-[0.98] text-white sm:max-w-[12ch] sm:text-[clamp(4.2rem,10vw,7rem)] sm:leading-[0.9] md:text-[clamp(4.8rem,6.7vw,8rem)]">
            {project.title}
          </h3>

          <div className="mt-8 grid gap-7 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
            <p className="max-w-xl text-[0.9rem] leading-8 text-white/48 sm:text-base sm:leading-8">
              {project.description}
            </p>

            <motion.a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="work-button relative inline-flex min-h-12 w-full max-w-full items-center justify-center gap-3 overflow-hidden border border-white/14 bg-black/30 px-5 text-[10px] font-semibold tracking-[0.24em] text-white/74 transition-colors duration-700 hover:border-white/32 hover:text-white focus:outline-none focus-visible:border-white sm:w-fit sm:tracking-[0.34em]"
              variants={{
                rest: { x: 0, scale: 1 },
                hover: { x: 3, scale: 1.006 },
              }}
              transition={{ duration: 1, ease: cinematicEase }}
            >
              <span className="relative z-10">VIEW SITE</span>
              <ArrowUpRight />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </motion.article>
  )
}

export default function Works() {
  return (
    <section id="works" className="works-section relative overflow-x-hidden bg-[#010102] px-3 py-24 sm:px-6 md:px-12 md:py-44">
      <div className="works-noise pointer-events-none absolute inset-0 opacity-[0.12]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/14 to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[min(980px,92vw)] -translate-x-1/2 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.06),rgba(255,255,255,0.02)_30%,transparent_70%)]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[380px] w-[520px] bg-[radial-gradient(circle,rgba(100,100,110,0.055),transparent_70%)]" />

      <div className="relative mx-auto max-w-[1500px]">
        <AnimateIn>
          <div className="mb-14 grid gap-10 md:mb-28 md:grid-cols-[minmax(0,1fr)_minmax(250px,420px)] md:items-end">
            <div>
              <div className="mb-7 flex items-center gap-4">
                <p className="text-[10px] lowercase tracking-[0.34em] text-white/34 sm:tracking-[0.52em]">selected works</p>
                <div className="h-px w-20 bg-gradient-to-r from-white/18 to-transparent" />
                <span className="font-mono text-[10px] text-white/22">{String(projects.length).padStart(2, '0')}</span>
              </div>

              <h2 className="text-[clamp(4.2rem,22vw,13rem)] font-black leading-[0.82] text-white">
                Works
              </h2>
            </div>

            <p className="max-w-md text-sm leading-8 text-white/40 md:pb-3">
              Digital identities reduced to image, name, silence, and motion.
            </p>
          </div>
        </AnimateIn>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-7 xl:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        <AnimateIn delay={400}>
          <div className="mt-16 flex items-center gap-4 border-t border-white/[0.055] pt-8 md:mt-24">
            <span className="font-mono text-[8px] uppercase tracking-[0.5em] text-white/16">AICMODE</span>
            <div className="h-px flex-1 bg-gradient-to-r from-white/[0.06] to-transparent" />
            <span className="font-mono text-[8px] uppercase tracking-[0.4em] text-white/16">
              {new Date().getFullYear()}
            </span>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
