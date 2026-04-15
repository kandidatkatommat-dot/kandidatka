'use server'

import { z } from 'zod'
import { createServerClient } from '@/lib/supabase/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

const uuidSchema = z.string().uuid()

async function requireAdmin() {
  const session = await getServerSession(authOptions)
  if (!session) throw new Error('Unauthorized')
}

export async function approveSuggestion(id: string) {
  if (!uuidSchema.safeParse(id).success) throw new Error('Invalid ID')
  await requireAdmin()
  const supabase = createServerClient()
  await supabase.from('suggestions').update({ approved: true }).eq('id', id)
}

export async function rejectSuggestion(id: string) {
  if (!uuidSchema.safeParse(id).success) throw new Error('Invalid ID')
  await requireAdmin()
  const supabase = createServerClient()
  await supabase.from('suggestions').delete().eq('id', id)
}
