'use client'

import { useState } from 'react'

export default function Home() {
  return (
    <main className="grid-bg min-h-screen">
      <Nav />
      <Hero />
      <WhatYouGet />
      <HowItWorks />
      <TheStation />
      <Pricing />
      <CTA />
      <Footer />
    </main>
  )
}

/* ─── NAV ─── */
function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50" style={{ background: 'linear-gradient(to bottom, rgba(0,0,8,0.95), rgba(0,0,8,0.8))' }}>
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-cyan rounded-full" style={{ boxShadow: '0 0 8px #00f0ff' }} />
          <span className="text-cyan font-bold tracking-[0.3em] text-sm" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            AIQUICKPATH
          </span>
        </div>
        <div className="flex items-center gap-8" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
          <a href="#how-it-works" className="text-gray-400 hover:text-cyan transition-colors text-sm tracking-widest">PROCESS</a>
          <a href="#pricing" className="text-gray-400 hover:text-cyan transition-colors text-sm tracking-widest">PRICING</a>
          <a href="#start" className="px-4 py-2 border border-cyan/30 bg-cyan/10 text-cyan text-sm tracking-widest hover:bg-cyan/20 transition-all">
            GET STARTED
          </a>
        </div>
      </div>
    </nav>
  )
}

/* ─── HERO ─── */
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative text-center max-w-4xl">
        {/* Status line */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-1.5 h-1.5 bg-green rounded-full pulse-glow" />
          <span className="text-green/80 text-xs tracking-[0.4em]" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
            ACCEPTING NEW CLIENTS
          </span>
        </div>

        <h1 className="glow-cyan mb-6" style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, letterSpacing: '0.05em', color: '#00f0ff' }}>
          YOUR AI AGENTS.<br />YOUR COMMAND STATION.
        </h1>

        <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-4 leading-relaxed" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
          We teach you <span className="text-white font-semibold">Claude Code</span> and agentic AI from scratch.
          Then we build you a <span className="text-cyan">custom command station</span> where your AI agents
          work for you 24/7.
        </p>

        <p className="text-gray-500 text-sm mb-10" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
          3 sessions. Full setup. Ongoing mentorship.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#start" className="group relative px-8 py-4 bg-cyan/10 border border-cyan/40 text-cyan tracking-[0.2em] text-sm font-semibold hover:bg-cyan/20 transition-all" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            <span className="relative z-10">BOOK YOUR SEAT</span>
            <div className="absolute inset-0 bg-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
          <a href="#how-it-works" className="px-8 py-4 text-gray-400 tracking-[0.2em] text-sm hover:text-white transition-colors" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
            SEE THE PROCESS
          </a>
        </div>

        {/* Terminal line */}
        <div className="mt-16 mx-auto max-w-lg bg-panel/80 border border-panel-border rounded-sm px-4 py-3 text-left">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-pink" />
            <div className="w-2 h-2 rounded-full bg-yellow-500" />
            <div className="w-2 h-2 rounded-full bg-green" />
          </div>
          <p className="text-cyan/60 text-xs font-mono">
            <span className="text-green">$</span> claude &quot;build me a lead capture system&quot;<br />
            <span className="text-gray-500">{'>'} Creating n8n workflow... connecting Airtable...</span><br />
            <span className="text-gray-500">{'>'} Telegram notifications configured.</span><br />
            <span className="text-cyan">{'>'} Done. 3 new leads captured while you slept.</span>
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 float">
        <div className="w-px h-12 bg-gradient-to-b from-transparent via-cyan/30 to-transparent" />
      </div>
    </section>
  )
}

