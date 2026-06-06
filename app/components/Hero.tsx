'use client'
import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const cityLights = [
  { top: '24%', right: '14%', width: 2, height: 26, opacity: 0.28, delay: 0 },
  { top: '31%', right: '22%', width: 1, height: 42, opacity: 0.18, delay: 0.8 },
  { top: '39%', right: '9%', width: 1, height: 18, opacity: 0.22, delay: 1.4 },
  { top: '47%', right: '18%', width: 2, height: 34, opacity: 0.16, delay: 2.1 },
  { top: '56%', right: '12%', width: 1, height: 28, opacity: 0.2, delay: 0.5 },
  { top: '64%', right: '25%', width: 1, height: 20, opacity: 0.16, delay: 1.8 },
]

const skylineDots = [
  { top: '28%', left: '66%', size: 2, opacity: 0.24, delay: 0.2 },
  { top: '34%', left: '72%', size: 3, opacity: 0.18, delay: 1.1 },
  { top: '44%', left: '80%', size: 2, opacity: 0.28, delay: 0.6 },
  { top: '52%', left: '70%', size: 2, opacity: 0.2, delay: 1.7 },
  { top: '61%', left: '84%', size: 3, opacity: 0.16, delay: 2.3 },
  { top: '69%', left: '76%', size: 2, opacity: 0.22, delay: 1.4 },
  { top: '38%', left: '91%', size: 2, opacity: 0.2, delay: 0.9 },
  { top: '58%', left: '93%', size: 2, opacity: 0.15, delay: 2.8 },
]

