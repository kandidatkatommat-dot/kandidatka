import { z } from 'zod'

export const suggestionSchema = z.object({
  name: z.string().max(100).optional(),
  category: z.enum(['Výuka', 'Digitalizácia', 'Kampus', 'Skúšky', 'Iné']),
  suggestion: z
    .string()
    .min(10, 'Podnet musí mať aspoň 10 znakov')
    .max(500, 'Podnet môže mať najviac 500 znakov'),
  website: z.string().optional(), // honeypot — allow any value, check silently in handler
})

export type SuggestionInput = z.infer<typeof suggestionSchema>
