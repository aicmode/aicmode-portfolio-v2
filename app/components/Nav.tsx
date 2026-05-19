'use client'
import { useEffect, useState } from 'react'

const links = [
  { label: 'Works', href: '#works' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: 'background 0.5s ease, backdrop-filter 0.5s ease, border-color 0.5s ease',
        background: scrolled ? 'rgba(8, 8, 8, 0.82)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(24px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
        <a
          href="#"
          className="font-bold tracking-[0.3em] text-white text-sm hover:opacity-70 transition-opacity duration-300"
        >
          AICMODE
        </a>
        <div className="hidden md:flex items-center gap-10">
          {links.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-[11px] tracking-[0.25em] text-zinc-500 hover:text-white transition-colors duration-300 uppercase"
            >
              {label}
            </a>
          ))}
        </div>
        {/* Mobile menu indicator */}
        <div className="md:hidden flex flex-col gap-1.5">
          <span className="block w-5 h-[1px] bg-zinc-400" />
          <span className="block w-3 h-[1px] bg-zinc-400" />
        </div>
      </div>
    </nav>
  )
}
