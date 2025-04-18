-- Create calendar_modifications table
CREATE TABLE public.calendar_modifications (
  id         uuid      PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    uuid      NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date       date      NOT NULL,
  day_type   text      NOT NULL CHECK (day_type IN (
                'work','off','vacation','sick','additional_vacation'
              )),
  created_at timestamptz DEFAULT now(),
  UNIQUE (user_id, date)
);

-- Enable RLS
ALTER TABLE public.calendar_modifications ENABLE ROW LEVEL SECURITY;

-- Allow select only own rows
CREATE POLICY select_own ON public.calendar_modifications
  FOR SELECT USING (auth.uid() = user_id);

-- Allow insert only own rows
CREATE POLICY insert_own ON public.calendar_modifications
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Allow update only own rows
CREATE POLICY update_own ON public.calendar_modifications
  FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Optional: allow delete only own rows
CREATE POLICY delete_own ON public.calendar_modifications
  FOR DELETE USING (auth.uid() = user_id);
