'use client'
import AnimateIn from './AnimateIn'

const techStack = [
  { label: 'HTML',        icon: '</>' },
  { label: 'CSS',         icon: '{ }' },
  { label: 'JavaScript',  icon: 'JS'  },
  { label: 'TypeScript',  icon: 'TS'  },
  { label: 'React',       icon: '◎'  },
  { label: 'Next.js',     icon: 'N'   },
  { label: 'Python',      icon: 'Py'  },
  { label: 'Node.js',     icon: '⬡'  },
  { label: 'Express',     icon: 'Ex'  },
  { label: 'Tailwind CSS',icon: '≋'  },
  { label: 'REST API',    icon: '⇄'  },
  { label: 'OpenAI API',  icon: '✳'  },
  { label: 'Google APIs', icon: 'G'   },
  { label: 'LINE Messaging API', icon: 'L' },
  { label: 'Discord API', icon: '◇'  },
  { label: 'Slack API',   icon: '#'   },
  { label: 'Git',         icon: '⑂'  },
  { label: 'GitHub',      icon: '⊙'  },
  { label: 'Vercel',      icon: '▲'  },
  { label: 'Framer Motion', icon: '∿' },
  { label: 'Responsive Design', icon: '▤' },
  { label: 'AI Assisted Development', icon: '✧' },
]

const creativeSkills = [
  {
    title: 'AI System Design',
    description: '業務のどこにAIを組み込めば効果が出るかを見極め、機能・データの流れ・API連携までを設計。',
    icon: '⊟',
  },
  {
    title: 'Automation Design',
    description: '手作業・集計・通知・共有を洗い出し、自動化できる工程から仕組み化して人の時間を戻す。',
    icon: '⟳',
  },
  {
    title: 'Prompt Engineering',
    description: 'AIへの指示を設計し、出力の精度と再現性を安定させる。実務で使える品質まで詰める。',
    icon: '◈',
  },
  {
    title: 'Workflow Optimization',
    description: '現場の業務フローを整理し、重複や無駄な工程を削減。運用が続く形に組み直す。',
    icon: '⟐',
  },
  {
    title: 'UI / UX Thinking',
    description: '使う人の目線で導線と操作性を設計。\nスマホ表示と、迷わせない構成を重視。',
    icon: '⊞',
  },
  {
    title: 'Creative Direction',
    description: 'コンセプト設計からデザイン監修まで担当。\nブランドの魅力を最大限に引き出す方向づけ。',
    icon: '⬒',
  },
  {
    title: 'Business Thinking',
    description: '集客・運用・コストまで踏まえ、事業として成立する形を提案。作って終わりにしない。',
    icon: '◫',
  },
  {
    title: 'Problem Solving',
    description: '「何を作るか」の前に「何が課題か」を整理。必要な打ち手だけに絞って形にする。',
    icon: '✦',
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
