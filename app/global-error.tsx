'use client'
import { useEffect } from 'react'

/**
 * Last-resort boundary for errors thrown in the root layout itself, where
 * error.tsx cannot render. Must supply its own <html>/<body>, and must not
 * depend on the stylesheet chunk — an error here may well be the chunk failing.
 */
export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string }
  unstable_retry: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <html lang="ja">
      <body style={{ margin: 0, backgroundColor: '#080808', color: '#f0f0f0' }}>
        <main
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.5rem',
            padding: '2rem',
            textAlign: 'center',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          <p style={{ fontSize: '10px', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.75)' }}>
            AIC
          </p>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>
            ページの読み込みに失敗しました
          </h1>
          <p style={{ fontSize: '0.875rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.55)', margin: 0 }}>
            お手数ですが、再読み込みをお試しください。
          </p>
          <button
            type="button"
            onClick={() => unstable_retry()}
            style={{
              padding: '0.875rem 2.5rem',
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '0.08em',
              color: '#080808',
              cursor: 'pointer',
              border: '1px solid rgba(212,175,55,0.48)',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.96), rgba(212,175,55,0.82))',
            }}
          >
            再読み込み
          </button>
        </main>
      </body>
    </html>
  )
}
