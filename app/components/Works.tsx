'use client'
import { useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import AnimateIn from './AnimateIn'

const projects = [
  {
    id: 1,
    title: 'Pulse Festival',
    genre: 'Music Festival / Event',
    tags: ['Music', 'Event', 'Web'],
    colors: ['#1a0010', '#8b0038', '#ff2d6b'] as const,
    dot: '#ff2d6b',
    number: '01',
    url: 'https://aicmode.github.io/pulse/',
    mockupType: 'macbook',
  },
  {
    id: 2,
    title: 'NOIR Café',
    genre: 'Café / Branding',
    tags: ['Branding', 'F&B', 'Web'],
    colors: ['#0a0800', '#2a1f00', '#c9a227'] as const,
    dot: '#c9a227',
    number: '02',
    url: 'https://aicmode.github.io/noir-cafe/',
    mockupType: 'macbook',
  },
  {
    id: 3,
    title: 'Lumi Tails',
    genre: 'Pet Care / E-commerce',
    tags: ['E-commerce', 'Pet', 'Web'],
    colors: ['#1a0020', '#5b1a8a', '#e879f9'] as const,
    dot: '#e879f9',
    number: '03',
    url: 'https://aicmode.github.io/Lumi-Tails/',
    mockupType: 'macbook',
  },
  {
    id: 4,
    title: 'AURA',
    genre: 'Beauty / Wellness',
    tags: ['Beauty', 'Wellness', 'Brand'],
    colors: ['#000d1a', '#0a2a4a', '#38bdf8'] as const,
    dot: '#38bdf8',
    number: '04',
    url: null,
    mockupType: 'iphone',
  },
  {
    id: 5,
    title: 'Tsuki Usagi Wagashi',
    genre: 'Japanese Sweets / Culture',
    tags: ['Japanese', 'Culture', 'EC'],
    colors: ['#0f0010', '#3d1060', '#c084fc'] as const,
    dot: '#c084fc',
    number: '05',
    url: null,
    mockupType: 'iphone',
  },
] as const

type Project = (typeof projects)[number]

/* ── MacBook mockup ── */
function MacBookMockup({ colors, dot }: { colors: readonly [string, string, string]; dot: string }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ padding: '18px 20px 10px' }}>
      <div className="w-full" style={{ maxWidth: '260px' }}>
        {/* Screen */}
        <div style={{
          background: '#181818',
          borderRadius: '7px 7px 0 0',
          border: '1.5px solid rgba(255,255,255,0.1)',
          padding: '5px 5px 0',
          boxShadow: '0 12px 40px rgba(0,0,0,0.7), 0 0 0 0.5px rgba(255,255,255,0.04) inset',
        }}>
          {/* Browser chrome */}
          <div style={{
            background: 'rgba(255,255,255,0.04)',
            borderRadius: '3px 3px 0 0',
            height: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            padding: '0 8px',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
          }}>
            {(['#ff5f57','#febc2e','#28c840'] as const).map((c, i) => (
              <div key={i} style={{ width: '6px', height: '6px', borderRadius: '50%', background: c, opacity: 0.85 }} />
            ))}
            <div style={{
              flex: 1, margin: '0 6px', height: '12px',
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '3px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{ width: '50%', height: '3px', background: 'rgba(255,255,255,0.12)', borderRadius: '2px' }} />
            </div>
          </div>
          {/* Website UI preview */}
          <div style={{
            height: '108px',
            background: `linear-gradient(155deg, ${colors[0]} 0%, ${colors[1]} 52%, ${colors[2]}55 100%)`,
            overflow: 'hidden',
            position: 'relative',
          }}>
            {/* Nav */}
            <div style={{ padding: '8px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ width: '26px', height: '5px', background: 'rgba(255,255,255,0.55)', borderRadius: '2px' }} />
              <div style={{ display: 'flex', gap: '7px' }}>
                {[0,1,2].map(i => <div key={i} style={{ width: '16px', height: '3.5px', background: 'rgba(255,255,255,0.2)', borderRadius: '2px' }} />)}
              </div>
            </div>
            {/* Hero */}
            <div style={{ padding: '4px 10px 0' }}>
              <div style={{ width: '72%', height: '8px', background: 'rgba(255,255,255,0.65)', borderRadius: '3px', marginBottom: '5px' }} />
              <div style={{ width: '50%', height: '4px', background: 'rgba(255,255,255,0.28)', borderRadius: '2px', marginBottom: '4px' }} />
              <div style={{ width: '36%', height: '4px', background: 'rgba(255,255,255,0.16)', borderRadius: '2px', marginBottom: '10px' }} />
              <div style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                padding: '4px 10px',
                background: dot + '55',
                border: `1px solid ${dot}66`,
                borderRadius: '2px',
              }}>
                <div style={{ width: '22px', height: '3px', background: 'rgba(255,255,255,0.75)', borderRadius: '2px' }} />
              </div>
            </div>
            {/* Cards row */}
            <div style={{ display: 'flex', gap: '4px', padding: '8px 10px 0' }}>
              {[0.1, 0.06, 0.04].map((o, i) => (
                <div key={i} style={{
                  flex: i === 0 ? 2 : 1,
                  height: '22px',
                  background: `rgba(255,255,255,${o})`,
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '3px',
                }} />
              ))}
            </div>
            {/* Shimmer sweep */}
            <div className="animate-shimmer" style={{
              position: 'absolute', top: 0, bottom: 0, width: '40%',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)',
              pointerEvents: 'none',
            }} />
            {/* Bottom fade */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, height: '28px',
              background: `linear-gradient(to bottom, transparent, ${colors[0]}dd)`,
            }} />
          </div>
        </div>
        {/* Chin */}
        <div style={{
          background: 'linear-gradient(to bottom, #202020, #141414)',
          height: '11px',
          border: '1.5px solid rgba(255,255,255,0.07)',
          borderTop: 'none',
          borderRadius: '0 0 3px 3px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{ width: '32px', height: '2px', background: 'rgba(255,255,255,0.08)', borderRadius: '2px' }} />
        </div>
        {/* Hinge + base */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{
            width: '56px', height: '5px',
            background: 'linear-gradient(to bottom, #181818, #101010)',
            clipPath: 'polygon(8% 0%, 92% 0%, 100% 100%, 0% 100%)',
          }} />
        </div>
        <div style={{ height: '4px', background: '#0e0e0e', borderRadius: '0 0 4px 4px', margin: '0 -6px' }} />
        {/* Ambient glow under */}
        <div style={{
          marginTop: '2px',
          height: '18px',
          background: `radial-gradient(ellipse at 50% 0%, ${dot}18 0%, transparent 70%)`,
          filter: 'blur(6px)',
        }} />
      </div>
    </div>
  )
}

