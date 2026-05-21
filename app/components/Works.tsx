'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import type { CSSProperties } from 'react'
import AnimateIn from './AnimateIn'

const ease = [0.13, 0.86, 0.18, 1] as const

const projects = [
  {
    title: 'SWEET MEMORIES',
    subtitle: 'VINTAGE BAKERY',
    category: 'Vintage Bakery / Nostalgic Dessert Brand',
    text: '懐かしい記憶と焼き菓子をテーマにした架空のスイーツブランドサイト。海外のヴィンテージベーカリーやポラロイド写真から着想を得て、ノスタルジックで温かみのある世界観を表現。',
    colorLabel: 'HTML / CSS / JavaScript / Vintage Design',
    accent: '#d4a574',
    tint: '#1a0d08',
    image: '/works/images/sweet-memories.png',
    width: 1055,
    height: 1491,
    url: 'https://aicmode.github.io/Sweet-Memories/',
    featured: true,
  },
  {
    title: 'KISSA MATCHA',
    subtitle: 'LUXURY MATCHA BRAND',
    category: 'Luxury Matcha Brand',
    text: '京都・宇治の伝統と現代の美意識を融合した高級抹茶ブランドLP。和モダンなデザインと上質な写真表現により、抹茶文化の魅力とブランドストーリーを伝えるサイト。',
    colorLabel: 'HTML / CSS / JavaScript / Responsive Design',
    accent: '#d7c894',
    tint: '#15240d',
    image: '/works/images/kissa-matcha.svg',
    width: 1055,
    height: 1491,
    url: 'https://aicmode.github.io/MATCHA/',
  },
  {
    title: 'DEERIFY',
    subtitle: 'WILDLIFE PHOTOGRAPHY',
    category: 'Wildlife Photography / Luxury Outdoor Experience',
    text: '霧島の森を舞台にした架空のフォトハントブランド。鹿の足跡を追いながら森を探索する体験をテーマに、高級アウトドア雑誌のような世界観を表現。',
    colorLabel: 'Forest Green / Dark Charcoal',
    accent: '#8aaf6e',
    tint: '#0c1408',
    image: '/works/images/deerify.png',
    width: 726,
    height: 1024,
    url: 'https://aicmode.github.io/Deerify/',
  },
  {
    title: 'AURA',
    subtitle: 'BEAUTY WELLNESS',
    category: 'BEAUTY RITUAL',
    text: 'A beauty ritual treated like a fashion film.',
    colorLabel: 'Smoke Violet / Pearl',
    accent: '#b19bc8',
    tint: '#17111d',
    image: '/works/images/aura.png',
    width: 1063,
    height: 1480,
    url: 'https://aicmode.github.io/AURA/',
  },
  {
    title: 'LUMI Grooming',
    subtitle: 'GROOMING STUDIO',
    category: 'PREMIUM CARE',
    text: 'Precision grooming with a restrained metallic edge.',
    colorLabel: 'Steel Cyan / Silver',
    accent: '#87aeb8',
    tint: '#101c22',
    image: '/works/images/lumi-grooming.png',
    width: 1055,
    height: 1491,
    url: 'https://aicmode.github.io/Lumi-Tails/',
  },
  {
    title: 'LUXE MEMBERS',
    subtitle: 'REACT APP',
    category: 'Luxury Members Experience / React App',
    text: 'Members-only fashion with private collections and reservations.',
    colorLabel: 'React / Vite / CSS / Vercel',
    accent: '#d7b878',
    tint: '#20130f',
    image: '/works/images/luxe-members.png',
    width: 1055,
    height: 1491,
    url: 'https://luxe-members.vercel.app',
  },
  {
    title: 'SAINT AVE',
    subtitle: 'CINEMATIC EDITORIAL',
    category: 'Luxury Fashion Brand / Cinematic Editorial',
    text: '海外ラグジュアリーブランドをイメージした、シネマティックなファッションブランドサイト。高級感・静けさ・都会的な空気感を重視し、GSAPアニメーションやLookbook演出を実装。',
    colorLabel: 'GSAP / Lookbook / Luxury UI',
    accent: '#d6c08a',
    tint: '#17110b',
    image: '/works/images/saint-ave.png',
    width: 1122,
    height: 1402,
    url: 'https://aicmode.github.io/saint-ave/',
  },
  {
    title: 'NOIR CAFÉ',
    subtitle: 'CAFÉ BRANDING',
    category: 'HOSPITALITY IDENTITY',
    text: 'Evening hospitality with editorial restraint.',
    colorLabel: 'Gold / Espresso',
    accent: '#c69b54',
    tint: '#2d1a12',
    image: '/works/images/noir-cafe.png',
    width: 1054,
    height: 1492,
    url: 'https://aicmode.github.io/noir-cafe/',
  },
  {
    title: 'Tsuki Usagi Wagashi',
    subtitle: 'WAGASHI STORE',
    category: 'CULTURAL COMMERCE',
    text: 'Seasonal craft under a darker moon.',
    colorLabel: 'Moon Pink / Plum',
    accent: '#d99ab8',
    tint: '#24101d',
    image: '/works/images/tsuki-usagi-wagashi.png',
    width: 1055,
    height: 1491,
    url: 'https://aicmode.github.io/tsuki-usagi-wagashi/',
  },
  {
    title: 'PULSE',
    subtitle: 'FESTIVAL UI',
    category: 'FESTIVAL SYSTEM',
    text: 'Sound, velocity, and nightlife contrast.',
    colorLabel: 'Magenta / Blue',
    accent: '#d8d8d8',
    tint: '#ff2d6b',
    image: '/works/images/pulse.png',
    width: 1054,
    height: 1492,
    url: 'https://aicmode.github.io/pulse/',
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
  const isFeatured = 'featured' in project && project.featured

  return (
    <motion.article
      className={`work-card editorial-work-card group relative overflow-hidden bg-[#030303] ${
        isFeatured ? 'featured-work-card md:col-span-2 xl:col-span-2' : ''
      }`}
      style={{
        '--work-accent': project.accent,
        '--work-tint': project.tint,
      } as CSSProperties}
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 1.25, delay: index * 0.08, ease }}
      whileHover="hover"
      animate="rest"
    >
      <motion.a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
        aria-label={`Open ${project.title}`}
      >
        <motion.div
          className="editorial-poster-shell relative overflow-hidden"
          variants={{
            rest: { y: 0 },
            hover: { y: -10 },
          }}
          transition={{ duration: 1.15, ease }}
        >
          <Image
            src={project.image}
            alt={`${project.title} editorial poster`}
            width={project.width}
            height={project.height}
            sizes="(min-width: 1280px) 520px, (min-width: 768px) 45vw, 92vw"
            className="editorial-poster-image h-auto w-full"
            priority={index < 2}
          />
        </motion.div>

        <div className="editorial-work-meta flex items-start justify-between gap-5 px-1 pt-5 sm:pt-6">
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <p className="truncate text-[10px] font-semibold uppercase tracking-[0.34em] text-[color:var(--work-accent)]">
                {project.subtitle}
              </p>
            </div>
            <h3 className="mt-2 truncate text-xl font-semibold tracking-[-0.01em] text-white sm:text-2xl">{project.title}</h3>
            <p className="mt-2 max-w-[30rem] text-sm leading-6 text-white/48">{project.text}</p>
            <p className="mt-3 space-y-1 text-[9px] font-semibold uppercase leading-4 tracking-[0.26em] text-white/28">
              <span className="block">{project.category}</span>
              <span className="block text-[color:var(--work-accent)] opacity-70">{project.colorLabel}</span>
            </p>
          </div>

          <motion.span
            className="editorial-work-button inline-flex h-11 shrink-0 items-center justify-center gap-2 border border-white/18 px-3 text-white/72"
            variants={{
              rest: { borderColor: 'rgba(255,255,255,0.18)' },
              hover: { borderColor: project.accent, color: project.accent },
            }}
            transition={{ duration: 0.9, ease }}
            aria-hidden="true"
          >
            <span className="text-[8px] font-semibold uppercase tracking-[0.18em] sm:text-[9px] sm:tracking-[0.22em]">Open Site</span>
            <ArrowIcon />
          </motion.span>
        </div>
      </motion.a>
    </motion.article>
  )
}

export default function Works() {
  return (
    <section id="works" className="works editorial-works-section relative overflow-x-hidden bg-[#010101] px-4 py-24 sm:px-6 md:px-10 md:py-36">
      <div className="editorial-page-noise pointer-events-none absolute inset-0 opacity-[0.13]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/[0.08]" />

      <div className="relative mx-auto max-w-[1420px]">
        <div className="mb-14 flex items-end justify-between gap-8 border-b border-white/[0.08] pb-8 md:mb-20">
          <div>
            <p className="mb-5 text-[10px] uppercase tracking-[0.48em] text-white/38">Selected Works</p>
            <h2 className="text-[clamp(4.5rem,16vw,12rem)] font-black uppercase leading-[0.8] text-white">
              Works
            </h2>
          </div>
          <p className="hidden max-w-sm text-right text-sm leading-8 text-white/42 md:block">
            Ten visual systems framed as dark editorial campaign posters.
          </p>
        </div>

        <div className="editorial-poster-grid mx-auto grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:gap-x-10 lg:gap-y-20 xl:grid-cols-3">
          {projects.map((project, index) => (
            <WorkPoster key={project.title} project={project} index={index} />
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
