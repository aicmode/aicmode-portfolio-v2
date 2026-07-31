'use client'

import AnimateIn from './AnimateIn'

const healthcarePoints = [
  {
    no: '01',
    title: 'Medical Workflow Understanding',
    description: '記録、申し送り、患者対応など、現場の流れを前提に課題を整理。',
  },
  {
    no: '02',
    title: 'Medical Terminology',
    description: '医療用語・医療英語を含む情報を、用途に合わせて整理。',
  },
  {
    no: '03',
    title: 'Safety First',
    description: 'AIの回答を診断として扱わず、人による確認や注意表示を前提に設計。',
  },
  {
    no: '04',
    title: 'Healthcare Requirements',
    description: '個人情報、権限、利用者、運用責任を確認してから実装範囲を決定。',
  },
] as const

export default function HealthcareAI() {
  return (
    <section
      id="healthcare"
      className="relative overflow-hidden border-t border-white/[0.07] bg-[#080a0a] px-5 py-24 md:px-12 md:py-40"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-15%] top-[-15%] h-[34rem] w-[34rem] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(95,210,194,0.07) 0%, transparent 68%)',
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        <AnimateIn>
          <div className="grid gap-10 border-b border-white/[0.08] pb-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-20 lg:pb-16">
            <div>
              <p className="mb-5 text-[10px] uppercase tracking-[0.52em] text-[#74cfc2]">
                Healthcare × AI
              </p>
              <h2 className="text-[clamp(2.2rem,4.2vw,3.5rem)] font-black leading-[1.08] tracking-[-0.025em] text-white">
                <span className="block">医療現場を知っているから、</span>
                <span
                  className="block"
                  style={{
                    color: 'transparent',
                    WebkitTextStroke: '1px rgba(255,255,255,0.24)',
                  }}
                >
                  運用まで考えて設計できる。
                </span>
              </h2>
            </div>

            <div className="space-y-5 self-end text-sm leading-8 text-white/58 md:text-[15px]">
              <p>
                看護師として約9年間、医療現場の業務に携わってきました。医療用語や医療英語、
                スタッフ間の情報共有、記録、患者対応など、現場で実際に発生する業務を理解したうえで要件を整理します。
              </p>
              <p>
                AIを導入すること自体を目的にせず、安全性、個人情報、誤回答への対策、現場の負担、
                既存の運用方法まで確認し、無理なく使い続けられる仕組みを設計します。
              </p>
            </div>
          </div>
        </AnimateIn>

        <div className="mt-10 grid grid-cols-1 gap-x-10 sm:grid-cols-2 lg:grid-cols-4">
          {healthcarePoints.map((point, index) => (
            <AnimateIn key={point.no} delay={100 + index * 80}>
              <article className="h-full border-t border-white/[0.09] py-6">
                <p className="font-mono text-[9px] tracking-[0.3em] text-[#74cfc2]/80">{point.no}</p>
                <h3 className="mt-4 text-[12px] font-semibold uppercase leading-5 tracking-[0.18em] text-white/82">
                  {point.title}
                </h3>
                <p className="mt-3 text-[13px] leading-7 text-white/58">{point.description}</p>
              </article>
            </AnimateIn>
          ))}
        </div>

        <AnimateIn delay={360}>
          <p className="mt-8 max-w-3xl border-l border-[#74cfc2]/30 pl-4 text-[12px] leading-6 text-white/50">
            医療行為や診断を行うものではありません。扱う情報と利用目的に応じて、人による確認、注意表示、
            権限管理、外部サービスへの送信範囲を要件整理の段階で確認します。
          </p>
        </AnimateIn>
      </div>
    </section>
  )
}