/* ── iPhone mockup ── */
function IPhoneMockup({ colors, dot }: { colors: readonly [string, string, string]; dot: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center" style={{ padding: '16px 0 12px' }}>
      <div style={{ width: '88px', position: 'relative' }}>
        {/* Frame */}
        <div style={{
          background: 'linear-gradient(160deg, #1e1e1e, #141414)',
          border: '1.5px solid rgba(255,255,255,0.1)',
          borderRadius: '20px',
          padding: '6px 4px',
          boxShadow: '0 12px 40px rgba(0,0,0,0.7)',
        }}>
          {/* Dynamic island */}
          <div style={{
            width: '28px', height: '8px',
            background: '#000',
            borderRadius: '6px',
            margin: '0 auto 4px',
          }} />
          {/* Screen */}
          <div style={{
            height: '130px',
            borderRadius: '12px',
            background: `linear-gradient(160deg, ${colors[0]} 0%, ${colors[1]} 55%, ${colors[2]}55 100%)`,
            overflow: 'hidden',
            position: 'relative',
          }}>
            {/* Status bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 8px 4px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ width: '16px', height: '3px', background: 'rgba(255,255,255,0.4)', borderRadius: '2px' }} />
              <div style={{ display: 'flex', gap: '3px' }}>
                {[0,1,2].map(i => <div key={i} style={{ width: '5px', height: '3px', background: 'rgba(255,255,255,0.25)', borderRadius: '1px' }} />)}
              </div>
            </div>
            {/* Content */}
            <div style={{ padding: '10px 8px' }}>
              <div style={{ width: '65%', height: '7px', background: 'rgba(255,255,255,0.6)', borderRadius: '2px', marginBottom: '4px' }} />
              <div style={{ width: '45%', height: '4px', background: 'rgba(255,255,255,0.25)', borderRadius: '2px', marginBottom: '10px' }} />
              <div style={{
                width: '100%', height: '48px',
                background: `rgba(255,255,255,0.05)`,
                border: `1px solid ${dot}22`,
                borderRadius: '6px',
                marginBottom: '6px',
              }} />
              <div style={{ display: 'flex', gap: '4px' }}>
                {[0.09,0.06].map((o,i) => (
                  <div key={i} style={{ flex: 1, height: '22px', background: `rgba(255,255,255,${o})`, borderRadius: '4px', border: '1px solid rgba(255,255,255,0.06)' }} />
                ))}
              </div>
            </div>
            {/* Bottom fade */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, height: '24px',
              background: `linear-gradient(to bottom, transparent, ${colors[0]}ee)`,
            }} />
          </div>
          {/* Home indicator */}
          <div style={{ display: 'flex', justifyContent: 'center', padding: '5px 0 2px' }}>
            <div style={{ width: '22px', height: '3px', background: 'rgba(255,255,255,0.25)', borderRadius: '2px' }} />
          </div>
        </div>
        {/* Glow */}
        <div style={{
          position: 'absolute', bottom: '-8px', left: '50%', transform: 'translateX(-50%)',
          width: '70px', height: '24px',
          background: `radial-gradient(ellipse at center, ${dot}20 0%, transparent 70%)`,
          filter: 'blur(8px)',
        }} />
      </div>
    </div>
  )
}

