'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Home() {
  return (
    <div className="min-h-screen bg-background dark">
      <Navigation />
      <Hero />
      <LiveDemo />
      <HowItWorks />
      <Features />

      <Pricing />
      <FinalCTA />
      <Footer />
    </div>
  );
}

function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="StationClaw"
              width={36}
              height={36}
              className="h-9 w-9"
            />
            <span className="text-xl font-semibold text-foreground">
              StationClaw
            </span>
          </div>

          <div className="hidden items-center gap-8 md:flex">
            <Link
              href="#demo"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Demo
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              How it works
            </Link>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
            >
              Contact
            </a>
          </div>

          <Button asChild>
            <a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}>Get Started</a>
          </Button>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border/40 bg-gradient-to-b from-background via-background to-muted/20 pt-24">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-32 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Beta Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
            </span>
            <span className="text-muted-foreground">Now in Beta</span>
          </div>

          {/* Mascot */}
          <div className="mb-8">
            <Image
              src="/jean-clawd.png"
              alt="Jean Clawd Van Damn — StationClaw Mascot"
              width={350}
              height={350}
              className="h-72 w-72 sm:h-80 sm:w-80 rounded-full"
              priority
            />
          </div>

          {/* Headline */}
          <h1 className="mb-6 text-balance text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            {'Give your AI agents '}
            <span className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">
              a body.
            </span>
          </h1>

          {/* Subtext */}
          <p className="mb-10 max-w-3xl text-balance text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Your AI agents run in terminals. Invisible. Alone. StationClaw
            gives them a 3D workspace, a body, and a team. We set it up.
            You watch them work.
          </p>

          {/* CTAs */}
          <div className="mb-16 flex flex-col items-center gap-4 sm:flex-row">
            <Button size="lg" asChild className="min-w-[200px]">
              <a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}>Get a Custom Setup</a>
            </Button>
            <Button
              size="lg"
              asChild
              className="min-w-[200px] border border-red-500/50 bg-transparent text-red-400 hover:bg-red-500/10"
            >
              <Link href="#demo">{'Watch the demo \u2193'}</Link>
            </Button>
          </div>

          {/* Screenshot Card */}
          <Card className="relative w-full max-w-5xl overflow-hidden border-border bg-card p-2 shadow-2xl">
            <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-muted">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-full object-cover"
              >
                <source src="/hero-demo.mp4" type="video/mp4" />
              </video>
              {/* Floating Labels */}
              <div className="absolute left-4 top-4 rounded-md border border-green-500/50 bg-green-950/80 px-3 py-1.5 text-sm font-medium text-green-400 backdrop-blur-sm">
                3 Agents Online
              </div>
              <div className="absolute bottom-4 right-4 rounded-md border border-red-500/50 bg-red-950/80 px-3 py-1.5 text-sm font-medium text-red-400 backdrop-blur-sm">
                Connected via MCP
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

function LiveDemo() {
  return (
    <section id="demo" className="border-b border-border/40 bg-background py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <h2 className="mb-4 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            This is what your station looks like
          </h2>
          <p className="mb-16 max-w-3xl text-balance text-lg leading-relaxed text-muted-foreground">
            Agents move, tasks flow, and you see everything happening in real
            time. No dashboards. No spreadsheets. Just your team, working.
          </p>

          <Card className="relative w-full max-w-5xl overflow-hidden border-border bg-black shadow-2xl">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full"
            >
              <source src="/demo.mp4" type="video/mp4" />
            </video>
          </Card>

          <p className="mt-8 text-sm text-muted-foreground">
            Live screen recording — this is the actual product running
          </p>
        </div>
      </div>
    </section>
  );
}

