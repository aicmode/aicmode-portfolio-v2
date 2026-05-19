'use client'
import { useEffect, useState, useRef } from 'react'

export default function Hero() {
  const [mounted, setMounted] = useState(false)
  const lightRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (lightRef.current) {
        lightRef.current.style.background =
          `radial-gradient(520px circle at ${e.clientX}px ${e.clientY}px, rgba(109,40,217,0.09) 0%, rgba(37,99,235,0.05) 38%, transparent 68%)`
      }
    }

    const handleScroll = () => {
      const y = window.scrollY
      if (contentRef.current) {
        contentRef.current.style.transform = `translateY(${y * 0.22}px)`
        contentRef.current.style.opacity = String(Math.max(0, 1 - y / 500))
      }
      if (scrollRef.current) {
        scrollRef.current.style.opacity = String(Math.max(0, (1 - y / 220) * 0.45))
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#080808]">

      {/* Mouse follow light */}
      <div
        ref={lightRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 2, transition: 'background 0.12s ease' }}
      />

      {/* Animated ambient orbs */}
      <div
        className="absolute pointer-events-none animate-orb-1"
        style={{
          top: '4%', left: '-20%',
          width: '820px', height: '820px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(109,40,217,0.2) 0%, transparent 65%)',
          filter: 'blur(28px)',
        }}
      />
      <div
        className="absolute pointer-events-none animate-orb-2"
        style={{
          bottom: '-5%', right: '-18%',
          width: '680px', height: '680px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(37,99,235,0.16) 0%, transparent 65%)',
          filter: 'blur(28px)',
        }}
      />
      <div
        className="absolute pointer-events-none animate-orb-3"
        style={{
          top: '55%', left: '60%',
          width: '560px', height: '560px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 65%)',
          filter: 'blur(20px)',
        }}
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)
          `,
          backgroundSize: '90px 90px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%)',
        }}
      />

      {/* Content — parallax target */}
      <div
        ref={contentRef}
        className="relative z-10 text-center px-5 md:px-6 select-none w-full max-w-full"
        style={{ willChange: 'transform, opacity' }}
      >
        {/* Label */}
        <div style={{ opacity: mounted ? 1 : 0, transition: 'opacity 1s ease 0.1s' }}>
          <p className="text-[9px] md:text-[10px] tracking-[0.85em] text-zinc-600 mb-6 md:mb-8 uppercase">
            Portfolio · 2026
          </p>
        </div>

        {/* Main title — gradient text */}
        <div
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(52px)',
            transition: 'opacity 1.3s cubic-bezier(0.22,1,0.36,1) 0.22s, transform 1.5s cubic-bezier(0.22,1,0.36,1) 0.22s',
          }}
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
        </div>

        {/* Subtitle */}
        <div style={{ opacity: mounted ? 1 : 0, transition: 'opacity 1s ease 0.72s' }}>
          <p className="mt-5 md:mt-7 text-[9px] md:text-[11px] tracking-[0.42em] text-zinc-500 uppercase">
            Web Design × AI × Overseas Culture
          </p>
        </div>

        {/* CTA */}
        <div
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(22px)',
            transition: 'opacity 1s ease 0.95s, transform 1.1s cubic-bezier(0.22,1,0.36,1) 0.95s',
          }}
          className="mt-10 md:mt-14 flex items-center justify-center gap-4"
        >
          <a
            href="#works"
            className="group inline-flex items-center gap-3 px-8 md:px-10 py-3.5 md:py-4 text-[10px] md:text-[11px] tracking-[0.32em] text-white uppercase"
            style={{
              border: '1px solid rgba(255,255,255,0.18)',
              transition: 'background 0.45s cubic-bezier(0.22,1,0.36,1), color 0.45s ease, border-color 0.45s ease, box-shadow 0.45s ease',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.background = '#ffffff'
              el.style.color = '#080808'
              el.style.borderColor = '#ffffff'
              el.style.boxShadow = '0 0 48px rgba(255,255,255,0.18), 0 0 80px rgba(109,40,217,0.12)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.background = 'transparent'
              el.style.color = '#ffffff'
              el.style.borderColor = 'rgba(255,255,255,0.18)'
              el.style.boxShadow = 'none'
            }}
          >
            View Works
            <svg
              className="w-3 h-3 md:w-3.5 md:h-3.5 group-hover:translate-y-0.5 transition-transform duration-300"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
            </svg>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none"
        style={{ opacity: mounted ? 0.45 : 0, transition: 'opacity 1.2s ease 1.5s' }}
      >
        <span className="text-[9px] tracking-[0.65em] text-zinc-600 uppercase">Scroll</span>
        <div className="w-[1px] h-10 md:h-12 overflow-hidden">
          <div className="w-full h-full bg-gradient-to-b from-zinc-500 to-transparent animate-scroll-line" />
        </div>
      </div>
    </section>
  )
}
