import AnimateIn from './AnimateIn'

export default function About() {
  return (
    <section
      id="about"
      className="py-20 md:py-44 px-5 md:px-12"
      style={{ background: '#0c0c0c' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-24 items-center">
          {/* Left */}
          <AnimateIn>
            <div>
              <p className="text-[10px] tracking-[0.55em] text-zinc-600 mb-8 md:mb-10 uppercase">
                About
              </p>
              <div className="relative pl-5 md:pl-6">
                <div
                  className="absolute left-0 top-0 bottom-0 w-[1px]"
                  style={{
                    background:
                      'linear-gradient(to bottom, transparent, rgba(124,58,237,0.7), transparent)',
                  }}
                />
                <h2
                  className="font-black text-white leading-tight"
                  style={{
                    fontSize: 'clamp(2.2rem, 6vw, 5.5rem)',
                    letterSpacing: '-0.025em',
                  }}
                >
                  Design<br />
                  <span
                    style={{
                      color: 'transparent',
                      WebkitTextStroke: '1px rgba(255,255,255,0.25)',
                    }}
                  >
                    that<br />moves.
                  </span>
                </h2>
              </div>
            </div>
          </AnimateIn>

          {/* Right */}
          <AnimateIn delay={180}>
            <div className="space-y-5 md:space-y-7">
              <p
                className="text-base md:text-lg leading-relaxed"
                style={{ color: '#c4c4c4' }}
              >
                海外カルチャー、音楽、映画から影響を受けたデザイン。
              </p>
              <p
                className="text-base md:text-lg leading-relaxed"
                style={{ color: '#c4c4c4' }}
              >
                AIとWeb制作を組み合わせ、<br />
                感覚的で世界観のあるサイトを制作。
              </p>

              <div
                className="pt-4"
                style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
              />

              <p className="text-sm leading-relaxed text-zinc-600">
                Design influenced by overseas culture,<br />
                music, and film — built with AI and imagination.
              </p>

              {/* Decorative badges */}
              <div className="flex flex-wrap gap-2 md:gap-3 pt-2">
                {['2026', 'AICMODE', 'JP/EN'].map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] tracking-[0.2em] px-3 py-1.5"
                    style={{
                      border: '1px solid rgba(255,255,255,0.08)',
                      color: '#525252',
                    }}
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
