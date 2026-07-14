# PRODUCTION READINESS TESTING
## End-to-End Form Testing Plan

### **STATUS: TESTING IN PROGRESS**
**Website is NOT production-ready until all forms pass testing.**

---

## 📋 STEP 1 - SUPABASE SETUP

### **SQL MIGRATIONS REQUIRED**
Execute these scripts in Supabase SQL Editor:

```sql
-- Table 1: Online Live Registrations
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

-- Table 2: Private Group Requests
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

-- Table 3: Experience Edition Requests
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

-- Table 4: Organization Requests (if not exists)
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

-- Table 5: Contact Messages (if not exists)
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
```

### **VERIFICATION CHECKLIST**
- [ ] online_live_registrations table exists
- [ ] private_group_requests table exists
- [ ] experience_edition_requests table exists
- [ ] organization_requests table exists
- [ ] contact_messages table exists
- [ ] All tables have correct schema
- [ ] All tables are accessible

---

## 📋 STEP 2 - ENVIRONMENT VARIABLES

### **VERCEL CONFIGURATION REQUIRED**
Verify these variables in Vercel dashboard:

```env
# Database
DATABASE_URL=postgresql://[user]:[password]@[host]:[port]/[database]
DIRECT_URL=postgresql://[user]:[password]@[host]:[port]/[database]

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Email Service
RESEND_API_KEY=re_your_resend_api_key
ADMIN_EMAIL=admin@animaminds.ro
FROM_EMAIL=noreply@animaminds.ro

# Google Sheets Integration
GOOGLE_SHEETS_URL=your_google_sheets_webhook_url
```

### **VERIFICATION CHECKLIST**
- [ ] DATABASE_URL configured
- [ ] DIRECT_URL configured
- [ ] NEXT_PUBLIC_SUPABASE_URL configured
- [ ] SUPABASE_SERVICE_ROLE_KEY configured
- [ ] RESEND_API_KEY configured
- [ ] GOOGLE_SHEETS_URL configured
- [ ] ADMIN_EMAIL configured
- [ ] FROM_EMAIL configured

---

## 📋 STEP 3 - END-TO-END FORM TESTING

### **FORM 1: ONLINE LIVE REGISTRATION**

**URL:** `/programe/conversatii-care-conteaza#online-live`

**Test Data:**
```
Nume: Test Online Live
Email: test.online@animaminds.ro
Telefon: 0723456789
Instituție: Test Institution
Funcție: Test Role
GDPR Consent: ✅
Calendar Confirmation: ✅
```

**Verification Checklist:**
- [ ] Correct form opens (no accommodation fields)
- [ ] Required validation works
- [ ] Email format validation works
- [ ] Form submission succeeds
- [ ] Success message displays
- [ ] Supabase record created in online_live_registrations
- [ ] Google Sheets row created
- [ ] Admin email received
- [ ] User confirmation email received
- [ ] Payload matches Online Live format (no accommodation data)

---

### **FORM 2: EXPERIENCE EDITION RESERVATION**

**URL:** `/programe/experience-edition/conversatii-care-conteaza`

**Test Data:**
```
Nume: Test Experience Edition
Email: test.experience@animaminds.ro
Telefon: 0723456788
Companie: Test Company
Edition: octombrie-2026
Room: Cameră dublă
GDPR Consent: ✅
```

**Verification Checklist:**
- [ ] Correct form opens (with edition, room, billing fields)
- [ ] Required validation works
- [ ] Form submission succeeds
- [ ] Success message displays
- [ ] Supabase record created in experience_edition_requests
- [ ] Google Sheets row created
- [ ] Admin email received
- [ ] User confirmation email received
- [ ] Payload includes edition, room, billing data

---

### **FORM 3: ORGANIZATION REQUEST**

**URL:** `/colaboreaza#solicita-oferta`

**Test Data:**
```
Organization Name: Test Organization SRL
Organization Type: Companie privată
Contact Person: Test Contact
Email: test.org@animaminds.ro
Phone: 0723456787
Format: Online dedicat organizației — 3.500 lei / grup
Participants: 25
```

