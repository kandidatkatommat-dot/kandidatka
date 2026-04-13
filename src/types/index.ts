export type SuggestionCategory = 'Výuka' | 'Digitalizace' | 'Kampus' | 'Zkoušky' | 'Jiné'

export interface Suggestion {
  id: string
  created_at: string
  name: string | null
  category: SuggestionCategory
  suggestion: string
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
