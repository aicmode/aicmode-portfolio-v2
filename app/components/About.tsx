'use client'
import AnimateIn from './AnimateIn'

const influences = [
  { label: 'Music', desc: 'Trap · House · Ambient · Soul' },
  { label: 'Film', desc: 'Cinematic · Editorial · Noir' },
  { label: 'Culture', desc: 'US · UK · JP Street' },
]

const stats = [
  { top: 'WEB', bottom: 'Design' },
  { top: 'AI', bottom: 'Systems' },
  { top: '2026', bottom: 'Active' },
]

const services = [
  {
    title: 'Brand Website',
    desc: '「良いのに伝わらない」を解決。第一印象と信頼感を整え、問い合わせにつなげます。',
  },
  {
    title: 'Landing Page',
    desc: '「見られても申し込まれない」を解決。訴求と導線を1ページに集約します。',
  },
  {
    title: 'Portfolio Site',
    desc: '「実績が正しく評価されない」を解決。作品と強みが伝わる見せ方に整理します。',
  },
  {
    title: 'AI Systems',
    desc: '「対応が追いつかない」を解決。問い合わせ対応・文章作成・要約・分類を任せられる形に。',
  },
  {
    title: 'Business Automation',
    desc: '「毎日同じ作業に時間が消える」を解決。集計・通知・共有が自動で回る状態にします。',
  },
  {
    title: 'Web Applications',
    desc: '「既存ツールが業務に合わない」を解決。必要な機能だけの専用アプリを用意します。',
  },
  {
    title: 'Internal Tools',
    desc: '「属人化して引き継げない」を解決。誰が使っても同じ結果になる社内ツールに整えます。',
  },
  {
    title: 'Custom Dashboard',
    desc: '「数字を探す時間が長い」を解決。判断に必要な指標を、一画面で把握できるように。',
  },
  {
    title: 'API Integration',
    desc: '「ツール間の転記が手作業」を解決。今の環境のまま、自動でつながる状態にします。',
  },
]

const offerings = [
  {
    id: '01',
    title: 'Brand Websites',
    desc: '良いサービスなのに伝わっていない状態を解消します。世界観と信頼感を整理し、指名で選ばれるサイトへ。',
  },
  {
    id: '02',
    title: 'Landing Pages',
    desc: '見た人が迷わず動ける構成に整えます。訴求・根拠・導線を組み直し、申し込みまでの離脱を減らします。',
  },
  {
    id: '03',
    title: 'Portfolio Websites',
    desc: '実績と強みが正しく評価される見せ方に整理し、次の依頼や採用につながる状態をつくります。',
  },
  {
    id: '04',
    title: 'AI Systems',
    desc: '問い合わせ対応、文章作成、要約、分類など、時間ばかりかかる業務をAIに肩代わりさせます。',
  },
  {
    id: '05',
    title: 'Business Automation',
    desc: '毎日の手作業・集計・通知・共有を自動化し、人が判断や接客に使う時間を取り戻します。',
  },
  {
    id: '06',
    title: 'Web Applications',
    desc: '既存ツールに業務を合わせるのをやめ、現場の進め方に合わせた専用アプリで手戻りをなくします。',
  },
  {
    id: '07',
    title: 'Internal Dashboard',
    desc: '数字を探す時間をなくします。売上・進捗・予約状況を一画面にまとめ、判断を早くします。',
  },
  {
    id: '08',
    title: 'API Integration',
    desc: 'ツール間の転記や二重入力をなくします。すでに使っている環境のまま、自動でつながる形に。',
  },
]

const process = [
  {
    step: '01',
    title: 'Direction',
    desc: '何が課題かを先に整理します。目的、優先順位、必要な機能をここで見極めます。',
  },
  {
    step: '02',
    title: 'Design',
    desc: '画面設計に加え、システム構成・データの流れ・API連携までを設計します。',
  },
  {
    step: '03',
    title: 'Build',
    desc: 'スマホ表示まで含めて実装し、実際の運用を想定して動作を検証します。',
  },
  {
    step: '04',
    title: 'Operate',
    desc: '公開して終わりにせず、改善・追加・トラブル対応まで運用を継続してサポートします。',
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

function ServiceRow({ title, desc }: { title: string; desc: string }) {
  return (
    <div
      className="flex h-full flex-col gap-2 py-5 pr-4 cursor-default"
      style={{
        borderTop: '1px solid rgba(255,255,255,0.07)',
        transition: 'border-color 0.45s ease',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.borderTopColor = 'rgba(212,175,55,0.35)'
        const titleEl = el.querySelector('[data-title]') as HTMLElement
        const descEl = el.querySelector('[data-desc]') as HTMLElement
        if (titleEl) titleEl.style.color = '#ffffff'
        if (descEl) descEl.style.color = '#8a8a8a'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.borderTopColor = 'rgba(255,255,255,0.07)'
        const titleEl = el.querySelector('[data-title]') as HTMLElement
        const descEl = el.querySelector('[data-desc]') as HTMLElement
        if (titleEl) titleEl.style.color = '#c8c8c8'
        if (descEl) descEl.style.color = '#5a5a5a'
      }}
    >
      <span
        data-title
        className="text-[11px] font-semibold uppercase tracking-[0.28em]"
        style={{ color: '#c8c8c8', transition: 'color 0.4s ease' }}
      >
        {title}
      </span>
      <span
        data-desc
        className="text-[13px] leading-relaxed"
        style={{ color: '#5a5a5a', transition: 'color 0.4s ease' }}
      >
        {desc}
      </span>
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
                <p className="text-sm md:text-base leading-relaxed" style={{ color: '#7a7a7a' }}>
                  さらに、Next.js・React・PythonとOpenAI APIなどを活用して、AIシステム、Webアプリケーション、業務効率化ツールの開発まで対応します。
                  AIを使うところで終わらせず、要件整理と<span style={{ color: '#a8a8a8' }}>設計</span>、コードを書く<span style={{ color: '#a8a8a8' }}>実装</span>、公開後の<span style={{ color: '#a8a8a8' }}>運用</span>・改善までを一人で通して担当できます。
                </p>
                <p className="text-sm md:text-base leading-relaxed" style={{ color: '#7a7a7a' }}>
                  だから、外注先を分けずに相談できます。Webサイトを作る人ではなく、事業の課題そのものを整理し、解決する手段を選んで形にするクリエイティブテクノロジストとして関わります。
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
                  作りたいものではなく、解決したいことから始めます。第一印象・信頼感・導線まで設計したWebサイトと、現場の手間そのものを減らすAIシステム。どちらも「その課題に効くか」で選びます。
                </p>
                <div style={{ width: '40px', height: '1px', background: 'linear-gradient(to right, rgba(124,58,237,0.6), rgba(37,99,235,0.3))' }} />
                <p
                  className="text-sm md:text-base leading-relaxed"
                  style={{ color: '#7a7a7a' }}
                >
                  店舗、病院・クリニック、中小企業、個人事業主、ブランドなど、それぞれの目的に合わせて、雰囲気・色・余白・言葉・見せ方を整理します。
                  同時に業務フローを見直し、AI・API連携・自動化までを設計・実装・運用まで通して担当。「問い合わせが増えない」「人手が足りない」「毎日同じ作業に追われる」といった課題に、成果で答えます。
                </p>
              </div>
            </AnimateIn>
          </div>

          {/* Service menu */}
          <div className="mt-16 md:mt-24 grid grid-cols-1 gap-x-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-12">
            {services.map((service, i) => (
              <AnimateIn key={service.title} delay={120 + i * 70}>
                <ServiceRow {...service} />
              </AnimateIn>
            ))}
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
