'use client'
import AnimateIn from './AnimateIn'

const influences = [
  { label: 'Music', desc: 'Trap · House · Ambient · Soul' },
  { label: 'Film', desc: 'Cinematic · Editorial · Noir' },
  { label: 'Culture', desc: 'US · UK · JP Street' },
]

const stats = [
  { top: 'WEB', bottom: 'Design' },
  { top: 'AI', bottom: 'Powered' },
  { top: '2026', bottom: 'Active' },
]

const offerings = [
  {
    id: '01',
    title: 'Brand Websites',
    desc: '店舗・サービス・個人ブランド向けに、世界観と信頼感が伝わるWebサイトを制作します。',
  },
  {
    id: '02',
    title: 'Landing Pages',
    desc: '商品やサービスの魅力が伝わる、見やすく印象に残るLPを制作します。',
  },
  {
    id: '03',
    title: 'Portfolio / Concept Sites',
    desc: '作品やブランドイメージを美しく見せる、ポートフォリオ型・コンセプト型サイトを制作します。',
  },
  {
    id: '04',
    title: 'AI Assisted Design',
    desc: 'AIを活用して、構成・デザイン・ビジュアル制作をスピーディーに進めます。',
  },
]

const process = [
  {
    step: '01',
    title: 'Direction',
    desc: '目的、雰囲気、必要なページ、見せたい印象を整理します。',
  },
  {
    step: '02',
    title: 'Design',
    desc: 'ブランドに合う配色、余白、レイアウト、ビジュアルの方向性を設計します。',
  },
  {
    step: '03',
    title: 'Build',
    desc: 'スマホ表示も意識しながら、Webサイトとして丁寧に構築します。',
  },
  {
    step: '04',
    title: 'Launch',
    desc: '公開前の確認、微調整、公開までの流れをサポートします。',
  },
]

function DividerHeader({ label }: { label: string }) {
  return (
    <AnimateIn>
      <div className="mb-16 md:mb-24 flex items-center gap-6 md:gap-10">
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.06))' }} />
        <span className="text-[9px] tracking-[0.55em] text-zinc-700 uppercase whitespace-nowrap">{label}</span>
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(255,255,255,0.06))' }} />
      </div>
    </AnimateIn>
  )
}

function OfferingCard({ id, title, desc }: { id: string; title: string; desc: string }) {
  return (
    <div
      className="group relative flex h-full flex-col gap-4 p-6 md:p-8 cursor-default overflow-hidden"
      style={{
        border: '1px solid rgba(255,255,255,0.07)',
        background: 'rgba(255,255,255,0.02)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        transition:
          'border-color 0.45s ease, background 0.45s ease, box-shadow 0.45s ease, transform 0.45s cubic-bezier(0.22,1,0.36,1)',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = 'rgba(255,255,255,0.22)'
        el.style.background = 'rgba(255,255,255,0.05)'
        el.style.boxShadow = '0 0 28px rgba(109,40,217,0.12), 0 0 56px rgba(37,99,235,0.06)'
        el.style.transform = 'translateY(-4px)'
        const titleEl = el.querySelector('[data-title]') as HTMLElement
        const descEl = el.querySelector('[data-desc]') as HTMLElement
        const idEl = el.querySelector('[data-id]') as HTMLElement
        if (titleEl) titleEl.style.color = '#ffffff'
        if (descEl) descEl.style.color = '#9a9a9a'
        if (idEl) idEl.style.color = 'rgba(255,255,255,0.16)'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = 'rgba(255,255,255,0.07)'
        el.style.background = 'rgba(255,255,255,0.02)'
        el.style.boxShadow = 'none'
        el.style.transform = 'translateY(0)'
        const titleEl = el.querySelector('[data-title]') as HTMLElement
        const descEl = el.querySelector('[data-desc]') as HTMLElement
        const idEl = el.querySelector('[data-id]') as HTMLElement
        if (titleEl) titleEl.style.color = '#e8e8e8'
        if (descEl) descEl.style.color = '#5a5a5a'
        if (idEl) idEl.style.color = 'rgba(255,255,255,0.06)'
      }}
    >
      <span
        data-id
        className="font-mono text-[10px] tracking-[0.3em]"
        style={{ color: 'rgba(255,255,255,0.06)', transition: 'color 0.4s ease' }}
      >
        {id}
      </span>
      <h4
        data-title
        className="text-base md:text-lg font-semibold tracking-wide"
        style={{ color: '#e8e8e8', transition: 'color 0.4s ease' }}
      >
        {title}
      </h4>
      <p
        data-desc
        className="text-[13px] leading-relaxed"
        style={{ color: '#5a5a5a', transition: 'color 0.4s ease' }}
      >
        {desc}
      </p>
    </div>
  )
}

