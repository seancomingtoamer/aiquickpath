import { NextResponse } from 'next/server'
import { resolveToken } from '../../lib/auth'
import { TOOL_DEFINITIONS, handleToolCall } from '../../lib/mcp-tools'

// MCP JSON-RPC endpoint
// Supports: initialize, tools/list, tools/call

interface JsonRpcRequest {
  jsonrpc: '2.0'
  id: string | number
  method: string
  params?: Record<string, unknown>
}

function jsonRpcResponse(id: string | number, result: unknown) {
  return NextResponse.json({ jsonrpc: '2.0', id, result })
}

function jsonRpcError(id: string | number | null, code: number, message: string) {
  return NextResponse.json({ jsonrpc: '2.0', id, error: { code, message } })
}

export async function POST(req: Request) {
  const authHeader = req.headers.get('authorization')

  let body: JsonRpcRequest
  try {
    body = await req.json()
  } catch {
    return jsonRpcError(null, -32700, 'Parse error')
  }

  if (!body.jsonrpc || body.jsonrpc !== '2.0' || !body.method) {
    return jsonRpcError(body.id || null, -32600, 'Invalid Request')
  }

  // initialize — no auth required
  if (body.method === 'initialize') {
    return jsonRpcResponse(body.id, {
      protocolVersion: '2024-11-05',
      capabilities: { tools: {} },
      serverInfo: {
        name: 'stationclaw',
        version: '0.1.0',
      },
    })
  }

  // notifications/initialized — acknowledge
  if (body.method === 'notifications/initialized') {
    return jsonRpcResponse(body.id, {})
  }

  // tools/list — no auth required
  if (body.method === 'tools/list') {
    return jsonRpcResponse(body.id, { tools: TOOL_DEFINITIONS })
  }

  // tools/call — auth required
  if (body.method === 'tools/call') {
    const ctx = await resolveToken(authHeader)
    if (!ctx) {
      return jsonRpcError(body.id, -32001, 'Unauthorized: invalid or missing Bearer token')
    }

    const params = body.params as { name: string; arguments?: Record<string, unknown> } | undefined
    if (!params?.name) {
      return jsonRpcError(body.id, -32602, 'Missing tool name')
    }

    const toolDef = TOOL_DEFINITIONS.find((t) => t.name === params.name)
    if (!toolDef) {
      return jsonRpcError(body.id, -32602, `Unknown tool: ${params.name}`)
    }

    try {
      const result = await handleToolCall(params.name, params.arguments || {}, ctx)
      return jsonRpcResponse(body.id, {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      })
    } catch (err) {
      console.error('MCP tool error:', err instanceof Error ? err.message : err)
      return jsonRpcError(body.id, -32603, 'Internal server error')
    }
  }

  return jsonRpcError(body.id, -32601, `Method not found: ${body.method}`)
}

// Health check
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'stationclaw-mcp',
    version: '0.1.0',
    tools: TOOL_DEFINITIONS.length,
  })
}
