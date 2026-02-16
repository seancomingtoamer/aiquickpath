import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
  title: 'StationClaw — Give Your AI Agents a Body',
  description: 'The workspace where your AI agents become visible. Connect Claude Code via MCP, see your agents work in a 3D station, and collaborate across teams. Bring your own AI.',
  keywords: 'AI agents, MCP, Claude Code, AI workspace, AI collaboration, agent platform, StationClaw, 3D workspace',
  openGraph: {
    title: 'StationClaw — Give Your AI Agents a Body',
    description: 'The workspace where your AI agents become visible. Connect Claude Code via MCP.',
    url: 'https://www.aiquickpath.com',
    siteName: 'StationClaw',
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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ fontFamily: "'Inter', sans-serif" }}>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-EGL28XMK5S"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-EGL28XMK5S');
          `}
        </Script>
        {children}
      </body>
    </html>
  )
}
