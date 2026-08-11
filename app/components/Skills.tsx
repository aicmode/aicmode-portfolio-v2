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
            <p className="mb-4 text-[12px] tracking-[0.24em] text-zinc-400">使える技術</p>
            <h2
              className="font-black leading-[1.2] text-white"
              style={{ fontSize: 'clamp(1.9rem, 4.6vw, 3.6rem)', letterSpacing: '-0.02em' }}
            >
              使える技術の一覧
            </h2>
          </div>
          <p className="mb-12 max-w-2xl text-[15px] leading-8 md:mb-20" style={{ color: '#7a7a7a' }}>
            実際に作って公開したもので使った技術だけを載せています。
            技術の名前が分からなくても問題ありません。やりたいことをお伝えください。
          </p>
        </AnimateIn>

        <div className="flex flex-col gap-10 md:gap-14">
          {skillGroups.map((group, groupIndex) => (
            <div key={group.title}>
              <AnimateIn delay={groupIndex * 60}>
                <div className="mb-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="text-[13px] font-semibold tracking-[0.16em]" style={{ color: '#c0c0c0' }}>
                    {group.title}
                  </h3>
                  <span className="text-[12px] tracking-[0.04em]" style={{ color: '#7a7a7a' }}>
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
                <h3 className="text-[13px] font-semibold tracking-[0.16em]" style={{ color: '#c0c0c0' }}>
                  考え方・進め方
                </h3>
                <span className="text-[12px] tracking-[0.04em]" style={{ color: '#7a7a7a' }}>
                  作りはじめる前に考える部分
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
