-- Supabase Tables for AnimaMinds Forms
-- Run these migrations in Supabase SQL Editor

-- 1. Online Live Registrations Table
CREATE TABLE IF NOT EXISTS online_live_registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  programme TEXT NOT NULL DEFAULT 'Conversații care Contează',
  format TEXT NOT NULL DEFAULT 'Online Live',
  price INTEGER NOT NULL DEFAULT 199,
  duration INTEGER NOT NULL DEFAULT 7.5,
  cpd INTEGER NOT NULL DEFAULT 8,
  dates TEXT NOT NULL DEFAULT '8, 15, 22 Septembrie 2026',
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  institution TEXT,
  role TEXT,
  gdpr_consent BOOLEAN NOT NULL DEFAULT false,
  calendar_confirmation BOOLEAN NOT NULL DEFAULT false,
  status TEXT NOT NULL DEFAULT 'INTERESAT' CHECK (status IN ('INTERESAT', 'ÎNSCRIS', 'CONFIRMAT', 'ANULAT')),
  payment_status TEXT NOT NULL DEFAULT 'NEACHITAT' CHECK (payment_status IN ('NEACHITAT', 'AVANS PLĂTIT', 'ACHITAT INTEGRAL')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Private Group Requests Table
CREATE TABLE IF NOT EXISTS private_group_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  requester_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  programme_requested TEXT NOT NULL,
  estimated_group_size INTEGER NOT NULL CHECK (estimated_group_size >= 1),
  message TEXT,
  request_type TEXT NOT NULL DEFAULT 'Private Group',
  status TEXT NOT NULL DEFAULT 'PRIMITĂ' CHECK (status IN ('PRIMITĂ', 'ÎN PROCESARE', 'CONFIRMATĂ', 'ANULATĂ')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Experience Edition Requests Table
CREATE TABLE IF NOT EXISTS experience_edition_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  company TEXT,
  programme TEXT NOT NULL DEFAULT 'Conversații care Contează',
  accommodation TEXT,
  preferred_period TEXT,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'INTERESAT' CHECK (status IN ('INTERESAT', 'REZERVAT', 'CONFIRMAT', 'ANULAT')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Organization Requests Table (if not exists)
CREATE TABLE IF NOT EXISTS organization_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_name TEXT NOT NULL,
  organization_type TEXT,
  contact_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT,
  contact_position TEXT,
  programme_interest TEXT,
  delivery_format_preference TEXT,
  participant_count_estimate INTEGER,
  preferred_timeline TEXT,
  budget_range TEXT,
  specific_requirements TEXT,
  status TEXT NOT NULL DEFAULT 'PRIMITĂ' CHECK (status IN ('PRIMITĂ', 'ÎN PROCESARE', 'CONFIRMATĂ', 'ANULATĂ')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Contact Messages Table (if not exists)
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  organization TEXT,
  program_interes TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'NOU' CHECK (status IN ('NOU', 'CITIT', 'RĂSPUNS', 'ÎNCHIS')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_online_live_registrations_email ON online_live_registrations(email);
CREATE INDEX IF NOT EXISTS idx_online_live_registrations_created_at ON online_live_registrations(created_at);
CREATE INDEX IF NOT EXISTS idx_private_group_requests_email ON private_group_requests(email);
CREATE INDEX IF NOT EXISTS idx_private_group_requests_created_at ON private_group_requests(created_at);
CREATE INDEX IF NOT EXISTS idx_experience_edition_requests_email ON experience_edition_requests(email);
CREATE INDEX IF NOT EXISTS idx_experience_edition_requests_created_at ON experience_edition_requests(created_at);
CREATE INDEX IF NOT EXISTS idx_organization_requests_email ON organization_requests(contact_email);
CREATE INDEX IF NOT EXISTS idx_organization_requests_created_at ON organization_requests(created_at);
CREATE INDEX IF NOT EXISTS idx_contact_messages_email ON contact_messages(email);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE online_live_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE private_group_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience_edition_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE organization_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Create RLS policies (allow all operations for authenticated users, read for public)
-- Online Live Registrations
CREATE POLICY "Enable all for authenticated users" ON online_live_registrations
  FOR ALL USING (auth.role() = 'authenticated');

-- Private Group Requests
CREATE POLICY "Enable all for authenticated users" ON private_group_requests
  FOR ALL USING (auth.role() = 'authenticated');

-- Experience Edition Requests
CREATE POLICY "Enable all for authenticated users" ON experience_edition_requests
  FOR ALL USING (auth.role() = 'authenticated');

-- Organization Requests
CREATE POLICY "Enable all for authenticated users" ON organization_requests
  FOR ALL USING (auth.role() = 'authenticated');

-- Contact Messages
CREATE POLICY "Enable all for authenticated users" ON contact_messages
  FOR ALL USING (auth.role() = 'authenticated');