/* ── Overlay for live projects ── */
function LiveOverlay() {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100"
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', transition: 'opacity 0.4s ease' }}
    >
      <div
        className="flex items-center gap-2.5 px-5 py-2.5"
        style={{
          border: '1px solid rgba(255,255,255,0.24)',
          background: 'rgba(255,255,255,0.07)',
          backdropFilter: 'blur(16px)',
          transition: 'transform 0.35s cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        <span className="text-[10px] tracking-[0.38em] text-white font-medium uppercase">Live Preview</span>
        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 7l-10 10M17 7H7m10 0v10" />
        </svg>
      </div>
    </div>
  )
}

/* ── Coming soon scan overlay ── */
function ComingSoonOverlay({ dot }: { dot: string }) {
  return (
    <>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.15) 3px, rgba(0,0,0,0.15) 4px)',
        }}
      />
      <div
        className="absolute inset-x-0 h-28 pointer-events-none scan-line"
        style={{ background: 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.03) 50%, transparent 100%)' }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <span
          className="text-[9px] tracking-[0.5em] uppercase px-4 py-1.5 block text-center whitespace-nowrap"
          style={{
            border: `1px solid ${dot}50`,
            color: dot,
            background: `${dot}10`,
            backdropFilter: 'blur(6px)',
          }}
        >
          In Production
        </span>
      </div>
    </>
  )
}

