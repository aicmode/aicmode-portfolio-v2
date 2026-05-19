'use client'
import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion'

export default function Hero() {
  const lightRef  = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const contentY     = useTransform(scrollYProgress, [0, 1], ['0%',  '18%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0])
  const contentBlurPx = useTransform(scrollYProgress, [0, 0.45], [0, 6])
  const contentBlur   = useMotionTemplate`blur(${contentBlurPx}px)`
  const bgScale      = useTransform(scrollYProgress, [0, 1], [1, 1.06])
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.18], [0.45, 0])

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
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#080808]"
    >
      {/* Mouse follow light */}
      <div
        ref={lightRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 2, transition: 'background 0.1s ease' }}
      />

      {/* Ambient orbs — scale on scroll */}
      <motion.div style={{ scale: bgScale }} className="absolute inset-0 pointer-events-none">
        <div
          className="absolute animate-orb-1"
          style={{
            top: '4%', left: '-20%',
            width: '820px', height: '820px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(109,40,217,0.2) 0%, transparent 65%)',
            filter: 'blur(28px)',
          }}
        />
        <div
          className="absolute animate-orb-2"
          style={{
            bottom: '-5%', right: '-18%',
            width: '680px', height: '680px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(37,99,235,0.16) 0%, transparent 65%)',
            filter: 'blur(28px)',
          }}
        />
        <div
          className="absolute animate-orb-3"
          style={{
            top: '55%', left: '60%',
            width: '560px', height: '560px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 65%)',
            filter: 'blur(20px)',
          }}
        />
      </motion.div>

      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none"
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
        className="absolute left-0 right-0 pointer-events-none"
        style={{
          top: '50%',
          height: '1px',
          background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.03) 20%, rgba(255,255,255,0.03) 80%, transparent)',
        }}
      />

      {/* Content — parallax + blur on scroll */}
      <motion.div
        className="relative z-10 text-center px-5 md:px-6 select-none w-full max-w-full"
        style={{ y: contentY, opacity: contentOpacity, filter: contentBlur }}
      >
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[9px] md:text-[10px] tracking-[0.85em] text-zinc-600 mb-6 md:mb-8 uppercase">
            Portfolio · 2026
          </p>
        </motion.div>

        {/* Main title */}
        <motion.div
          initial={{ opacity: 0, y: 52, filter: 'blur(12px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1
            className="font-black leading-none tracking-tight"
            style={{
              fontSize: 'clamp(2.8rem, 14vw, 18rem)',
              letterSpacing: '-0.03em',
              background: 'linear-gradient(160deg, #ffffff 0%, rgba(255,255,255,0.82) 45%, rgba(200,200,220,0.6) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            AICMODE
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, filter: 'blur(4px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.72, ease: 'easeOut' }}
        >
          <p className="mt-5 md:mt-7 text-[9px] md:text-[11px] tracking-[0.42em] text-zinc-500 uppercase">
            Web Design × AI × Overseas Culture
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mt-10 md:mt-14 flex items-center justify-center gap-4"
          initial={{ opacity: 0, y: 22, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.a
            href="#works"
            className="group inline-flex items-center gap-3 px-8 md:px-10 py-3.5 md:py-4 text-[10px] md:text-[11px] tracking-[0.32em] text-white uppercase"
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
            View Works
            <svg
              className="w-3 h-3 md:w-3.5 md:h-3.5 group-hover:translate-y-0.5 transition-transform duration-300"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none"
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
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: '200px',
          background: 'linear-gradient(to bottom, transparent, #080808)',
        }}
      />
    </section>
  )
}
