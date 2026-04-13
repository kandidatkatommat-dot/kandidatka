import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { z } from 'zod'
import { randomBytes } from 'crypto'

const schema = z.object({
  email: z.string().email().max(200),
  first_name: z.string().max(100).optional(),
})

export async function POST(req: NextRequest) {
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

  // Note: Resend integration would go here for confirmation email
  // For now, just auto-confirm (simple mode without double opt-in)
  await supabase
    .from('newsletter_subs')
    .update({ confirmed: true })
    .eq('email', email)

  return NextResponse.json({ success: true })
}