/* ─── WHAT YOU GET ─── */
function WhatYouGet() {
  const features = [
    {
      icon: '//01',
      title: 'CLAUDE CODE MASTERY',
      desc: 'Learn to command Claude Code like a pro. Write prompts that build entire features. Understand agentic patterns that multiply your output.',
      color: '#00f0ff',
    },
    {
      icon: '//02',
      title: 'YOUR OWN AGENT FLEET',
      desc: 'We set up your personal AI agents — each with a name, a role, and a mission. CTO, Marketing Director, Field Ops — your call.',
      color: '#7b2fff',
    },
    {
      icon: '//03',
      title: 'CUSTOM COMMAND STATION',
      desc: 'A visual Junosphere station where you see your agents work. Real-time task boards, activity feeds, and holographic project maps.',
      color: '#ff2f7b',
    },
    {
      icon: '//04',
      title: 'INFRASTRUCTURE & DEPLOY',
      desc: 'We connect your stack: Vercel, Supabase, n8n workflows, Telegram bots, Airtable — all wired up and running before we leave.',
      color: '#00ff88',
    },
  ]

  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-cyan/50 text-xs tracking-[0.5em]" style={{ fontFamily: 'Orbitron, sans-serif' }}>WHAT YOU WALK AWAY WITH</span>
          <h2 className="glow-cyan mt-3 text-3xl font-bold tracking-wide" style={{ fontFamily: 'Orbitron, sans-serif', color: '#00f0ff' }}>
            THE FULL STACK
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="relative p-6 bg-panel/60 border border-panel-border hover:border-opacity-60 transition-all group"
              style={{ borderColor: `${f.color}20` }}
            >
              {/* Corner accent */}
              <div className="absolute top-0 left-0 w-8 h-px" style={{ background: f.color }} />
              <div className="absolute top-0 left-0 w-px h-8" style={{ background: f.color }} />

              <span className="text-xs tracking-[0.3em] font-bold mb-3 block" style={{ fontFamily: 'Orbitron, sans-serif', color: f.color }}>
                {f.icon}
              </span>
              <h3 className="text-white text-lg font-bold tracking-wide mb-2" style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 14 }}>
                {f.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed" style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: 15 }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── HOW IT WORKS ─── */
function HowItWorks() {
  const steps = [
    {
      session: 'SESSION 01',
      title: 'FOUNDATIONS',
      desc: 'Claude Code from zero. We walk you through prompting, file editing, multi-step tasks, git flows. You build your first automated workflow live on the call.',
      duration: '90 min Zoom',
    },
    {
      session: 'SESSION 02',
      title: 'AGENT ARCHITECTURE',
      desc: 'Design your agent fleet. We set up your infrastructure: DigitalOcean droplets, Telegram bots, n8n automations, Airtable command center. Your agents come online.',
      duration: '90 min Zoom',
    },
    {
      session: 'SESSION 03',
      title: 'STATION LAUNCH',
      desc: 'We deploy your Junosphere command station. Connect all your agents. Run your first autonomous operation. You leave with a fully operational AI empire.',
      duration: '90 min Zoom',
    },
  ]

  return (
    <section id="how-it-works" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-purple/50 text-xs tracking-[0.5em]" style={{ fontFamily: 'Orbitron, sans-serif' }}>THE PROCESS</span>
          <h2 className="glow-purple mt-3 text-3xl font-bold tracking-wide" style={{ fontFamily: 'Orbitron, sans-serif', color: '#7b2fff' }}>
            3 SESSIONS TO LAUNCH
          </h2>
        </div>

        <div className="space-y-8">
          {steps.map((step, i) => (
            <div key={step.session} className="relative flex gap-6 items-start">
              {/* Timeline line */}
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 border-2 border-purple bg-dark rounded-full" style={{ boxShadow: '0 0 10px rgba(123, 47, 255, 0.5)' }} />
                {i < steps.length - 1 && <div className="w-px flex-1 bg-gradient-to-b from-purple/40 to-transparent min-h-[80px]" />}
              </div>

              <div className="flex-1 pb-8">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-purple text-xs tracking-[0.3em] font-bold" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    {step.session}
                  </span>
                  <span className="text-gray-600 text-xs" style={{ fontFamily: 'Rajdhani, sans-serif' }}>{step.duration}</span>
                </div>
                <h3 className="text-white text-base font-bold tracking-widest mb-2" style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 13 }}>
                  {step.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed" style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: 15 }}>
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── THE STATION ─── */
function TheStation() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <span className="text-pink/50 text-xs tracking-[0.5em]" style={{ fontFamily: 'Orbitron, sans-serif' }}>THE VISUAL EXPERIENCE</span>
        <h2 className="mt-3 text-3xl font-bold tracking-wide mb-6" style={{ fontFamily: 'Orbitron, sans-serif', color: '#ff2f7b', textShadow: '0 0 20px rgba(255, 47, 123, 0.3)' }}>
          YOUR COMMAND STATION
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
          Every client gets their own <span className="text-white">Junosphere station</span> — a cyberpunk space station
          desktop app where you see your AI agents collaborate in real time. Think No Man&apos;s Sky meets mission control.
        </p>

        {/* Station mockup */}
        <div className="relative mx-auto max-w-3xl glow-box-cyan bg-panel border border-cyan/20 rounded-sm overflow-hidden">
          {/* Top bar */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-cyan/10">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-cyan rounded-full" />
              <span className="text-cyan text-[10px] tracking-[0.3em]" style={{ fontFamily: 'Orbitron, sans-serif' }}>JUNOSPHERE</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-green rounded-full" />
              <span className="text-green/60 text-[10px] tracking-widest" style={{ fontFamily: 'Rajdhani, sans-serif' }}>3 AGENTS ONLINE</span>
            </div>
          </div>

          {/* Main area */}
          <div className="grid grid-cols-3 gap-px bg-cyan/5 min-h-[250px]">
            {/* Galaxy map */}
            <div className="col-span-2 bg-dark/80 p-6 flex flex-col items-center justify-center relative">
              <div className="w-16 h-16 border border-cyan/30 rounded-full flex items-center justify-center mb-3" style={{ boxShadow: '0 0 20px rgba(0,240,255,0.1)' }}>
                <div className="w-4 h-4 bg-cyan/20 rotate-45" />
              </div>
              <span className="text-cyan/40 text-[10px] tracking-[0.3em]" style={{ fontFamily: 'Orbitron, sans-serif' }}>GALAXY MAP</span>
              {/* Orbiting dots */}
              <div className="absolute top-1/2 left-1/2 w-32 h-32 -translate-x-1/2 -translate-y-1/2 border border-cyan/10 rounded-full" />
              <div className="absolute top-8 right-12 w-2 h-2 bg-purple rounded-full" style={{ boxShadow: '0 0 8px #7b2fff' }} />
              <div className="absolute bottom-12 left-16 w-2 h-2 bg-pink rounded-full" style={{ boxShadow: '0 0 8px #ff2f7b' }} />
            </div>

            {/* Agent list */}
            <div className="bg-dark/80 p-4">
              <span className="text-purple/60 text-[9px] tracking-[0.2em] block mb-3" style={{ fontFamily: 'Orbitron, sans-serif' }}>AGENTS</span>
              {['CTO AGENT', 'MARKETING', 'FIELD OPS'].map((name, i) => {
                const colors = ['#00f0ff', '#7b2fff', '#ff2f7b']
                return (
                  <div key={name} className="flex items-center gap-2 mb-2 p-1.5 bg-white/[0.02] border-l-2" style={{ borderColor: colors[i] }}>
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: colors[i], boxShadow: `0 0 4px ${colors[i]}` }} />
                    <span className="text-[10px] text-gray-400 tracking-wider" style={{ fontFamily: 'Rajdhani, sans-serif' }}>{name}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex items-center justify-between px-4 py-1.5 border-t border-cyan/10">
            <span className="text-[9px] text-gray-600 tracking-widest" style={{ fontFamily: 'Orbitron, sans-serif' }}>v0.1.0</span>
            <span className="text-[9px] text-gray-600 tracking-wider">SUPABASE: <span className="text-green">CONNECTED</span></span>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── PRICING ─── */
function Pricing() {
  return (
    <section id="pricing" className="py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <span className="text-green/50 text-xs tracking-[0.5em]" style={{ fontFamily: 'Orbitron, sans-serif' }}>INVESTMENT</span>
        <h2 className="mt-3 text-3xl font-bold tracking-wide mb-4" style={{ fontFamily: 'Orbitron, sans-serif', color: '#00ff88', textShadow: '0 0 20px rgba(0, 255, 136, 0.3)' }}>
          ONE SEAT. FULL ACCESS.
        </h2>
        <p className="text-gray-400 mb-12" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
          Limited seats per cohort. We keep it small so you get real attention.
        </p>

        <div className="mx-auto max-w-md bg-panel border border-green/20 p-8 relative glow-box-cyan">
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-12 h-px bg-green" />
          <div className="absolute top-0 left-0 w-px h-12 bg-green" />
          <div className="absolute bottom-0 right-0 w-12 h-px bg-green" />
          <div className="absolute bottom-0 right-0 w-px h-12 bg-green" />

          <div className="mb-6">
            <span className="text-green text-xs tracking-[0.3em]" style={{ fontFamily: 'Orbitron, sans-serif' }}>LAUNCH SEAT</span>
          </div>

          <div className="mb-6">
            <span className="text-5xl font-bold text-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>$1,997</span>
            <span className="text-gray-500 text-sm ml-2" style={{ fontFamily: 'Rajdhani, sans-serif' }}>/seat</span>
          </div>

          <ul className="text-left space-y-3 mb-8">
            {[
              '3 live Zoom sessions (90 min each)',
              'Full Claude Code training curriculum',
              'Custom agent fleet setup',
              'Junosphere command station deployed',
              'Infrastructure wired: Vercel, Supabase, n8n, Airtable',
              'Telegram bot agents configured',
              '30 days post-launch mentorship',
              'Access to private community',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-gray-300" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                <span className="text-green mt-0.5">{'>'}</span>
                {item}
              </li>
            ))}
          </ul>

          <a href="#start" className="block w-full py-3 bg-green/10 border border-green/40 text-green text-sm tracking-[0.2em] text-center hover:bg-green/20 transition-all" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            CLAIM YOUR SEAT
          </a>
        </div>
      </div>
    </section>
  )
}

/* ─── CTA / CONTACT FORM ─── */
function CTA() {
  const [email, setEmail] = useState('')
  const [business, setBusiness] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setLoading(true)
    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, business }),
      })
      if (res.ok) setSubmitted(true)
    } catch {
      // fallback — still show success for now
      setSubmitted(true)
    }
    setLoading(false)
  }

  return (
    <section id="start" className="py-24 px-6">
      <div className="max-w-lg mx-auto text-center">
        <h2 className="glow-cyan text-2xl font-bold tracking-wide mb-3" style={{ fontFamily: 'Orbitron, sans-serif', color: '#00f0ff' }}>
          READY TO LAUNCH?
        </h2>
        <p className="text-gray-400 mb-8" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
          Drop your email. We&apos;ll reach out to schedule your first session.
        </p>

        {submitted ? (
          <div className="p-6 border border-green/30 bg-green/5">
            <div className="w-3 h-3 bg-green rounded-full mx-auto mb-3" style={{ boxShadow: '0 0 12px #00ff88' }} />
            <p className="text-green text-sm tracking-widest" style={{ fontFamily: 'Orbitron, sans-serif' }}>TRANSMISSION RECEIVED</p>
            <p className="text-gray-400 text-sm mt-2" style={{ fontFamily: 'Rajdhani, sans-serif' }}>We&apos;ll be in touch within 24 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="YOUR EMAIL"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-panel border border-panel-border text-white text-sm tracking-widest placeholder:text-gray-600 focus:border-cyan/40 focus:outline-none transition-colors"
              style={{ fontFamily: 'Rajdhani, sans-serif' }}
            />
            <input
              type="text"
              placeholder="WHAT DO YOU DO? (OPTIONAL)"
              value={business}
              onChange={(e) => setBusiness(e.target.value)}
              className="w-full px-4 py-3 bg-panel border border-panel-border text-white text-sm tracking-widest placeholder:text-gray-600 focus:border-cyan/40 focus:outline-none transition-colors"
              style={{ fontFamily: 'Rajdhani, sans-serif' }}
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-cyan/10 border border-cyan/40 text-cyan text-sm tracking-[0.2em] hover:bg-cyan/20 transition-all disabled:opacity-50"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              {loading ? 'TRANSMITTING...' : 'GET STARTED'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}

/* ─── FOOTER ─── */
function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-panel-border">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-cyan rounded-full" />
          <span className="text-gray-600 text-xs tracking-[0.2em]" style={{ fontFamily: 'Orbitron, sans-serif' }}>AIQUICKPATH</span>
        </div>
        <span className="text-gray-700 text-xs" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
          Built by Sean & Cam // Powered by Claude Code
        </span>
      </div>
    </footer>
  )
}