function ProcessCard({ step, title, desc }: { step: string; title: string; desc: string }) {
  return (
    <div
      className="group relative flex h-full flex-col gap-3 p-6 md:p-7 cursor-default"
      style={{
        borderTop: '1px solid rgba(255,255,255,0.1)',
        background: 'linear-gradient(180deg, rgba(255,255,255,0.018), rgba(255,255,255,0))',
        transition:
          'border-color 0.45s ease, background 0.45s ease, transform 0.45s cubic-bezier(0.22,1,0.36,1)',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.borderTopColor = 'rgba(124,58,237,0.5)'
        el.style.background = 'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0))'
        el.style.transform = 'translateY(-4px)'
        const titleEl = el.querySelector('[data-title]') as HTMLElement
        const descEl = el.querySelector('[data-desc]') as HTMLElement
        if (titleEl) titleEl.style.color = '#ffffff'
        if (descEl) descEl.style.color = '#9a9a9a'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.borderTopColor = 'rgba(255,255,255,0.1)'
        el.style.background = 'linear-gradient(180deg, rgba(255,255,255,0.018), rgba(255,255,255,0))'
        el.style.transform = 'translateY(0)'
        const titleEl = el.querySelector('[data-title]') as HTMLElement
        const descEl = el.querySelector('[data-desc]') as HTMLElement
        if (titleEl) titleEl.style.color = '#e8e8e8'
        if (descEl) descEl.style.color = '#5a5a5a'
      }}
    >
      <span
        className="font-black leading-none"
        style={{
          fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
          letterSpacing: '-0.02em',
          color: 'transparent',
          WebkitTextStroke: '1px rgba(255,255,255,0.16)',
        }}
      >
        {step}
      </span>
      <h4
        data-title
        className="text-base md:text-lg font-semibold tracking-wide mt-1"
        style={{ color: '#e8e8e8', transition: 'color 0.4s ease' }}
      >
        {title}
      </h4>
      <p
        data-desc
        className="text-[13px] leading-relaxed"
        style={{ color: '#5a5a5a', transition: 'color 0.4s ease' }}
      >
        {desc}
      </p>
    </div>
  )
}

