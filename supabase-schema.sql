-- Run this in Supabase SQL Editor (supabase.com > SQL Editor)

CREATE TABLE public.suggestions (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  name       TEXT,
  category   TEXT NOT NULL CHECK (category IN ('Výuka', 'Digitalizace', 'Kampus', 'Zkoušky', 'Jiné')),
  suggestion TEXT NOT NULL,
  approved   BOOLEAN DEFAULT FALSE NOT NULL,
  ip_hash    TEXT,
  honeypot   BOOLEAN DEFAULT FALSE NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.suggestions ENABLE ROW LEVEL SECURITY;

-- Anyone can read approved, non-spam suggestions
CREATE POLICY "read_approved"
  ON public.suggestions
  FOR SELECT
  USING (approved = TRUE AND honeypot = FALSE);

-- Anyone can submit a suggestion
CREATE POLICY "insert_public"
  ON public.suggestions
  FOR INSERT
  WITH CHECK (TRUE);

-- Index for fast lookups
CREATE INDEX idx_suggestions_approved ON public.suggestions(approved, created_at DESC);

-- ─────────────────────────────────────────────
-- To approve a suggestion: log into supabase.com > Table Editor > suggestions
-- Find the row and set approved = true
-- It will appear on the site within 60 seconds.
-- ─────────────────────────────────────────────
