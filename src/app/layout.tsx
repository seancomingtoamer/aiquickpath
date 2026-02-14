import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AIQuickPath — Agentic AI Consultancy',
  description: 'Learn Claude Code. Build AI agents. Get your own command station. Boutique consultancy by Sean & Cam.',
  keywords: 'Claude Code, agentic AI, AI consultancy, AI agents, Claude, Anthropic, AI automation',
  openGraph: {
    title: 'AIQuickPath — Agentic AI Consultancy',
    description: 'Learn Claude Code. Build AI agents. Get your own command station.',
    url: 'https://aiquickpath.com',
    siteName: 'AIQuickPath',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Rajdhani:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="scanline">
        {children}
      </body>
    </html>
  )
}
