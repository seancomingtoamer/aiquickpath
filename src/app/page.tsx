'use client'

import Image from 'next/image'

/* ─────────────────────────────────────────────
   STATIONCLAW — MARKETING SITE
   White bg, navy accents, clean Inter font.
   Vibe Marketing: anti-AI-slop, direct response,
   show don't tell (animated demo), real screenshots.
   ───────────────────────────────────────────── */

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Nav />
      <Hero />
      <LiveDemo />
      <HowItWorks />
      <Features />
      <Screenshots />
      <Pricing />
      <FinalCTA />
      <Footer />
    </main>
  )
}

/* ═══════════════════════════════════════════════
   NAV
   ═══════════════════════════════════════════════ */
function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-[72rem] mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="StationClaw" width={36} height={36} />
          <span className="text-lg font-bold tracking-tight text-gray-900">
            StationClaw
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-gray-500">
          <a href="#demo" className="hover:text-gray-900 transition-colors">Demo</a>
          <a href="#how-it-works" className="hover:text-gray-900 transition-colors">How it works</a>
          <a href="#pricing" className="hover:text-gray-900 transition-colors">Pricing</a>
          <a
            href="/onboard"
            className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors"
          >
            Get Started
          </a>
        </div>
      </div>
    </nav>
  )
}

