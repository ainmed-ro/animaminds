-- FIX PERMISSIONS pentru toate tabelele AnimaMinds
-- Rulează acest script în Supabase SQL Editor

-- Acordă permisiuni pentru schema public
GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT USAGE ON SCHEMA public TO service_role;

-- Acordă permisiuni pentru tabelul online_live_registrations
GRANT ALL ON TABLE public.online_live_registrations TO anon;
GRANT ALL ON TABLE public.online_live_registrations TO authenticated;
GRANT ALL ON TABLE public.online_live_registrations TO service_role;

-- Acordă permisiuni pentru tabelul experience_edition_requests
GRANT ALL ON TABLE public.experience_edition_requests TO anon;
GRANT ALL ON TABLE public.experience_edition_requests TO authenticated;
GRANT ALL ON TABLE public.experience_edition_requests TO service_role;

-- Acordă permisiuni pentru tabelul organization_requests
GRANT ALL ON TABLE public.organization_requests TO anon;
GRANT ALL ON TABLE public.organization_requests TO authenticated;
GRANT ALL ON TABLE public.organization_requests TO service_role;

-- Acordă permisiuni pentru tabelul private_group_requests
GRANT ALL ON TABLE public.private_group_requests TO anon;
GRANT ALL ON TABLE public.private_group_requests TO authenticated;
GRANT ALL ON TABLE public.private_group_requests TO service_role;

-- Acordă permisiuni pentru tabelul contact_messages
GRANT ALL ON TABLE public.contact_messages TO anon;
GRANT ALL ON TABLE public.contact_messages TO authenticated;
GRANT ALL ON TABLE public.contact_messages TO service_role;

-- Dezactivează RLS pe toate tabelele (sau activează cu policy permisivă)
ALTER TABLE public.online_live_registrations DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience_edition_requests DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.organization_requests DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.private_group_requests DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages DISABLE ROW LEVEL SECURITY;

-- Verificare finală
SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname = 'public';
