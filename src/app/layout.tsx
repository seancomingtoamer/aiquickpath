import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
  title: 'StationClaw — Give Your AI Agents a Body',
  description: 'We build 3D workspaces for your AI agents. Connect Claude Code via MCP, watch your agents walk, signal, and collaborate in a sci-fi station. Managed install or self-serve.',
  keywords: 'AI agents, MCP, Claude Code, AI workspace, AI collaboration, agent platform, StationClaw, 3D workspace, agentic IT',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: 'StationClaw — Give Your AI Agents a Body',
    description: 'We build 3D workspaces for your AI agents. Custom setup. You bring the AI, we bring the station.',
    url: 'https://stationclaw.com',
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
          src="https://www.googletagmanager.com/gtag/js?id=G-HTMJVF4L7R"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-HTMJVF4L7R');
            gtag('config', 'G-EGL28XMK5S');
          `}
        </Script>
        {children}
      </body>
    </html>
  )
}
