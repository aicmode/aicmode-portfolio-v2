'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useId, useRef } from 'react'

/**
 * Dialog used by both the case-study cards and the work cards.
 *
 * Accessibility handled here rather than per-caller:
 *   - Escape closes, and the keydown listener is on the panel so it fires
 *     wherever focus currently is inside it.
 *   - Tab is trapped between the first and last focusable descendant.
 *   - Focus moves to the panel on open and returns to the trigger on close, so
 *     keyboard users are not dropped back at the top of the document.
 *   - The rest of the page is marked aria-hidden via `inert` on the body's other
 *     children is deliberately NOT done — the overlay is a sibling of #main and
 *     `role="dialog"` + `aria-modal` is what screen readers act on here.
 */

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'

export default function DetailModal({
  open,
  onClose,
  label,
  children,
}: {
  open: boolean
  onClose: () => void
  /** Accessible name for the dialog — normally the project title. */
  label: string
  children: React.ReactNode
}) {
  const panelRef = useRef<HTMLDivElement>(null)
  const restoreFocusRef = useRef<HTMLElement | null>(null)
  const titleId = useId()

  // Remember where focus came from before the dialog steals it.
  useEffect(() => {
    if (!open) return
    restoreFocusRef.current = document.activeElement as HTMLElement | null
    const panel = panelRef.current
    /*
     * `preventScroll`, both here and on the way out. `overflow: hidden` stops
     * the user from scrolling the page but not the browser: moving focus into
     * a fixed overlay still scrolls the document to "reveal" it, and with
     * `scroll-behavior: smooth` on <html> that reads as the page gliding to the
     * top behind the dialog — and closing then leaves the visitor somewhere
     * they never scrolled to. Focus still moves; only the scrolling is dropped,
     * which is what keeps the grid exactly where it was.
     */
    if (panel) panel.focus({ preventScroll: true })

    /*
     * Locking the page also means putting it back. Releasing `overflow` drops
     * the viewport's scroll offset, so the position is captured on open and
     * written back on close — instantly, because <html> scrolls smoothly and an
     * animated jump on close is exactly what this is here to avoid.
     */
    const restoreScrollY = window.scrollY
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = overflow
      window.scrollTo({ top: restoreScrollY, behavior: 'instant' })
      restoreFocusRef.current?.focus?.({ preventScroll: true })
    }
  }, [open])

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation()
        onClose()
        return
      }
      if (event.key !== 'Tab') return

      const panel = panelRef.current
      if (!panel) return
      const focusable = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null || el === panel,
      )
      if (focusable.length === 0) {
        event.preventDefault()
        return
      }
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const active = document.activeElement

      if (!event.shiftKey && active === last) {
        event.preventDefault()
        first.focus()
      } else if (event.shiftKey && (active === first || active === panel)) {
        event.preventDefault()
        last.focus()
      }
    },
    [onClose],
  )

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          // Top padding clears the fixed nav on small screens, so the dialog's
          // close button never sits on top of the menu toggle.
          className="detail-modal-overlay fixed inset-0 z-[10001] flex items-start justify-center overflow-y-auto overscroll-contain px-4 py-16 sm:px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Backdrop: click-to-close lives on a plain div, and the accessible
              way out is the labelled close button inside the panel. */}
          <div
            className="fixed inset-0 bg-[rgba(2,2,4,0.93)] backdrop-blur-md"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            tabIndex={-1}
            onKeyDown={onKeyDown}
            className="detail-modal-panel relative z-10 w-full max-w-3xl border border-white/[0.09] bg-[#08080a] shadow-[0_60px_160px_rgba(0,0,0,0.8)]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <span id={titleId} className="sr-only">
              {label}
            </span>
            <button
              type="button"
              onClick={onClose}
              className="absolute right-3 top-3 z-20 inline-flex h-10 w-10 items-center justify-center border border-white/12 bg-black/60 text-white/60 backdrop-blur-md transition-colors duration-300 hover:border-[rgba(212,175,55,0.5)] hover:text-white sm:right-4 sm:top-4"
            >
              <span className="sr-only">閉じる</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-4 w-4" aria-hidden="true">
                <path strokeLinecap="round" strokeWidth={1.5} d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
            {children}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