**Verification Checklist:**
- [ ] Correct form opens (with organization fields)
- [ ] Pricing displays correctly (3500/5000 lei)
- [ ] Required validation works
- [ ] Form submission succeeds
- [ ] Success message displays
- [ ] Supabase record created in organization_requests
- [ ] Google Sheets row created
- [ ] Admin email received
- [ ] User confirmation email received
- [ ] Payload includes organization data and pricing

---

### **FORM 4: PRIVATE GROUP REQUEST**

**URL:** `/colaboreaza#solicita-oferta?tip=grup-privat`

**Test Data:**
```
Group Name: Test Private Group
Email: test.private@animaminds.ro
Phone: 0723456786
Programme: Conversații care Contează
Group Size: 15
```

**Verification Checklist:**
- [ ] Correct form opens (private group fields)
- [ ] Required validation works
- [ ] Group size validation works
- [ ] Form submission succeeds
- [ ] Success message displays
- [ ] Supabase record created in private_group_requests
- [ ] Google Sheets row created
- [ ] Admin email received
- [ ] User confirmation email received
- [ ] Payload includes group data

---

### **FORM 5: CONTACT FORM**

**URL:** `/contact`

**Test Data:**
```
Nume: Test Contact
Email: test.contact@animaminds.ro
Phone: 0723456785
Subject: Test Subject
Message: Test contact message
```

**Verification Checklist:**
- [ ] Correct form opens (simple contact fields)
- [ ] Required validation works
- [ ] Form submission succeeds
- [ ] Success message displays
- [ ] Supabase record created in contact_messages
- [ ] Google Sheets row created
- [ ] Admin email received
- [ ] User confirmation email received
- [ ] Payload includes contact data

---

## 📋 STEP 4 - EVIDENCE TABLE

### **FINAL PRODUCTION READINESS STATUS**

| FORM | TEST DATA | SUPABASE RECORD | GOOGLE SHEETS ROW | ADMIN EMAIL | USER EMAIL | PAYLOAD CORRECT | STATUS |
|------|-----------|-----------------|-------------------|-------------|------------|-----------------|---------|
| Online Live registration | ⏳ PENDING | ⏳ PENDING | ⏳ PENDING | ⏳ PENDING | ⏳ PENDING | ⏳ PENDING | ⏳ TESTING |
| Experience Edition reservation | ⏳ PENDING | ⏳ PENDING | ⏳ PENDING | ⏳ PENDING | ⏳ PENDING | ⏳ PENDING | ⏳ TESTING |
| Organization request | ⏳ PENDING | ⏳ PENDING | ⏳ PENDING | ⏳ PENDING | ⏳ PENDING | ⏳ PENDING | ⏳ TESTING |
| Private Group request | ⏳ PENDING | ⏳ PENDING | ⏳ PENDING | ⏳ PENDING | ⏳ PENDING | ⏳ PENDING | ⏳ TESTING |
| Contact form | ⏳ PENDING | ⏳ PENDING | ⏳ PENDING | ⏳ PENDING | ⏳ PENDING | ⏳ PENDING | ⏳ TESTING |

---

## 🚨 PRODUCTION READINESS CRITERIA

**Website is PRODUCTION READY when:**
- ✅ All 5 forms pass end-to-end testing
- ✅ All Supabase records are created correctly
- ✅ All Google Sheets integrations work
- ✅ All emails are delivered successfully
- ✅ All payloads match the selected format
- ✅ No validation errors or broken functionality
- ✅ All environment variables are configured
- ✅ All database tables exist and are accessible

---

## 📞 TROUBLESHOOTING

**Common Issues:**
1. **Supabase connection** - Check URL and service role key
2. **Email delivery** - Verify RESEND_API_KEY and email addresses
3. **Google Sheets** - Check webhook URL and format
4. **Form validation** - Review required fields and error messages
5. **Payload mismatch** - Verify form data mapping in API endpoints

---

**Status: Ready for production testing after database and environment setup.**
