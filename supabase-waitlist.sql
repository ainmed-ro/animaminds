CREATE TABLE IF NOT EXISTS waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT,
  programme TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  notified_at TIMESTAMPTZ
);

ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow insert" ON waitlist FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow select for admin" ON waitlist FOR SELECT USING (true);
CREATE POLICY "Allow update for admin" ON waitlist FOR UPDATE USING (true);
