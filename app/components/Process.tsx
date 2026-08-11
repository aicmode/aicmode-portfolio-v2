'use client'
import AnimateIn from './AnimateIn'
import { processFollowUp, processSteps } from '../data/services'

/**
 * The four-column grid is kept — it reads well and matches the rest of the
 * page — and "Operate & Improve" is added as a supporting row underneath rather
 * than squeezing a fifth column in and shrinking every card.
 */
function ProcessCard({ step, title, desc }: { step: string; title: string; desc: string }) {
  return (
    <div
      className="process-card group relative flex h-full flex-col gap-3 p-6 md:p-7"
      style={{
        borderTop: '1px solid rgba(255,255,255,0.1)',
        background: 'linear-gradient(180deg, rgba(255,255,255,0.018), rgba(255,255,255,0))',
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
        aria-hidden="true"
      >
        {step}
      </span>
      {/* h3, not h4: the section heading above is an h2, and jumping a level
          breaks the document outline for screen-reader navigation. */}
      <h3 className="mt-1 text-[16px] font-semibold leading-7 tracking-wide md:text-lg" style={{ color: '#e8e8e8' }}>
        <span className="sr-only">{step}. </span>
        {title}
      </h3>
      <p className="text-[13.5px] leading-7" style={{ color: '#8a8a8a' }}>
        {desc}
      </p>
    </div>
  )
}

export default function Process() {
  return (
    <section id="process" className="px-5 py-20 md:px-12 md:py-40" style={{ background: '#0c0c0c' }}>
      <div className="mx-auto max-w-7xl">
        <AnimateIn>
          <div className="mb-4">
            <p className="mb-4 text-[12px] tracking-[0.24em] text-zinc-400">ご相談の流れ</p>
            <h2
              className="font-black leading-[1.2] text-white"
              style={{ fontSize: 'clamp(1.9rem, 4.6vw, 3.6rem)', letterSpacing: '-0.02em' }}
            >
              ご相談から公開まで
            </h2>
          </div>
          <p className="mb-12 max-w-2xl text-[15px] leading-8 md:mb-16" style={{ color: '#7a7a7a' }}>
            何を作るか決まっていない状態からでも進められる順番です。
            02で内容・期間・費用に納得いただいてから作りはじめます。
          </p>
        </AnimateIn>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-4">
          {processSteps.map((item, i) => (
            <AnimateIn key={item.step} delay={120 + i * 90}>
              <ProcessCard {...item} />
            </AnimateIn>
          ))}
        </div>

        <AnimateIn delay={480}>
          <div
            className="mt-3 flex flex-col gap-3 p-6 md:mt-4 md:flex-row md:items-baseline md:gap-8 md:p-7"
            style={{
              borderTop: '1px solid rgba(212,175,55,0.22)',
              background: 'linear-gradient(180deg, rgba(212,175,55,0.035), rgba(255,255,255,0))',
            }}
          >
            <div className="flex items-baseline gap-4 md:flex-shrink-0">
              <span
                className="font-black leading-none"
                style={{
                  fontSize: 'clamp(1.4rem, 2.4vw, 2rem)',
                  letterSpacing: '-0.02em',
                  color: 'transparent',
                  WebkitTextStroke: '1px rgba(212,175,55,0.4)',
                }}
                aria-hidden="true"
              >
                {processFollowUp.step}
              </span>
              <h3
                className="text-[16px] font-semibold leading-7 tracking-wide md:text-lg"
                style={{ color: 'rgba(240,240,240,0.92)' }}
              >
                <span className="sr-only">{processFollowUp.step}. </span>
                {processFollowUp.title}
              </h3>
            </div>
            <p className="text-[13px] leading-relaxed md:max-w-2xl" style={{ color: '#8a8a8a' }}>
              {processFollowUp.desc}
            </p>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
