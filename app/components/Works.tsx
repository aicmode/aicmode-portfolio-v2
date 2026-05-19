'use client'
import { useRef, useCallback, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AnimateIn from './AnimateIn'

/* ── Icons ── */
function LaptopIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-3.5 h-3.5 flex-shrink-0">
      <rect x="2" y="3" width="20" height="14" rx="2" strokeWidth="1.5" />
      <path d="M2 20h20" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-3 h-3 flex-shrink-0">
      <rect x="5" y="2" width="14" height="20" rx="3" strokeWidth="1.5" />
      <circle cx="12" cy="18.5" r="0.75" fill="currentColor" strokeWidth="0" />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg className="w-2.5 h-2.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 7l-10 10M17 7H7m10 0v10" />
    </svg>
  )
}

/* ── Data ── */
interface ProjectData {
  id: number
  title: string
  genre: string
  tags: readonly string[]
  colors: readonly [string, string, string]
  dot: string
  number: string
  url: string | null
  defaultPreview: 'desktop' | 'mobile'
}

const projects: readonly ProjectData[] = [
  {
    id: 1,
    title: 'Pulse Festival',
    genre: 'Music Festival / Event',
    tags: ['Music', 'Event', 'Web'],
    colors: ['#1a0010', '#8b0038', '#ff2d6b'],
    dot: '#ff2d6b',
    number: '01',
    url: 'https://aicmode.github.io/pulse/',
    defaultPreview: 'desktop',
  },
  {
    id: 2,
    title: 'NOIR Café',
    genre: 'Café / Branding',
    tags: ['Branding', 'F&B', 'Web'],
    colors: ['#0a0800', '#2a1f00', '#c9a227'],
    dot: '#c9a227',
    number: '02',
    url: 'https://aicmode.github.io/noir-cafe/',
    defaultPreview: 'desktop',
  },
  {
    id: 3,
    title: 'Lumi Tails',
    genre: 'Pet Care / E-commerce',
    tags: ['E-commerce', 'Pet', 'Web'],
    colors: ['#1a0020', '#5b1a8a', '#e879f9'],
    dot: '#e879f9',
    number: '03',
    url: 'https://aicmode.github.io/Lumi-Tails/',
    defaultPreview: 'desktop',
  },
  {
    id: 4,
    title: 'AURA',
    genre: 'Beauty / Wellness',
    tags: ['Beauty', 'Wellness', 'Brand'],
    colors: ['#000d1a', '#0a2a4a', '#38bdf8'],
    dot: '#38bdf8',
    number: '04',
    url: null,
    defaultPreview: 'mobile',
  },
  {
    id: 5,
    title: 'Tsuki Usagi Wagashi',
    genre: 'Japanese Sweets / Culture',
    tags: ['Japanese', 'Culture', 'EC'],
    colors: ['#0f0010', '#3d1060', '#c084fc'],
    dot: '#c084fc',
    number: '05',
    url: null,
    defaultPreview: 'mobile',
  },
]

/* ── MacBook mockup ── */
function MacBookMockup({ colors, dot }: { colors: readonly [string, string, string]; dot: string }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ padding: '18px 20px 10px' }}>
      <div className="w-full" style={{ maxWidth: '260px' }}>
        <div style={{
          background: '#181818',
          borderRadius: '7px 7px 0 0',
          border: '1.5px solid rgba(255,255,255,0.1)',
          padding: '5px 5px 0',
          boxShadow: '0 12px 40px rgba(0,0,0,0.7), 0 0 0 0.5px rgba(255,255,255,0.04) inset',
        }}>
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
            {(['#ff5f57', '#febc2e', '#28c840'] as const).map((c, i) => (
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
          <div style={{
            height: '108px',
            background: `linear-gradient(155deg, ${colors[0]} 0%, ${colors[1]} 52%, ${colors[2]}55 100%)`,
            overflow: 'hidden',
            position: 'relative',
          }}>
            <div style={{ padding: '8px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ width: '26px', height: '5px', background: 'rgba(255,255,255,0.55)', borderRadius: '2px' }} />
              <div style={{ display: 'flex', gap: '7px' }}>
                {[0, 1, 2].map(i => <div key={i} style={{ width: '16px', height: '3.5px', background: 'rgba(255,255,255,0.2)', borderRadius: '2px' }} />)}
              </div>
            </div>
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
            <div style={{ display: 'flex', gap: '4px', padding: '8px 10px 0' }}>
              {[0.1, 0.06, 0.04].map((o, i) => (
                <div key={i} style={{
                  flex: i === 0 ? 2 : 1, height: '22px',
                  background: `rgba(255,255,255,${o})`,
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '3px',
                }} />
              ))}
            </div>
            <div className="animate-shimmer" style={{
              position: 'absolute', top: 0, bottom: 0, width: '40%',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)',
              pointerEvents: 'none',
            }} />
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, height: '28px',
              background: `linear-gradient(to bottom, transparent, ${colors[0]}dd)`,
            }} />
          </div>
        </div>
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
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{
            width: '56px', height: '5px',
            background: 'linear-gradient(to bottom, #181818, #101010)',
            clipPath: 'polygon(8% 0%, 92% 0%, 100% 100%, 0% 100%)',
          }} />
        </div>
        <div style={{ height: '4px', background: '#0e0e0e', borderRadius: '0 0 4px 4px', margin: '0 -6px' }} />
        <div style={{
          marginTop: '2px', height: '18px',
          background: `radial-gradient(ellipse at 50% 0%, ${dot}18 0%, transparent 70%)`,
          filter: 'blur(6px)',
        }} />
      </div>
    </div>
  )
}

