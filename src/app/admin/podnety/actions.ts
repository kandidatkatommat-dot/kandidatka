'use server'

import { createServerClient } from '@/lib/supabase/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

async function requireAdmin() {
  const session = await getServerSession(authOptions)
  if (!session) throw new Error('Unauthorized')
}

export async function approveSuggestion(id: string) {
  await requireAdmin()
  const supabase = createServerClient()
  await supabase.from('suggestions').update({ approved: true }).eq('id', id)
}

export async function rejectSuggestion(id: string) {
  await requireAdmin()
  const supabase = createServerClient()
  await supabase.from('suggestions').delete().eq('id', id)
}
