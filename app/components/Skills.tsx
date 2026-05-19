'use client'
import AnimateIn from './AnimateIn'

const skills = [
  { label: 'HTML',       icon: '</>' },
  { label: 'CSS',        icon: '{ }' },
  { label: 'JavaScript', icon: 'JS' },
  { label: 'Next.js',    icon: '▲' },
  { label: 'Tailwind',   icon: '~' },
  { label: 'AI Design',  icon: '✦' },
  { label: 'GitHub',     icon: '⊙' },
]

function SkillTag({ label, icon }: { label: string; icon: string }) {
  return (
    <div
      className="group flex items-center gap-3 px-5 md:px-6 py-3 md:py-3.5 cursor-default"
      style={{
        border: '1px solid rgba(255,255,255,0.07)',
        background: 'rgba(255,255,255,0.02)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        transition: 'border-color 0.35s ease, background 0.35s ease, box-shadow 0.35s ease, transform 0.35s cubic-bezier(0.22,1,0.36,1)',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = 'rgba(255,255,255,0.22)'
        el.style.background = 'rgba(255,255,255,0.05)'
        el.style.boxShadow = '0 0 24px rgba(109,40,217,0.12), 0 0 48px rgba(37,99,235,0.06)'
        el.style.transform = 'translateY(-2px)'
        const els = el.querySelectorAll('[data-icon],[data-label]') as NodeListOf<HTMLElement>
        els.forEach((s) => { s.style.color = '#f0f0f0' })
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
        className="font-mono text-[11px] w-6 text-center flex-shrink-0"
        style={{ color: '#333333', transition: 'color 0.3s ease', letterSpacing: '0' }}
      >
        {icon}
      </span>
      <span
        data-label
        className="text-sm font-medium tracking-wide"
        style={{ color: '#686868', transition: 'color 0.3s ease' }}
      >
        {label}
      </span>
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
              Tech Stack
            </p>
            <h2
              className="font-black text-white leading-none"
              style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', letterSpacing: '-0.02em' }}
            >
              Skills
            </h2>
          </div>
        </AnimateIn>

        <div className="flex flex-wrap gap-2 md:gap-3">
          {skills.map((skill, i) => (
            <AnimateIn key={skill.label} delay={i * 65}>
              <SkillTag label={skill.label} icon={skill.icon} />
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}
