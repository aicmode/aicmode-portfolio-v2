import AnimateIn from './AnimateIn'

const influences = [
  { label: 'Music', desc: 'Trap · House · Ambient · Soul' },
  { label: 'Film', desc: 'Cinematic · Editorial · Noir' },
  { label: 'Culture', desc: 'US · UK · JP Street' },
]

const stats = [
  { num: '7+', label: 'Projects' },
  { num: 'AI', label: 'Powered' },
  { num: '2026', label: 'Active' },
]

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
                {stats.map(({ num, label }) => (
                  <div
                    key={label}
                    className="text-center py-4"
                    style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    <div
                      className="font-black text-white mb-1"
                      style={{ fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', letterSpacing: '-0.02em' }}
                    >
                      {num}
                    </div>
                    <div className="text-[9px] tracking-[0.35em] uppercase" style={{ color: '#383838' }}>
                      {label}
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
      </div>
    </section>
  )
}
