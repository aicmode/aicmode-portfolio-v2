'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import type { CSSProperties } from 'react'
import AnimateIn from './AnimateIn'

const cinematicEase = [0.16, 1, 0.3, 1] as const

const projects = [
  {
    id: 1,
    number: '01',
    title: 'Pulse',
    genre: 'festival system',
    tags: ['neon magenta', 'electric blue'],
    description: 'A kinetic event experience built around sound, velocity, and nightlife-scale contrast.',
    accent: '#ff2d6b',
    secondary: '#27d8ff',
    shadow: 'rgba(255,45,107,0.24)',
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
    tags: ['warm gold', 'espresso'],
    description: 'A quiet dark-luxury café presence with editorial restraint and evening-grade atmosphere.',
    accent: '#d2aa45',
    secondary: '#5b2e19',
    shadow: 'rgba(210,170,69,0.2)',
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
    tags: ['soft cyan', 'silver'],
    description: 'A luminous grooming interface with polished service cues and gentle premium energy.',
    accent: '#75f4ff',
    secondary: '#d6dde5',
    shadow: 'rgba(117,244,255,0.18)',
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
    tags: ['lavender', 'pearl'],
    description: 'A spacious wellness world balancing soft gradients, calm rhythm, and aspirational clarity.',
    accent: '#b7a2ff',
    secondary: '#f4efff',
    shadow: 'rgba(183,162,255,0.2)',
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
    tags: ['moon pink', 'dark plum'],
    description: 'A contemporary wagashi storefront shaped by seasonality, craft, and moonlit restraint.',
    accent: '#f7b7d8',
    secondary: '#2a1021',
    shadow: 'rgba(247,183,216,0.18)',
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
      transition={{ duration: 0.55, ease: cinematicEase }}
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
      initial={{ opacity: 0, y: 76, scale: 0.985, filter: 'blur(18px)' }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 1.15, delay: index * 0.08, ease: cinematicEase }}
      whileHover="hover"
      animate="rest"
      className={`works-card group relative min-h-[620px] overflow-hidden border border-white/[0.075] bg-white/[0.025] ${layoutClass}`}
      style={{
        '--work-accent': project.accent,
        '--work-secondary': project.secondary,
        '--work-shadow': project.shadow,
      } as CSSProperties}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 z-10 opacity-70"
        variants={{
          rest: { opacity: 0.46 },
          hover: { opacity: 0.9 },
        }}
        transition={{ duration: 0.9, ease: cinematicEase }}
        style={{
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.075), transparent 20%), radial-gradient(circle at 22% 0%, var(--work-accent), transparent 34%), radial-gradient(circle at 82% 18%, var(--work-secondary), transparent 30%)',
        }}
      />

      <div className="pointer-events-none absolute inset-0 z-20 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(3,3,4,0.34)_42%,rgba(3,3,4,0.94)_100%)]" />
      <div className="works-card-noise pointer-events-none absolute inset-0 z-30 opacity-[0.12]" />

      <motion.div
        className="absolute inset-x-0 top-0 h-[58%] overflow-hidden"
        variants={{
          rest: { scale: 1 },
          hover: { scale: 1.035 },
        }}
        transition={{ duration: 1.25, ease: cinematicEase }}
      >
        <motion.div
          className="relative h-full w-full"
          variants={{
            rest: { y: 0 },
            hover: { y: -18 },
          }}
          transition={{ duration: 1.25, ease: cinematicEase }}
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

      <div className="absolute inset-x-5 top-5 z-40 flex items-center justify-between sm:inset-x-7 sm:top-7">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] text-white/44">{project.number}</span>
          <span className="h-px w-10 bg-white/18" />
        </div>
        <span className="text-[9px] lowercase tracking-[0.34em] text-white/42">{project.genre}</span>
      </div>

      <div className="relative z-40 flex min-h-[620px] flex-col justify-end p-5 pt-40 sm:p-7 md:p-8 lg:p-10">
        <motion.div
          variants={{
            rest: { y: 0 },
            hover: { y: -10 },
          }}
          transition={{ duration: 0.85, ease: cinematicEase }}
        >
          <div className="mb-7 flex flex-wrap gap-2.5">
            {project.tags.map(tag => (
              <span
                key={tag}
                className="border border-white/10 bg-black/20 px-3.5 py-2 text-[9px] lowercase tracking-[0.28em] text-white/58 backdrop-blur-md"
              >
                {tag}
              </span>
            ))}
          </div>

          <h3 className="max-w-[12ch] text-[clamp(3rem,10vw,5.9rem)] font-black leading-[0.88] text-white md:text-[clamp(3.6rem,6vw,6.8rem)]">
            {project.title}
          </h3>

          <div className="mt-7 grid gap-7 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
            <p className="max-w-xl text-[0.92rem] leading-7 text-white/52 sm:text-base">
              {project.description}
            </p>

            <motion.a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="work-button relative inline-flex min-h-12 w-fit items-center justify-center gap-3 overflow-hidden border border-white/14 bg-white/[0.035] px-5 text-[10px] font-semibold tracking-[0.34em] text-white/76 backdrop-blur-xl transition-colors duration-500 hover:border-white/34 hover:text-white focus:outline-none focus-visible:border-white"
              variants={{
                rest: { x: 0, scale: 1 },
                hover: { x: 4, scale: 1.015 },
              }}
              transition={{ duration: 0.7, ease: cinematicEase }}
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
    <section id="works" className="works-section relative overflow-hidden bg-[#020203] px-4 py-28 sm:px-6 md:px-12 md:py-44">
      <div className="works-noise pointer-events-none absolute inset-0 opacity-[0.16]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/16 to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[680px] w-[min(1180px,96vw)] -translate-x-1/2 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.105),rgba(255,255,255,0.035)_28%,transparent_67%)] blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[520px] w-[720px] bg-[radial-gradient(circle,rgba(117,244,255,0.07),transparent_68%)] blur-3xl" />

      <div className="relative mx-auto max-w-[1500px]">
        <AnimateIn>
          <div className="mb-16 grid gap-10 md:mb-24 md:grid-cols-[minmax(0,1fr)_minmax(250px,420px)] md:items-end">
            <div>
              <div className="mb-7 flex items-center gap-4">
                <p className="text-[10px] lowercase tracking-[0.52em] text-white/34">selected works</p>
                <div className="h-px w-20 bg-gradient-to-r from-white/18 to-transparent" />
                <span className="font-mono text-[10px] text-white/22">{String(projects.length).padStart(2, '0')}</span>
              </div>

              <h2 className="text-[clamp(4.4rem,16vw,13rem)] font-black leading-[0.78] text-white">
                Works
              </h2>
            </div>

            <p className="max-w-md text-sm leading-8 text-white/42 md:pb-3">
              Digital identities for culture, commerce, and atmosphere. Reduced to the essential: image, name, signal, and motion.
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
