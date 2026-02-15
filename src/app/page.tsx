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
      <Screenshots />
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
            <Link
              href="#pricing"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Pricing
            </Link>
          </div>

          <Button asChild>
            <Link href="/onboard">Get Started</Link>
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

          {/* Logo */}
          <div className="mb-8">
            <Image
              src="/logo.png"
              alt="StationClaw Logo"
              width={80}
              height={80}
              className="h-20 w-20"
            />
          </div>

          {/* Headline */}
          <h1 className="mb-6 text-balance text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            {'Give your AI agents '}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              a body.
            </span>
          </h1>

          {/* Subtext */}
          <p className="mb-10 max-w-3xl text-balance text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Your Claude Code runs in a terminal. Invisible. Alone. StationClaw
            gives it a 3D workspace, a persona, and a team. You bring the AI —
            we bring the station.
          </p>

          {/* CTAs */}
          <div className="mb-16 flex flex-col items-center gap-4 sm:flex-row">
            <Button size="lg" asChild className="min-w-[200px]">
              <Link href="/onboard">Get Started Free</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="min-w-[200px]"
            >
              <Link href="#demo">{'Watch the demo \u2193'}</Link>
            </Button>
          </div>

          {/* Screenshot Card */}
          <Card className="relative w-full max-w-5xl overflow-hidden border-border bg-card p-2 shadow-2xl">
            <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-muted">
              <Image
                src="/screenshot-station.png"
                alt="StationClaw Workspace"
                width={1440}
                height={810}
                className="h-full w-full object-cover"
                priority
              />
              {/* Floating Labels */}
              <div className="absolute left-4 top-4 rounded-md border border-green-500/50 bg-green-950/80 px-3 py-1.5 text-sm font-medium text-green-400 backdrop-blur-sm">
                2 Agents Online
              </div>
              <div className="absolute bottom-4 right-4 rounded-md border border-cyan-500/50 bg-cyan-950/80 px-3 py-1.5 text-sm font-medium text-cyan-400 backdrop-blur-sm">
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

          <AnimatedStation />

          <p className="mt-8 text-sm text-muted-foreground">
            Simulated station view — actual product uses full 3D with animated
            agent avatars
          </p>
        </div>
      </div>
    </section>
  );
}

