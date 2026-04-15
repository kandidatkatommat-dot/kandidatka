import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { z } from 'zod'
import { randomBytes, createHash } from 'crypto'

const schema = z.object({
  email: z.string().email().max(200),
  first_name: z.string().max(100).optional(),
})

// In-memory rate limit — imperfect on serverless (per-instance), but sufficient
// for a campaign site. Max 3 subscribe attempts per hashed IP per 10 minutes.
const rateMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT = 3
const RATE_WINDOW_MS = 10 * 60 * 1000

function checkRateLimit(ipKey: string): boolean {
  const now = Date.now()
  const entry = rateMap.get(ipKey)
  if (!entry || now > entry.resetAt) {
    rateMap.set(ipKey, { count: 1, resetAt: now + RATE_WINDOW_MS })
    return true
  }
  if (entry.count >= RATE_LIMIT) return false
  entry.count++
  return true
}

export async function POST(req: NextRequest) {
  if (!req.headers.get('content-type')?.includes('application/json')) {
    return NextResponse.json({ error: 'Invalid content type' }, { status: 415 })
  }

  const rawIp = req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? 'unknown'
  const secret = process.env.NEXTAUTH_SECRET ?? 'fallback'
  const ipKey = createHash('sha256').update(rawIp + secret).digest('hex').slice(0, 16)

  if (!checkRateLimit(ipKey)) {
    return NextResponse.json(
      { error: 'Príliš veľa pokusov. Skús to znova o chvíľu.' },
      { status: 429 }
    )
  }

  const body = await req.json().catch(() => null)
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Neplatný email' }, { status: 400 })
  }

  const { email, first_name } = parsed.data
  const token = randomBytes(32).toString('hex')

  const supabase = createServerClient()

  // Upsert + auto-confirm in one call (campaign site — no email verification needed)
  const { error } = await supabase
    .from('newsletter_subs')
    .upsert(
      { email, first_name, confirm_token: token, confirmed: true },
      { onConflict: 'email' }
    )

  if (error) {
    return NextResponse.json({ error: 'Chyba pri ukladaní' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