export default function About() {
  return (
    <section
      id="about"
      className="py-20 md:py-44 px-5 md:px-12"
      style={{ background: '#0c0c0c' }}
    >
      <div className="max-w-7xl mx-auto">

        {/* Divider header */}
        <AnimateIn>
          <div className="mb-16 md:mb-24 flex items-center gap-6 md:gap-10">
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.06))' }} />
            <span className="text-[9px] tracking-[0.55em] text-zinc-700 uppercase whitespace-nowrap">About AICMODE</span>
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(255,255,255,0.06))' }} />
          </div>
        </AnimateIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-28 items-start">

          {/* Left */}
          <AnimateIn>
            <div>
              <p className="text-[10px] tracking-[0.55em] text-zinc-600 mb-8 md:mb-10 uppercase">
                About
              </p>

              {/* Headline */}
              <div className="relative pl-5 md:pl-6 mb-10 md:mb-14">
                <div
                  className="absolute left-0 top-0 bottom-0 w-[1px]"
                  style={{
                    background:
                      'linear-gradient(to bottom, transparent, rgba(124,58,237,0.7) 40%, rgba(37,99,235,0.4) 70%, transparent)',
                  }}
                />
                <h2
                  className="font-black text-white leading-tight"
                  style={{ fontSize: 'clamp(2.2rem, 6vw, 5.5rem)', letterSpacing: '-0.025em' }}
                >
                  Design<br />
                  <span style={{ color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.22)' }}>
                    that<br />moves.
                  </span>
                </h2>
              </div>

              {/* Cultural influences */}
              <div className="space-y-0">
                {influences.map(({ label, desc }) => (
                  <div
                    key={label}
                    className="flex items-center gap-4 py-3"
                    style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                  >
                    <span
                      className="text-[9px] tracking-[0.45em] uppercase flex-shrink-0"
                      style={{ color: '#383838', width: '52px' }}
                    >
                      {label}
                    </span>
                    <span style={{ color: '#252525', fontSize: '10px' }}>—</span>
                    <span className="text-[11px] tracking-wide" style={{ color: '#484848' }}>
                      {desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </AnimateIn>

          {/* Right */}
          <AnimateIn delay={200}>
            <div className="space-y-8 md:space-y-10">

              {/* Main copy */}
              <div className="space-y-4">
                <p className="text-base md:text-lg leading-relaxed" style={{ color: '#c0c0c0' }}>
                  海外カルチャー、音楽、映画から影響を受けたデザイン。
                </p>
                <p className="text-base md:text-lg leading-relaxed" style={{ color: '#c0c0c0' }}>
                  AIとWeb制作を組み合わせ、<br />
                  感覚的で世界観のあるサイトを制作。
                </p>
              </div>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }} />

              {/* English quote */}
              <blockquote
                className="text-sm leading-relaxed"
                style={{ color: '#484848', fontStyle: 'italic', letterSpacing: '0.015em', borderLeft: '2px solid rgba(124,58,237,0.3)', paddingLeft: '16px' }}
              >
                &ldquo;Design shaped by music, film,<br />
                and the streets of the world.&rdquo;
              </blockquote>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 md:gap-4">
                {stats.map(({ top, bottom }) => (
                  <div
                    key={bottom}
                    className="text-center py-4"
                    style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    <div
                      className="font-black text-white mb-1 uppercase"
                      style={{ fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', letterSpacing: '-0.01em' }}
                    >
                      {top}
                    </div>
                    <div className="text-[9px] tracking-[0.35em] uppercase" style={{ color: '#383838' }}>
                      {bottom}
                    </div>
                  </div>
                ))}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {['2026', 'AICMODE', 'JP / EN'].map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] tracking-[0.22em] px-3 py-1.5"
                    style={{ border: '1px solid rgba(255,255,255,0.07)', color: '#484848' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </AnimateIn>
        </div>

        {/* ===== For Brands That Need Presence. ===== */}
        <div className="mt-32 md:mt-52">
          <DividerHeader label="What I Offer" />

          <div className="max-w-4xl">
            <AnimateIn>
              <p className="text-[10px] tracking-[0.55em] text-zinc-600 mb-8 md:mb-10 uppercase">
                Services
              </p>
              <h3
                className="font-black text-white leading-[1.05]"
                style={{ fontSize: 'clamp(2rem, 5vw, 4.25rem)', letterSpacing: '-0.025em' }}
              >
                For Brands<br />
                <span style={{ color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.22)' }}>
                  That Need Presence.
                </span>
              </h3>
            </AnimateIn>

            <AnimateIn delay={150}>
              <div className="mt-10 md:mt-14 space-y-6 max-w-2xl">
                <p
                  className="text-base md:text-lg leading-relaxed"
                  style={{ color: '#c0c0c0' }}
                >
                  ただ綺麗なだけではなく、第一印象・信頼感・導線まで意識して、ブランドの魅力が伝わるWebサイトを制作します。
                </p>
                <div style={{ width: '40px', height: '1px', background: 'linear-gradient(to right, rgba(124,58,237,0.6), rgba(37,99,235,0.3))' }} />
                <p
                  className="text-sm md:text-base leading-relaxed"
                  style={{ color: '#7a7a7a' }}
                >
                  店舗、個人ブランド、サービス、ポートフォリオなど、それぞれの目的に合わせて、雰囲気・色・余白・言葉・見せ方を整理します。
                  AIを活用しながら、スピード感とデザイン性の両方を大切にし、海外カルチャーを感じる洗練されたWeb表現を目指します。
                </p>
              </div>
            </AnimateIn>
          </div>
        </div>

        {/* ===== What I Build ===== */}
        <div className="mt-28 md:mt-44">
          <AnimateIn>
            <div className="mb-12 md:mb-16">
              <p className="text-[10px] tracking-[0.55em] text-zinc-600 mb-4 uppercase">
                Capabilities
              </p>
              <h3
                className="font-black text-white leading-none"
                style={{ fontSize: 'clamp(2.2rem, 5.5vw, 4.5rem)', letterSpacing: '-0.02em' }}
              >
                What I Build
              </h3>
            </div>
          </AnimateIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {offerings.map((item, i) => (
              <AnimateIn key={item.id} delay={120 + i * 90}>
                <OfferingCard {...item} />
              </AnimateIn>
            ))}
          </div>
        </div>

        {/* ===== Process ===== */}
        <div className="mt-28 md:mt-44">
          <AnimateIn>
            <div className="mb-12 md:mb-16">
              <p className="text-[10px] tracking-[0.55em] text-zinc-600 mb-4 uppercase">
                How It Works
              </p>
              <h3
                className="font-black text-white leading-none"
                style={{ fontSize: 'clamp(2.2rem, 5.5vw, 4.5rem)', letterSpacing: '-0.02em' }}
              >
                Process
              </h3>
            </div>
          </AnimateIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {process.map((item, i) => (
              <AnimateIn key={item.step} delay={120 + i * 90}>
                <ProcessCard {...item} />
              </AnimateIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