/* ── iPhone mockup (card) ── */
function IPhoneMockup({ colors, dot }: { colors: readonly [string, string, string]; dot: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center" style={{ padding: '16px 0 12px' }}>
      <div style={{ width: '88px', position: 'relative' }}>
        <div style={{
          background: 'linear-gradient(160deg, #1e1e1e, #141414)',
          border: '1.5px solid rgba(255,255,255,0.1)',
          borderRadius: '20px',
          padding: '6px 4px',
          boxShadow: '0 12px 40px rgba(0,0,0,0.7)',
        }}>
          <div style={{ width: '28px', height: '8px', background: '#000', borderRadius: '6px', margin: '0 auto 4px' }} />
          <div style={{
            height: '130px',
            borderRadius: '12px',
            background: `linear-gradient(160deg, ${colors[0]} 0%, ${colors[1]} 55%, ${colors[2]}55 100%)`,
            overflow: 'hidden',
            position: 'relative',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 8px 4px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ width: '16px', height: '3px', background: 'rgba(255,255,255,0.4)', borderRadius: '2px' }} />
              <div style={{ display: 'flex', gap: '3px' }}>
                {[0, 1, 2].map(i => <div key={i} style={{ width: '5px', height: '3px', background: 'rgba(255,255,255,0.25)', borderRadius: '1px' }} />)}
              </div>
            </div>
            <div style={{ padding: '10px 8px' }}>
              <div style={{ width: '65%', height: '7px', background: 'rgba(255,255,255,0.6)', borderRadius: '2px', marginBottom: '4px' }} />
              <div style={{ width: '45%', height: '4px', background: 'rgba(255,255,255,0.25)', borderRadius: '2px', marginBottom: '10px' }} />
              <div style={{ width: '100%', height: '48px', background: 'rgba(255,255,255,0.05)', border: `1px solid ${dot}22`, borderRadius: '6px', marginBottom: '6px' }} />
              <div style={{ display: 'flex', gap: '4px' }}>
                {[0.09, 0.06].map((o, i) => (
                  <div key={i} style={{ flex: 1, height: '22px', background: `rgba(255,255,255,${o})`, borderRadius: '4px', border: '1px solid rgba(255,255,255,0.06)' }} />
                ))}
              </div>
            </div>
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, height: '24px',
              background: `linear-gradient(to bottom, transparent, ${colors[0]}ee)`,
            }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', padding: '5px 0 2px' }}>
            <div style={{ width: '22px', height: '3px', background: 'rgba(255,255,255,0.25)', borderRadius: '2px' }} />
          </div>
        </div>
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

/* ── Live overlay ── */
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
        }}
      >
        <span className="text-[10px] tracking-[0.38em] text-white font-medium uppercase">Live Site</span>
        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 7l-10 10M17 7H7m10 0v10" />
        </svg>
      </div>
    </div>
  )
}

/* ── Coming soon overlay ── */
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
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100" style={{ transition: 'opacity 0.4s ease' }}>
        <span
          className="text-[9px] tracking-[0.5em] uppercase px-4 py-1.5 block text-center whitespace-nowrap"
          style={{
            border: `1px solid ${dot}50`,
            color: dot,
            background: `${dot}10`,
            backdropFilter: 'blur(6px)',
          }}
        >
          Preview Design
        </span>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:opacity-0" style={{ transition: 'opacity 0.4s ease' }}>
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

