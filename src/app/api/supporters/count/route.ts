import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export const revalidate = 30

export async function GET() {
  const supabase = createServerClient()

  const { count } = await supabase
    .from('supporters')
    .select('id', { count: 'exact', head: true })

  return NextResponse.json({ count: count ?? 0 })
}
