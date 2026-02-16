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

    // Input length validation
    if (typeof email !== 'string' || email.length > 255) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }
    if (typeof password !== 'string' || password.length > 128) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 400 })
    }

    // Password strength: min 8 chars, at least one letter and one number
    if (password.length < 8 || !/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) {
      return NextResponse.json({ error: 'Password must be at least 8 characters with at least one letter and one number' }, { status: 400 })
    }

    // Sanitize optional string fields
    const safeName = typeof display_name === 'string' ? display_name.slice(0, 100) : undefined
    const safeStation = typeof station_name === 'string' ? station_name.slice(0, 100) : undefined
    const safeAgentName = typeof agent_name === 'string' ? agent_name.slice(0, 100) : undefined
    const safeAgentRole = typeof agent_role === 'string' ? agent_role.slice(0, 100) : undefined
    const safeColor = typeof accent_color === 'string' ? accent_color.slice(0, 20) : undefined
    const safePrompt = typeof system_prompt === 'string' ? system_prompt.slice(0, 10000) : undefined

    // 1. Create user in Supabase Auth
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: false,
      user_metadata: { display_name: safeName || email.split('@')[0] },
    })

    if (authError) {
      // Only expose safe auth errors, not internal details
      const safeMessage = authError.message.includes('already registered')
        ? 'An account with this email already exists'
        : 'Unable to create account'
      return NextResponse.json({ error: safeMessage }, { status: 400 })
    }

    const userId = authData.user.id

    // 2. Create station
    const { data: station, error: stationError } = await supabaseAdmin
      .from('stations')
      .insert({
        name: safeStation || 'MY STATION',
        owner_id: userId,
      })
      .select()
      .single()

    if (stationError) {
      console.error('Station creation error:', stationError.message)
      return NextResponse.json({ error: 'Setup failed. Please try again.' }, { status: 500 })
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
      name: safeAgentName || 'CTO Agent',
      role: safeAgentRole || 'Agent',
      accent_color: safeColor || '#00f0ff',
      system_prompt: safePrompt || '',
      api_token_hash: tokenHash,
      is_online: false,
    })

    if (agentError) {
      console.error('Agent creation error:', agentError.message)
      return NextResponse.json({ error: 'Setup failed. Please try again.' }, { status: 500 })
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