function AnimatedStation() {
  const [agents, setAgents] = useState([
    { x: 30, y: 40, vx: 0.3, vy: 0.2, color: 'cyan' as const, label: 'ROOK — VP INFRA' },
    { x: 70, y: 60, vx: -0.2, vy: 0.3, color: 'purple' as const, label: 'ARIA — MARKETING' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setAgents((prev) =>
        prev.map((agent) => {
          let newX = agent.x + agent.vx;
          let newY = agent.y + agent.vy;
          let newVx = agent.vx;
          let newVy = agent.vy;

          if (newX <= 10 || newX >= 90) {
            newVx = -newVx;
            newX = Math.max(10, Math.min(90, newX));
          }
          if (newY <= 10 || newY >= 90) {
            newVy = -newVy;
            newY = Math.max(10, Math.min(90, newY));
          }

          return { ...agent, x: newX, y: newY, vx: newVx, vy: newVy };
        })
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="relative w-full max-w-4xl overflow-hidden border-border bg-black shadow-2xl">
      <div
        className="relative aspect-video w-full overflow-hidden"
      >
        {/* Grid Background */}
        <div className="absolute inset-0 opacity-20">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="red"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Scan Line */}
        <div className="animate-scan-line absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-50"></div>

        {/* Center Hologram */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative h-32 w-32">
            <div className="absolute inset-0 animate-spin-slow rounded-full border-2 border-red-500/30"></div>
            <div className="absolute inset-2 animate-spin-slower rounded-full border-2 border-red-400/30"></div>
            <div className="absolute inset-4 animate-pulse rounded-full bg-red-500/10"></div>
          </div>
        </div>

        {/* Agents */}
        {agents.map((agent, i) => (
          <div
            key={i}
            className="absolute transition-all duration-100"
            style={{
              left: `${agent.x}%`,
              top: `${agent.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div className="relative">
              <div
                className={`h-4 w-4 animate-pulse rounded-full ${
                  agent.color === 'cyan' ? 'bg-red-500' : 'bg-purple-500'
                } shadow-lg ${
                  agent.color === 'cyan' ? 'shadow-red-500/50' : 'shadow-purple-500/50'
                }`}
              ></div>
              <div
                className={`absolute left-1/2 top-6 -translate-x-1/2 whitespace-nowrap rounded px-2 py-0.5 text-xs font-medium ${
                  agent.color === 'cyan'
                    ? 'bg-red-950/80 text-red-400'
                    : 'bg-purple-950/80 text-purple-400'
                }`}
              >
                {agent.label}
              </div>
            </div>
          </div>
        ))}

        {/* HUD Bar */}
        <div className="absolute left-0 right-0 top-0 border-b border-red-500/30 bg-black/80 px-4 py-2 backdrop-blur-sm">
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono text-red-400">STATIONCLAW</span>
            <span className="font-mono text-green-400">2 AGENTS ONLINE</span>
          </div>
        </div>

        {/* Task Board Overlay */}
        <div className="absolute bottom-4 right-4 w-48 rounded-lg border border-border/50 bg-black/80 p-3 backdrop-blur-sm">
          <div className="mb-2 text-xs font-semibold text-red-400">
            ACTIVE TASKS
          </div>
          <div className="space-y-1.5">
            {['Configure agent personas', 'Deploy body signals', 'Build mission room', 'Connect MCP gateway', 'Run pulse check'].map(
              (task, i) => (
                <div
                  key={i}
                  className="rounded bg-muted/30 px-2 py-1 text-xs text-muted-foreground"
                >
                  {task}
                </div>
              )
            )}
          </div>
        </div>

        {/* Activity Feed */}
        <div className="absolute bottom-4 left-4 w-56 rounded-lg border border-border/50 bg-black/80 p-3 backdrop-blur-sm">
          <div className="mb-2 text-xs font-semibold text-purple-400">
            ACTIVITY FEED
          </div>
          <div className="space-y-1.5 text-xs text-muted-foreground">
            <div><span className="text-red-400">Rook</span> body_signal: scanning hologram table</div>
            <div><span className="text-purple-400">Aria</span> completed: Draft campaign brief</div>
            <div><span className="text-red-400">Rook</span> pulse_check: all systems nominal</div>
          </div>
        </div>
      </div>
    </Card>
  );
}

function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="border-b border-border/40 bg-muted/20 py-20 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            We set it up. You run it.
          </h2>
        </div>

        <div className="mb-16 grid gap-8 md:grid-cols-3">
          {[
            {
              number: '01',
              title: 'Tell us about your operation',
              description:
                'Book a call. Walk us through your team, your AI stack, and what you need your agents doing. We take it from there.',
            },
            {
              number: '02',
              title: 'We build your station',
              description:
                'We configure your workspace, set up agent personas, connect your Claude Code via MCP, and test everything end-to-end.',
            },
            {
              number: '03',
              title: 'Launch & watch them work',
              description:
                'Open the desktop app. Your agents walk around a 3D station, send body signals, and you see everything in real time.',
            },
          ].map((step) => (
            <Card key={step.number} className="border-border bg-card p-6">
              <div className="mb-4 text-5xl font-bold text-red-500/20">
                {step.number}
              </div>
              <h3 className="mb-3 text-xl font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </Card>
          ))}
        </div>

        {/* Code Preview */}
        <Card className="mx-auto max-w-3xl overflow-hidden border-border bg-black">
          <div className="border-b border-border/50 bg-muted/10 px-4 py-2">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500"></div>
              <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
              <span className="ml-4 text-sm text-muted-foreground">
                claude_desktop_config.json
              </span>
            </div>
          </div>
          <div className="p-6 font-mono text-sm">
            <pre className="text-green-400">
              <code>{`{
  "mcpServers": {
    "stationclaw": {
      "type": "url",
      "url": "https://stationclaw.com/api/mcp",
      "headers": {
        "Authorization": "Bearer sc_your_token"
      }
    }
  }
}`}</code>
            </pre>
          </div>
          <div className="border-t border-border/50 px-4 py-2 text-center text-xs text-muted-foreground">
            This is the only thing you paste. We handle the rest.
          </div>
        </Card>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    {
      title: 'Agents with bodies',
      description:
        'Your AI agents walk to desks, interact with control panels, and wave when they come online. Real avatars, real presence — not a chat window.',
    },
    {
      title: 'Bring your own AI',
      description:
        'Works with Claude Code today, and any MCP-compatible tool tomorrow. You own the AI and the API keys. We provide the workspace.',
    },
    {
      title: 'Real-time body signals',
      description:
        'Agents send body signals — working, scanning, alert, thinking — that drive avatar animations. See what your agents are doing at a glance.',
    },
    {
      title: 'Sci-fi mission room',
      description:
        'Holographic briefing table, glowing control panels, status indicators, neon floor markers. Your workspace looks like a space station because it is one.',
    },
    {
      title: 'Your data, your station',
      description:
        'Each station is isolated with row-level security. Your agents only see your workspace. We set it up, you own it.',
    },
    {
      title: 'We install it for you',
      description:
        'No DIY setup. Our team configures your station, connects your agents, and makes sure everything works before we hand you the keys.',
    },
  ];

  return (
    <section className="border-b border-border/40 bg-background py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {"Everything you need. Nothing you don't."}
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="border-border bg-card p-6">
              <h3 className="mb-3 text-xl font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}


function Pricing() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, message }),
      });
      if (res.ok) {
        setStatus('sent');
        setEmail('');
        setMessage('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="border-b border-border/40 bg-background py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Every station is custom.
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
            {"We don't do one-size-fits-all. Tell us about your team and your AI stack, and we'll build a station that fits."}
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2">
          {/* What You Get */}
          <Card className="border-border bg-card p-8">
            <h3 className="mb-6 text-2xl font-bold text-foreground">
              {"What's included"}
            </h3>
            <ul className="space-y-4">
              {[
                'Full station setup by our team',
                'Custom agent personas & roles',
                'MCP integration with your Claude Code',
                'Body signal & animation system',
                '3D mission room with your branding',
                'Desktop app configured & ready',
                'Hands-on support after launch',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Contact Form */}
          <Card className="border-border bg-card p-8">
            <h3 className="mb-2 text-2xl font-bold text-foreground">
              Get a custom setup
            </h3>
            <p className="mb-6 text-sm text-muted-foreground">
              {"Drop your email and tell us what you're building. We'll reach out within 24 hours."}
            </p>

            {status === 'sent' ? (
              <div className="rounded-lg border border-green-500/50 bg-green-950/30 p-6 text-center">
                <p className="text-lg font-semibold text-green-400">{"We got it."}</p>
                <p className="mt-2 text-sm text-muted-foreground">{"We'll be in touch within 24 hours."}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full rounded-md border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-foreground">
                    {"What are you building?"}
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your team, your AI setup, and what you need..."
                    className="w-full rounded-md border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                  />
                </div>
                <Button type="submit" className="w-full" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending...' : 'Send It'}
                </Button>
                {status === 'error' && (
                  <p className="text-center text-sm text-red-400">Something went wrong. Try again or email sean@frontdesklife.com directly.</p>
                )}
              </form>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="border-b border-border/40 bg-gradient-to-b from-muted/20 to-background py-20 sm:py-32">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <Image src="/logo.png" alt="StationClaw" width={120} height={120} className="mx-auto mb-6 h-28 w-28" />
        <h2 className="mb-6 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Your agents are working blind.
          <br />
          Give them eyes.
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
          We build your station, connect your agents, and hand you the keys.
          You bring the AI — we bring the world it lives in.
        </p>
        <Button size="lg" asChild className="mt-4 min-w-[240px]">
          <a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}>Get a Custom Setup</a>
        </Button>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-background py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="StationClaw"
              width={32}
              height={32}
              className="h-8 w-8"
            />
            <span className="text-lg font-semibold text-foreground">
              StationClaw
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <Link href="#demo" className="transition-colors hover:text-foreground">
              Demo
            </Link>
            <Link
              href="#how-it-works"
              className="transition-colors hover:text-foreground"
            >
              How it works
            </Link>
            <a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }} className="transition-colors hover:text-foreground cursor-pointer">
              Contact
            </a>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <a
              href="https://x.com/stationclaw"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
              aria-label="Follow StationClaw on X"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <span>Built by Sean &amp; Cam</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
