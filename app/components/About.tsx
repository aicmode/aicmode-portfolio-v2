'use client'
import AnimateIn from './AnimateIn'

const influences = [
  { label: 'Music', desc: 'Trap · House · Ambient · Soul' },
  { label: 'Film', desc: 'Cinematic · Editorial · Noir' },
  { label: 'Culture', desc: 'US · UK · JP Street' },
]

const stats = [
  { top: 'AI', bottom: 'Systems' },
  { top: 'WEB', bottom: 'Applications' },
  { top: '2026', bottom: 'Active' },
]

/**
 * Six strengths, not "anything you need". Each one is something a client can
 * hold me to, and each is visible in the case studies or works above.
 */
const strengths = [
  {
    title: 'Business-first Requirements',
    desc: '作りたい機能ではなく、解くべき課題から始めます。目的・利用者・優先順位を先に確定させます。',
  },
  {
    title: 'AI System Design',
    desc: '業務のどこにAIが効くかを見極め、機能・データの流れ・API連携・限界の扱いまで設計します。',
  },
  {
    title: 'Web Application Development',
    desc: 'Next.js・TypeScript・Pythonで、必要な機能に絞った業務用アプリを実装します。',
  },
  {
    title: 'Business Automation',
    desc: '取得・加工・保存・通知の工程を洗い出し、自動で回る部分から仕組み化します。',
  },
  {
    title: 'API Integration',
    desc: 'Google・LINE・Slack・Discord・REST APIとの接続と、Webhook受信・署名検証まで対応します。',
  },
  {
    title: 'Creative Direction',
    desc: '海外カルチャー・音楽・映画から影響を受けた表現で、機能と世界観の両方が必要な案件にも対応します。',
  },
]

function StrengthRow({ title, desc }: { title: string; desc: string }) {
  return (
    <div
      className="flex h-full flex-col gap-2 py-5 pr-4"
      style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
    >
      <span
        className="text-[11px] font-semibold uppercase tracking-[0.24em]"
        style={{ color: '#c8c8c8' }}
      >
        {title}
      </span>
      <span className="text-[13px] leading-relaxed" style={{ color: '#8a8a8a' }}>
        {desc}
      </span>
    </div>
  )
}

