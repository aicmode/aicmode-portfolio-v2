'use client'

import AnimateIn from './AnimateIn'

const trustPoints = [
  {
    title: 'Business First',
    description: '作る機能より先に、目的・利用者・解決すべき課題を確認します。',
  },
  {
    title: 'Start Small',
    description: '最初から大規模にせず、必要な機能に絞ったMVPから始めます。',
  },
  {
    title: 'Clear Limitations',
    description: 'AIの精度、対応範囲、運用コスト、できないことも事前に共有します。',
  },
  {
    title: 'Tested Before Launch',
    description: 'Type Check、Lint、Build、主要操作、レスポンシブ、Console Errorを確認してから公開します。',
  },
  {
    title: 'Security Awareness',
    description: 'APIキーは環境変数で管理し、個人情報や権限の扱いを要件定義時に確認します。',
  },
] as const

export default function Trust() {
  return (
    <section id="trust" className="border-t border-white/[0.06] bg-[#0a0a0a] px-5 py-20 md:px-12 md:py-32">
      <div className="mx-auto max-w-7xl">
        <AnimateIn>
          <div className="mb-12 grid gap-6 md:grid-cols-[0.8fr_1.2fr] md:items-end">
            <div>
              <p className="mb-4 text-[10px] uppercase tracking-[0.55em] text-zinc-400">How I Work</p>
              <h2 className="text-[clamp(2.2rem,5.5vw,4.5rem)] font-black leading-none tracking-[-0.02em] text-white">
                Built for
                <br />
                <span style={{ color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.22)' }}>
                  Real Operation.
                </span>
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-8 text-white/58 md:justify-self-end">
              導入することより、現場で無理なく使い続けられることを重視します。
              進め方、制約、確認項目を先に共有し、判断できる状態を保ちます。
            </p>
          </div>
        </AnimateIn>

        <div className="grid grid-cols-1 gap-x-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-x-6">
          {trustPoints.map((point, index) => (
            <AnimateIn key={point.title} delay={100 + index * 70}>
              <article className="h-full border-t border-white/[0.09] py-6">
                <p className="text-[11px] font-semibold uppercase leading-5 tracking-[0.2em] text-white/80">
                  {point.title}
                </p>
                <p className="mt-3 text-[13px] leading-7 text-white/58">{point.description}</p>
              </article>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}
