'use client'
import AnimateIn from './AnimateIn'

const skills = [
  { label: 'HTML' },
  { label: 'CSS' },
  { label: 'JavaScript' },
  { label: 'Next.js' },
  { label: 'Tailwind' },
  { label: 'AI Design' },
  { label: 'GitHub' },
]

export default function Skills() {
  return (
    <section className="py-20 md:py-40 px-5 md:px-12 bg-[#080808]">
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
            <AnimateIn key={skill.label} delay={i * 70}>
              <SkillTag label={skill.label} />
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}

function SkillTag({ label }: { label: string }) {
  return (
    <div
      className="group px-5 md:px-7 py-3 md:py-3.5 cursor-default"
      style={{
        border: '1px solid rgba(255,255,255,0.07)',
        background: 'rgba(255,255,255,0.02)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        transition: 'border-color 0.35s ease, background 0.35s ease, box-shadow 0.35s ease',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = 'rgba(255,255,255,0.25)'
        el.style.background = 'rgba(255,255,255,0.05)'
        el.style.boxShadow = '0 0 16px rgba(255,255,255,0.04)'
        const span = el.querySelector('span') as HTMLElement
        if (span) span.style.color = '#f0f0f0'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = 'rgba(255,255,255,0.07)'
        el.style.background = 'rgba(255,255,255,0.02)'
        el.style.boxShadow = 'none'
        const span = el.querySelector('span') as HTMLElement
        if (span) span.style.color = '#737373'
      }}
    >
      <span
        className="text-sm font-medium tracking-wide"
        style={{ color: '#737373', transition: 'color 0.3s ease' }}
      >
        {label}
      </span>
    </div>
  )
}
