-- Enable RLS and add SELECT policy for all tables

-- experience_edition_requests
ALTER TABLE experience_edition_requests ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow all" ON experience_edition_requests;
CREATE POLICY "Allow all" ON experience_edition_requests FOR ALL USING (true) WITH CHECK (true);

-- organization_requests
ALTER TABLE organization_requests ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow all" ON organization_requests;
CREATE POLICY "Allow all" ON organization_requests FOR ALL USING (true) WITH CHECK (true);

-- private_group_requests
ALTER TABLE private_group_requests ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow all" ON private_group_requests;
CREATE POLICY "Allow all" ON private_group_requests FOR ALL USING (true) WITH CHECK (true);

-- contact_messages
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow all" ON contact_messages;
CREATE POLICY "Allow all" ON contact_messages FOR ALL USING (true) WITH CHECK (true);

-- online_live_registrations (already working, just making sure)
ALTER TABLE online_live_registrations ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow all" ON online_live_registrations;
CREATE POLICY "Allow all" ON online_live_registrations FOR ALL USING (true) WITH CHECK (true);
