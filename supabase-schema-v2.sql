-- V2 Schema additions — run in Supabase SQL Editor

-- Add vote_count to suggestions
ALTER TABLE public.suggestions ADD COLUMN IF NOT EXISTS vote_count INT DEFAULT 0 NOT NULL;

-- Suggestion upvoting
CREATE TABLE IF NOT EXISTS public.suggestion_votes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  suggestion_id UUID REFERENCES public.suggestions(id) ON DELETE CASCADE NOT NULL,
  ip_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  UNIQUE(suggestion_id, ip_hash)
);
ALTER TABLE public.suggestion_votes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "insert_vote" ON public.suggestion_votes FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "read_votes" ON public.suggestion_votes FOR SELECT USING (TRUE);

-- Increment vote_count via RPC (avoids race conditions)
CREATE OR REPLACE FUNCTION public.increment_suggestion_votes(suggestion_id UUID)
RETURNS void AS $$
  UPDATE public.suggestions SET vote_count = vote_count + 1 WHERE id = suggestion_id;
$$ LANGUAGE sql SECURITY DEFINER;

-- Supporters counter
CREATE TABLE IF NOT EXISTS public.supporters (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  ip_hash TEXT,
  source TEXT DEFAULT 'web'
);
ALTER TABLE public.supporters ENABLE ROW LEVEL SECURITY;
CREATE POLICY "insert_supporter" ON public.supporters FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "count_supporters" ON public.supporters FOR SELECT USING (TRUE);

-- Polls
CREATE TABLE IF NOT EXISTS public.polls (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  question TEXT NOT NULL,
  is_active BOOLEAN DEFAULT FALSE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);
ALTER TABLE public.polls ENABLE ROW LEVEL SECURITY;
CREATE POLICY "read_active_polls" ON public.polls FOR SELECT USING (is_active = TRUE);

CREATE TABLE IF NOT EXISTS public.poll_options (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  poll_id UUID REFERENCES public.polls(id) ON DELETE CASCADE NOT NULL,
  option_text TEXT NOT NULL,
  vote_count INT DEFAULT 0 NOT NULL,
  order_index INT NOT NULL
);
ALTER TABLE public.poll_options ENABLE ROW LEVEL SECURITY;
CREATE POLICY "read_options" ON public.poll_options FOR SELECT USING (TRUE);

CREATE TABLE IF NOT EXISTS public.poll_votes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  poll_id UUID REFERENCES public.polls(id) ON DELETE CASCADE NOT NULL,
  option_id UUID REFERENCES public.poll_options(id) ON DELETE CASCADE NOT NULL,
  ip_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  UNIQUE(poll_id, ip_hash)
);
ALTER TABLE public.poll_votes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "insert_poll_vote" ON public.poll_votes FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "read_poll_votes" ON public.poll_votes FOR SELECT USING (TRUE);

-- Increment poll option votes
CREATE OR REPLACE FUNCTION public.increment_poll_option_votes(option_id UUID)
RETURNS void AS $$
  UPDATE public.poll_options SET vote_count = vote_count + 1 WHERE id = option_id;
$$ LANGUAGE sql SECURITY DEFINER;

-- Newsletter subscriptions
CREATE TABLE IF NOT EXISTS public.newsletter_subs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  first_name TEXT,
  interests TEXT[] DEFAULT '{}',
  confirmed BOOLEAN DEFAULT FALSE NOT NULL,
  confirm_token TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);
ALTER TABLE public.newsletter_subs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "insert_sub" ON public.newsletter_subs FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "update_sub_confirm" ON public.newsletter_subs FOR UPDATE USING (TRUE);

-- Post-election tables (create now, use later)
CREATE TABLE IF NOT EXISTS public.promises (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  status TEXT CHECK (status IN ('planning','in_progress','completed','modified','abandoned')) DEFAULT 'planning' NOT NULL,
  progress_pct INT DEFAULT 0 CHECK (progress_pct BETWEEN 0 AND 100),
  priority INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);
ALTER TABLE public.promises ENABLE ROW LEVEL SECURITY;
CREATE POLICY "read_promises" ON public.promises FOR SELECT USING (TRUE);

CREATE TABLE IF NOT EXISTS public.promise_milestones (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  promise_id UUID REFERENCES public.promises(id) ON DELETE CASCADE NOT NULL,
  milestone_text TEXT NOT NULL,
  completed_date DATE,
  order_index INT NOT NULL,
  evidence_url TEXT
);
ALTER TABLE public.promise_milestones ENABLE ROW LEVEL SECURITY;
CREATE POLICY "read_milestones" ON public.promise_milestones FOR SELECT USING (TRUE);

CREATE TABLE IF NOT EXISTS public.senate_votes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  vote_date DATE NOT NULL,
  proposal_title TEXT NOT NULL,
  position TEXT CHECK (position IN ('yes','no','abstain')) NOT NULL,
  explanation TEXT,
  category TEXT,
  is_public BOOLEAN DEFAULT TRUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);
ALTER TABLE public.senate_votes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "read_public_votes" ON public.senate_votes FOR SELECT USING (is_public = TRUE);

-- Seed first poll
INSERT INTO public.polls (question, is_active) VALUES ('Čo ťa na FEI trápi najviac?', TRUE);
INSERT INTO public.poll_options (poll_id, option_text, order_index)
SELECT id, 'Kvalita a férové hodnotenie skúšok', 0 FROM public.polls WHERE is_active = TRUE LIMIT 1;
INSERT INTO public.poll_options (poll_id, option_text, order_index)
SELECT id, 'Zastarané vybavenie a digitálne nástroje', 1 FROM public.polls WHERE is_active = TRUE LIMIT 1;
INSERT INTO public.poll_options (poll_id, option_text, order_index)
SELECT id, 'Nedostatočná komunikácia vedenia', 2 FROM public.polls WHERE is_active = TRUE LIMIT 1;
INSERT INTO public.poll_options (poll_id, option_text, order_index)
SELECT id, 'Podmienky na štúdium a kampuse', 3 FROM public.polls WHERE is_active = TRUE LIMIT 1;
