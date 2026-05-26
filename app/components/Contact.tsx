'use client'
import { motion } from 'framer-motion'
import AnimateIn from './AnimateIn'

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5 flex-shrink-0">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="4" strokeWidth="1.5" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" strokeWidth="0" />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 flex-shrink-0">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

function ThreadsIcon() {
  return (
    <svg viewBox="0 0 192 192" fill="currentColor" className="w-5 h-5 flex-shrink-0">
      <path d="M141.537 88.988C140.71 88.592 139.87 88.21 139.019 87.845 137.537 60.538 122.616 44.905 97.562 44.745 97.448 44.744 97.336 44.744 97.222 44.744 82.236 44.744 69.773 51.141 62.102 62.781L75.881 72.233C81.612 63.538 90.605 61.685 97.229 61.685 97.305 61.685 97.382 61.685 97.458 61.686 105.707 61.738 111.932 64.137 115.961 68.814 118.893 72.219 120.854 76.925 121.825 82.864 114.511 81.621 106.601 81.239 98.145 81.723 74.325 83.095 59.011 96.988 60.04 116.292 60.562 126.084 65.44 134.508 73.775 140.011 80.822 144.663 89.899 146.938 99.332 146.423 111.79 145.74 121.563 140.987 128.381 132.296 133.559 125.696 136.834 117.143 138.28 106.366 144.217 109.949 148.617 114.664 151.047 120.332 155.179 129.967 155.42 145.8 142.501 158.708 131.182 170.016 117.576 174.908 97.014 175.059 74.204 174.89 56.954 167.575 45.738 153.317 35.236 139.966 29.808 120.682 29.605 96 29.808 71.318 35.236 52.034 45.738 38.683 56.954 24.425 74.204 17.11 97.013 16.94 119.988 17.111 137.539 24.461 149.184 38.788 154.894 45.814 159.199 54.649 162.037 64.95L178.184 60.642C174.744 47.962 169.331 37.036 161.965 27.974 147.036 9.607 125.202.195 97.07 0H96.957C68.882.194 47.292 9.642 32.788 28.079 19.882 44.486 13.224 67.316 13.001 95.933L13 96 13.001 96.068C13.224 124.684 19.882 147.514 32.788 163.921 47.292 182.358 68.882 191.806 96.957 192H97.07C122.03 191.827 139.624 185.292 154.118 170.811 173.081 151.866 172.51 128.119 166.26 113.541 161.776 103.087 153.227 94.596 141.537 88.988ZM98.44 129.507C88 130.095 77.154 125.409 76.62 115.372 76.223 107.93 81.916 99.626 99.081 98.637 101.047 98.523 102.976 98.468 104.871 98.468 111.106 98.468 116.939 99.074 122.242 100.233 120.264 124.935 108.662 128.946 98.44 129.507Z" />
    </svg>
  )
}

const socials = [
  {
    href: 'https://www.instagram.com/aicmode',
    icon: <InstagramIcon />,
    label: 'Instagram',
    handle: '@aicmode',
    desc: 'Visual Works & Process',
    glow: 'rgba(131,58,180,0.18)',
    border: 'rgba(131,58,180,0.2)',
  },
  {
    href: 'https://github.com/aicmode',
    icon: <GitHubIcon />,
    label: 'GitHub',
    handle: 'aicmode',
    desc: 'Open Source & Code',
    glow: 'rgba(255,255,255,0.07)',
    border: 'rgba(255,255,255,0.12)',
  },
  {
    href: 'https://www.threads.net/@aicmode',
    icon: <ThreadsIcon />,
    label: 'Threads',
    handle: '@aicmode',
    desc: 'Thoughts & Updates',
    glow: 'rgba(255,255,255,0.07)',
    border: 'rgba(255,255,255,0.12)',
  },
]