/* ── Card ── */
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const isLive = !!project.url
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    cardRef.current.style.setProperty('--glow-x', `${x}px`)
    cardRef.current.style.setProperty('--glow-y', `${y}px`)
    cardRef.current.style.setProperty('--glow-opacity', '1')
  }, [])

  const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!cardRef.current) return
    const el = e.currentTarget as HTMLElement
    el.style.borderColor = 'rgba(255,255,255,0.06)'
    el.style.transform = 'scale(1) translateY(0)'
    el.style.boxShadow = 'none'
    if (cardRef.current) cardRef.current.style.setProperty('--glow-opacity', '0')
  }, [])

  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget as HTMLElement
    el.style.borderColor = 'rgba(255,255,255,0.18)'
    el.style.transform = 'scale(1.018) translateY(-4px)'
    el.style.boxShadow = `0 0 48px ${project.dot}1a, 0 24px 60px rgba(0,0,0,0.75)`
  }, [project.dot])

  const inner = (
    <div
      ref={cardRef}
      className={`group relative flex flex-col h-full overflow-hidden ${!isLive ? 'animate-shadow-pulse' : ''}`}
      onMouseMove={isLive ? handleMouseMove : undefined}
      onMouseEnter={isLive ? handleMouseEnter : undefined}
      onMouseLeave={isLive ? handleMouseLeave : undefined}
      style={{
        background: '#111111',
        border: '1px solid rgba(255,255,255,0.06)',
        cursor: isLive ? 'pointer' : 'default',
        transition: isLive
          ? 'transform 0.5s cubic-bezier(0.22,1,0.36,1), border-color 0.4s ease, box-shadow 0.5s ease'
          : undefined,
        /* cursor-follow glow via CSS vars */
        '--glow-x': '50%',
        '--glow-y': '50%',
        '--glow-opacity': '0',
      } as React.CSSProperties}
    >
      {/* Cursor-follow glow */}
      {isLive && (
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(280px circle at var(--glow-x) var(--glow-y), ${project.dot}12, transparent 70%)`,
            opacity: 'var(--glow-opacity)' as unknown as number,
            zIndex: 10,
          }}
        />
      )}

      {/* Thumbnail */}
      <div className="relative overflow-hidden" style={{ height: '220px', background: '#0d0d0d' }}>
        {/* Bg gradient */}
        <div
          className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
          style={{
            background: `linear-gradient(145deg, ${project.colors[0]} 0%, ${project.colors[1]} 52%, ${project.colors[2]}66 100%)`,
          }}
        />

        {/* Mockup */}
        {isLive
          ? <MacBookMockup colors={project.colors} dot={project.dot} />
          : <IPhoneMockup colors={project.colors} dot={project.dot} />
        }

        {/* Glassmorphism reflection */}
        <div
          className="absolute inset-x-0 top-0 h-1/2 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.025) 0%, transparent 100%)' }}
        />

        {/* Top accent */}
        <div className="absolute top-5 left-5 z-20" style={{ width: '28px', height: '1.5px', background: 'rgba(255,255,255,0.45)' }} />
        <span className="absolute top-4 right-5 font-mono text-[10px] z-20" style={{ color: 'rgba(255,255,255,0.18)' }}>
          {project.number}
        </span>
        <div className="absolute bottom-5 left-5 w-2 h-2 rounded-full animate-pulse-glow z-20" style={{ background: project.dot }} />

        {isLive ? <LiveOverlay /> : <ComingSoonOverlay dot={project.dot} />}
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-1 p-5 md:p-6" style={{ position: 'relative', zIndex: 1 }}>
        <div className="flex-1">
          <p className="text-[10px] tracking-[0.32em] mb-1.5 uppercase" style={{ color: '#484848' }}>
            {project.genre}
          </p>
          <h3 className="text-base md:text-lg font-bold text-white leading-snug mb-3">
            {project.title}
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[9px] tracking-[0.18em] px-2 py-0.5 uppercase"
                style={{ border: '1px solid rgba(255,255,255,0.07)', color: '#3a3a3a' }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <div
            className="h-[1px] transition-all duration-500 group-hover:w-12"
            style={{ width: '20px', background: project.dot }}
          />
          {isLive ? (
            <span
              className="text-[11px] tracking-[0.22em] uppercase transition-colors duration-300 group-hover:text-white"
              style={{ color: '#484848' }}
            >
              View Project →
            </span>
          ) : (
            <span className="text-[10px] tracking-[0.25em] font-mono" style={{ color: '#252525' }}>
              ─ ─ ─
            </span>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <motion.div
      className="flex flex-col h-full"
      initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: 0.9,
        delay: index * 0.09,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {isLive ? (
        <a
          href={project.url!}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col h-full"
          style={{ textDecoration: 'none' }}
        >
          {inner}
        </a>
      ) : (
        inner
      )}
    </motion.div>
  )
}

export default function Works() {
  return (
    <section id="works" className="py-24 md:py-40 px-5 md:px-12 bg-[#080808]">
      <div className="max-w-7xl mx-auto">
        <AnimateIn>
          <div className="mb-14 md:mb-20">
            <p className="text-[10px] tracking-[0.55em] text-zinc-600 mb-4 uppercase">
              Selected Works
            </p>
            <h2
              className="font-black text-white leading-none"
              style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', letterSpacing: '-0.02em' }}
            >
              Works
            </h2>
          </div>
        </AnimateIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
