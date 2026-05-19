'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import AnimateIn from './AnimateIn'

const projects = [
  {
    id: 1,
    number: '01',
    title: 'Pulse',
    genre: 'Music Festival',
    tags: ['Event', 'Music', 'Landing'],
    description:
      'A high-voltage festival website shaped around kinetic contrast, bold typography, and immersive event energy.',
    accent: '#ff2d6b',
    thumbnail: '/works/pulse.svg',
    url: 'https://aicmode.github.io/Pulse/',
  },
  {
    id: 2,
    number: '02',
    title: 'NOIR Café',
    genre: 'Café Branding',
    tags: ['Brand', 'Food', 'Editorial'],
    description:
      'A dark luxury café experience with cinematic mood, refined typography, and a quiet premium atmosphere.',
    accent: '#c9a227',
    thumbnail: '/works/noir-cafe.svg',
    url: 'https://aicmode.github.io/noir-cafe/',
  },
  {
    id: 3,
    number: '03',
    title: 'LUMI Grooming',
    genre: 'Pet Care',
    tags: ['Beauty', 'Pet', 'Service'],
    description:
      'A polished grooming brand interface balancing soft luminosity, approachable warmth, and premium service cues.',
    accent: '#65f4ff',
    thumbnail: '/works/lumi-grooming.svg',
    url: 'https://aicmode.github.io/Lumi-Tails/',
  },
  {
    id: 4,
    number: '04',
    title: 'AURA',
    genre: 'Beauty Wellness',
    tags: ['Wellness', 'Beauty', 'Brand'],
    description:
      'A calm beauty and wellness website designed with ethereal gradients, spacious rhythm, and aspirational clarity.',
    accent: '#a78bfa',
    thumbnail: '/works/aura.svg',
    url: 'https://aicmode.github.io/AURA/',
  },
  {
    id: 5,
    number: '05',
    title: 'Tsuki Usagi Wagashi',
    genre: 'Japanese Sweets',
    tags: ['Culture', 'Wagashi', 'EC'],
    description:
      'A contemporary wagashi storefront that reframes craft, seasonality, and Japanese elegance for a digital audience.',
    accent: '#f7b7d8',
    thumbnail: '/works/tsuki-usagi-wagashi.svg',
    url: 'https://aicmode.github.io/tsuki-usagi-wagashi/',
  },
] as const

function ArrowUpRight() {
  return (
    <svg className="h-3.5 w-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 7l-10 10M17 7H7m10 0v10" />
    </svg>
  )
}

function ProjectCard({ project, index }: { project: (typeof projects)[number]; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 44, filter: 'blur(12px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.9, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8 }}
      className="group relative overflow-hidden border border-white/[0.08] bg-[#0b0b0d]"
      style={{
        boxShadow: '0 28px 90px rgba(0,0,0,0.45)',
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${project.accent}22, transparent 44%)`,
        }}
      />

      <div className="relative aspect-[16/10] overflow-hidden bg-black">
        <Image
          src={project.thumbnail}
          alt={`${project.title} thumbnail`}
          fill
          sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition duration-700 group-hover:scale-[1.035]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0d] via-transparent to-black/10" />
        <div className="absolute left-4 top-4 flex items-center gap-2 md:left-5 md:top-5">
          <span className="font-mono text-[10px] text-white/55">{project.number}</span>
          <span className="h-px w-7" style={{ backgroundColor: `${project.accent}99` }} />
        </div>
      </div>

      <div className="relative flex min-h-[300px] flex-col p-5 sm:p-6 md:p-7">
        <p className="mb-3 text-[10px] uppercase tracking-[0.34em] text-white/35">{project.genre}</p>

        <h3 className="mb-4 text-2xl font-black leading-tight text-white sm:text-[1.7rem] md:text-[1.9rem]">
          {project.title}
        </h3>

        <div className="mb-5 flex flex-wrap gap-2">
          {project.tags.map(tag => (
            <span
              key={tag}
              className="border px-3 py-1.5 text-[9px] uppercase tracking-[0.24em]"
              style={{
                borderColor: `${project.accent}36`,
                color: `${project.accent}cc`,
                backgroundColor: `${project.accent}0f`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="max-w-[34rem] flex-1 text-sm leading-7 text-white/48 md:text-[0.92rem]">
          {project.description}
        </p>

        <div className="mt-8 flex items-center justify-between gap-4 border-t border-white/[0.07] pt-5">
          <span
            className="h-px w-12 transition-all duration-500 group-hover:w-20"
            style={{ background: `linear-gradient(90deg, ${project.accent}, transparent)` }}
          />
          <motion.a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-2 border border-white/15 px-5 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/70 transition duration-300 hover:border-white/35 hover:bg-white/[0.06] hover:text-white focus:outline-none focus-visible:border-white focus-visible:text-white"
            whileHover={{ x: 2 }}
            whileTap={{ scale: 0.98 }}
            style={{
              boxShadow: `0 0 0 transparent`,
            }}
          >
            <span>VIEW SITE</span>
            <ArrowUpRight />
          </motion.a>
        </div>
      </div>
    </motion.article>
  )
}

export default function Works() {
  return (
    <section id="works" className="relative overflow-hidden bg-[#070708] px-4 py-24 sm:px-6 md:px-12 md:py-40">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-20 h-[360px] w-[min(760px,92vw)] -translate-x-1/2 bg-[radial-gradient(circle,rgba(255,255,255,0.055),transparent_65%)]" />

      <div className="relative mx-auto max-w-7xl">
        <AnimateIn>
          <div className="mb-12 md:mb-18">
            <div className="mb-5 flex items-center gap-4">
              <p className="text-[10px] uppercase tracking-[0.55em] text-zinc-600">Selected Works</p>
              <div className="h-px w-16 bg-gradient-to-r from-white/10 to-transparent" />
              <span className="font-mono text-[10px] text-zinc-700">{String(projects.length).padStart(2, '0')}</span>
            </div>
            <h2 className="mb-5 text-5xl font-black leading-none text-white sm:text-6xl md:text-8xl">Works</h2>
            <p className="max-w-xl text-[11px] uppercase leading-6 tracking-[0.24em] text-white/25">
              Web Design / Branding / Creative Direction
            </p>
          </div>
        </AnimateIn>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 xl:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        <AnimateIn delay={400}>
          <div className="mt-12 flex items-center gap-4 border-t border-white/[0.05] pt-8 md:mt-18">
            <span className="font-mono text-[8px] uppercase tracking-[0.5em] text-zinc-800">AICMODE</span>
            <div className="h-px flex-1 bg-gradient-to-r from-white/[0.05] to-transparent" />
            <span className="font-mono text-[8px] uppercase tracking-[0.4em] text-zinc-800">
              {new Date().getFullYear()}
            </span>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
