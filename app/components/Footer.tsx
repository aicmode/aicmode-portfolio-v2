export default function Footer() {
  return (
    <footer
      className="py-8 px-6 md:px-12 bg-[#080808]"
      style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-bold tracking-[0.3em] text-white text-sm">
          AIC
        </span>
        {/* #404040 on #080808 was 1.93:1 — below the 4.5:1 minimum for body
            text. #8a8a8a keeps the muted look at ~6.4:1. */}
        <span className="text-[11px] tracking-[0.2em]" style={{ color: '#8a8a8a' }}>
          © 2026 AIC
        </span>
      </div>
    </footer>
  )
}
