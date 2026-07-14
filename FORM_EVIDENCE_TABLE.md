# FORM EVIDENCE TABLE
## Real Testing Results - DA/NU Evidence Required

### **STATUS: WAITING FOR ACTUAL TESTING**

---

## 📊 EVIDENCE TABLE

| FORMULAR | DATE DE TEST FOLOSITE | SUPABASE RECORD CREAT | GOOGLE SHEETS ROW CREAT | ADMIN EMAIL TRIMIS | USER CONFIRMATION EMAIL TRIMIS | PAYLOAD CORECT | PROBLEME GĂSITE | PROBLEME REPARATE |
|----------|----------------------|----------------------|------------------------|-------------------|------------------------------|---------------|----------------|-------------------|
| Online Live registration | ⏳ PENDING | ⏳ PENDING | ⏳ PENDING | ⏳ PENDING | ⏳ PENDING | ⏳ PENDING | ⏳ PENDING | ⏳ PENDING |
| Experience Edition reservation | ⏳ PENDING | ⏳ PENDING | ⏳ PENDING | ⏳ PENDING | ⏳ PENDING | ⏳ PENDING | ⏳ PENDING | ⏳ PENDING |
| Organisation request | ⏳ PENDING | ⏳ PENDING | ⏳ PENDING | ⏳ PENDING | ⏳ PENDING | ⏳ PENDING | ⏳ PENDING | ⏳ PENDING |
| Private group request | ⏳ PENDING | ⏳ PENDING | ⏳ PENDING | ⏳ PENDING | ⏳ PENDING | ⏳ PENDING | ⏳ PENDING | ⏳ PENDING |
| Contact form | ⏳ PENDING | ⏳ PENDING | ⏳ PENDING | ⏳ PENDING | ⏳ PENDING | ⏳ PENDING | ⏳ PENDING | ⏳ PENDING |

---

## 📋 TEST DATA FOR EACH FORM

### **1. Online Live Registration**
```
URL: /programe/conversatii-care-conteaza#online-live
Test Data:
- Nume: Test Online Live
- Email: test.online@animaminds.ro
- Telefon: 0723456789
- Instituție: Test Institution
- Funcție: Test Role
- GDPR Consent: ✅
- Calendar Confirmation: ✅

Expected Payload:
{
  "name": "Test Online Live",
  "email": "test.online@animaminds.ro",
  "phone": "0723456789",
  "institution": "Test Institution",
  "role": "Test Role",
  "gdprConsent": true,
  "calendarConfirmation": true
}
```

### **2. Experience Edition Reservation**
```
URL: /programe/experience-edition/conversatii-care-conteaza
Test Data:
- Nume: Test Experience Edition
- Email: test.experience@animaminds.ro
- Telefon: 0723456788
- Companie: Test Company
- Edition: octombrie-2026
- Room: Cameră dublă
- GDPR Consent: ✅

Expected Payload:
{
  "name": "Test Experience Edition",
  "email": "test.experience@animaminds.ro",
  "phone": "0723456788",
  "company": "Test Company",
  "programme": "Conversații care Contează",
  "accommodation": "Cameră dublă",
  "preferredPeriod": "octombrie-2026"
}
```

### **3. Organisation Request**
```
URL: /colaboreaza#solicita-oferta
Test Data:
- Organization Name: Test Organization SRL
- Organization Type: Companie privată
- Contact Person: Test Contact
- Email: test.org@animaminds.ro
- Phone: 0723456787
- Format: Online dedicat organizației — 3.500 lei / grup
- Participants: 25

Expected Payload:
{
  "organizationName": "Test Organization SRL",
  "organizationType": "Companie privată",
  "contactPerson": "Test Contact",
  "organizationEmail": "test.org@animaminds.ro",
  "organizationPhone": "0723456787",
  "programmeInterest": "Conversații care Contează",
  "organizationFormat": "Online dedicat organizației — 3.500 lei / grup",
  "participantCount": "25"
}
```

### **4. Private Group Request**
```
URL: /colaboreaza#solicita-oferta?tip=grup-privat
Test Data:
- Group Name: Test Private Group
- Email: test.private@animaminds.ro
- Phone: 0723456786
- Programme: Conversații care Contează
- Group Size: 15

Expected Payload:
{
  "requesterName": "Test Private Group",
  "email": "test.private@animaminds.ro",
  "phone": "0723456786",
  "programmeRequested": "Conversații care Contează",
  "estimatedGroupSize": "15"
}
```

### **5. Contact Form**
```
URL: /contact
Test Data:
- Nume: Test Contact
- Email: test.contact@animaminds.ro
- Phone: 0723456785
- Subject: Test Subject
- Message: Test contact message

Expected Payload:
{
  "name": "Test Contact",
  "email": "test.contact@animaminds.ro",
  "phone": "0723456785",
  "subject": "Test Subject",
  "message": "Test contact message"
}
```

---

## 📸 EVIDENCE REQUIRED FOR EACH TEST

### **SCREENSHOTS NEEDED:**

**1. Form Submission:**
- [ ] Filled form before submission
- [ ] Success message after submission

**2. Supabase Evidence:**
- [ ] Table view showing new record
- [ ] Record details with all fields

**3. Email Evidence:**
- [ ] Admin email (subject + content)
- [ ] User confirmation email (subject + content)

**4. Google Sheets Evidence:**
- [ ] Spreadsheet with new row
- [ ] Data verification

**5. API Evidence:**
- [ ] Network tab showing POST request
- [ ] Response payload (200 OK)

---

## 🚨 CURRENT BLOCKERS

**Cannot test without:**
1. **Supabase database setup** - Tables must be created with `supabase-migrations.sql`
2. **Environment variables** - `RESEND_API_KEY` and `GOOGLE_SHEETS_URL` required
3. **Development server** - Need to run `npm run dev` to test forms

---

## 📋 NEXT STEPS

1. **EXECUTE Supabase migrations**
2. **CONFIGURE environment variables**
3. **START development server**
4. **TEST each form**
5. **CAPTURE evidence**
6. **COMPLETE this table with DA/NU**

---

**STATUS: Ready for testing once database and environment are set up.**
