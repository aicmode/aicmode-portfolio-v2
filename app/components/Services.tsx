'use client'
import AnimateIn from './AnimateIn'
import { capabilities, serviceEntrances, services } from '../data/services'

/**
 * Three things, then the detail.
 *
 * The three cards at the top are the whole answer to "what can I ask this
 * person for". The problem list and the deliverable list underneath are for the
 * visitor who wants to check that their own situation is covered — they are
 * never the first thing read.
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
        <span className="text-[13px] font-semibold tracking-[0.04em]" style={{ color: '#d8d8d8' }}>
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
      <h4 className="text-[15px] font-semibold leading-7 tracking-wide md:text-base" style={{ color: '#e8e8e8' }}>
        {title}
      </h4>
      <p className="text-[13px] leading-relaxed" style={{ color: '#8a8a8a' }}>
        {desc}
      </p>
    </div>
  )
}

function ServiceEntrance({
  no,
  title,
  audience,
  body,
  items,
}: (typeof serviceEntrances)[number]) {
  return (
    <article className="flex h-full flex-col border border-white/[0.08] bg-white/[0.018] p-6 md:p-7">
      <p className="font-mono text-[10px] tracking-[0.3em] text-[rgba(212,175,55,0.78)]">{no}</p>
      <h3 className="mt-4 text-xl font-semibold leading-[1.4] tracking-[-0.01em] text-white md:text-2xl">
        {title}
      </h3>
      <p className="mt-4 text-[14.5px] leading-7 text-white/72">{body}</p>
      <p className="mt-3 text-[12.5px] leading-6 text-white/50">{audience}</p>
      <ul className="mt-5 space-y-2 border-t border-white/[0.07] pt-5">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-[13px] leading-6 text-white/58">
            <span
              aria-hidden="true"
              className="mt-[9px] h-[3px] w-[3px] flex-shrink-0 bg-[rgba(212,175,55,0.72)]"
            />
            {item}
          </li>
        ))}
      </ul>
    </article>
  )
}

export default function Services() {
  return (
    <section id="services" className="px-5 py-20 md:px-12 md:py-40" style={{ background: '#0a0a0a' }}>
      <div className="mx-auto max-w-7xl">
        {/* ── Services: problem-first ── */}
        <div className="max-w-4xl">
          <AnimateIn>
            <p className="mb-8 text-[12px] tracking-[0.24em] text-zinc-400 md:mb-10">できること</p>
            <h2
              className="font-black leading-[1.2] text-white"
              style={{ fontSize: 'clamp(1.9rem, 4.6vw, 3.6rem)', letterSpacing: '-0.025em' }}
            >
              おもに、この3つを
              <br />
              <span style={{ color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.22)' }}>
                お手伝いします。
              </span>
            </h2>
          </AnimateIn>

          <AnimateIn delay={150}>
            <div className="mt-10 max-w-2xl space-y-6 md:mt-14">
              <p className="text-[15px] leading-8 md:text-[17px]" style={{ color: '#c0c0c0' }}>
                「何を作るか」ではなく、「何に困っているか」からお聞きします。
                やり方が決まっていなくても大丈夫です。
              </p>
              <div
                style={{
                  width: '40px',
                  height: '1px',
                  background: 'linear-gradient(to right, rgba(124,58,237,0.6), rgba(37,99,235,0.3))',
                }}
              />
              <p className="text-[14px] leading-8 md:text-[15px]" style={{ color: '#7a7a7a' }}>
                お話をうかがって、AIを使わないほうが早い場合は、そのままお伝えします。
              </p>
            </div>
          </AnimateIn>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-3 md:mt-16 md:grid-cols-3 md:gap-4">
          {serviceEntrances.map((item, i) => (
            <AnimateIn key={item.no} delay={120 + i * 90}>
              <ServiceEntrance {...item} />
            </AnimateIn>
          ))}
        </div>

        <AnimateIn delay={180}>
          <div className="mt-20 border-t border-white/[0.08] pt-10 md:mt-28 md:pt-14">
            <p className="text-[12px] tracking-[0.24em] text-zinc-400">お困りごとから探す</p>
            <h3 className="mt-4 text-2xl font-black tracking-[-0.02em] text-white md:text-4xl">
              こんなときに、ご相談ください
            </h3>
          </div>
        </AnimateIn>

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
              <p className="mb-4 text-[12px] tracking-[0.24em] text-zinc-400">お渡しできるもの</p>
              <h3
                className="font-black leading-[1.2] text-white"
                style={{ fontSize: 'clamp(1.9rem, 4.6vw, 3.6rem)', letterSpacing: '-0.02em' }}
              >
                作ってお渡しするもの
              </h3>
            </div>
            <p className="mb-12 max-w-2xl text-[14px] leading-8 md:mb-16 md:text-[15px]" style={{ color: '#7a7a7a' }}>
              実際にお渡しできるものの一覧です。どれも上の制作実績で、動くものを見ていただけます。
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
