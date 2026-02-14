import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { email, business } = await req.json()

    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 })
    }

    // Forward to n8n webhook (will be configured later)
    const webhookUrl = process.env.N8N_WEBHOOK_URL
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          business: business || 'Not specified',
          source: 'aiquickpath.com',
          signup_date: new Date().toISOString(),
        }),
      })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