export default function Hero() {
  const lightRef  = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const contentY       = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0])
  const bgScale        = useTransform(scrollYProgress, [0, 1], [1, 1.06])
  const scrollOpacity  = useTransform(scrollYProgress, [0, 0.18], [0.45, 0])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (lightRef.current) {
        lightRef.current.style.background =
          `radial-gradient(540px circle at ${e.clientX}px ${e.clientY}px, rgba(109,40,217,0.1) 0%, rgba(37,99,235,0.055) 38%, transparent 68%)`
      }
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative isolate min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#080808]"
    >
      {/* Cinematic city-night background */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ scale: bgScale }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, #050507 0%, #07101c 34%, #090812 62%, #050505 100%)',
          }}
        />

        <motion.div
          className="absolute -bottom-[18%] -left-[18%] h-[78vw] max-h-[860px] min-h-[420px] w-[78vw] min-w-[420px] max-w-[860px] rounded-full opacity-[0.28] md:opacity-[0.34]"
          style={{
            background:
              'radial-gradient(circle, rgba(124,58,237,0.34) 0%, rgba(30,64,175,0.18) 38%, transparent 68%)',
          }}
          animate={{ x: ['-4%', '5%', '-2%'], y: ['2%', '-4%', '2%'], scale: [1, 1.06, 1] }}
          transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
        />

        <motion.div
          className="absolute right-[-12%] top-[12%] h-[46vw] max-h-[560px] min-h-[280px] w-[46vw] min-w-[280px] max-w-[560px] rounded-full opacity-[0.16] md:opacity-[0.2]"
          style={{
            background:
              'radial-gradient(circle, rgba(212,175,55,0.26) 0%, rgba(88,28,135,0.1) 42%, transparent 70%)',
          }}
          animate={{ x: ['3%', '-4%', '3%'], y: ['-2%', '5%', '-2%'], scale: [1, 1.04, 1] }}
          transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
        />

        <motion.div
          className="absolute left-[-18%] top-[58%] h-[1px] w-[140%] opacity-[0.18] md:opacity-[0.24]"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, rgba(88,166,255,0.08) 20%, rgba(212,175,55,0.28) 48%, rgba(124,58,237,0.18) 62%, transparent 100%)',
          }}
          animate={{ x: ['-8%', '8%', '-8%'], opacity: [0.12, 0.24, 0.12] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />

        <motion.div
          className="absolute left-[-22%] top-[36%] h-[2px] w-[120%] opacity-[0.12] md:opacity-[0.18]"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 35%, rgba(212,175,55,0.2) 52%, transparent 76%)',
          }}
          animate={{ x: ['-12%', '12%', '-12%'] }}
          transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div
          className="absolute bottom-[19%] right-0 hidden h-[32%] w-[46%] opacity-70 sm:block"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.08) 52%, transparent 53%), linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.05) 72%, transparent 73%)',
            backgroundSize: '72px 100%, 118px 100%',
          }}
        />

        {cityLights.map((light) => (
          <motion.div
            key={`${light.top}-${light.right}`}
            className="absolute hidden rounded-full bg-[rgba(212,175,55,0.75)] sm:block"
            style={{
              top: light.top,
              right: light.right,
              width: `${light.width}px`,
              height: `${light.height}px`,
              opacity: light.opacity,
            }}
            animate={{ opacity: [light.opacity * 0.45, light.opacity, light.opacity * 0.55] }}
            transition={{ duration: 5.5, delay: light.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}

        {skylineDots.map((dot) => (
          <motion.div
            key={`${dot.top}-${dot.left}`}
            className="absolute rounded-full bg-[rgba(255,224,156,0.8)]"
            style={{
              top: dot.top,
              left: dot.left,
              width: `${dot.size}px`,
              height: `${dot.size}px`,
              opacity: dot.opacity,
            }}
            animate={{ opacity: [dot.opacity * 0.4, dot.opacity, dot.opacity * 0.5] }}
            transition={{ duration: 6.8, delay: dot.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}

        <div
          className="absolute inset-0 opacity-[0.026] md:opacity-[0.032]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180' viewBox='0 0 180 180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.82' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.45'/%3E%3C/svg%3E\")",
            backgroundSize: '180px 180px',
            mixBlendMode: 'screen',
          }}
        />
      </motion.div>

      {/* Readability grade over cinematic background */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(2,6,18,0.68) 0%, rgba(3,7,18,0.56) 42%, rgba(8,8,8,0.86) 100%), radial-gradient(ellipse 76% 64% at 44% 45%, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.68) 100%)',
        }}
      />

      {/* Mouse follow light */}
      <div
        ref={lightRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 2, transition: 'background 0.1s ease' }}
      />

      {/* Ambient orbs */}
      <motion.div style={{ scale: bgScale }} className="absolute inset-0 z-[2] pointer-events-none">
        <div
          className="absolute animate-orb-1"
          style={{
            top: '4%', left: '-20%',
            width: '820px', height: '820px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(109,40,217,0.08) 0%, transparent 66%)',
          }}
        />
        <div
          className="absolute animate-orb-2"
          style={{
            bottom: '-5%', right: '-18%',
            width: '680px', height: '680px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 68%)',
          }}
        />
        <div
          className="absolute animate-orb-3"
          style={{
            top: '55%', left: '60%',
            width: '560px', height: '560px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(124,58,237,0.04) 0%, transparent 68%)',
          }}
        />
      </motion.div>

      {/* Subtle grid */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)
          `,
          backgroundSize: '90px 90px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%)',
        }}
      />

      {/* Cinematic horizon line */}
      <div
        className="absolute left-0 right-0 z-[2] pointer-events-none"
        style={{
          top: '50%',
          height: '1px',
          background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.03) 20%, rgba(255,255,255,0.03) 80%, transparent)',
        }}
      />

      {/* Content — subtle parallax on scroll (no blur, stays crisp) */}
      <motion.div
        className="relative z-10 w-full max-w-7xl mx-auto px-5 md:px-8 lg:px-12"
        style={{ y: contentY }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center select-none">

          {/* Left: branding — fades out on scroll */}
          <motion.div className="text-center lg:text-left" style={{ opacity: contentOpacity }}>
            <motion.p
              className="text-[9px] md:text-[10px] tracking-[0.85em] text-zinc-600 mb-6 md:mb-8 uppercase"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              Portfolio · 2026
            </motion.p>

            <motion.h1
              className="font-black leading-none text-[5.5rem] sm:text-[7rem] md:text-[8.5rem] lg:text-[9rem] xl:text-[10.5rem]"
              style={{
                letterSpacing: '0',
                background: 'linear-gradient(160deg, #ffffff 0%, rgba(255,255,255,0.82) 45%, rgba(200,200,220,0.6) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
              initial={{ opacity: 0, y: 52 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              AIC
            </motion.h1>

            <motion.p
              className="mt-5 md:mt-7 text-[9px] md:text-[11px] tracking-[0.42em] text-zinc-500 uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.72, ease: 'easeOut' }}
            >
              Web Design × AI × Overseas Culture
            </motion.p>

            <motion.div
              className="mx-auto mt-6 max-w-[34rem] lg:mx-0"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.82, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-[10px] md:text-[12px] font-semibold uppercase tracking-[0.28em] text-white/72">
                Freelance Web Design for Brands, Shops, and Creators.
              </p>
              <p className="mt-4 text-sm leading-7 text-white/46 md:text-[15px] md:leading-8">
                海外カルチャーとAIを活かし、店舗・サービス・個人ブランドの世界観が伝わるWebサイトを制作します。
              </p>
            </motion.div>

            <motion.div
              className="mt-10 md:mt-14 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center lg:justify-start"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.a
                href="#works"
                className="group inline-flex items-center justify-center gap-3 px-8 py-3.5 text-[10px] uppercase tracking-[0.32em] text-white md:px-10 md:py-4 md:text-[11px]"
                style={{
                  border: '1px solid rgba(255,255,255,0.18)',
                  background: 'transparent',
                }}
                whileHover={{
                  background: '#ffffff',
                  borderColor: '#ffffff',
                  color: '#080808',
                  boxShadow: '0 0 60px rgba(255,255,255,0.14), 0 0 100px rgba(109,40,217,0.1)',
                  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                }}
              >
                VIEW WORKS
                <svg
                  className="w-3 h-3 md:w-3.5 md:h-3.5 group-hover:translate-y-0.5 transition-transform duration-300"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                </svg>
              </motion.a>
              <motion.a
                href="#contact"
                className="group inline-flex items-center justify-center gap-3 px-8 py-3.5 text-[10px] uppercase tracking-[0.3em] text-[#080808] md:px-10 md:py-4 md:text-[11px]"
                style={{
                  border: '1px solid rgba(212,175,55,0.48)',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.96), rgba(212,175,55,0.82))',
                  boxShadow: '0 0 36px rgba(212,175,55,0.12), inset 0 1px 0 rgba(255,255,255,0.55)',
                }}
                whileHover={{
                  y: -2,
                  boxShadow: '0 0 60px rgba(212,175,55,0.24), 0 0 110px rgba(109,40,217,0.12)',
                  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                }}
              >
                START A PROJECT
                <svg
                  className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 md:h-3.5 md:w-3.5"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 7l-10 10M17 7H7m10 0v10" />
                </svg>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right: Achievement card */}
          <motion.div
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="relative flex flex-col items-center justify-center py-12 sm:py-16 px-14 sm:px-20 rounded-2xl"
              style={{
                border: '1px solid rgba(212,175,55,0.18)',
                background:
                  'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(212,175,55,0.07) 0%, transparent 70%), rgba(255,255,255,0.018)',
                backdropFilter: 'blur(12px)',
                boxShadow:
                  '0 0 90px rgba(212,175,55,0.07), 0 50px 130px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)',
                minWidth: '240px',
              }}
            >
              {/* Number */}
              <div
                className="font-black leading-none text-white"
                style={{
                  fontSize: 'clamp(5.5rem, 13vw, 10rem)',
                  letterSpacing: '-0.045em',
                  textShadow:
                    '0 0 50px rgba(212,175,55,0.22), 0 0 100px rgba(212,175,55,0.10)',
                }}
              >
                10+
              </div>

              {/* Label */}
              <div
                className="font-bold text-white text-center"
                style={{
                  fontSize: 'clamp(1.6rem, 4vw, 2.8rem)',
                  letterSpacing: '-0.02em',
                  marginTop: '-0.05em',
                }}
              >
                Works
              </div>

              {/* Divider */}
              <div
                className="my-4 sm:my-5"
                style={{
                  width: '40px',
                  height: '1px',
                  background: 'rgba(212,175,55,0.35)',
                }}
              />

              {/* Subtitle */}
              <p
                className="text-[10px] tracking-[0.38em] uppercase text-center"
                style={{ color: 'rgba(212,175,55,0.75)' }}
              >
                Web Design Projects
              </p>

              {/* Footer */}
              <div className="mt-5 flex items-center gap-2">
                <div
                  className="w-1.5 h-1.5 rounded-full animate-pulse-glow"
                  style={{ background: 'rgba(212,175,55,0.55)' }}
                />
                <p
                  className="text-[9px] tracking-[0.3em] uppercase"
                  style={{ color: 'rgba(255,255,255,0.25)' }}
                >
                  Projects Completed
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 md:bottom-10 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.45 }}
        transition={{ delay: 1.5, duration: 1.2 }}
        style={{ opacity: scrollOpacity }}
      >
        <span className="text-[9px] tracking-[0.65em] text-zinc-600 uppercase">Scroll</span>
        <div className="w-[1px] h-10 md:h-12 overflow-hidden">
          <div className="w-full h-full bg-gradient-to-b from-zinc-500 to-transparent animate-scroll-line" />
        </div>
      </motion.div>

      {/* Bottom gradient fade into Works */}
      <div
        className="absolute bottom-0 left-0 right-0 z-[8] pointer-events-none"
        style={{
          height: '200px',
          background: 'linear-gradient(to bottom, transparent, #080808)',
        }}
      />
    </section>
  )
}