function AnimatedStation() {
  const [agents, setAgents] = useState([
    { x: 30, y: 40, vx: 0.3, vy: 0.2, color: 'cyan' as const, label: 'CTO AGENT' },
    { x: 70, y: 60, vx: -0.2, vy: 0.3, color: 'purple' as const, label: 'DESIGN LEAD' },
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
                  stroke="cyan"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Scan Line */}
        <div className="animate-scan-line absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>

        {/* Center Hologram */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative h-32 w-32">
            <div className="absolute inset-0 animate-spin-slow rounded-full border-2 border-cyan-500/30"></div>
            <div className="absolute inset-2 animate-spin-slower rounded-full border-2 border-purple-500/30"></div>
            <div className="absolute inset-4 animate-pulse rounded-full bg-cyan-500/10"></div>
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
                  agent.color === 'cyan' ? 'bg-cyan-500' : 'bg-purple-500'
                } shadow-lg ${
                  agent.color === 'cyan' ? 'shadow-cyan-500/50' : 'shadow-purple-500/50'
                }`}
              ></div>
              <div
                className={`absolute left-1/2 top-6 -translate-x-1/2 whitespace-nowrap rounded px-2 py-0.5 text-xs font-medium ${
                  agent.color === 'cyan'
                    ? 'bg-cyan-950/80 text-cyan-400'
                    : 'bg-purple-950/80 text-purple-400'
                }`}
              >
                {agent.label}
              </div>
            </div>
          </div>
        ))}

        {/* HUD Bar */}
        <div className="absolute left-0 right-0 top-0 border-b border-cyan-500/30 bg-black/80 px-4 py-2 backdrop-blur-sm">
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono text-cyan-400">STATIONCLAW</span>
            <span className="font-mono text-green-400">2 AGENTS ONLINE</span>
          </div>
        </div>

        {/* Task Board Overlay */}
        <div className="absolute bottom-4 right-4 w-48 rounded-lg border border-border/50 bg-black/80 p-3 backdrop-blur-sm">
          <div className="mb-2 text-xs font-semibold text-cyan-400">
            ACTIVE TASKS
          </div>
          <div className="space-y-1.5">
            {['Deploy landing page', 'Build MCP gateway', 'Design onboarding', 'Write API docs', 'Set up billing'].map(
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
            <div><span className="text-cyan-400">CTO Agent</span> completed: Deploy landing page</div>
            <div><span className="text-purple-400">Design Lead</span> started: Design onboarding</div>
            <div><span className="text-cyan-400">CTO Agent</span> working on: Build MCP gateway</div>
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
            Zero config. Zero infrastructure.
          </h2>
        </div>

        <div className="mb-16 grid gap-8 md:grid-cols-3">
          {[
            {
              number: '01',
              title: 'Sign up & name your station',
              description:
                'Create an account, name your workspace, and define your first agent persona in 60 seconds.',
            },
            {
              number: '02',
              title: 'Paste the MCP config into Claude Code',
              description:
                'We give you a single JSON snippet. Paste it into your Claude Code config. That\'s the entire integration.',
            },
            {
              number: '03',
              title: 'Open the station & watch your agents work',
              description:
                'Launch the desktop app. Your agents appear as avatars. Tasks sync in real-time. You see everything.',
            },
          ].map((step) => (
            <Card key={step.number} className="border-border bg-card p-6">
              <div className="mb-4 text-5xl font-bold text-cyan-500/20">
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
      "url": "https://aiquickpath.com/api/mcp",
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
      title: 'See your agents work',
      description:
        'No more invisible AI. Your agents have avatars, names, and roles. Watch them move between tasks in a 3D station.',
    },
    {
      title: 'Bring your own AI',
      description:
        'Works with Claude Code, and soon any MCP-compatible tool. You own the AI. We provide the workspace.',
    },
    {
      title: 'Real-time collaboration',
      description:
        'Multiple agents, multiple users, one station. See who\'s online, who\'s working on what, all synced instantly.',
    },
    {
      title: 'Task board built in',
      description:
        'Create tasks, assign to agents, track status. Your agents can pull tasks, update progress, and mark them done via MCP.',
    },
    {
      title: 'Your data, your station',
      description:
        'Each station is isolated. Row-level security. Your agents only see your workspace. No shared infrastructure.',
    },
    {
      title: 'Free to start',
      description:
        'Supabase free tier + Vercel free tier = $0/month. You only pay for your own AI usage (your API key, your costs).',
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

function Screenshots() {
  return (
    <section className="border-b border-border/40 bg-muted/20 py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Not a dashboard. A world.
          </h2>
          <p className="mx-auto max-w-3xl text-balance text-lg leading-relaxed text-muted-foreground">
            Your agents don&apos;t live in spreadsheet rows. They walk around a 3D space station,
            gesture at each other, and show you what they&apos;re doing. This is what AI collaboration looks like.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Card className="overflow-hidden border-border bg-card">
            <div className="relative aspect-[4/3]">
              <Image
                src="/screenshot-station.png"
                alt="Full workspace view"
                width={800}
                height={600}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-foreground">
                Main Hub
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Galaxy map, agent avatars, mission board — your entire operation at a glance.
              </p>
            </div>
          </Card>

          <Card className="overflow-hidden border-border bg-card">
            <div className="relative aspect-[4/3]">
              <Image
                src="/screenshot-hub.png"
                alt="Close-up control hub"
                width={800}
                height={600}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-foreground">
                Agent Interaction
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Agents navigate the station and work on projects in real-time.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const tiers = [
    {
      name: 'Starter',
      price: 'Free',
      period: '',
      description: '1 station, 2 agents, 1 project. Everything you need to try it.',
      features: [
        '1 station',
        '2 agent personas',
        '1 project',
        'MCP integration',
        'Real-time sync',
        'Desktop app',
      ],
      cta: 'Get Started',
      href: '/onboard',
      featured: false,
    },
    {
      name: 'Pro',
      price: '$49',
      period: '/mo',
      description: 'Unlimited agents, projects, and team members.',
      features: [
        'Unlimited agents',
        'Unlimited projects',
        '5 team seats',
        'Custom system prompts',
        'Activity history',
        'Priority support',
      ],
      cta: 'Start Pro Trial',
      href: '/onboard',
      featured: true,
    },
    {
      name: 'Team',
      price: '$149',
      period: '/mo',
      description: 'For organizations running multiple stations.',
      features: [
        'Everything in Pro',
        '25 team seats',
        'Multiple stations',
        'SSO integration',
        'Custom branding',
        'Dedicated support',
      ],
      cta: 'Contact Us',
      href: '/onboard',
      featured: false,
    },
  ];

  return (
    <section id="pricing" className="border-b border-border/40 bg-background py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Start free. Scale when you&apos;re ready.
          </h2>
          <p className="text-lg text-muted-foreground">You only pay for your own AI. We charge for the workspace.</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {tiers.map((tier) => (
            <Card
              key={tier.name}
              className={`relative flex flex-col border-border bg-card p-8 ${
                tier.featured ? 'ring-2 ring-cyan-500' : ''
              }`}
            >
              {tier.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-cyan-500 px-4 py-1 text-sm font-semibold text-black">
                  Most Popular
                </div>
              )}
              <div className="mb-6">
                <h3 className="mb-2 text-2xl font-bold text-foreground">
                  {tier.name}
                </h3>
                <div className="mb-2 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-foreground">
                    {tier.price}
                  </span>
                  {tier.period && (
                    <span className="text-muted-foreground">{tier.period}</span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {tier.description}
                </p>
              </div>

              <ul className="mb-8 flex-1 space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-cyan-500" />
                    <span className="text-sm text-muted-foreground">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                asChild
                variant={tier.featured ? 'default' : 'outline'}
                className="w-full"
              >
                <Link href={tier.href}>{tier.cta}</Link>
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="border-b border-border/40 bg-gradient-to-b from-muted/20 to-background py-20 sm:py-32">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <Image src="/logo.png" alt="StationClaw" width={56} height={56} className="mx-auto mb-6" />
        <h2 className="mb-6 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Your agents are working blind.
          <br />
          Give them eyes.
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
          StationClaw is free to start. Sign up, paste one config snippet,
          and watch your AI agents come alive in a 3D workspace.
        </p>
        <Button size="lg" asChild className="mt-4 min-w-[240px]">
          <Link href="/onboard">Get Started Free</Link>
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
            <Link href="#pricing" className="transition-colors hover:text-foreground">
              Pricing
            </Link>
          </div>

          <div className="text-sm text-muted-foreground">
            Built by Sean &amp; Cam
          </div>
        </div>
      </div>
    </footer>
  );
}
