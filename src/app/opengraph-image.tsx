import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Volíme FEI 2026 | Mucha & Buček'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #020810 0%, #04101f 50%, #060f1e 100%)',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background glow orbs */}
        <div
          style={{
            position: 'absolute',
            top: -120,
            left: -120,
            width: 480,
            height: 480,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(79,70,229,0.18) 0%, transparent 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -80,
            right: -80,
            width: 380,
            height: 380,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(59,130,246,0.14) 0%, transparent 70%)',
          }}
        />

        {/* Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: 'rgba(79,70,229,0.15)',
            border: '1px solid rgba(79,70,229,0.35)',
            borderRadius: 999,
            padding: '6px 18px',
            marginBottom: 28,
          }}
        >
          <span style={{ color: '#818cf8', fontSize: 13, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
            FEI VŠB-TUO · Akademický senát
          </span>
        </div>

        {/* Main title */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 900,
            color: '#ffffff',
            lineHeight: 1.1,
            textAlign: 'center',
            marginBottom: 16,
          }}
        >
          Volíme FEI 2026
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 28,
            color: 'rgba(147,197,253,0.7)',
            textAlign: 'center',
            marginBottom: 48,
            maxWidth: 700,
          }}
        >
          Mucha &amp; Buček — za transparentný, dostupný senát
        </div>

        {/* Candidate chips */}
        <div style={{ display: 'flex', gap: 20 }}>
          {[
            { name: 'Tomáš Mucha', id: 'MUC0075' },
            { name: 'Martin Buček', id: 'BUC0130' },
          ].map(({ name, id }) => (
            <div
              key={id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                background: 'rgba(12,31,61,0.7)',
                border: '1px solid rgba(59,130,246,0.2)',
                borderRadius: 16,
                padding: '18px 32px',
                gap: 6,
              }}
            >
              <span style={{ color: '#ffffff', fontSize: 20, fontWeight: 700 }}>{name}</span>
              <span style={{ color: 'rgba(96,165,250,0.6)', fontSize: 14, fontFamily: 'monospace' }}>{id}</span>
            </div>
          ))}
        </div>

        {/* Bottom tag */}
        <div
          style={{
            position: 'absolute',
            bottom: 28,
            color: 'rgba(96,165,250,0.35)',
            fontSize: 14,
            letterSpacing: '0.1em',
          }}
        >
          volimefei.vercel.app · Hlasovanie 12.–15. 5. 2026
        </div>
      </div>
    ),
    { ...size }
  )
}
