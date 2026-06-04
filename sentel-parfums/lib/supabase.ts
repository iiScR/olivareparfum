import { createBrowserClient } from '@supabase/ssr'
import { generateSessionId } from './utils'

export const createClient = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    console.warn('[Supabase] Missing env vars — running in demo mode')
    return null as any
  }

  // Validate URL format
  try {
    new URL(url)
  } catch {
    console.warn('[Supabase] Invalid URL format — running in demo mode')
    return null as any
  }

  try {
    const client = createBrowserClient(url, key)

    // Set session ID for anonymous cart RLS
    const sessionId = generateSessionId()
    client.rpc('set_app_config', { key: 'session_id', value: sessionId }).then(() => {}, () => {})

    return client
  } catch (err) {
    console.warn('[Supabase] Failed to create client — running in demo mode', err)
    return null as any
  }
}

export type SupabaseClient = ReturnType<typeof createClient>
