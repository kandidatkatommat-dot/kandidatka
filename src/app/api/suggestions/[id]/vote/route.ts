import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { createHash } from 'crypto'
import { z } from 'zod'

const uuidSchema = z.string().uuid()

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  if (!uuidSchema.safeParse(id).success) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 })
  }

  const secret = process.env.NEXTAUTH_SECRET
  if (!secret) return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 })

  const ip = req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? 'unknown'
  const ipHash = createHash('sha256').update(ip + secret).digest('hex').slice(0, 16)

  const supabase = createServerClient()

  // Insert vote — rely on UNIQUE(suggestion_id, ip_hash) constraint to handle duplicates atomically
  const { error } = await supabase
    .from('suggestion_votes')
    .insert({ suggestion_id: id, ip_hash: ipHash })

  if (error) {
    if (error.code === '23505') {
      return NextResponse.json({ error: 'Already voted', alreadyVoted: true }, { status: 409 })
    }
    return NextResponse.json({ error: 'Failed to vote' }, { status: 500 })
  }

  // Increment vote_count on suggestion
  await supabase.rpc('increment_suggestion_votes', { suggestion_id: id })

  return NextResponse.json({ success: true })
}
