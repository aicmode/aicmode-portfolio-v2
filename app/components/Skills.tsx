'use client'
import AnimateIn from './AnimateIn'

const techStack = [
  { label: 'HTML',       icon: '</>' },
  { label: 'CSS',        icon: '{ }' },
  { label: 'JavaScript', icon: 'JS'  },
  { label: 'GitHub',     icon: '⊙'  },
  { label: 'Vercel',     icon: '▲'  },
]

const creativeSkills = [
  { label: 'AI Design',           icon: '✦' },
  { label: 'Prompt Engineering',  icon: '◈' },
  { label: 'UI / UX',             icon: '⊞' },
  { label: 'Landing Page Design', icon: '⬒' },
]

function SkillCard({ label, icon }: { label: string; icon: string }) {
  return (
    <div
      className="flex items-center gap-2 px-2 sm:px-5 py-3.5 cursor-default w-full min-h-[48px]"
      style={{
        border: '1px solid rgba(255,255,255,0.07)',
        background: 'rgba(255,255,255,0.02)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        transition:
          'border-color 0.35s ease, background 0.35s ease, box-shadow 0.35s ease, transform 0.35s cubic-bezier(0.22,1,0.36,1)',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = 'rgba(255,255,255,0.22)'
        el.style.background = 'rgba(255,255,255,0.05)'
        el.style.boxShadow =
          '0 0 24px rgba(109,40,217,0.12), 0 0 48px rgba(37,99,235,0.06)'
        el.style.transform = 'translateY(-2px)'
        const els = el.querySelectorAll(
          '[data-icon],[data-label]'
        ) as NodeListOf<HTMLElement>
        els.forEach((s) => {
          s.style.color = '#f0f0f0'
        })
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = 'rgba(255,255,255,0.07)'
        el.style.background = 'rgba(255,255,255,0.02)'
        el.style.boxShadow = 'none'
        el.style.transform = 'translateY(0)'
        const iconEl = el.querySelector('[data-icon]') as HTMLElement
        const labelEl = el.querySelector('[data-label]') as HTMLElement
        if (iconEl) iconEl.style.color = '#333333'
        if (labelEl) labelEl.style.color = '#686868'
      }}
    >
      <span
        data-icon
        className="font-mono text-[11px] w-6 text-center flex-shrink-0 overflow-hidden"
        style={{ color: '#333333', transition: 'color 0.3s ease', letterSpacing: '0' }}
      >
        {icon}
      </span>
      <span
        data-label
        className="text-[10px] sm:text-sm font-medium tracking-wide min-w-0 overflow-hidden whitespace-nowrap sm:whitespace-normal"
        style={{ color: '#686868', transition: 'color 0.3s ease' }}
      >
        {label}
      </span>
    </div>
  )
}

function SkillGroup({
  title,
  items,
  gridClass,
  startDelay = 0,
}: {
  title: string
  items: { label: string; icon: string }[]
  gridClass: string
  startDelay?: number
}) {
  return (
    <div>
      <AnimateIn delay={startDelay}>
        <p
          className="text-[9px] tracking-[0.45em] uppercase mb-4"
          style={{ color: '#383838' }}
        >
          {title}
        </p>
      </AnimateIn>
      <div className={`grid gap-2 md:gap-3 ${gridClass}`}>
        {items.map((skill, i) => (
          <AnimateIn key={skill.label} delay={startDelay + 60 + i * 60}>
            <SkillCard label={skill.label} icon={skill.icon} />
          </AnimateIn>
        ))}
      </div>
    </div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="py-20 md:py-40 px-5 md:px-12 bg-[#080808]">
      <div className="max-w-7xl mx-auto">
        <AnimateIn>
          <div className="mb-12 md:mb-20">
            <p className="text-[10px] tracking-[0.55em] text-zinc-600 mb-4 uppercase">
              Capabilities
            </p>
            <h2
              className="font-black text-white leading-none"
              style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', letterSpacing: '-0.02em' }}
            >
              Skills
            </h2>
          </div>
        </AnimateIn>

        <div className="flex flex-col gap-10 md:gap-14">
          <SkillGroup title="Tech Stack" items={techStack} gridClass="grid-cols-2 sm:grid-cols-3 lg:grid-cols-5" startDelay={0} />
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }} />
          <SkillGroup title="Creative Skills" items={creativeSkills} gridClass="grid-cols-2 lg:grid-cols-4" startDelay={320} />
        </div>
      </div>
    </section>
  )
}
