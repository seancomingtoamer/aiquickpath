'use client'

import { useState } from 'react'

const ACCENT_COLORS = [
  { name: 'Cyan', value: '#00f0ff' },
  { name: 'Purple', value: '#7b2fff' },
  { name: 'Pink', value: '#ff2f7b' },
  { name: 'Green', value: '#00ff88' },
  { name: 'Gold', value: '#ffaa00' },
  { name: 'Red', value: '#ff4444' },
]

type Step = 1 | 2 | 3 | 4

export default function OnboardPage() {
  const [step, setStep] = useState<Step>(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Step 1
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')

  // Step 2
  const [stationName, setStationName] = useState('')

  // Step 3
  const [agentName, setAgentName] = useState('')
  const [agentRole, setAgentRole] = useState('')
  const [accentColor, setAccentColor] = useState('#00f0ff')
  const [systemPrompt, setSystemPrompt] = useState('')

  // Step 4 result
  const [mcpConfig, setMcpConfig] = useState('')
  const [copied, setCopied] = useState(false)

  const handleSubmit = async () => {
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          display_name: displayName || email.split('@')[0],
          station_name: stationName || 'MY STATION',
          agent_name: agentName || 'CTO Agent',
          agent_role: agentRole || 'Agent',
          accent_color: accentColor,
          system_prompt: systemPrompt,
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Failed to create account')
        return
      }

      setMcpConfig(JSON.stringify(data.mcp_config, null, 2))
      setStep(4)
    } catch {
      setError('Network error')
    } finally {
      setLoading(false)
    }
  }

  const copyConfig = async () => {
    await navigator.clipboard.writeText(mcpConfig)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <main className="min-h-screen flex items-center justify-center" style={{ background: '#000008', fontFamily: "'Rajdhani', sans-serif" }}>
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

      <div style={{
        position: 'relative',
        width: 480,
        padding: '40px 36px',
        background: 'rgba(0,0,20,0.8)',
        border: '1px solid rgba(0,240,255,0.2)',
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: 28,
            fontWeight: 900,
            color: '#00f0ff',
            letterSpacing: 6,
            textShadow: '0 0 20px #00f0ff40',
          }}>
            STATIONCLAW
          </div>
          <div style={{ fontSize: 12, color: '#4080a0', letterSpacing: 3, marginTop: 4 }}>
            ONBOARDING
          </div>
        </div>

        {/* Step indicator */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 28 }}>
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              style={{
                width: 32,
                height: 3,
                background: s <= step ? '#00f0ff' : 'rgba(0,240,255,0.15)',
                transition: 'background 0.3s',
              }}
            />
          ))}
        </div>

        {/* Step 1: Account */}
        {step === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <StepLabel>STEP 1: CREATE ACCOUNT</StepLabel>
            <Input placeholder="Display name..." value={displayName} onChange={setDisplayName} />
            <Input placeholder="Email..." type="email" value={email} onChange={setEmail} required />
            <Input placeholder="Password (min 6 chars)..." type="password" value={password} onChange={setPassword} required />
            <NavButtons onNext={() => setStep(2)} nextDisabled={!email || !password || password.length < 6} />
          </div>
        )}

        {/* Step 2: Station */}
        {step === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <StepLabel>STEP 2: NAME YOUR STATION</StepLabel>
            <p style={{ fontSize: 13, color: '#607080' }}>
              Your station is your team workspace. Name it after your project, company, or crew.
            </p>
            <Input placeholder="e.g. FRONTDESKLIFE OPS" value={stationName} onChange={setStationName} />
            <NavButtons onBack={() => setStep(1)} onNext={() => setStep(3)} nextDisabled={!stationName} />
          </div>
        )}

        {/* Step 3: Agent */}
        {step === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <StepLabel>STEP 3: CREATE YOUR AGENT</StepLabel>
            <p style={{ fontSize: 13, color: '#607080' }}>
              Your agent is your AI persona in the station. Claude Code will adopt this identity via MCP.
            </p>
            <Input placeholder="Agent name (e.g. FDL CTO)" value={agentName} onChange={setAgentName} />
            <Input placeholder="Role (e.g. CTO, Lead Engineer)" value={agentRole} onChange={setAgentRole} />

            {/* Color picker */}
            <div>
              <div style={{ fontSize: 10, color: '#506070', fontFamily: "'Orbitron', sans-serif", letterSpacing: 1, marginBottom: 6 }}>
                ACCENT COLOR
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                {ACCENT_COLORS.map((c) => (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => setAccentColor(c.value)}
                    style={{
                      width: 28,
                      height: 28,
                      background: c.value,
                      border: accentColor === c.value ? '2px solid white' : '2px solid transparent',
                      cursor: 'pointer',
                      boxShadow: accentColor === c.value ? `0 0 12px ${c.value}` : 'none',
                    }}
                  />
                ))}
              </div>
            </div>

            <div>
              <div style={{ fontSize: 10, color: '#506070', fontFamily: "'Orbitron', sans-serif", letterSpacing: 1, marginBottom: 6 }}>
                SYSTEM PROMPT (OPTIONAL)
              </div>
              <textarea
                value={systemPrompt}
                onChange={(e) => setSystemPrompt(e.target.value)}
                placeholder="Instructions for your agent's personality, context, and behavior..."
                rows={4}
                style={{
                  ...inputStyle,
                  resize: 'vertical',
                  width: '100%',
                }}
              />
            </div>

            {error && (
              <div style={{
                fontSize: 12,
                color: '#ff4444',
                padding: '6px 10px',
                background: 'rgba(255,68,68,0.1)',
                border: '1px solid rgba(255,68,68,0.2)',
              }}>
                {error}
              </div>
            )}

            <NavButtons
              onBack={() => setStep(2)}
              onNext={handleSubmit}
              nextLabel={loading ? 'CREATING...' : 'LAUNCH STATION'}
              nextDisabled={loading || !agentName}
            />
          </div>
        )}

        {/* Step 4: Success */}
        {step === 4 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <StepLabel>STATION ONLINE</StepLabel>
            <div style={{
              textAlign: 'center',
              fontSize: 14,
              color: '#00ff88',
              padding: '8px',
              background: 'rgba(0,255,136,0.06)',
              border: '1px solid rgba(0,255,136,0.2)',
            }}>
              Account created. Your MCP token is below.
            </div>

            <div>
              <div style={{ fontSize: 10, color: '#506070', fontFamily: "'Orbitron', sans-serif", letterSpacing: 1, marginBottom: 6 }}>
                PASTE INTO CLAUDE CODE CONFIG
              </div>
              <div style={{ position: 'relative' }}>
                <pre style={{
                  ...inputStyle,
                  fontSize: 11,
                  fontFamily: 'monospace',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-all',
                  maxHeight: 200,
                  overflow: 'auto',
                  padding: '12px',
                }}>
                  {mcpConfig}
                </pre>
                <button
                  onClick={copyConfig}
                  type="button"
                  style={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    background: copied ? 'rgba(0,255,136,0.2)' : 'rgba(0,240,255,0.15)',
                    border: `1px solid ${copied ? 'rgba(0,255,136,0.4)' : 'rgba(0,240,255,0.3)'}`,
                    color: copied ? '#00ff88' : '#00f0ff',
                    padding: '4px 12px',
                    fontSize: 10,
                    fontFamily: "'Orbitron', sans-serif",
                    letterSpacing: 1,
                    cursor: 'pointer',
                  }}
                >
                  {copied ? 'COPIED' : 'COPY'}
                </button>
              </div>
            </div>

            <div style={{ fontSize: 12, color: '#ff8800', padding: '6px 10px', background: 'rgba(255,136,0,0.06)', border: '1px solid rgba(255,136,0,0.2)' }}>
              Save this token! It is shown only once and cannot be recovered.
            </div>

            <a
              href="/download"
              style={{
                display: 'block',
                textAlign: 'center',
                padding: '12px 0',
                background: 'rgba(0,240,255,0.15)',
                border: '1px solid rgba(0,240,255,0.4)',
                color: '#00f0ff',
                fontFamily: "'Orbitron', sans-serif",
                fontSize: 13,
                letterSpacing: 3,
                textDecoration: 'none',
              }}
            >
              DOWNLOAD DESKTOP APP
            </a>
          </div>
        )}

        {/* Corner accents */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: 20, height: 1, background: '#00f0ff' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, width: 1, height: 20, background: '#00f0ff' }} />
        <div style={{ position: 'absolute', top: 0, right: 0, width: 20, height: 1, background: '#00f0ff' }} />
        <div style={{ position: 'absolute', top: 0, right: 0, width: 1, height: 20, background: '#00f0ff' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: 20, height: 1, background: '#00f0ff40' }} />
        <div style={{ position: 'absolute', bottom: 0, right: 0, width: 20, height: 1, background: '#00f0ff40' }} />
      </div>
    </main>
  )
}

function StepLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontFamily: "'Orbitron', sans-serif",
      fontSize: 13,
      color: '#00f0ff',
      letterSpacing: 3,
      textAlign: 'center',
    }}>
      {children}
    </div>
  )
}

function Input({ placeholder, value, onChange, type = 'text', required }: {
  placeholder: string
  value: string
  onChange: (v: string) => void
  type?: string
  required?: boolean
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      style={inputStyle}
    />
  )
}

function NavButtons({ onBack, onNext, nextLabel = 'NEXT', nextDisabled }: {
  onBack?: () => void
  onNext: () => void
  nextLabel?: string
  nextDisabled?: boolean
}) {
  return (
    <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          style={{
            flex: 1,
            padding: '10px 0',
            background: 'rgba(0,240,255,0.06)',
            border: '1px solid rgba(0,240,255,0.2)',
            color: '#607080',
            fontFamily: "'Orbitron', sans-serif",
            fontSize: 12,
            letterSpacing: 2,
            cursor: 'pointer',
          }}
        >
          BACK
        </button>
      )}
      <button
        type="button"
        onClick={onNext}
        disabled={nextDisabled}
        style={{
          flex: 1,
          padding: '10px 0',
          background: nextDisabled ? 'rgba(0,240,255,0.05)' : 'rgba(0,240,255,0.15)',
          border: '1px solid rgba(0,240,255,0.4)',
          color: nextDisabled ? '#405060' : '#00f0ff',
          fontFamily: "'Orbitron', sans-serif",
          fontSize: 12,
          letterSpacing: 2,
          cursor: nextDisabled ? 'not-allowed' : 'pointer',
        }}
      >
        {nextLabel}
      </button>
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 12px',
  background: 'rgba(0,240,255,0.05)',
  border: '1px solid rgba(0,240,255,0.2)',
  color: '#c0d0e0',
  fontSize: 14,
  fontFamily: "'Rajdhani', sans-serif",
  outline: 'none',
  letterSpacing: 1,
}
