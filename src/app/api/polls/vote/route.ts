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
  const secret = process.env.NEXTAUTH_SECRET
  if (!secret) return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 })

  const ip = req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? 'unknown'
  const ipHash = createHash('sha256').update(ip + secret).digest('hex').slice(0, 16)

  const supabase = createServerClient()

  // Insert vote — rely on UNIQUE(poll_id, ip_hash) constraint to handle duplicates atomically
  const { error } = await supabase
    .from('poll_votes')
    .insert({ poll_id, option_id, ip_hash: ipHash })

  if (error) {
    if (error.code === '23505') {
      return NextResponse.json({ error: 'Already voted', alreadyVoted: true }, { status: 409 })
    }
    return NextResponse.json({ error: 'Failed to vote' }, { status: 500 })
  }

  // Increment vote_count on option using rpc
  await supabase.rpc('increment_poll_option_votes', { option_id })

  return NextResponse.json({ success: true })
}
