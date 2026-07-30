'use client'
import AnimateIn from './AnimateIn'
import { capabilities, services } from '../data/services'

/**
 * Two lists, two jobs.
 *
 * `Services` is problem-first: the client recognises their own situation in the
 * left-hand line and reads what I would do about it. `Capabilities` is
 * deliverable-first: the concrete artefact that gets handed over. Previously
 * these two sections said the same thing twice under different headings.
 */

function ProblemRow({
  problem,
  name,
  desc,
}: {
  problem: string
  name: string
  desc: string
}) {
  return (
    <div
      className="group flex h-full flex-col gap-3 py-6 pr-4"
      style={{
        borderTop: '1px solid rgba(255,255,255,0.07)',
        transition: 'border-color 0.45s ease',
      }}
    >
      {/* The client's words come first, in quotes, so it is findable by scanning. */}
      <p className="text-[13px] leading-6" style={{ color: '#8f8f8f' }}>
        <span aria-hidden="true" style={{ color: 'rgba(212,175,55,0.8)' }}>
          「
        </span>
        {problem}
        <span aria-hidden="true" style={{ color: 'rgba(212,175,55,0.8)' }}>
          」
        </span>
      </p>
      <div className="flex items-baseline gap-2.5">
        <span aria-hidden="true" className="text-[10px]" style={{ color: 'rgba(212,175,55,0.8)' }}>
          →
        </span>
        <span
          className="text-[11px] font-semibold uppercase tracking-[0.22em]"
          style={{ color: '#d8d8d8' }}
        >
          {name}
        </span>
      </div>
      <p className="text-[13px] leading-relaxed" style={{ color: '#8a8a8a' }}>
        {desc}
      </p>
    </div>
  )
}

function CapabilityCard({ id, title, desc }: { id: string; title: string; desc: string }) {
  return (
    <div
      className="capability-card group relative flex h-full flex-col gap-4 overflow-hidden p-6 md:p-7"
      style={{
        border: '1px solid rgba(255,255,255,0.07)',
        background: 'rgba(255,255,255,0.02)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      <span
        className="font-mono text-[10px] tracking-[0.3em]"
        style={{ color: 'rgba(255,255,255,0.3)' }}
        aria-hidden="true"
      >
        {id}
      </span>
      <h4 className="text-base font-semibold tracking-wide md:text-lg" style={{ color: '#e8e8e8' }}>
        {title}
      </h4>
      <p className="text-[13px] leading-relaxed" style={{ color: '#8a8a8a' }}>
        {desc}
      </p>
    </div>
  )
}

export default function Services() {
  return (
    <section id="services" className="px-5 py-20 md:px-12 md:py-40" style={{ background: '#0a0a0a' }}>
      <div className="mx-auto max-w-7xl">
        {/* ── Services: problem-first ── */}
        <div className="max-w-4xl">
          <AnimateIn>
            <p className="mb-8 text-[10px] uppercase tracking-[0.55em] text-zinc-400 md:mb-10">Services</p>
            <h2
              className="font-black leading-[1.05] text-white"
              style={{ fontSize: 'clamp(2rem, 5vw, 4.25rem)', letterSpacing: '-0.025em' }}
            >
              Start From
              <br />
              <span style={{ color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.22)' }}>
                The Problem.
              </span>
            </h2>
          </AnimateIn>

          <AnimateIn delay={150}>
            <div className="mt-10 max-w-2xl space-y-6 md:mt-14">
              <p className="text-base leading-relaxed md:text-lg" style={{ color: '#c0c0c0' }}>
                作りたいものではなく、解決したいことから始めます。下の左側にご自身の状況に近いものがあれば、そこからご相談ください。
              </p>
              <div
                style={{
                  width: '40px',
                  height: '1px',
                  background: 'linear-gradient(to right, rgba(124,58,237,0.6), rgba(37,99,235,0.3))',
                }}
              />
              <p className="text-sm leading-relaxed md:text-base" style={{ color: '#7a7a7a' }}>
                どの手段が適しているかは、業務の流れ・利用者・運用体制・予算によって変わります。
                ヒアリングの結果、AIを使わないほうが早い場合はそのようにお伝えします。
              </p>
            </div>
          </AnimateIn>

          <AnimateIn delay={200}>
            <p className="mt-10 text-[9px] uppercase tracking-[0.4em]" style={{ color: '#7a7a7a' }}>
              Your Problem → What I Build
            </p>
          </AnimateIn>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-x-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-12">
          {services.map((service, i) => (
            <AnimateIn key={service.id} delay={120 + i * 70}>
              <ProblemRow problem={service.problem} name={service.name} desc={service.desc} />
            </AnimateIn>
          ))}
        </div>

        {/* ── Capabilities: deliverable-first ── */}
        <div className="mt-28 md:mt-44">
          <AnimateIn>
            <div className="mb-4">
              <p className="mb-4 text-[10px] uppercase tracking-[0.55em] text-zinc-400">Capabilities</p>
              <h3
                className="font-black leading-none text-white"
                style={{ fontSize: 'clamp(2.2rem, 5.5vw, 4.5rem)', letterSpacing: '-0.02em' }}
              >
                What Gets Delivered
              </h3>
            </div>
            <p className="mb-12 max-w-2xl text-sm leading-relaxed md:mb-16 md:text-base" style={{ color: '#7a7a7a' }}>
              納品物として渡せる成果物の一覧です。どれも上のWorks・Case Studiesで実装例を確認できます。
            </p>
          </AnimateIn>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-4">
            {capabilities.map((item, i) => (
              <AnimateIn key={item.id} delay={120 + i * 80}>
                <CapabilityCard {...item} />
              </AnimateIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