export default function About() {
  return (
    <section id="about" className="px-5 py-20 md:px-12 md:py-44" style={{ background: '#0c0c0c' }}>
      <div className="mx-auto max-w-7xl">
        <AnimateIn>
          <div className="mb-16 flex items-center gap-6 md:mb-24 md:gap-10">
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.06))' }} />
            <span className="whitespace-nowrap text-[9px] uppercase tracking-[0.55em] text-zinc-400">About AICMODE</span>
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(255,255,255,0.06))' }} />
          </div>
        </AnimateIn>

        <div className="grid grid-cols-1 items-start gap-12 md:gap-16 lg:grid-cols-2 lg:gap-28">
          {/* Left */}
          <AnimateIn>
            <div>
              <p className="mb-8 text-[10px] uppercase tracking-[0.55em] text-zinc-400 md:mb-10">About</p>

              <div className="relative mb-10 pl-5 md:mb-14 md:pl-6">
                <div
                  className="absolute bottom-0 left-0 top-0 w-[1px]"
                  style={{
                    background:
                      'linear-gradient(to bottom, transparent, rgba(124,58,237,0.7) 40%, rgba(37,99,235,0.4) 70%, transparent)',
                  }}
                />
                <h2
                  className="font-black leading-tight text-white"
                  style={{ fontSize: 'clamp(2.2rem, 6vw, 5.5rem)', letterSpacing: '-0.025em' }}
                >
                  Systems
                  <br />
                  <span style={{ color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.22)' }}>
                    that
                    <br />
                    hold up.
                  </span>
                </h2>
              </div>

              {/* Cultural influences — the creative half of the practice. */}
              <div className="space-y-0">
                {influences.map(({ label, desc }) => (
                  <div
                    key={label}
                    className="flex items-center gap-4 py-3"
                    style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                  >
                    <span
                      className="flex-shrink-0 text-[9px] uppercase tracking-[0.45em]"
                      style={{ color: '#7a7a7a', width: '52px' }}
                    >
                      {label}
                    </span>
                    <span style={{ color: '#252525', fontSize: '10px' }} aria-hidden="true">
                      —
                    </span>
                    <span className="text-[11px] tracking-wide" style={{ color: '#8a8a8a' }}>
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
              <div className="space-y-4">
                <p className="text-base leading-relaxed md:text-lg" style={{ color: '#c0c0c0' }}>
                  業務の流れと課題を整理し、必要な機能をMVPとして定義。
                </p>
                <p className="text-base leading-relaxed md:text-lg" style={{ color: '#c0c0c0' }}>
                  AIシステム、Webアプリ、業務自動化、API連携を、
                  <br />
                  設計から実装・テスト・公開・運用まで一貫して担当します。
                </p>
                <p className="text-sm leading-relaxed md:text-base" style={{ color: '#7a7a7a' }}>
                  単にAIツールを使うだけではなく、目的・利用者・運用方法・セキュリティ・コストまで整理したうえで、現場で使い続けられる形を目指します。
                  <span style={{ color: '#a8a8a8' }}>設計</span>・<span style={{ color: '#a8a8a8' }}>実装</span>・
                  <span style={{ color: '#a8a8a8' }}>運用</span>を一人で通せるため、外注先を分ける必要がありません。
                </p>
                <p className="text-sm leading-relaxed md:text-base" style={{ color: '#7a7a7a' }}>
                  医療・介護分野の業務理解を活かした要件整理も強みとしており、Healthcare × AI / Web Applications の領域では、現場の運用に合うかどうかを前提に設計します。
                  加えて、海外カルチャー・音楽・映画から影響を受けたクリエイティブ表現も担当できるため、機能性と世界観の両方を必要とするプロジェクトにも対応します。
                </p>
              </div>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }} />

              <blockquote
                className="text-sm leading-relaxed"
                style={{
                  color: '#8a8a8a',
                  fontStyle: 'italic',
                  letterSpacing: '0.015em',
                  borderLeft: '2px solid rgba(124,58,237,0.3)',
                  paddingLeft: '16px',
                }}
              >
                &ldquo;Design shaped by music, film,
                <br />
                and the streets of the world.&rdquo;
              </blockquote>

              <div className="grid grid-cols-3 gap-3 md:gap-4">
                {stats.map(({ top, bottom }) => (
                  <div
                    key={bottom}
                    className="py-4 text-center"
                    style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    <div
                      className="mb-1 font-black uppercase text-white"
                      style={{ fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', letterSpacing: '-0.01em' }}
                    >
                      {top}
                    </div>
                    <div className="text-[9px] uppercase tracking-[0.35em]" style={{ color: '#7a7a7a' }}>
                      {bottom}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {['2026', 'AICMODE', 'JP / EN'].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 text-[10px] tracking-[0.22em]"
                    style={{ border: '1px solid rgba(255,255,255,0.07)', color: '#8a8a8a' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </AnimateIn>
        </div>

        {/* Strengths — deliberately six, so this never reads as "I do anything". */}
        <div className="mt-24 md:mt-36">
          <AnimateIn>
            <div className="mb-10 md:mb-14">
              <p className="mb-4 text-[10px] uppercase tracking-[0.55em] text-zinc-400">Strengths</p>
              <h3
                className="font-black leading-none text-white"
                style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3.4rem)', letterSpacing: '-0.02em' }}
              >
                Six Things I Do Well
              </h3>
            </div>
          </AnimateIn>

          <div className="grid grid-cols-1 gap-x-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-12">
            {strengths.map((strength, i) => (
              <AnimateIn key={strength.title} delay={100 + i * 70}>
                <StrengthRow {...strength} />
              </AnimateIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
