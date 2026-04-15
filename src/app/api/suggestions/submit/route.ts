import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { suggestionSchema } from '@/lib/validations'

async function hashIp(ip: string): Promise<string> {
  const encoder = new TextEncoder()
  // Use private NEXTAUTH_SECRET as salt — not the public site URL
  const salt = process.env.NEXTAUTH_SECRET ?? process.env.NEXT_PUBLIC_SITE_URL ?? 'fallback'
  const data = encoder.encode(ip + salt)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
}

export async function POST(request: NextRequest) {
  // Reject non-JSON content types early
  if (!request.headers.get('content-type')?.includes('application/json')) {
    return NextResponse.json({ error: 'Neplatný formát požiadavky.' }, { status: 415 })
  }

  try {
    const body = await request.json()
    const parsed = suggestionSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? 'Neplatná data' },
        { status: 400 }
      )
    }

    const { name, category, suggestion, website } = parsed.data

    // Honeypot — bot filled in the hidden field
    const isHoneypot = typeof website === 'string' && website.length > 0

    // IP-based rate limiting — applied to ALL requests including bots
    // to prevent DB flooding via honeypot bypass
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      request.headers.get('x-real-ip') ??
      'unknown'
    const ipHash = await hashIp(ip)

    const supabase = createServerClient()

    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000).toISOString()
    const { count } = await supabase
      .from('suggestions')
      .select('id', { count: 'exact', head: true })
      .eq('ip_hash', ipHash)
      .gte('created_at', tenMinutesAgo)

    // Real users: 3 per 10 min. Bots (honeypot filled): silently allow up to 10,
    // then block — prevents DB flooding while not alerting the bot immediately.
    const limit = isHoneypot ? 10 : 3
    if (count && count >= limit) {
      return NextResponse.json(
        { error: 'Príliš mnoho príspevkov. Skús to znova za chvíľu.' },
        { status: 429 }
      )
    }

    const { error } = await supabase.from('suggestions').insert({
      name: name?.trim() || null,
      category,
      suggestion: suggestion.trim(),
      approved: false,
      ip_hash: ipHash,
      honeypot: isHoneypot,
    })

    if (error) {
      console.error('Insert error:', error)
      return NextResponse.json({ error: 'Chyba při ukládání.' }, { status: 500 })
    }

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (err) {
    console.error('Unexpected error:', err)
    return NextResponse.json({ error: 'Neočekávaná chyba.' }, { status: 500 })
  }
}