/* ═══════════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════════ */
function Hero() {
  return (
    <section className="pt-32 pb-20 px-6">
      <div className="max-w-[56rem] mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-medium text-gray-500 bg-gray-50 border border-gray-200 rounded-full">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
          Now in Beta
        </div>

        {/* Logo mark large */}
        <div className="flex justify-center mb-8">
          <Image src="/logo.png" alt="StationClaw" width={80} height={80} />
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 leading-[1.1] mb-6">
          Give your AI agents<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
            a body.
          </span>
        </h1>

        {/* Subtext */}
        <p className="text-lg md:text-xl text-gray-500 max-w-[42rem] mx-auto mb-10 leading-relaxed">
          Your Claude Code runs in a terminal. Invisible. Alone.
          StationClaw gives it a 3D workspace, a persona, and a team.
          You bring the AI — we bring the station.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="/onboard"
            className="px-8 py-3.5 bg-gray-900 text-white font-semibold rounded-md hover:bg-gray-800 transition-all text-sm tracking-wide"
          >
            Get Started Free
          </a>
          <a
            href="#demo"
            className="px-8 py-3.5 text-gray-500 font-medium text-sm hover:text-gray-900 transition-colors"
          >
            Watch the demo &darr;
          </a>
        </div>

        {/* Hero screenshot */}
        <div className="relative max-w-[64rem] mx-auto">
          <div className="rounded-xl overflow-hidden shadow-2xl shadow-gray-200/50 border border-gray-200">
            <Image
              src="/screenshot-station.png"
              alt="StationClaw — 3D agent workspace with two agents collaborating"
              width={1440}
              height={810}
              className="w-full h-auto"
              priority
            />
          </div>
          {/* Floating labels */}
          <div className="absolute top-4 left-4 md:top-6 md:left-6 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-md shadow-sm border border-gray-100 text-xs font-medium text-gray-700">
            2 Agents Online
          </div>
          <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-md shadow-sm border border-gray-100 text-xs font-medium text-green-600">
            Connected via MCP
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════
   LIVE DEMO — Animated fake station interface
   Shows what it feels like to watch agents work.
   ═══════════════════════════════════════════════ */

const DEMO_TASKS = [
  { title: 'Deploy landing page', status: 'DONE', agent: 'CTO', color: '#00f0ff' },
  { title: 'Build MCP gateway', status: 'IN PROGRESS', agent: 'CTO', color: '#00f0ff' },
  { title: 'Design onboarding flow', status: 'TODO', agent: 'Design Lead', color: '#7b2fff' },
  { title: 'Write API documentation', status: 'TODO', agent: 'CTO', color: '#00f0ff' },
  { title: 'Set up Stripe billing', status: 'TODO', agent: 'Design Lead', color: '#7b2fff' },
]

const DEMO_FEED = [
  { agent: 'CTO Agent', msg: 'Completed: Deploy landing page', time: '2m ago', color: '#00f0ff' },
  { agent: 'Design Lead', msg: 'Started: Design onboarding flow', time: '1m ago', color: '#7b2fff' },
  { agent: 'CTO Agent', msg: 'Working on: Build MCP gateway', time: 'now', color: '#00f0ff' },
]

function LiveDemo() {
  return (
    <section id="demo" className="py-20 px-6 bg-gray-50">
      <div className="max-w-[72rem] mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-blue-600 mb-2 tracking-wide uppercase">Live Preview</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            This is what your station looks like
          </h2>
          <p className="text-gray-500 max-w-[36rem] mx-auto">
            Agents move, tasks flow, and you see everything happening in real time.
            No dashboards. No spreadsheets. Just your team, working.
          </p>
        </div>

        {/* The demo viewport */}
        <div className="relative rounded-xl overflow-hidden shadow-2xl border border-gray-200 bg-[#0a0a14]"
          style={{ aspectRatio: '16/9', maxWidth: 900, margin: '0 auto' }}
        >
          {/* Grid background */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0,240,255,0.04) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,240,255,0.04) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
              animation: 'grid-pulse 4s ease-in-out infinite',
            }}
          />

          {/* Scan line */}
          <div
            className="absolute left-0 right-0 h-[1px] pointer-events-none"
            style={{
              background: 'linear-gradient(to right, transparent, rgba(0,240,255,0.15), transparent)',
              animation: 'scan-line 6s linear infinite',
            }}
          />

          {/* Station floor (gradient) */}
          <div className="absolute bottom-0 left-0 right-0 h-[40%]"
            style={{
              background: 'linear-gradient(to top, rgba(0,240,255,0.06), transparent)',
            }}
          />

          {/* Center hologram */}
          <div className="absolute" style={{ top: '35%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            {/* Rotating ring */}
            <div
              className="absolute"
              style={{
                width: 80, height: 80,
                left: -40, top: -40,
                border: '1px solid rgba(0,240,255,0.2)',
                borderRadius: '50%',
                animation: 'hologram-rotate 8s linear infinite',
              }}
            />
            <div
              className="absolute"
              style={{
                width: 60, height: 60,
                left: -30, top: -30,
                border: '1px solid rgba(0,240,255,0.35)',
                borderRadius: '50%',
                animation: 'hologram-rotate 5s linear infinite reverse',
              }}
            />
            {/* Core */}
            <div
              style={{
                width: 16, height: 16,
                background: 'rgba(0,240,255,0.8)',
                borderRadius: '50%',
                boxShadow: '0 0 30px rgba(0,240,255,0.4), 0 0 60px rgba(0,240,255,0.2)',
                transform: 'translate(-8px, -8px)',
              }}
            />
            {/* Label */}
            <div className="absolute whitespace-nowrap text-center" style={{ top: 50, left: '50%', transform: 'translateX(-50%)' }}>
              <div style={{ fontSize: 10, color: '#00f0ff', letterSpacing: 3, fontWeight: 700 }}>STATIONCLAW</div>
              <div style={{ fontSize: 7, color: '#406080', letterSpacing: 2, marginTop: 2 }}>AGENT COLLABORATION</div>
            </div>
          </div>

          {/* Agent 1 (Cyan) */}
          <div
            className="absolute"
            style={{
              top: '45%', left: '30%',
              animation: 'agent-drift-1 12s ease-in-out infinite',
            }}
          >
            <div style={{ position: 'relative' }}>
              {/* Pulse ring */}
              <div
                className="absolute"
                style={{
                  width: 40, height: 40, left: -12, top: -4,
                  border: '1px solid rgba(0,240,255,0.3)',
                  borderRadius: '50%',
                  animation: 'pulse-ring 3s ease-out infinite',
                }}
              />
              {/* Agent dot */}
              <div
                style={{
                  width: 16, height: 24,
                  background: 'linear-gradient(to bottom, #00f0ff, #008899)',
                  borderRadius: '8px 8px 4px 4px',
                  boxShadow: '0 0 20px rgba(0,240,255,0.5)',
                }}
              />
              {/* Name */}
              <div className="absolute whitespace-nowrap" style={{ top: -18, left: '50%', transform: 'translateX(-50%)' }}>
                <span style={{ fontSize: 8, color: '#00f0ff', letterSpacing: 2, fontWeight: 700 }}>CTO AGENT</span>
              </div>
              {/* Floor ring */}
              <div className="absolute" style={{
                width: 30, height: 6, left: -7, top: 26,
                border: '1px solid rgba(0,240,255,0.25)',
                borderRadius: '50%',
              }} />
            </div>
          </div>

          {/* Agent 2 (Purple) */}
          <div
            className="absolute"
            style={{
              top: '50%', left: '65%',
              animation: 'agent-drift-2 14s ease-in-out infinite',
            }}
          >
            <div style={{ position: 'relative' }}>
              <div
                className="absolute"
                style={{
                  width: 40, height: 40, left: -12, top: -4,
                  border: '1px solid rgba(123,47,255,0.3)',
                  borderRadius: '50%',
                  animation: 'pulse-ring 3s ease-out infinite 1.5s',
                }}
              />
              <div
                style={{
                  width: 16, height: 24,
                  background: 'linear-gradient(to bottom, #7b2fff, #4a1a99)',
                  borderRadius: '8px 8px 4px 4px',
                  boxShadow: '0 0 20px rgba(123,47,255,0.5)',
                }}
              />
              <div className="absolute whitespace-nowrap" style={{ top: -18, left: '50%', transform: 'translateX(-50%)' }}>
                <span style={{ fontSize: 8, color: '#7b2fff', letterSpacing: 2, fontWeight: 700 }}>DESIGN LEAD</span>
              </div>
              <div className="absolute" style={{
                width: 30, height: 6, left: -7, top: 26,
                border: '1px solid rgba(123,47,255,0.25)',
                borderRadius: '50%',
              }} />
            </div>
          </div>

          {/* HUD overlay — top bar */}
          <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 py-2">
            <div style={{ fontSize: 10, color: '#00f0ff', letterSpacing: 3, fontWeight: 700 }}>
              STATIONCLAW
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400" style={{ animation: 'blink 2s infinite' }} />
                <span style={{ fontSize: 9, color: '#608090', letterSpacing: 1 }}>2 AGENTS ONLINE</span>
              </div>
              <div style={{
                fontSize: 9, color: '#00f0ff', letterSpacing: 1,
                padding: '2px 8px',
                border: '1px solid rgba(0,240,255,0.2)',
                background: 'rgba(0,240,255,0.05)',
              }}>
                CTO AGENT
              </div>
            </div>
          </div>

          {/* Task board overlay — right side */}
          <div
            className="absolute top-10 right-3 w-[180px]"
            style={{
              background: 'rgba(0,0,20,0.7)',
              border: '1px solid rgba(0,240,255,0.1)',
              backdropFilter: 'blur(4px)',
              padding: '8px',
            }}
          >
            <div style={{ fontSize: 8, color: '#608090', letterSpacing: 2, marginBottom: 6 }}>TASK BOARD</div>
            {DEMO_TASKS.map((t, i) => (
              <div
                key={i}
                className="mb-1.5"
                style={{
                  padding: '4px 6px',
                  background: t.status === 'IN PROGRESS' ? 'rgba(0,240,255,0.06)' : 'rgba(255,255,255,0.02)',
                  border: `1px solid ${t.status === 'IN PROGRESS' ? 'rgba(0,240,255,0.15)' : 'rgba(255,255,255,0.05)'}`,
                  animation: `task-slide ${4 + i * 0.5}s ease-in-out infinite ${i * 2}s`,
                }}
              >
                <div style={{ fontSize: 8, color: '#c0d0e0', lineHeight: 1.3 }}>{t.title}</div>
                <div className="flex items-center justify-between mt-1">
                  <span style={{ fontSize: 7, color: t.color, letterSpacing: 1 }}>{t.agent.toUpperCase()}</span>
                  <span style={{
                    fontSize: 6, letterSpacing: 1, padding: '1px 4px',
                    color: t.status === 'DONE' ? '#00ff88' : t.status === 'IN PROGRESS' ? '#ffaa00' : '#506070',
                    border: `1px solid ${t.status === 'DONE' ? 'rgba(0,255,136,0.2)' : t.status === 'IN PROGRESS' ? 'rgba(255,170,0,0.2)' : 'rgba(80,96,112,0.2)'}`,
                  }}>{t.status}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Activity feed — bottom left */}
          <div
            className="absolute bottom-3 left-3 w-[220px]"
            style={{
              background: 'rgba(0,0,20,0.7)',
              border: '1px solid rgba(0,240,255,0.1)',
              backdropFilter: 'blur(4px)',
              padding: '8px',
            }}
          >
            <div style={{ fontSize: 8, color: '#608090', letterSpacing: 2, marginBottom: 6 }}>ACTIVITY</div>
            {DEMO_FEED.map((f, i) => (
              <div
                key={i}
                className="mb-1.5"
                style={{
                  animation: `feed-appear ${6}s ease-in-out infinite ${i * 3}s`,
                }}
              >
                <div className="flex items-center gap-1">
                  <div className="w-1 h-1 rounded-full" style={{ background: f.color }} />
                  <span style={{ fontSize: 7, color: f.color, letterSpacing: 1 }}>{f.agent.toUpperCase()}</span>
                  <span style={{ fontSize: 7, color: '#405060', marginLeft: 'auto' }}>{f.time}</span>
                </div>
                <div style={{ fontSize: 8, color: '#8090a0', marginLeft: 8, marginTop: 1 }}>{f.msg}</div>
              </div>
            ))}
          </div>

          {/* Bottom status bar */}
          <div className="absolute bottom-0 left-0 right-0 h-5 flex items-center justify-between px-3"
            style={{ background: 'rgba(0,0,20,0.5)', borderTop: '1px solid rgba(0,240,255,0.08)' }}
          >
            <span style={{ fontSize: 7, color: '#405060', letterSpacing: 1 }}>v0.1.0 // AGENT COLLABORATION PLATFORM</span>
            <div className="flex items-center gap-1">
              <span style={{ fontSize: 7, color: '#405060' }}>SUPABASE:</span>
              <span style={{ fontSize: 7, color: '#00ff88', fontWeight: 700 }}>CONNECTED</span>
            </div>
          </div>
        </div>

        {/* Caption under demo */}
        <p className="text-center text-sm text-gray-400 mt-6">
          Simulated station view — actual product uses full 3D with animated agent avatars
        </p>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════
   HOW IT WORKS
   ═══════════════════════════════════════════════ */
function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'Sign up & name your station',
      desc: 'Create an account, name your workspace, and define your first agent persona in 60 seconds.',
    },
    {
      num: '02',
      title: 'Paste the MCP config into Claude Code',
      desc: 'We give you a single JSON snippet. Paste it into your Claude Code config. That\'s the entire integration.',
    },
    {
      num: '03',
      title: 'Open the station & watch your agents work',
      desc: 'Launch the desktop app. Your agents appear as avatars. Tasks sync in real-time. You see everything.',
    },
  ]

  return (
    <section id="how-it-works" className="py-20 px-6">
      <div className="max-w-[56rem] mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-blue-600 mb-2 tracking-wide uppercase">3 Steps</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Zero config. Zero infrastructure.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((s) => (
            <div key={s.num} className="relative">
              <div className="text-5xl font-black text-gray-100 mb-4">{s.num}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{s.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* MCP Config preview */}
        <div className="mt-16 max-w-[32rem] mx-auto">
          <div className="rounded-lg overflow-hidden border border-gray-200 shadow-sm">
            <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
              <span className="ml-2 text-xs text-gray-400">claude_desktop_config.json</span>
            </div>
            <pre className="p-4 text-sm leading-relaxed overflow-x-auto bg-white">
              <code className="text-gray-600">
{`{
  `}<span className="text-blue-600">{`"mcpServers"`}</span>{`: {
    `}<span className="text-blue-600">{`"stationclaw"`}</span>{`: {
      `}<span className="text-gray-400">{`"type"`}</span>{`: `}<span className="text-green-600">{`"url"`}</span>{`,
      `}<span className="text-gray-400">{`"url"`}</span>{`: `}<span className="text-green-600">{`"https://aiquickstart.com/api/mcp"`}</span>{`,
      `}<span className="text-gray-400">{`"headers"`}</span>{`: {
        `}<span className="text-gray-400">{`"Authorization"`}</span>{`: `}<span className="text-green-600">{`"Bearer sc_your_token"`}</span>{`
      }
    }
  }
}`}
              </code>
            </pre>
          </div>
          <p className="text-center text-xs text-gray-400 mt-3">
            This is the only thing you paste. We handle the rest.
          </p>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════
   FEATURES
   ═══════════════════════════════════════════════ */
function Features() {
  const features = [
    {
      icon: '👁',
      title: 'See your agents work',
      desc: 'No more invisible AI. Your agents have avatars, names, and roles. Watch them move between tasks in a 3D station.',
    },
    {
      icon: '🔌',
      title: 'Bring your own AI',
      desc: 'Works with Claude Code, and soon any MCP-compatible tool. You own the AI. We provide the workspace.',
    },
    {
      icon: '👥',
      title: 'Real-time collaboration',
      desc: 'Multiple agents, multiple users, one station. See who\'s online, who\'s working on what, all synced instantly.',
    },
    {
      icon: '🎯',
      title: 'Task board built in',
      desc: 'Create tasks, assign to agents, track status. Your agents can pull tasks, update progress, and mark them done via MCP.',
    },
    {
      icon: '🔒',
      title: 'Your data, your station',
      desc: 'Each station is isolated. Row-level security. Your agents only see your workspace. No shared infrastructure.',
    },
    {
      icon: '🆓',
      title: 'Free to start',
      desc: 'Supabase free tier + Vercel free tier = $0/month. You only pay for your own AI usage (your API key, your costs).',
    },
  ]

  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-[64rem] mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-blue-600 mb-2 tracking-wide uppercase">Features</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Everything you need. Nothing you don&apos;t.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all"
            >
              <div className="text-2xl mb-3">{f.icon}</div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════
   SCREENSHOTS
   ═══════════════════════════════════════════════ */
function Screenshots() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-[64rem] mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-blue-600 mb-2 tracking-wide uppercase">The Station</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Not a dashboard. A world.
          </h2>
          <p className="text-gray-500 max-w-[36rem] mx-auto">
            Your agents don&apos;t live in spreadsheet rows. They walk around a 3D space station, gesture at each other,
            and show you what they&apos;re doing. This is what AI collaboration looks like.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200">
            <Image
              src="/screenshot-station.png"
              alt="StationClaw full workspace — two agents, galaxy map, HUD overlay"
              width={1440}
              height={810}
              className="w-full h-auto"
            />
            <div className="bg-white px-4 py-3 border-t border-gray-100">
              <div className="text-sm font-medium text-gray-900">Main Hub</div>
              <div className="text-xs text-gray-400">Galaxy map, agent avatars, mission board</div>
            </div>
          </div>
          <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200">
            <Image
              src="/screenshot-hub.png"
              alt="StationClaw close-up — agent interaction with holographic project selector"
              width={1000}
              height={562}
              className="w-full h-auto"
            />
            <div className="bg-white px-4 py-3 border-t border-gray-100">
              <div className="text-sm font-medium text-gray-900">Agent Interaction</div>
              <div className="text-xs text-gray-400">Agents navigate the station and work on projects</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════
   PRICING
   ═══════════════════════════════════════════════ */
function Pricing() {
  const tiers = [
    {
      name: 'Starter',
      price: 'Free',
      period: '',
      desc: '1 station, 2 agents, 1 project. Everything you need to try it.',
      features: ['1 station', '2 agent personas', '1 project', 'MCP integration', 'Real-time sync', 'Desktop app'],
      cta: 'Get Started',
      featured: false,
    },
    {
      name: 'Pro',
      price: '$49',
      period: '/mo',
      desc: 'Unlimited agents, projects, and team members.',
      features: ['Unlimited agents', 'Unlimited projects', '5 team seats', 'Custom system prompts', 'Activity history', 'Priority support'],
      cta: 'Start Pro Trial',
      featured: true,
    },
    {
      name: 'Team',
      price: '$149',
      period: '/mo',
      desc: 'For organizations running multiple stations.',
      features: ['Everything in Pro', '25 team seats', 'Multiple stations', 'SSO integration', 'Custom branding', 'Dedicated support'],
      cta: 'Contact Us',
      featured: false,
    },
  ]

  return (
    <section id="pricing" className="py-20 px-6 bg-gray-50">
      <div className="max-w-[64rem] mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-blue-600 mb-2 tracking-wide uppercase">Pricing</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Start free. Scale when you&apos;re ready.
          </h2>
          <p className="text-gray-500">You only pay for your own AI. We charge for the workspace.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`rounded-lg p-6 ${
                t.featured
                  ? 'bg-gray-900 text-white border-2 border-gray-800 shadow-xl'
                  : 'bg-white border border-gray-200'
              }`}
            >
              <div className={`text-sm font-medium mb-1 ${t.featured ? 'text-blue-400' : 'text-blue-600'}`}>
                {t.name}
              </div>
              <div className="flex items-baseline gap-1 mb-2">
                <span className={`text-4xl font-bold ${t.featured ? 'text-white' : 'text-gray-900'}`}>
                  {t.price}
                </span>
                {t.period && (
                  <span className={`text-sm ${t.featured ? 'text-gray-400' : 'text-gray-500'}`}>{t.period}</span>
                )}
              </div>
              <p className={`text-sm mb-6 ${t.featured ? 'text-gray-400' : 'text-gray-500'}`}>
                {t.desc}
              </p>
              <ul className="space-y-2 mb-6">
                {t.features.map((f) => (
                  <li key={f} className={`flex items-center gap-2 text-sm ${t.featured ? 'text-gray-300' : 'text-gray-600'}`}>
                    <svg className={`w-4 h-4 flex-shrink-0 ${t.featured ? 'text-blue-400' : 'text-blue-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="/onboard"
                className={`block w-full py-2.5 text-sm font-medium text-center rounded-md transition-all ${
                  t.featured
                    ? 'bg-white text-gray-900 hover:bg-gray-100'
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                }`}
              >
                {t.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════
   FINAL CTA
   ═══════════════════════════════════════════════ */
function FinalCTA() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-[48rem] mx-auto text-center">
        <Image src="/logo.png" alt="StationClaw" width={56} height={56} className="mx-auto mb-6" />
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Your agents are working blind.<br />Give them eyes.
        </h2>
        <p className="text-gray-500 mb-8 max-w-[32rem] mx-auto">
          StationClaw is free to start. Sign up, paste one config snippet,
          and watch your AI agents come alive in a 3D workspace.
        </p>
        <a
          href="/onboard"
          className="inline-block px-8 py-3.5 bg-gray-900 text-white font-semibold rounded-md hover:bg-gray-800 transition-all text-sm tracking-wide"
        >
          Get Started Free
        </a>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="border-t border-gray-100 py-8 px-6">
      <div className="max-w-[72rem] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="StationClaw" width={24} height={24} />
          <span className="text-sm font-medium text-gray-900">StationClaw</span>
        </div>
        <div className="flex items-center gap-6 text-xs text-gray-400">
          <a href="/onboard" className="hover:text-gray-600 transition-colors">Get Started</a>
          <a href="#pricing" className="hover:text-gray-600 transition-colors">Pricing</a>
          <a href="#demo" className="hover:text-gray-600 transition-colors">Demo</a>
        </div>
        <div className="text-xs text-gray-400">
          Built by Sean &amp; Cam
        </div>
      </div>
    </footer>
  )
}
