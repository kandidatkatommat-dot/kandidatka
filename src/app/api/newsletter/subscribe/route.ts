import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { z } from 'zod'
import { randomBytes, createHash } from 'crypto'

const schema = z.object({
  email: z.string().email().max(200),
  first_name: z.string().max(100).optional(),
})

// In-memory rate limiter: max 3 subscribe attempts per IP per 10 minutes
const rateMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT = 3
const RATE_WINDOW_MS = 10 * 60 * 1000

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateMap.get(ip)
  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS })
    return true
  }
  if (entry.count >= RATE_LIMIT) return false
  entry.count++
  return true
}

export async function POST(req: NextRequest) {
  // Rate limiting by hashed IP
  const rawIp = req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? 'unknown'
  const ipKey = createHash('sha256').update(rawIp).digest('hex').slice(0, 16)

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

  // Upsert — ak email existuje, update token
  const { error } = await supabase
    .from('newsletter_subs')
    .upsert({ email, first_name, confirm_token: token, confirmed: false }, { onConflict: 'email' })

  if (error) {
    return NextResponse.json({ error: 'Chyba pri ukladaní' }, { status: 500 })
  }

  // Auto-confirm (no Resend integration yet)
  await supabase
    .from('newsletter_subs')
    .update({ confirmed: true })
    .eq('email', email)

  return NextResponse.json({ success: true })
}
