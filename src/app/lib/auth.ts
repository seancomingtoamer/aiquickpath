import { supabaseAdmin } from './supabase-server'

const BASE62 = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

export function generateToken(): string {
  const bytes = new Uint8Array(32)
  crypto.getRandomValues(bytes)
  let result = 'sc_'
  for (const b of bytes) {
    result += BASE62[b % 62]
  }
  return result
}

export async function hashToken(token: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(token)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
}

export async function resolveToken(
  authHeader: string | null
): Promise<{ agentId: string; stationId: string; profileId: string } | null> {
  if (!authHeader?.startsWith('Bearer sc_')) return null

  const token = authHeader.slice(7) // remove "Bearer "
  const hash = await hashToken(token)

  const { data: agent, error } = await supabaseAdmin
    .from('agents')
    .select('id, station_id, profile_id')
    .eq('api_token_hash', hash)
    .single()

  if (error || !agent) return null

  return {
    agentId: agent.id,
    stationId: agent.station_id,
    profileId: agent.profile_id,
  }
}
