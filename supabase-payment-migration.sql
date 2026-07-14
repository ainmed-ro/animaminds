-- Payment status migration for AnimaMinds
-- Run this in Supabase SQL Editor

-- Add payment_status to experience_edition_requests
ALTER TABLE experience_edition_requests
  ADD COLUMN IF NOT EXISTS payment_status TEXT NOT NULL DEFAULT 'NEACHITAT'
  CHECK (payment_status IN ('NEACHITAT', 'PLATĂ ÎN AȘTEPTARE', 'ACHITAT', 'ANULAT', 'RAMBURSAT'));

-- Add payment_status to private_group_requests
ALTER TABLE private_group_requests
  ADD COLUMN IF NOT EXISTS payment_status TEXT NOT NULL DEFAULT 'NEACHITAT'
  CHECK (payment_status IN ('NEACHITAT', 'PLATĂ ÎN AȘTEPTARE', 'ACHITAT', 'ANULAT', 'RAMBURSAT'));

-- Add payment_status to organization_requests
ALTER TABLE organization_requests
  ADD COLUMN IF NOT EXISTS payment_status TEXT NOT NULL DEFAULT 'NEACHITAT'
  CHECK (payment_status IN ('NEACHITAT', 'PLATĂ ÎN AȘTEPTARE', 'ACHITAT', 'ANULAT', 'RAMBURSAT'));

-- Update online_live_registrations payment_status check constraint to include new values
-- (already has payment_status, just update the constraint)
ALTER TABLE online_live_registrations
  DROP CONSTRAINT IF EXISTS online_live_registrations_payment_status_check;
ALTER TABLE online_live_registrations
  ADD CONSTRAINT online_live_registrations_payment_status_check
  CHECK (payment_status IN ('NEACHITAT', 'PLATĂ ÎN AȘTEPTARE', 'ACHITAT', 'ANULAT', 'RAMBURSAT'));

-- Add amount column to track payment amounts
ALTER TABLE online_live_registrations ADD COLUMN IF NOT EXISTS amount INTEGER DEFAULT 199;
ALTER TABLE experience_edition_requests ADD COLUMN IF NOT EXISTS amount INTEGER DEFAULT 1200;
ALTER TABLE private_group_requests ADD COLUMN IF NOT EXISTS amount INTEGER DEFAULT 0;
ALTER TABLE organization_requests ADD COLUMN IF NOT EXISTS amount INTEGER DEFAULT 0;

-- Grant permissions
GRANT ALL ON online_live_registrations TO service_role;
GRANT ALL ON experience_edition_requests TO service_role;
GRANT ALL ON private_group_requests TO service_role;
GRANT ALL ON organization_requests TO service_role;
GRANT ALL ON contact_messages TO service_role;
