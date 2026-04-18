import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export const revalidate = 10 // 10 second cache

export async function GET() {
  const supabase = createServerClient()

  const { data: poll } = await supabase
    .from('polls')
    .select('*, options:poll_options(id, option_text, vote_count, order_index)')
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  if (!poll) {
    return NextResponse.json({ poll: null })
  }

  // Sort options by order_index
  if (poll.options) {
    poll.options.sort((a: { order_index: number }, b: { order_index: number }) => a.order_index - b.order_index)
  }

  return NextResponse.json({ poll }, {
    headers: { 'Cache-Control': 'public, s-maxage=10, stale-while-revalidate=30' },
  })
}
