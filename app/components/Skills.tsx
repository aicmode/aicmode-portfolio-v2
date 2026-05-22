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
  {
    title: 'AI Web Design',
    description: 'AIを活用したWebサイトデザイン制作。\nブランドの世界観や雰囲気を設計し、魅力的なサイトを構築。',
    icon: '✦',
  },
  {
    title: 'Prompt Engineering',
    description: 'AIへ最適な指示を出し、高品質なデザイン・構成・コンテンツを生成。',
    icon: '◈',
  },
  {
    title: 'UI / UX Thinking',
    description: 'ユーザー目線で使いやすさを考えた設計。\nスマホ対応や導線設計を重視。',
    icon: '⊞',
  },
  {
    title: 'Creative Direction',
    description: 'コンセプト設計からデザイン監修まで担当。\nブランドの魅力を最大限に引き出すクリエイティブ設計。',
    icon: '⬒',
  },
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

function CreativeSkillCard({ title, description, icon }: { title: string; description: string; icon: string }) {
  return (
    <div
      className="flex flex-col gap-3 p-5 sm:p-6 cursor-default w-full h-full"
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
        const iconEl = el.querySelector('[data-icon]') as HTMLElement
        const titleEl = el.querySelector('[data-title]') as HTMLElement
        const descEl = el.querySelector('[data-desc]') as HTMLElement
        if (iconEl) iconEl.style.color = '#f0f0f0'
        if (titleEl) titleEl.style.color = '#f0f0f0'
        if (descEl) descEl.style.color = '#a0a0a0'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = 'rgba(255,255,255,0.07)'
        el.style.background = 'rgba(255,255,255,0.02)'
        el.style.boxShadow = 'none'
        el.style.transform = 'translateY(0)'
        const iconEl = el.querySelector('[data-icon]') as HTMLElement
        const titleEl = el.querySelector('[data-title]') as HTMLElement
        const descEl = el.querySelector('[data-desc]') as HTMLElement
        if (iconEl) iconEl.style.color = '#333333'
        if (titleEl) titleEl.style.color = '#888888'
        if (descEl) descEl.style.color = '#444444'
      }}
    >
      <span
        data-icon
        className="font-mono text-base"
        style={{ color: '#333333', transition: 'color 0.3s ease' }}
      >
        {icon}
      </span>
      <span
        data-title
        className="text-sm sm:text-base font-semibold tracking-wide"
        style={{ color: '#888888', transition: 'color 0.3s ease' }}
      >
        {title}
      </span>
      <span
        data-desc
        className="text-xs sm:text-[13px] leading-relaxed whitespace-pre-line"
        style={{ color: '#444444', transition: 'color 0.3s ease' }}
      >
        {description}
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

function CreativeSkillGroup({
  title,
  items,
  startDelay = 0,
}: {
  title: string
  items: { title: string; description: string; icon: string }[]
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3">
        {items.map((skill, i) => (
          <AnimateIn key={skill.title} delay={startDelay + 60 + i * 60}>
            <CreativeSkillCard title={skill.title} description={skill.description} icon={skill.icon} />
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
          <CreativeSkillGroup title="Creative Skills" items={creativeSkills} startDelay={320} />
        </div>
      </div>
    </section>
  )
}
