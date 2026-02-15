export default function DownloadPage() {
  return (
    <main
      className="min-h-screen flex items-center justify-center"
      style={{ background: '#000008', fontFamily: "'Rajdhani', sans-serif" }}
    >
      {/* Grid background */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(0,240,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,240,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'relative',
          width: 480,
          padding: '40px 36px',
          background: 'rgba(0,0,20,0.8)',
          border: '1px solid rgba(0,240,255,0.2)',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: 28,
            fontWeight: 900,
            color: '#00f0ff',
            letterSpacing: 6,
            textShadow: '0 0 20px #00f0ff40',
            marginBottom: 8,
          }}
        >
          STATIONCLAW
        </div>
        <div style={{ fontSize: 12, color: '#4080a0', letterSpacing: 3, marginBottom: 32 }}>
          DESKTOP APP
        </div>

        <div
          style={{
            padding: '20px',
            background: 'rgba(0,240,255,0.04)',
            border: '1px solid rgba(0,240,255,0.15)',
            marginBottom: 24,
          }}
        >
          <div
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: 11,
              color: '#ffaa00',
              letterSpacing: 2,
              marginBottom: 12,
            }}
          >
            COMING SOON
          </div>
          <p style={{ fontSize: 14, color: '#607080', lineHeight: 1.6 }}>
            The StationClaw desktop app is currently in private beta.
            Downloads will be available here once Phase 5 launches.
          </p>
        </div>

        <div style={{ fontSize: 13, color: '#506070', marginBottom: 20 }}>
          In the meantime, you can run StationClaw locally:
        </div>

        <pre
          style={{
            textAlign: 'left',
            padding: '16px',
            background: 'rgba(0,0,0,0.4)',
            border: '1px solid rgba(0,240,255,0.1)',
            fontSize: 12,
            fontFamily: 'monospace',
            color: '#8090a0',
            lineHeight: 1.6,
            overflow: 'auto',
          }}
        >
{`git clone <repo-url> stationclaw
cd stationclaw
npm install
cp .env.example .env
# Edit .env with your Supabase credentials
npm run dev`}
        </pre>

        <a
          href="/onboard"
          style={{
            display: 'block',
            marginTop: 24,
            padding: '10px 0',
            background: 'rgba(0,240,255,0.1)',
            border: '1px solid rgba(0,240,255,0.3)',
            color: '#00f0ff',
            fontFamily: "'Orbitron', sans-serif",
            fontSize: 11,
            letterSpacing: 2,
            textDecoration: 'none',
          }}
        >
          BACK TO ONBOARDING
        </a>

        {/* Corner accents */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: 20, height: 1, background: '#00f0ff' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, width: 1, height: 20, background: '#00f0ff' }} />
        <div style={{ position: 'absolute', top: 0, right: 0, width: 20, height: 1, background: '#00f0ff' }} />
        <div style={{ position: 'absolute', top: 0, right: 0, width: 1, height: 20, background: '#00f0ff' }} />
      </div>
    </main>
  )
}
