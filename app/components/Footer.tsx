export default function Footer() {
  return (
    <footer
      className="py-8 px-6 md:px-12 bg-[#080808]"
      style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-bold tracking-[0.3em] text-white text-sm">
          AICMODE
        </span>
        <span
          className="text-[11px] tracking-[0.3em]"
          style={{ color: '#404040' }}
        >
          AICMODE © 2026
        </span>
      </div>
    </footer>
  )
}
