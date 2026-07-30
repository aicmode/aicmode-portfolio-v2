'use client'
import AnimateIn from './AnimateIn'
import { creativeSkills, skillGroups } from '../data/skills'
import type { TechSkill } from '../data/skills'

function SkillCard({ label, icon }: TechSkill) {
  return (
    <div
      className="skill-card flex min-h-[48px] w-full items-center gap-2 px-2 py-3.5 sm:px-5"
      style={{
        border: '1px solid rgba(255,255,255,0.07)',
        background: 'rgba(255,255,255,0.02)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      <span
        className="w-6 flex-shrink-0 overflow-hidden text-center font-mono text-[11px]"
        style={{ color: '#7a7a7a', letterSpacing: '0' }}
        aria-hidden="true"
      >
        {icon}
      </span>
      <span
        className="min-w-0 text-[10px] font-medium tracking-wide sm:text-sm"
        style={{ color: '#8a8a8a' }}
      >
        {label}
      </span>
    </div>
  )
}

function CreativeSkillCard({
  title,
  description,
  icon,
}: {
  title: string
  description: string
  icon: string
}) {
  return (
    <div
      className="creative-skill-card flex h-full w-full flex-col gap-3 p-5 sm:p-6"
      style={{
        border: '1px solid rgba(255,255,255,0.07)',
        background: 'rgba(255,255,255,0.02)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      <span data-icon className="font-mono text-base" style={{ color: '#7a7a7a' }} aria-hidden="true">
        {icon}
      </span>
      <span data-title className="text-sm font-semibold tracking-wide sm:text-base" style={{ color: '#888888' }}>
        {title}
      </span>
      <span
        data-desc
        className="whitespace-pre-line text-xs leading-relaxed sm:text-[13px]"
        style={{ color: '#8a8a8a' }}
      >
        {description}
      </span>
    </div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="bg-[#080808] px-5 py-20 md:px-12 md:py-40">
      <div className="mx-auto max-w-7xl">
        <AnimateIn>
          <div className="mb-4">
            <p className="mb-4 text-[10px] uppercase tracking-[0.55em] text-zinc-400">Capabilities</p>
            <h2
              className="font-black leading-none text-white"
              style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', letterSpacing: '-0.02em' }}
            >
              Skills
            </h2>
          </div>
          <p className="mb-12 max-w-2xl text-sm leading-relaxed md:mb-20 md:text-base" style={{ color: '#7a7a7a' }}>
            実際に制作・公開したプロジェクトで使用した技術のみを記載しています。
            使用例はWorksおよびAI &amp; Automation Case Studiesの各カードから確認できます。
          </p>
        </AnimateIn>

        <div className="flex flex-col gap-10 md:gap-14">
          {skillGroups.map((group, groupIndex) => (
            <div key={group.title}>
              <AnimateIn delay={groupIndex * 60}>
                <div className="mb-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="text-[9px] uppercase tracking-[0.45em]" style={{ color: '#8a8a8a' }}>
                    {group.title}
                  </h3>
                  <span className="text-[10px] tracking-[0.1em]" style={{ color: '#7a7a7a' }}>
                    {group.note}
                  </span>
                </div>
              </AnimateIn>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:gap-3 lg:grid-cols-5">
                {group.items.map((skill, i) => (
                  <AnimateIn key={skill.label} delay={groupIndex * 60 + 40 + i * 40}>
                    <SkillCard label={skill.label} icon={skill.icon} />
                  </AnimateIn>
                ))}
              </div>
            </div>
          ))}

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }} />

          <div>
            <AnimateIn>
              <div className="mb-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="text-[9px] uppercase tracking-[0.45em]" style={{ color: '#8a8a8a' }}>
                  Creative &amp; Thinking
                </h3>
                <span className="text-[10px] tracking-[0.1em]" style={{ color: '#7a7a7a' }}>
                  コードを書く前の部分
                </span>
              </div>
            </AnimateIn>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:gap-3 lg:grid-cols-4">
              {creativeSkills.map((skill, i) => (
                <AnimateIn key={skill.title} delay={60 + i * 60}>
                  <CreativeSkillCard title={skill.title} description={skill.description} icon={skill.icon} />
                </AnimateIn>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
