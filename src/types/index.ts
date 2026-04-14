export type SuggestionCategory = 'Výuka' | 'Digitalizace' | 'Kampus' | 'Zkoušky' | 'Jiné'

export interface Suggestion {
  id: string
  created_at: string
  name: string | null
  category: SuggestionCategory
  suggestion: string
  vote_count: number
  approved: boolean
  ip_hash?: string | null
}

export type PollOption = {
  id: string
  poll_id: string
  option_text: string
  vote_count: number
  order_index: number
}

export type Poll = {
  id: string
  question: string
  is_active: boolean
  created_at: string
  options?: PollOption[]
}

export type SupporterCount = {
  count: number
}

export interface Candidate {
  id: string
  name: string
  role: string
  department: string
  bio: string
  whyRunning: string
  photoUrl: string | null
  linkedIn?: string
  instagram?: string
}
