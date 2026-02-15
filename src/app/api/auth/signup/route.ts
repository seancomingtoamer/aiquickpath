import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { generateToken, hashToken } from '../../../lib/auth'

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
)

export async function POST(req: Request) {
  try {
    const { email, password, display_name, station_name, agent_name, agent_role, accent_color, system_prompt } =
      await req.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 })
    }

    // 1. Create user in Supabase Auth
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { display_name: display_name || email.split('@')[0] },
    })

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 400 })
    }

    const userId = authData.user.id

    // 2. Create station
    const { data: station, error: stationError } = await supabaseAdmin
      .from('stations')
      .insert({
        name: station_name || 'MY STATION',
        owner_id: userId,
      })
      .select()
      .single()

    if (stationError) {
      return NextResponse.json({ error: stationError.message }, { status: 500 })
    }

    // 3. Add as station member (owner)
    await supabaseAdmin.from('station_members').insert({
      station_id: station.id,
      profile_id: userId,
      role: 'owner',
    })

    // 4. Generate API token
    const rawToken = generateToken()
    const tokenHash = await hashToken(rawToken)

    // 5. Create agent
    const { error: agentError } = await supabaseAdmin.from('agents').insert({
      station_id: station.id,
      profile_id: userId,
      name: agent_name || 'CTO Agent',
      role: agent_role || 'Agent',
      accent_color: accent_color || '#00f0ff',
      system_prompt: system_prompt || '',
      api_token_hash: tokenHash,
      is_online: false,
    })

    if (agentError) {
      return NextResponse.json({ error: agentError.message }, { status: 500 })
    }

    // 6. Return the token (shown once, never stored server-side in raw form)
    return NextResponse.json({
      success: true,
      token: rawToken,
      station_id: station.id,
      mcp_config: {
        mcpServers: {
          stationclaw: {
            type: 'url',
            url: 'https://aiquickstart.com/api/mcp',
            headers: {
              Authorization: `Bearer ${rawToken}`,
            },
          },
        },
      },
    })
  } catch (err) {
    console.error('Signup error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
