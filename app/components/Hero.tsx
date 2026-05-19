'use client'
import { useEffect, useState } from 'react'

export default function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#080808]">
      {/* Ambient orbs */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '10%',
          left: '-15%',
          width: '700px',
          height: '700px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(109,40,217,0.22) 0%, transparent 65%)',
          filter: 'blur(20px)',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '5%',
          right: '-10%',
          width: '550px',
          height: '550px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 65%)',
          filter: 'blur(20px)',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '900px',
          height: '900px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(255,255,255,0.015) 0%, transparent 60%)',
        }}
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)
          `,
          backgroundSize: '90px 90px',
          maskImage:
            'radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-5 md:px-6 select-none w-full max-w-full">
        {/* Label */}
        <div
          style={{
            opacity: mounted ? 1 : 0,
            transition: 'opacity 1s ease 0.1s',
          }}
        >
          <p className="text-[9px] md:text-[10px] tracking-[0.7em] text-zinc-600 mb-6 md:mb-8 uppercase">
            Portfolio
          </p>
        </div>

        {/* Main title */}
        <div
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(40px)',
            transition: 'opacity 1.2s cubic-bezier(0.22,1,0.36,1) 0.25s, transform 1.2s cubic-bezier(0.22,1,0.36,1) 0.25s',
          }}
        >
          <h1
            className="font-black leading-none tracking-tight text-white"
            style={{
              fontSize: 'clamp(2.8rem, 14vw, 18rem)',
              letterSpacing: '-0.025em',
            }}
          >
            AICMODE
          </h1>
        </div>

        {/* Subtitle */}
        <div
          style={{
            opacity: mounted ? 1 : 0,
            transition: 'opacity 1s ease 0.65s',
          }}
        >
          <p className="mt-5 md:mt-7 text-[9px] md:text-[11px] tracking-[0.35em] md:tracking-[0.45em] text-zinc-400 uppercase">
            Web Design × AI × Overseas Culture
          </p>
        </div>

        {/* CTA */}
        <div
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 1s ease 0.9s, transform 1s ease 0.9s',
          }}
          className="mt-10 md:mt-14 flex justify-center"
        >
          <a
            href="#works"
            className="group inline-flex items-center gap-3 md:gap-4 px-8 md:px-10 py-3.5 md:py-4 border border-white/20 text-[10px] md:text-[11px] tracking-[0.3em] text-white uppercase hover:bg-white hover:text-black transition-all duration-500"
          >
            View Works
            <svg
              className="w-3 h-3 md:w-3.5 md:h-3.5 group-hover:translate-y-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        style={{
          opacity: mounted ? 0.45 : 0,
          transition: 'opacity 1.2s ease 1.4s',
        }}
      >
        <span className="text-[9px] tracking-[0.55em] text-zinc-600 uppercase">
          Scroll
        </span>
        <div className="w-[1px] h-10 md:h-12 overflow-hidden">
          <div
            className="w-full h-full bg-gradient-to-b from-zinc-500 to-transparent animate-scroll-line"
          />
        </div>
      </div>
    </section>
  )
}
