import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import type { Suggestion } from '@/types'

export const revalidate = 60

export async function GET() {
  try {
    const supabase = createServerClient()
    const { data, error } = await supabase
      .from('suggestions')
      .select('id, created_at, name, category, suggestion')
      .eq('approved', true)
      .eq('honeypot', false)
      .order('created_at', { ascending: false })
      .limit(100)

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ data: [], count: 0 }, { status: 200 })
    }

    return NextResponse.json({ data: data as Suggestion[], count: data?.length ?? 0 })
  } catch (err) {
    console.error('Unexpected error:', err)
    return NextResponse.json({ data: [], count: 0 }, { status: 200 })
  }
}