function SocialCard({
  href,
  icon,
  label,
  handle,
  desc,
  glow,
  border,
}: (typeof socials)[number]) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-5 px-6 py-5 w-full"
      style={{
        border: `1px solid rgba(255,255,255,0.07)`,
        background: 'rgba(255,255,255,0.02)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        textDecoration: 'none',
      }}
      whileHover={{
        borderColor: border,
        y: -6,
        boxShadow: `0 0 40px ${glow}, 0 12px 40px rgba(0,0,0,0.5)`,
        transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
      }}
      initial={{ borderColor: 'rgba(255,255,255,0.07)', boxShadow: 'none', y: 0 }}
    >
      <div
        className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', color: '#686868', transition: 'color 0.3s ease, border-color 0.3s ease' }}
      >
        <span className="group-hover:text-white" style={{ color: 'inherit', transition: 'color 0.3s ease' }}>
          {icon}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[9px] tracking-[0.4em] uppercase mb-0.5" style={{ color: '#363636' }}>
          {label}
        </p>
        <p className="text-sm font-semibold tracking-wide text-white mb-0.5">
          {handle}
        </p>
        <p className="text-[10px] tracking-wide" style={{ color: '#383838' }}>
          {desc}
        </p>
      </div>
      <svg
        className="w-3.5 h-3.5 opacity-0 group-hover:opacity-60 flex-shrink-0 -translate-x-2 group-hover:translate-x-0"
        style={{ color: '#888', transition: 'all 0.35s ease' }}
        fill="none" stroke="currentColor" viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 7l-10 10M17 7H7m10 0v10" />
      </svg>
    </motion.a>
  )
}

export default function Contact() {
  return (
    <section
      id="contact"
      className="py-20 md:py-44 px-5 md:px-12 relative overflow-hidden"
      style={{ background: '#0c0c0c' }}
    >
      {/* Ambient glow bg */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '20%', left: '50%', transform: 'translateX(-50%)',
          width: '700px', height: '400px',
          background: 'radial-gradient(ellipse at center, rgba(109,40,217,0.06) 0%, transparent 65%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* ── Available badge ── */}
        <AnimateIn delay={0}>
          <div className="mb-10 md:mb-14 flex items-center gap-3">
            <span
              className="flex items-center gap-2 text-[9px] tracking-[0.45em] uppercase px-3.5 py-1.5"
              style={{
                border: '1px solid rgba(109,217,109,0.25)',
                color: '#6bcb6b',
                background: 'rgba(109,217,109,0.04)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-available flex-shrink-0"
                style={{ background: '#6bcb6b', boxShadow: '0 0 8px rgba(107,203,107,0.6)' }}
              />
              Available for Freelance Projects
            </span>
          </div>
        </AnimateIn>

        {/* ── Headline ── */}
        <AnimateIn delay={80}>
          <div className="mb-6 md:mb-8">
            <p className="text-[10px] tracking-[0.55em] text-zinc-600 mb-5 uppercase">
              Contact
            </p>
            <h2
              className="font-black text-white leading-tight"
              style={{ fontSize: 'clamp(2.4rem, 6.5vw, 5.5rem)', letterSpacing: '-0.025em' }}
            >
              Let&apos;s build something<br />
              <span style={{
                background: 'linear-gradient(120deg, #ffffff 0%, rgba(200,180,255,0.85) 60%, rgba(100,160,255,0.7) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                cinematic.
              </span>
            </h2>
          </div>
        </AnimateIn>

        {/* ── Copy ── */}
        <AnimateIn delay={160}>
          <div className="mb-10 md:mb-16" style={{ maxWidth: '520px' }}>
            <p className="text-sm md:text-base leading-relaxed mb-2" style={{ color: '#585858' }}>
              AI × Design × Overseas Culture — blending technology<br />
              with a global creative perspective.
            </p>
            <p className="text-[11px] tracking-[0.2em] uppercase" style={{ color: '#303030' }}>
              Web Design · Branding · Creative Direction
            </p>
          </div>
        </AnimateIn>

        {/* ── Divider ── */}
        <AnimateIn delay={280}>
          <div className="mb-8 md:mb-10 flex items-center gap-6">
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, rgba(255,255,255,0.06), transparent)' }} />
            <span className="text-[9px] tracking-[0.45em] text-zinc-700 uppercase whitespace-nowrap">Connect</span>
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, rgba(255,255,255,0.06), transparent)' }} />
          </div>
        </AnimateIn>

        {/* ── Social cards ── */}
        <AnimateIn delay={340}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            {socials.map((s, i) => (
              <div key={s.label} className={i === 2 ? 'sm:col-span-2' : ''}>
                <SocialCard {...s} />
              </div>
            ))}
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
