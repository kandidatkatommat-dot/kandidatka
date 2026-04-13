import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { createHash } from 'crypto'

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const ip = req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? 'unknown'
  const ipHash = createHash('sha256').update(ip + (process.env.NEXTAUTH_SECRET ?? 'salt')).digest('hex').slice(0, 16)

  const supabase = createServerClient()

  // Check if already voted
  const { data: existing } = await supabase
    .from('suggestion_votes')
    .select('id')
    .eq('suggestion_id', id)
    .eq('ip_hash', ipHash)
    .single()

  if (existing) {
    return NextResponse.json({ error: 'Already voted', alreadyVoted: true }, { status: 409 })
  }

  // Insert vote
  const { error } = await supabase
    .from('suggestion_votes')
    .insert({ suggestion_id: id, ip_hash: ipHash })

  if (error) {
    return NextResponse.json({ error: 'Failed to vote' }, { status: 500 })
  }

  // Increment vote_count on suggestion
  await supabase.rpc('increment_suggestion_votes', { suggestion_id: id })

  return NextResponse.json({ success: true })
}
