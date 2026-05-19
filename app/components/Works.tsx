'use client'
import AnimateIn from './AnimateIn'

const projects = [
  {
    id: 1,
    title: 'Pulse Festival',
    genre: 'Music Festival / Event',
    tags: ['Music', 'Event', 'Web'],
    colors: ['#1a0010', '#8b0038', '#ff2d6b'],
    dot: '#ff2d6b',
    number: '01',
    url: 'https://aicmode.github.io/pulse/',
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
  },
] as const

type Project = (typeof projects)[number]

function LiveOverlay() {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400"
      style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(3px)' }}
    >
      <div
        className="flex items-center gap-2.5 px-5 py-2.5"
        style={{
          border: '1px solid rgba(255,255,255,0.28)',
          background: 'rgba(255,255,255,0.08)',
          backdropFilter: 'blur(12px)',
          transition: 'all 0.3s ease',
        }}
      >
        <span className="text-[11px] tracking-[0.35em] text-white font-medium uppercase">Live Site</span>
        <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 7l-10 10M17 7H7m10 0v10" />
        </svg>
      </div>
    </div>
  )
}

function ComingSoonOverlay({ dot }: { dot: string }) {
  return (
    <>
      {/* Scanlines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.18) 3px, rgba(0,0,0,0.18) 4px)',
        }}
      />
      {/* Moving scan light */}
      <div
        className="absolute inset-x-0 h-28 pointer-events-none scan-line"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.035) 50%, transparent 100%)',
        }}
      />
      {/* Badge */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <span
          className="text-[9px] tracking-[0.5em] uppercase px-4 py-1.5 block text-center whitespace-nowrap"
          style={{
            border: `1px solid ${dot}50`,
            color: dot,
            background: `${dot}12`,
            backdropFilter: 'blur(4px)',
          }}
        >
          In Production
        </span>
      </div>
    </>
  )
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const isLive = !!project.url

  const inner = (
    <div
      className={`group relative flex flex-col h-full overflow-hidden ${!isLive ? 'animate-shadow-pulse' : ''}`}
      style={{
        background: '#111111',
        border: '1px solid rgba(255,255,255,0.06)',
        transition: isLive
          ? 'transform 0.45s cubic-bezier(0.22,1,0.36,1), border-color 0.4s ease, box-shadow 0.45s ease'
          : undefined,
        cursor: isLive ? 'pointer' : 'default',
      }}
      onMouseEnter={
        isLive
          ? (e) => {
              const el = e.currentTarget as HTMLElement
              el.style.borderColor = 'rgba(255,255,255,0.2)'
              el.style.transform = 'scale(1.022) translateY(-3px)'
              el.style.boxShadow = `0 0 44px ${project.dot}22, 0 24px 64px rgba(0,0,0,0.7)`
            }
          : undefined
      }
      onMouseLeave={
        isLive
          ? (e) => {
              const el = e.currentTarget as HTMLElement
              el.style.borderColor = 'rgba(255,255,255,0.06)'
              el.style.transform = 'scale(1) translateY(0)'
              el.style.boxShadow = 'none'
            }
          : undefined
      }
    >
      {/* Thumbnail */}
      <div className="relative overflow-hidden" style={{ height: '220px' }}>
        <div
          className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
          style={{
            background: `linear-gradient(145deg, ${project.colors[0]} 0%, ${project.colors[1]} 50%, ${project.colors[2]} 100%)`,
          }}
        />

        {isLive ? <LiveOverlay /> : <ComingSoonOverlay dot={project.dot} />}

        {/* Decorative rings */}
        <div className="absolute" style={{ bottom: '-40px', right: '-40px', width: '180px', height: '180px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)' }} />
        <div className="absolute" style={{ bottom: '-72px', right: '-72px', width: '268px', height: '268px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.05)' }} />

        {/* Top accent */}
        <div className="absolute top-5 left-5" style={{ width: '32px', height: '1.5px', background: 'rgba(255,255,255,0.5)' }} />
        <span className="absolute top-4 right-5 font-mono text-[10px]" style={{ color: 'rgba(255,255,255,0.22)' }}>
          {project.number}
        </span>
        <div className="absolute bottom-5 left-5 w-2 h-2 rounded-full animate-pulse-glow" style={{ background: project.dot }} />
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-1 p-5 md:p-6">
        <div className="flex-1">
          <p className="text-[10px] tracking-[0.32em] mb-1.5 uppercase" style={{ color: '#484848' }}>
            {project.genre}
          </p>
          <h3 className="text-base md:text-lg font-bold text-white leading-snug mb-3">
            {project.title}
          </h3>
          {/* Tags */}
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
    <AnimateIn delay={index * 85} className="flex flex-col h-full">
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
    </AnimateIn>
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
