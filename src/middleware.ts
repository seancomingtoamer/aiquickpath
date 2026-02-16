import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// In-memory rate limiter (resets on cold start — upgrade to Upstash KV for persistence)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

function rateLimit(key: string, maxRequests: number, windowMs: number): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(key)

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + windowMs })
    return true
  }

  if (entry.count >= maxRequests) {
    return false
  }

  entry.count++
  return true
}


function getClientIp(req: NextRequest): string {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || 'unknown'
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const ip = getClientIp(req)

  // Rate limit signup: 5 requests per hour per IP
  if (pathname === '/api/auth/signup') {
    if (!rateLimit(`signup:${ip}`, 5, 60 * 60 * 1000)) {
      return NextResponse.json(
        { error: 'Too many signup attempts. Try again later.' },
        { status: 429 }
      )
    }
  }

  // Rate limit MCP endpoint: 120 requests per minute per IP
  if (pathname === '/api/mcp') {
    if (!rateLimit(`mcp:${ip}`, 120, 60 * 1000)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Try again shortly.' },
        { status: 429 }
      )
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/api/:path*'],
}
