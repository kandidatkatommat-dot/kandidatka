import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { createHash } from 'crypto'
import { z } from 'zod'

const schema = z.object({
  poll_id: z.string().uuid(),
  option_id: z.string().uuid(),
})

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 })
  }

  const { poll_id, option_id } = parsed.data
  const ip = req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? 'unknown'
  const ipHash = createHash('sha256').update(ip + (process.env.NEXTAUTH_SECRET ?? 'salt')).digest('hex').slice(0, 16)

  const supabase = createServerClient()

  // Check if already voted
  const { data: existing } = await supabase
    .from('poll_votes')
    .select('id')
    .eq('poll_id', poll_id)
    .eq('ip_hash', ipHash)
    .single()

  if (existing) {
    return NextResponse.json({ error: 'Already voted', alreadyVoted: true }, { status: 409 })
  }

  // Insert vote
  const { error } = await supabase
    .from('poll_votes')
    .insert({ poll_id, option_id, ip_hash: ipHash })

  if (error) {
    return NextResponse.json({ error: 'Failed to vote' }, { status: 500 })
  }

  // Increment vote_count on option using rpc
  await supabase.rpc('increment_poll_option_votes', { option_id })

  return NextResponse.json({ success: true })
}
