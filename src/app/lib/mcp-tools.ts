import { supabaseAdmin } from './supabase-server'

interface AgentContext {
  agentId: string
  stationId: string
  profileId: string
}

export const TOOL_DEFINITIONS = [
  {
    name: 'stationclaw_get_persona',
    description: 'Get your agent persona including name, role, accent color, system prompt, and station context. Call this at the start of every conversation to stay in character.',
    inputSchema: { type: 'object' as const, properties: {}, required: [] as string[] },
  },
  {
    name: 'stationclaw_get_tasks',
    description: 'Get tasks. Defaults to tasks assigned to you. Use filters to see all tasks or filter by project/status.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        project_id: { type: 'string', description: 'Filter by project ID' },
        status: { type: 'string', enum: ['todo', 'in_progress', 'done'], description: 'Filter by status' },
        assigned_to_me: { type: 'boolean', description: 'If true (default), only show tasks assigned to you' },
      },
      required: [] as string[],
    },
  },
  {
    name: 'stationclaw_create_task',
    description: 'Create a new task in a project.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        project_id: { type: 'string', description: 'Project ID to create the task in' },
        title: { type: 'string', description: 'Task title' },
        description: { type: 'string', description: 'Task description' },
        type: { type: 'string', description: 'Task type (Build, Research, Design, Marketing, Deploy, Bug)' },
        assigned_to: { type: 'string', description: 'Agent ID to assign to (omit for unassigned)' },
      },
      required: ['project_id', 'title'] as string[],
    },
  },
  {
    name: 'stationclaw_update_task',
    description: 'Update a task status, description, or assignment.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        task_id: { type: 'string', description: 'Task ID' },
        status: { type: 'string', enum: ['todo', 'in_progress', 'done'] },
        description: { type: 'string' },
        assigned_to: { type: 'string', description: 'Agent ID to assign to' },
      },
      required: ['task_id'] as string[],
    },
  },
  {
    name: 'stationclaw_complete_task',
    description: 'Mark a task as done and store the result text.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        task_id: { type: 'string', description: 'Task ID' },
        result: { type: 'string', description: 'Result summary or output of the completed task' },
      },
      required: ['task_id'] as string[],
    },
  },
  {
    name: 'stationclaw_get_team',
    description: 'List all agents in your station with their online status.',
    inputSchema: { type: 'object' as const, properties: {}, required: [] as string[] },
  },
  {
    name: 'stationclaw_add_activity',
    description: 'Log a message to the station activity feed. Use this to communicate progress or share updates with the team.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        action: { type: 'string', description: 'Action type (e.g. working, update, completed, note)' },
        message: { type: 'string', description: 'Activity message' },
      },
      required: ['action', 'message'] as string[],
    },
  },
]

export async function handleToolCall(
  toolName: string,
  args: Record<string, unknown>,
  ctx: AgentContext
): Promise<unknown> {
  switch (toolName) {
    case 'stationclaw_get_persona': {
      const { data: agent } = await supabaseAdmin
        .from('agents')
        .select('name, role, accent_color, system_prompt')
        .eq('id', ctx.agentId)
        .single()

      const { data: station } = await supabaseAdmin
        .from('stations')
        .select('name')
        .eq('id', ctx.stationId)
        .single()

      return {
        agent_name: agent?.name,
        role: agent?.role,
        accent_color: agent?.accent_color,
        system_prompt: agent?.system_prompt,
        station_name: station?.name,
        station_id: ctx.stationId,
        agent_id: ctx.agentId,
      }
    }

    case 'stationclaw_get_tasks': {
      let query = supabaseAdmin.from('tasks').select('*')

      // Scope to station's projects
      const { data: projects } = await supabaseAdmin
        .from('projects')
        .select('id')
        .eq('station_id', ctx.stationId)

      if (!projects?.length) return { tasks: [] }
      const projectIds = projects.map((p) => p.id)
      query = query.in('project_id', projectIds)

      if (args.project_id) query = query.eq('project_id', args.project_id as string)
      if (args.status) query = query.eq('status', args.status as string)
      if (args.assigned_to_me !== false) query = query.eq('assigned_to', ctx.agentId)

      query = query.order('created_at', { ascending: true })
      const { data: tasks } = await query
      return { tasks: tasks || [] }
    }

    case 'stationclaw_create_task': {
      const { data: task, error } = await supabaseAdmin
        .from('tasks')
        .insert({
          project_id: args.project_id as string,
          title: args.title as string,
          description: (args.description as string) || '',
          type: (args.type as string) || null,
          assigned_to: (args.assigned_to as string) || null,
          created_by: ctx.profileId,
        })
        .select()
        .single()

      if (error) return { error: error.message }
      return { task }
    }

    case 'stationclaw_update_task': {
      const updates: Record<string, unknown> = {}
      if (args.status) updates.status = args.status
      if (args.description !== undefined) updates.description = args.description
      if (args.assigned_to !== undefined) updates.assigned_to = args.assigned_to

      const { data: task, error } = await supabaseAdmin
        .from('tasks')
        .update(updates)
        .eq('id', args.task_id as string)
        .select()
        .single()

      if (error) return { error: error.message }
      return { task }
    }

    case 'stationclaw_complete_task': {
      const { data: task, error } = await supabaseAdmin
        .from('tasks')
        .update({
          status: 'done',
          result: (args.result as string) || '',
        })
        .eq('id', args.task_id as string)
        .select()
        .single()

      if (error) return { error: error.message }

      // Log activity
      await supabaseAdmin.from('activity').insert({
        station_id: ctx.stationId,
        agent_id: ctx.agentId,
        action: 'completed',
        message: `Completed task: ${task.title}`,
      })

      return { task }
    }

    case 'stationclaw_get_team': {
      const { data: agents } = await supabaseAdmin
        .from('agents')
        .select('id, name, role, accent_color, is_online, last_seen')
        .eq('station_id', ctx.stationId)

      return { agents: agents || [] }
    }

    case 'stationclaw_add_activity': {
      const { error } = await supabaseAdmin.from('activity').insert({
        station_id: ctx.stationId,
        agent_id: ctx.agentId,
        action: args.action as string,
        message: args.message as string,
      })

      if (error) return { error: error.message }
      return { success: true }
    }

    default:
      return { error: `Unknown tool: ${toolName}` }
  }
}
