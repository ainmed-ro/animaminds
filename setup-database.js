// Database Setup Script
// Run this with: node setup-database.js

const { createClient } = require('@supabase/supabase-js');

// Environment variables - replace with actual values
const supabaseUrl = process.env.SUPABASE_URL || 'YOUR_SUPABASE_URL';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'YOUR_SERVICE_ROLE_KEY';

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupDatabase() {
  console.log('🔧 Setting up AnimaMinds database...\n');

  const tables = [
    {
      name: 'online_live_registrations',
      sql: `
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
      `
    },
    {
      name: 'private_group_requests',
      sql: `
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
      `
    },
    {
      name: 'experience_edition_requests',
      sql: `
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
      `
    },
    {
      name: 'organization_requests',
      sql: `
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
      `
    },
    {
      name: 'contact_messages',
      sql: `
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
      `
    }
  ];

  for (const table of tables) {
    try {
      console.log(`📋 Creating table: ${table.name}`);
      
      const { error } = await supabase.rpc('exec_sql', { sql_query: table.sql });
      
      if (error) {
        // Try direct SQL execution
        const { error: directError } = await supabase
          .from('information_schema.tables')
          .select('table_name')
          .eq('table_name', table.name);
          
        if (directError) {
          console.log(`❌ Could not create table ${table.name}`);
          console.log(`   Error: ${error.message}`);
        } else {
          console.log(`✅ Table ${table.name} already exists`);
        }
      } else {
        console.log(`✅ Table ${table.name} created successfully`);
      }
      
      // Check if table exists now
      const { data, error: checkError } = await supabase
        .from(table.name)
        .select('*')
        .limit(1);
        
      if (checkError) {
        console.log(`❌ Table ${table.name} still not accessible`);
      } else {
        console.log(`✅ Table ${table.name} is accessible`);
      }
      
      console.log('');
    } catch (err) {
      console.log(`❌ Error with ${table.name}: ${err}`);
      console.log('');
    }
  }

  console.log('🎉 Database setup complete!');
  console.log('\n📊 Next steps:');
  console.log('1. Test each form with the test data');
  console.log('2. Check Supabase dashboard for records');
  console.log('3. Verify email delivery');
  console.log('4. Confirm Google Sheets sync');
}

setupDatabase().catch(console.error);
