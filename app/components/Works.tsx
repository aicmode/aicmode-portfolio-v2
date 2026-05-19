'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import type { CSSProperties } from 'react'
import AnimateIn from './AnimateIn'

const ease = [0.13, 0.86, 0.18, 1] as const

const projects = [
  {
    number: '01',
    title: 'PULSE',
    subtitle: 'FESTIVAL UI',
    category: 'FESTIVAL SYSTEM',
    text: 'Sound, velocity, and nightlife contrast.',
    colorLabel: 'MAGENTA / BLUE',
    accent: '#d8d8d8',
    tint: '#ff2d6b',
    image: '/works/pulse.svg',
    url: 'https://aicmode.github.io/Pulse/',
  },
  {
    number: '02',
    title: 'NOIR CAFÉ',
    subtitle: 'CAFÉ BRANDING',
    category: 'HOSPITALITY IDENTITY',
    text: 'Evening hospitality with editorial restraint.',
    colorLabel: 'GOLD / ESPRESSO',
    accent: '#c69b54',
    tint: '#2d1a12',
    image: '/works/noir-cafe.svg',
    url: 'https://aicmode.github.io/noir-cafe/',
  },
  {
    number: '03',
    title: 'LUMI Grooming',
    subtitle: 'GROOMING STUDIO',
    category: 'PREMIUM CARE',
    text: 'Precision grooming with a restrained metallic edge.',
    colorLabel: 'STEEL CYAN / SILVER',
    accent: '#87aeb8',
    tint: '#101c22',
    image: '/works/lumi-grooming.svg',
    url: 'https://aicmode.github.io/Lumi-Tails/',
  },
  {
    number: '04',
    title: 'AURA',
    subtitle: 'BEAUTY WELLNESS',
    category: 'BEAUTY RITUAL',
    text: 'A beauty ritual treated like a fashion film.',
    colorLabel: 'SMOKE VIOLET / PEARL',
    accent: '#b19bc8',
    tint: '#17111d',
    image: '/works/aura.svg',
    url: 'https://aicmode.github.io/AURA/',
  },
  {
    number: '05',
    title: 'Tsuki Usagi Wagashi',
    subtitle: 'WAGASHI STORE',
    category: 'CULTURAL COMMERCE',
    text: 'Seasonal craft under a darker moon.',
    colorLabel: 'MOON PINK / PLUM',
    accent: '#d99ab8',
    tint: '#24101d',
    image: '/works/tsuki-usagi-wagashi.svg',
    url: 'https://aicmode.github.io/tsuki-usagi-wagashi/',
  },
] as const

function ArrowIcon() {
  return (
    <motion.svg
      className="h-4 w-4 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
      variants={{
        rest: { x: 0, y: 0 },
        hover: { x: 5, y: -5 },
      }}
      transition={{ duration: 0.9, ease }}
    >
      <path d="M7 17L17 7M17 7H8M17 7V16" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
    </motion.svg>
  )
}

