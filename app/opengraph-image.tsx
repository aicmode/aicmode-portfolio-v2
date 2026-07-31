import { ImageResponse } from 'next/og'

/**
 * OG / social share card, generated at build time.
 *
 * Generated rather than shipped as a binary so it can never drift from the
 * site's positioning, and English-only on purpose: the default font bundled
 * with `next/og` has no Japanese glyphs, and loading one would blow the 500KB
 * bundle limit for no real gain on a share card.
 */
export const alt = 'AICMODE — AI Systems, Business Automation & Web Applications'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '76px 84px',
          background: 'linear-gradient(135deg, #050507 0%, #07101c 36%, #090812 64%, #050505 100%)',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 20,
              letterSpacing: 14,
              color: 'rgba(212,175,55,0.78)',
              textTransform: 'uppercase',
            }}
          >
            AICMODE
          </div>
          <div
            style={{
              marginTop: 44,
              fontSize: 70,
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: -3,
              color: '#ffffff',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span>AI Systems</span>
            <span style={{ color: 'rgba(255,255,255,0.42)' }}>&amp; Business Automation</span>
            <span>× Web Applications</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              width: 96,
              height: 1,
              background: 'rgba(212,175,55,0.5)',
              marginBottom: 26,
            }}
          />
          <div style={{ fontSize: 25, lineHeight: 1.45, color: 'rgba(255,255,255,0.62)' }}>
            Built from business problems — not just feature requests.
          </div>
          <div
            style={{
              marginTop: 26,
              fontSize: 17,
              letterSpacing: 5,
              color: 'rgba(255,255,255,0.32)',
              textTransform: 'uppercase',
            }}
          >
            AI Systems · Business Automation · API Integration · Web Applications
          </div>
        </div>
      </div>
    ),
    size,
  )
}
