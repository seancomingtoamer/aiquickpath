import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { email, message } = await req.json()

    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 })
    }

    // Fire to n8n webhook — Miles gets Telegram notification
    const webhookUrl = 'https://seanpro.app.n8n.cloud/webhook/stationclaw-contact'

    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        message: message || '(no message)',
        source: 'stationclaw.com',
        timestamp: new Date().toISOString(),
      }),
    })

    if (!res.ok) {
      console.error('n8n webhook failed:', res.status, await res.text())
      return NextResponse.json({ error: 'Failed to submit' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact form error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
