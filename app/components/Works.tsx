'use client'
import AnimateIn from './AnimateIn'

const projects = [
  {
    id: 1,
    title: 'Pulse Festival',
    genre: 'Music Festival / Event',
    colors: ['#1a0010', '#8b0038', '#ff2d6b'],
    dot: '#ff2d6b',
    number: '01',
    url: 'https://aicmode.github.io/pulse/',
  },
  {
    id: 2,
    title: 'NOIR Café',
    genre: 'Café / Branding',
    colors: ['#0a0800', '#2a1f00', '#c9a227'],
    dot: '#c9a227',
    number: '02',
    url: 'https://aicmode.github.io/noir-cafe/',
  },
  {
    id: 3,
    title: 'Lumi Tails',
    genre: 'Pet Care / E-commerce',
    colors: ['#1a0020', '#5b1a8a', '#e879f9'],
    dot: '#e879f9',
    number: '03',
    url: 'https://aicmode.github.io/Lumi-Tails/',
  },
  {
    id: 4,
    title: 'AURA',
    genre: 'Beauty / Wellness',
    colors: ['#000d1a', '#0a2a4a', '#38bdf8'],
    dot: '#38bdf8',
    number: '04',
    url: null,
  },
  {
    id: 5,
    title: 'Tsuki Usagi Wagashi',
    genre: 'Japanese Sweets / Culture',
    colors: ['#0f0010', '#3d1060', '#c084fc'],
    dot: '#c084fc',
    number: '05',
    url: null,
  },
] as const

type Project = (typeof projects)[number]

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardContent = (
    <div
      className="group relative flex flex-col h-full overflow-hidden card-hover-glow"
      style={{
        background: '#111111',
        border: '1px solid rgba(255,255,255,0.06)',
        transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1), border-color 0.4s ease, box-shadow 0.4s ease',
        cursor: project.url ? 'pointer' : 'default',
      }}
      data-dot={project.dot}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = 'rgba(255,255,255,0.22)'
        el.style.transform = 'scale(1.025)'
        el.style.boxShadow = `0 0 32px ${project.dot}22, 0 8px 40px rgba(0,0,0,0.6)`
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = 'rgba(255,255,255,0.06)'
        el.style.transform = 'scale(1)'
        el.style.boxShadow = 'none'
      }}
    >
      {/* Thumbnail */}
      <div className="relative overflow-hidden" style={{ height: '220px' }}>
        <div
          className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
          style={{
            background: `linear-gradient(145deg, ${project.colors[0]} 0%, ${project.colors[1]} 50%, ${project.colors[2]} 100%)`,
          }}
        />
        <div
          className="absolute"
          style={{
            bottom: '-40px',
            right: '-40px',
            width: '180px',
            height: '180px',
            borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.12)',
          }}
        />
        <div
          className="absolute"
          style={{
            bottom: '-70px',
            right: '-70px',
            width: '260px',
            height: '260px',
            borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        />
        <div
          className="absolute top-5 left-5"
          style={{
            width: '36px',
            height: '1.5px',
            background: 'rgba(255,255,255,0.5)',
          }}
        />
        <span
          className="absolute top-4 right-5 font-mono text-[11px]"
          style={{ color: 'rgba(255,255,255,0.25)' }}
        >
          {project.number}
        </span>
        <div
          className="absolute bottom-5 left-5 w-2 h-2 rounded-full animate-pulse-glow"
          style={{ background: project.dot }}
        />
        {/* External link indicator */}
        {project.url && (
          <div
            className="absolute top-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: 'rgba(0,0,0,0.6)',
              backdropFilter: 'blur(8px)',
              padding: '4px 12px',
              border: '1px solid rgba(255,255,255,0.15)',
            }}
          >
            <span className="text-[9px] tracking-[0.3em] text-white/60 uppercase">Open Site</span>
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-1 p-5 md:p-6">
        <div className="flex-1">
          <p
            className="text-[10px] tracking-[0.3em] mb-2 uppercase"
            style={{ color: '#525252' }}
          >
            {project.genre}
          </p>
          <h3 className="text-base md:text-lg font-bold text-white leading-snug">
            {project.title}
          </h3>
        </div>
        <div className="mt-5 md:mt-6 flex items-center justify-between">
          <div
            className="h-[1px] transition-all duration-500 group-hover:w-10"
            style={{ width: '24px', background: project.dot }}
          />
          <span
            className="text-[11px] tracking-[0.2em] uppercase transition-colors duration-300"
            style={{ color: project.url ? '#525252' : '#303030' }}
          >
            {project.url ? 'View Project →' : 'Coming Soon'}
          </span>
        </div>
      </div>
    </div>
  )

  return (
    <AnimateIn delay={index * 90} className="flex flex-col h-full">
      {project.url ? (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col h-full"
          style={{ textDecoration: 'none' }}
        >
          {cardContent}
        </a>
      ) : (
        cardContent
      )}
    </AnimateIn>
  )
}

export default function Works() {
  return (
    <section
      id="works"
      className="py-24 md:py-40 px-5 md:px-12 bg-[#080808]"
    >
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
