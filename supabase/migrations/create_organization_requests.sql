-- Create organization_requests table
CREATE TABLE IF NOT EXISTS organization_requests (
  id VARCHAR(255) PRIMARY KEY,
  organization_name VARCHAR(255) NOT NULL,
  organization_type VARCHAR(100) NOT NULL,
  contact_name VARCHAR(255) NOT NULL,
  contact_email VARCHAR(255) NOT NULL,
  contact_phone VARCHAR(50),
  contact_position VARCHAR(255),
  programme_interest TEXT,
  delivery_format_preference VARCHAR(100),
  participant_count_estimate INTEGER,
  preferred_timeline VARCHAR(255),
  budget_range VARCHAR(255),
  specific_requirements TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status VARCHAR(50) DEFAULT 'NEW'
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_organization_requests_status ON organization_requests(status);
CREATE INDEX IF NOT EXISTS idx_organization_requests_created_at ON organization_requests(created_at);
CREATE INDEX IF NOT EXISTS idx_organization_requests_email ON organization_requests(contact_email);

-- Add RLS (Row Level Security) policies
ALTER TABLE organization_requests ENABLE ROW LEVEL SECURITY;

-- Policy for authenticated users to read organization_requests
CREATE POLICY "Authenticated users can view organization requests" ON organization_requests
  FOR SELECT USING (auth.role() = 'authenticated');

-- Policy for authenticated users to insert organization_requests
CREATE POLICY "Authenticated users can insert organization requests" ON organization_requests
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Policy for authenticated users to update organization_requests
CREATE POLICY "Authenticated users can update organization requests" ON organization_requests
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Policy for service role to bypass RLS
CREATE POLICY "Service role can manage organization requests" ON organization_requests
  FOR ALL USING (auth.role() = 'service_role');
