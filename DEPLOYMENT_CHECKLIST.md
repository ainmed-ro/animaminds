# DEPLOYMENT CHECKLIST
## Final Testing & Deployment Plan

### **📊 CURRENT STATUS: CODE 100% COMPLETE - TESTING REQUIRED**

---

## 🚀 IMMEDIATE ACTIONS REQUIRED

### **1. DATABASE SETUP - CRITICAL**

**Execute Supabase Migrations:**
```
1. Open Supabase Dashboard
2. Go to SQL Editor
3. Copy & paste content from: supabase-migrations.sql
4. Execute the script
5. Verify tables created:
   - online_live_registrations
   - private_group_requests  
   - experience_edition_requests
   - organization_requests
   - contact_messages
```

### **2. ENVIRONMENT CONFIGURATION - CRITICAL**

**Required Environment Variables:**
```env
# Email Service
RESEND_API_KEY=re_your_resend_api_key_here

# Google Sheets Integration
GOOGLE_SHEETS_URL=your_google_sheets_webhook_url_here

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Admin Email
ADMIN_EMAIL=admin@animaminds.ro
FROM_EMAIL=noreply@animaminds.ro
```

### **3. TESTING PLAN - STEP BY STEP**

**FORM 1: Online Live Registration**
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

Expected Results:
✅ Form submits successfully
✅ Supabase record in online_live_registrations table
✅ Admin email received
✅ User confirmation email received
✅ Google Sheets row created
```

**FORM 2: Experience Edition Reservation**
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

Expected Results:
✅ Form submits successfully
✅ Supabase record in experience_edition_requests table
✅ Admin email received
✅ User confirmation email received
✅ Google Sheets row created
```

**FORM 3: Organization Request**
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

Expected Results:
✅ Form submits successfully
✅ Supabase record in organization_requests table
✅ Admin email received
✅ User confirmation email received
✅ Google Sheets row created
```

**FORM 4: Private Group Request**
```
URL: /colaboreaza#solicita-oferta?tip=grup-privat
Test Data:
- Group Name: Test Private Group
- Email: test.private@animaminds.ro
- Phone: 0723456786
- Programme: Conversații care Contează
- Group Size: 15

Expected Results:
✅ Form submits successfully
✅ Supabase record in private_group_requests table
✅ Admin email received
✅ User confirmation email received
✅ Google Sheets row created
```

**FORM 5: Contact Form**
```
URL: /contact
Test Data:
- Nume: Test Contact
- Email: test.contact@animaminds.ro
- Phone: 0723456785
- Subject: Test Subject
- Message: Test message

Expected Results:
✅ Form submits successfully
✅ Supabase record in contact_messages table
✅ Admin email received
✅ User confirmation email received
✅ Google Sheets row created
```

---

## 📸 EVIDENCE REQUIRED

### **FOR EACH FORM, CAPTURE:**

**1. Form Screenshots**
- [ ] Before submission (filled form)
- [ ] After submission (success message)
- [ ] Error handling (if applicable)

**2. Supabase Evidence**
- [ ] Table view showing new record
- [ ] Record details showing all fields
- [ ] Timestamp verification

**3. Email Evidence**
- [ ] Admin email screenshot (subject, content)
- [ ] User confirmation email screenshot
- [ ] Email headers showing delivery

**4. Google Sheets Evidence**
- [ ] Spreadsheet showing new row
- [ ] Data mapping verification
- [ ] Timestamp confirmation

**5. Network Evidence**
- [ ] Browser network tab showing POST request
- [ ] Response payload (200 OK)
- [ ] Request body verification

---

## ✅ VERIFICATION CHECKLIST

### **POST-TESTING VERIFICATION:**

**Data Integrity:**
- [ ] All form fields saved correctly
- [ ] No data truncation or corruption
- [ ] Proper data types in database
- [ ] Correct timestamps

**Functionality:**
- [ ] Forms submit without errors
- [ ] Success messages display correctly
- [ ] Error messages work properly
- [ ] Validation rules enforced

**Integrations:**
- [ ] Supabase storage working
- [ ] Email delivery successful
- [ ] Google Sheets sync functional
- [ ] API responses correct

**User Experience:**
- [ ] Forms load quickly
- [ ] Mobile responsive
- [ ] Clear success messages
- [ ] Proper error feedback

---

## 🚀 DEPLOYMENT READINESS

### **BEFORE DEPLOYMENT:**
- [ ] All 5 forms tested successfully
- [ ] All evidence captured and verified
- [ ] Environment variables configured
- [ ] Database migrations executed
- [ ] No console errors
- [ ] All functionality working

### **DEPLOYMENT STEPS:**
1. Push code to repository
2. Deploy to Vercel
3. Configure environment variables in Vercel
4. Execute database migrations in production
5. Test all forms in production
6. Monitor for any issues

---

## 📞 CONTACT INFORMATION

**For issues during testing:**
- Database: Check Supabase logs
- Emails: Check Resend dashboard
- Google Sheets: Verify webhook URL
- Forms: Check browser console

---

## 🎯 SUCCESS CRITERIA

**Deployment is successful when:**
- ✅ All 5 forms work in production
- ✅ All data flows to correct destinations
- ✅ All emails are delivered
- ✅ Google Sheets integration works
- ✅ No 404 errors or broken functionality
- ✅ Mobile responsive design maintained
- ✅ Performance acceptable (<3s load time)

---

**Status: Ready for testing and deployment after database setup.**
