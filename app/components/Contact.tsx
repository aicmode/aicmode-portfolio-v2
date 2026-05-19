'use client'
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

export default function Contact() {
  return (
    <section
      id="contact"
      className="py-20 md:py-44 px-5 md:px-12"
      style={{ background: '#0c0c0c' }}
    >
      <div className="max-w-7xl mx-auto">
        <AnimateIn>
          <div className="mb-12 md:mb-16">
            <p className="text-[10px] tracking-[0.55em] text-zinc-600 mb-4 uppercase">
              Contact
            </p>
            <h2
              className="font-black text-white leading-none"
              style={{ fontSize: 'clamp(2.8rem, 7vw, 6rem)', letterSpacing: '-0.02em' }}
            >
              Get in Touch
            </h2>
          </div>
        </AnimateIn>

        <AnimateIn delay={160}>
          <p
            className="text-sm tracking-widest mb-10 md:mb-14"
            style={{ color: '#525252' }}
          >
            Let&apos;s create something together.
          </p>
        </AnimateIn>

        <AnimateIn delay={260}>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
            <SocialLink
              href="https://www.instagram.com/aicmode"
              icon={<InstagramIcon />}
              label="Instagram"
              handle="@aicmode"
            />
            <SocialLink
              href="https://github.com/aicmode"
              icon={<GitHubIcon />}
              label="GitHub"
              handle="aicmode"
            />
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}

function SocialLink({
  href,
  icon,
  label,
  handle,
}: {
  href: string
  icon: React.ReactNode
  label: string
  handle: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-4 px-6 md:px-8 py-4 md:py-5 w-full sm:w-auto"
      style={{
        border: '1px solid rgba(255,255,255,0.07)',
        background: 'rgba(255,255,255,0.02)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        color: '#737373',
        transition: 'border-color 0.35s ease, color 0.35s ease, box-shadow 0.35s ease',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = 'rgba(255,255,255,0.22)'
        el.style.color = '#f0f0f0'
        el.style.boxShadow = '0 0 24px rgba(255,255,255,0.04)'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = 'rgba(255,255,255,0.07)'
        el.style.color = '#737373'
        el.style.boxShadow = 'none'
      }}
    >
      {icon}
      <div>
        <p className="text-[10px] tracking-[0.3em] uppercase mb-0.5" style={{ color: 'inherit', opacity: 0.6 }}>
          {label}
        </p>
        <p className="text-sm font-medium tracking-wide" style={{ color: 'inherit' }}>
          {handle}
        </p>
      </div>
      <svg
        className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 7l-10 10M17 7H7m10 0v10" />
      </svg>
    </a>
  )
}
