// Database Status Check Script
// Run this to verify which tables exist in Supabase

import { supabase } from './lib/supabase';

async function checkDatabaseStatus() {
  if (!supabase) {
    console.log('❌ Supabase not configured - check environment variables');
    return;
  }

  console.log('🔍 Checking database status...\n');

  const tables = [
    'online_live_registrations',
    'private_group_requests',
    'experience_edition_requests',
    'organization_requests',
    'contact_messages'
  ];

  for (const tableName of tables) {
    try {
      console.log(`📋 Checking table: ${tableName}`);
      
      // Try to select 1 record to see if table exists
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .limit(1);

      if (error) {
        console.log(`❌ Table ${tableName}: NOT FOUND`);
        console.log(`   Error: ${error.message}`);
      } else {
        console.log(`✅ Table ${tableName}: EXISTS`);
        
        // Get count of records
        const { count } = await supabase
          .from(tableName)
          .select('*', { count: 'exact', head: true });
        
        console.log(`   Records: ${count || 0}`);
      }
      console.log('');
    } catch (err) {
      console.log(`❌ Error checking ${tableName}: ${err}`);
      console.log('');
    }
  }
}

// Run the check
checkDatabaseStatus().catch(console.error);