/* ── Preview toggle button ── */
function ToggleBtn({
  active,
  dot,
  onClick,
  label,
  children,
}: {
  active: boolean
  dot: string
  onClick: () => void
  label: string
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex items-center justify-center"
      style={{
        width: '34px',
        height: '34px',
        border: 'none',
        cursor: 'pointer',
        borderRadius: '5px',
        color: active ? dot : 'rgba(255,255,255,0.18)',
        background: active ? `${dot}14` : 'transparent',
        boxShadow: active ? `0 0 10px ${dot}55, 0 0 22px ${dot}22` : 'none',
        transition: 'color 0.25s ease, background-color 0.25s ease, box-shadow 0.25s ease',
      }}
    >
      {children}
    </button>
  )
}

/* ── Slide navigation ── */
function SlideNav({
  activeIndex,
  onNavigate,
}: {
  activeIndex: number
  onNavigate: (i: number) => void
}) {
  return (
    <div
      className="mt-12 md:mt-16 pt-8 md:pt-10 flex items-center gap-5"
      style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
    >
      <span className="text-[7px] tracking-[0.5em] text-zinc-700 uppercase hidden sm:block">
        Project
      </span>

      <div className="flex items-center gap-3">
        {projects.map((p, i) => {
          const isActive = i === activeIndex
          return (
            <button
              key={p.id}
              onClick={() => onNavigate(i)}
              aria-label={`Navigate to ${p.title}`}
              className="relative py-2 cursor-pointer"
            >
              <motion.div
                style={{
                  height: '2px',
                  borderRadius: '2px',
                  background: isActive ? p.dot : 'rgba(255,255,255,0.1)',
                  boxShadow: isActive
                    ? `0 0 8px ${p.dot}, 0 0 18px ${p.dot}70`
                    : 'none',
                }}
                animate={{ width: isActive ? 44 : 18 }}
                whileHover={{
                  width: isActive ? 44 : 30,
                  background: isActive ? p.dot : 'rgba(255,255,255,0.28)',
                  boxShadow: `0 0 6px ${p.dot}80`,
                }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              />
            </button>
          )
        })}
      </div>

      {/* Active label */}
      <div className="hidden md:flex items-center gap-2 ml-1">
        <span className="font-mono text-[7px] tracking-[0.4em] text-zinc-700 uppercase">
          {projects[activeIndex]?.number}
        </span>
        <span className="text-[7px] tracking-[0.3em] text-zinc-700 uppercase">
          {projects[activeIndex]?.title.toUpperCase()}
        </span>
      </div>
    </div>
  )
}

/* ── Project card ── */
function ProjectCard({
  project,
  index,
  onScrollNext,
  setRef,
}: {
  project: ProjectData
  index: number
  onScrollNext: () => void
  setRef: (el: HTMLDivElement | null) => void
}) {
  const isLive = !!project.url
  const isLast = index === projects.length - 1
  const nextProject = !isLast ? projects[index + 1] : null
  const cardRef = useRef<HTMLDivElement | null>(null)
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>(project.defaultPreview)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    cardRef.current.style.setProperty('--glow-x', `${e.clientX - rect.left}px`)
    cardRef.current.style.setProperty('--glow-y', `${e.clientY - rect.top}px`)
    cardRef.current.style.setProperty('--glow-opacity', '1')
  }, [])

  const handleMouseEnter = useCallback(() => {
    if (!cardRef.current) return
    cardRef.current.style.borderColor = 'rgba(255,255,255,0.18)'
    cardRef.current.style.transform = 'scale(1.018) translateY(-4px)'
    cardRef.current.style.boxShadow = `0 0 48px ${project.dot}1a, 0 24px 60px rgba(0,0,0,0.75)`
  }, [project.dot])

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return
    cardRef.current.style.borderColor = 'rgba(255,255,255,0.06)'
    cardRef.current.style.transform = 'scale(1) translateY(0)'
    cardRef.current.style.boxShadow = 'none'
    cardRef.current.style.setProperty('--glow-opacity', '0')
  }, [])

  const mockupContent = (
    <>
      {/* Animated mockup */}
      <AnimatePresence mode="wait">
        {previewMode === 'desktop' ? (
          <motion.div
            key="desktop"
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          >
            <MacBookMockup colors={project.colors} dot={project.dot} />
          </motion.div>
        ) : (
          <motion.div
            key="mobile"
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          >
            <IPhoneMockup colors={project.colors} dot={project.dot} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Static decorations */}
      <div
        className="absolute inset-x-0 top-0 h-1/2 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.025) 0%, transparent 100%)' }}
      />
      <div className="absolute top-5 left-5 z-20" style={{ width: '28px', height: '1.5px', background: 'rgba(255,255,255,0.45)' }} />
      <span className="absolute top-4 right-２font-mono text-[10px] z-20" style={{ color: 'rgba(255,255,255,0.18)' }}>
        {project.number}
      </span>
      <div className="absolute bottom-5 left-5 w-2 h-2 rounded-full animate-pulse-glow z-20" style={{ background: project.dot }} />
      {isLive ? <LiveOverlay /> : <ComingSoonOverlay dot={project.dot} />}
    </>
  )

  return (
    <motion.div
      className="flex flex-col h-full"
      initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.9, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        ref={el => { cardRef.current = el; setRef(el) }}
        className={`group relative flex flex-col h-full overflow-hidden ${!isLive ? 'animate-shadow-pulse' : ''}`}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          background: '#111111',
          border: '1px solid rgba(255,255,255,0.06)',
          transition: 'transform 0.5s cubic-bezier(0.22,1,0.36,1), border-color 0.4s ease, box-shadow 0.5s ease',
          '--glow-x': '50%',
          '--glow-y': '50%',
          '--glow-opacity': '0',
        } as React.CSSProperties}
      >
        {/* Cursor-follow glow */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(280px circle at var(--glow-x) var(--glow-y), ${project.dot}12, transparent 70%)`,
            opacity: 'var(--glow-opacity)' as unknown as number,
            zIndex: 10,
          }}
        />

        {/* Thumbnail */}
        {isLive ? (
          <a
            href={project.url!}
            target="_blank"
            rel="noopener noreferrer"
            className="relative overflow-hidden block"
            style={{ height: '220px', background: `linear-gradient(145deg, ${project.colors[0]} 0%, ${project.colors[1]} 52%, ${project.colors[2]}66 100%)`, textDecoration: 'none', flexShrink: 0 }}
          >
            {mockupContent}
          </a>
        ) : (
          <div
            className="relative overflow-hidden"
            style={{ height: '220px', background: `linear-gradient(145deg, ${project.colors[0]} 0%, ${project.colors[1]} 52%, ${project.colors[2]}66 100%)`, flexShrink: 0 }}
          >
            {mockupContent}
          </div>
        )}

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
              {project.tags.map(tag => (
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

          {/* Footer */}
          <div className="mt-5">
            {/* Action row */}
            <div className="flex items-center justify-between gap-3">

              {/* Left: live site link or coming soon badge */}
              <div className="flex items-center gap-2 min-w-0">
                <div style={{ width: '14px', height: '1px', background: project.dot, flexShrink: 0 }} />
                {isLive ? (
                  <a
                    href={project.url!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-[8px] tracking-[0.28em] uppercase px-2.5 py-1.5 whitespace-nowrap"
                    style={{
                      border: '1px solid rgba(255,255,255,0.09)',
                      color: 'rgba(255,255,255,0.35)',
                      textDecoration: 'none',
                      transition: 'color 0.25s ease, border-color 0.25s ease',
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLAnchorElement
                      el.style.color = 'rgba(255,255,255,0.85)'
                      el.style.borderColor = 'rgba(255,255,255,0.24)'
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLAnchorElement
                      el.style.color = 'rgba(255,255,255,0.35)'
                      el.style.borderColor = 'rgba(255,255,255,0.09)'
                    }}
                  >
                    <span>Live Site</span>
                    <ArrowIcon />
                  </a>
                ) : (
                  <span
                    className="text-[8px] tracking-[0.28em] uppercase px-2.5 py-1.5 whitespace-nowrap select-none"
                    style={{
                      border: `1px solid ${project.dot}28`,
                      color: `${project.dot}55`,
                      pointerEvents: 'none',
                    }}
                  >
                    Coming Soon
                  </span>
                )}
              </div>

              {/* Right: desktop / mobile preview toggle */}
              <div className="flex items-center gap-0.5 flex-shrink-0">
                <ToggleBtn
                  active={previewMode === 'desktop'}
                  dot={project.dot}
                  onClick={() => setPreviewMode('desktop')}
                  label="Desktop preview"
                >
                  <LaptopIcon />
                </ToggleBtn>
                <div style={{ width: '1px', height: '14px', background: 'rgba(255,255,255,0.06)' }} />
                <ToggleBtn
                  active={previewMode === 'mobile'}
                  dot={project.dot}
                  onClick={() => setPreviewMode('mobile')}
                  label="Mobile preview"
                >
                  <PhoneIcon />
                </ToggleBtn>
              </div>
            </div>

            {/* Next project navigation */}
            {!isLast && nextProject && (
              <button
                onClick={onScrollNext}
                className="w-full flex items-center justify-between mt-4 pt-4 group/next"
                style={{
                  background: 'none',
                  border: 'none',
                  borderTop: '1px solid rgba(255,255,255,0.04)',
                  cursor: 'pointer',
                  padding: '16px 0 0',
                }}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="text-[7px] tracking-[0.5em] uppercase font-mono group-hover/next:text-zinc-500 transition-colors duration-300"
                    style={{ color: '#282828' }}
                  >
                    Next
                  </span>
                  <span
                    className="text-[7px] tracking-[0.28em] uppercase group-hover/next:text-zinc-400 transition-colors duration-300"
                    style={{ color: '#242424' }}
                  >
                    {nextProject.title}
                  </span>
                </div>
                <motion.div
                  className="flex items-center gap-1"
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.25 }}
                >
                  {[0, 1, 2].map(i => (
                    <motion.div
                      key={i}
                      style={{
                        width: '12px',
                        height: '1.5px',
                        borderRadius: '1px',
                        background: project.dot,
                      }}
                      animate={{
                        opacity: [0.25, 0.65, 0.25],
                        boxShadow: [
                          `0 0 3px ${project.dot}00`,
                          `0 0 8px ${project.dot}90, 0 0 16px ${project.dot}50`,
                          `0 0 3px ${project.dot}00`,
                        ],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: i * 0.3,
                      }}
                    />
                  ))}
                </motion.div>
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ── Works section ── */
export default function Works() {
  const [activeIndex, setActiveIndex] = useState(0)
  const cardRefs = useRef<(HTMLDivElement | null)[]>(Array(projects.length).fill(null) as (HTMLDivElement | null)[])

  useEffect(() => {
    const refs = cardRefs.current
    const observers = refs.map((ref, i) => {
      if (!ref) return null
      const obs = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) setActiveIndex(i)
          })
        },
        { threshold: 0.5, rootMargin: '-10% 0px -40% 0px' }
      )
      obs.observe(ref)
      return obs
    })
    return () => observers.forEach(o => o?.disconnect())
  }, [])

  const scrollToCard = useCallback((index: number) => {
    const el = cardRefs.current[index]
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.15
    window.scrollTo({ top, behavior: 'smooth' })
    setActiveIndex(index)
  }, [])

  return (
    <section id="works" className="py-24 md:py-40 px-5 md:px-12 bg-[#080808]">
      <div className="max-w-7xl mx-auto">

        {/* ── Header ── */}
        <AnimateIn>
          <div className="mb-14 md:mb-20">
            <div className="flex items-center gap-4 mb-5">
              <p className="text-[10px] tracking-[0.55em] text-zinc-600 uppercase">
                Selected Works
              </p>
              <div style={{
                flex: 1,
                height: '1px',
                background: 'linear-gradient(to right, rgba(255,255,255,0.06), transparent)',
                maxWidth: '100px',
              }} />
              <span className="font-mono text-[10px] text-zinc-700">
                {String(projects.length).padStart(2, '0')}
              </span>
            </div>
            <h2
              className="font-black text-white leading-none mb-4"
              style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', letterSpacing: '-0.02em' }}
            >
              Works
            </h2>
            <p className="text-[11px] tracking-[0.2em] uppercase" style={{ color: '#2a2a2a' }}>
              Web Design · Branding · Creative Direction
            </p>
          </div>
        </AnimateIn>

        {/* ── Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onScrollNext={() => scrollToCard(Math.min(i + 1, projects.length - 1))}
              setRef={el => { cardRefs.current[i] = el }}
            />
          ))}
        </div>

        {/* ── Slide navigation ── */}
        <AnimateIn delay={200}>
          <SlideNav activeIndex={activeIndex} onNavigate={scrollToCard} />
        </AnimateIn>
      </div>
    </section>
  )
}