function WorkPoster({ project, index }: { project: (typeof projects)[number]; index: number }) {
  return (
    <motion.article
      className="editorial-work-card group relative overflow-hidden border bg-[#030303]"
      style={{
        '--work-accent': project.accent,
        '--work-tint': project.tint,
      } as CSSProperties}
      initial={{ opacity: 0, y: 72 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 1.25, delay: index * 0.08, ease }}
      whileHover="hover"
      animate="rest"
    >
      <div className="editorial-work-noise pointer-events-none absolute inset-0 z-30" />
      <div className="pointer-events-none absolute inset-0 z-20 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.28)_42%,rgba(0,0,0,0.94)_100%)]" />
      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_75%_18%,var(--work-tint),transparent_38%)] opacity-70" />

      <div className="relative z-40 grid min-h-[760px] grid-rows-[auto_1fr_auto] p-5 sm:min-h-[840px] sm:p-8 lg:min-h-[900px] lg:p-10">
        <div className="flex items-start justify-between gap-5">
          <div className="flex min-w-0 items-center gap-4">
            <span className="font-mono text-2xl leading-none text-white/70 sm:text-3xl">{project.number}</span>
            <span className="h-px w-12 bg-white/26 sm:w-24" />
          </div>
          <p className="max-w-[48%] text-right text-[10px] font-medium uppercase leading-5 tracking-[0.32em] text-white/66 sm:tracking-[0.48em]">
            {project.category}
          </p>
        </div>

        <div className="relative mt-12 grid min-h-0 grid-rows-[auto_minmax(230px,1fr)] gap-8 md:grid-cols-[0.95fr_1.05fr] md:grid-rows-none md:gap-10">
          <div className="relative z-20 flex flex-col justify-center">
            <motion.div
              variants={{
                rest: { y: 0 },
                hover: { y: -8 },
              }}
              transition={{ duration: 1.2, ease }}
            >
              <h3 className="editorial-work-kicker text-[clamp(3.2rem,14vw,6.8rem)] font-black uppercase leading-[0.88] text-white md:text-[clamp(4.6rem,7.5vw,8.8rem)]">
                {project.title}
              </h3>
              <p className="mt-5 text-[12px] font-semibold uppercase leading-6 tracking-[0.38em] text-[color:var(--work-accent)] sm:text-sm sm:tracking-[0.58em]">
                {project.subtitle}
              </p>

              <div className="mt-12 h-px w-20 bg-white/42" />
              <p className="mt-9 max-w-[24rem] font-mono text-lg leading-9 text-white/58 sm:text-xl">
                {project.text}
              </p>
            </motion.div>
          </div>

          <motion.div
            className="editorial-work-visual relative min-h-[260px] overflow-hidden border border-white/[0.06] bg-black md:min-h-full"
            variants={{
              rest: { scale: 1 },
              hover: { scale: 1.018 },
            }}
            transition={{ duration: 1.55, ease }}
          >
            <motion.div
              className="relative h-full w-full"
              variants={{
                rest: { y: 0 },
                hover: { y: -12 },
              }}
              transition={{ duration: 1.55, ease }}
            >
              <Image
                src={project.image}
                alt={`${project.title} visual`}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </motion.div>
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.52),transparent_34%,rgba(0,0,0,0.24))]" />
            <div className="absolute inset-y-0 left-[28%] hidden w-px bg-white/[0.08] md:block" />
            <div className="absolute inset-y-0 left-[56%] hidden w-px bg-white/[0.06] md:block" />
          </motion.div>
        </div>

        <div className="relative z-40 mt-12 border-t border-white/[0.08] pt-8 sm:mt-14">
          <p className="mb-8 text-[11px] font-medium uppercase tracking-[0.44em] text-white/64" style={{ color: project.accent }}>
            {project.colorLabel}
          </p>

          <motion.a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="editorial-work-button relative flex min-h-16 w-full items-center justify-between overflow-hidden border border-white/42 px-6 text-[12px] font-semibold uppercase tracking-[0.48em] text-white/82 sm:min-h-20 sm:px-8 sm:text-sm"
            variants={{
              rest: { borderColor: 'rgba(255,255,255,0.42)' },
              hover: { borderColor: project.accent },
            }}
            transition={{ duration: 1, ease }}
          >
            <span className="relative z-10">VIEW SITE</span>
            <ArrowIcon />
          </motion.a>
        </div>
      </div>
    </motion.article>
  )
}

export default function Works() {
  return (
    <section id="works" className="editorial-works-section relative overflow-x-hidden bg-[#010101] px-3 py-24 sm:px-6 md:px-10 md:py-36">
      <div className="editorial-page-noise pointer-events-none absolute inset-0 opacity-[0.13]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/[0.08]" />

      <div className="relative mx-auto max-w-[1500px]">
        <AnimateIn>
          <div className="mb-14 flex items-end justify-between gap-8 border-b border-white/[0.08] pb-8 md:mb-20">
            <div>
              <p className="mb-5 text-[10px] uppercase tracking-[0.48em] text-white/38">Selected Works</p>
              <h2 className="text-[clamp(4.5rem,16vw,12rem)] font-black uppercase leading-[0.8] text-white">
                Works
              </h2>
            </div>
            <p className="hidden max-w-sm text-right text-sm leading-8 text-white/42 md:block">
              Five visual systems framed as dark editorial campaign posters.
            </p>
          </div>
        </AnimateIn>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-7">
          {projects.map((project, index) => (
            <WorkPoster key={project.number} project={project} index={index} />
          ))}
        </div>

        <AnimateIn delay={300}>
          <div className="mt-14 flex items-center gap-4 border-t border-white/[0.07] pt-8 md:mt-20">
            <span className="font-mono text-[8px] uppercase tracking-[0.5em] text-white/18">AICMODE</span>
            <div className="h-px flex-1 bg-gradient-to-r from-white/[0.07] to-transparent" />
            <span className="font-mono text-[8px] uppercase tracking-[0.4em] text-white/18">
              {new Date().getFullYear()}
            </span>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
