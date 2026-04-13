import { z } from 'zod'

export const suggestionSchema = z.object({
  name: z.string().max(100).optional(),
  category: z.enum(['Výuka', 'Digitalizace', 'Kampus', 'Zkoušky', 'Jiné']),
  suggestion: z
    .string()
    .min(10, 'Podnět musí mít alespoň 10 znaků')
    .max(500, 'Podnět může mít nejvýše 500 znaků'),
  website: z.string().max(0, 'Spam detected').optional(), // honeypot
})

export type SuggestionInput = z.infer<typeof suggestionSchema>
