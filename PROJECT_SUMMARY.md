# AnimaMinds - Project Summary & Documentation

## 📋 Project Overview
**Site:** AnimaMinds - Dezvoltare Umană și Profesională  
**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS  
**Status:** ✅ Fully Functional  

## 🏗️ Architecture

### Core Technologies
- **Frontend:** Next.js 16 with App Router
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide React
- **Database:** Local JSON files (registrations-db.ts)
- **Email Service:** Resend
- **Forms:** Google Sheets Integration

### Project Structure
```
ANIMAMINDS/
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin panel for registrations
│   ├── api/               # API endpoints
│   ├── contact/           # Contact form page
│   ├── retreats/          # Retreat programs
│   └── ...               # 16 total pages
├── components/            # Reusable UI components
├── lib/                   # Utilities and database
├── public/               # Static assets
└── hooks/                # Custom React hooks
```

## 🚀 Features

### 1. Content Pages (16 total)
- ✅ Homepage
- ✅ About Us
- ✅ Programs
- ✅ Retreats
- ✅ Contact Form
- ✅ Admin Panel
- ✅ Legal Pages (Privacy, Terms)
- ✅ And more...

### 2. Interactive Forms
- ✅ **Contact Form** → Google Sheets integration
- ✅ **Registration Form** → Local DB + Google Sheets + Email notifications
- ✅ **Admin Panel** → View/manage registrations

### 3. Email System
- ✅ Participant confirmation emails
- ✅ Admin notification emails
- ✅ Professional email templates

### 4. Google Sheets Integration
- ✅ Contact form submissions
- ✅ Retreat registrations
- ✅ Automatic ID generation
- ✅ Status tracking

## 📊 Database & Storage

### Local Database
- **File:** `lib/registrations-db.ts`
- **Type:** JSON file storage
- **Purpose:** Registration data backup

### Google Sheets
- **Sheet:** "AnimaMinds Inscrieri"
- **Worksheet:** "INSCRERI"
- **Columns:** ID, Data, Nume, Email, Telefon, Editie, Participanti, Observatii, Status

## 🔧 Configuration

### Environment Variables
```env
GOOGLE_SHEETS_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID_HERE/exec
RESEND_API_KEY=your_resend_api_key
ADMIN_EMAIL=contact@animaminds.ro
FROM_EMAIL=AnimaMinds <noreply@animaminds.ro>
```

### Dependencies
```json
{
  "dependencies": {
    "@supabase/supabase-js": "^2.110.1",
    "framer-motion": "^12.42.2",
    "lucide-react": "^1.23.0",
    "next": "16.2.10",
    "react": "19.2.4",
    "react-dom": "19.2.4",
    "resend": "^6.17.1"
  }
}
```

## 🌐 Deployment

### Development
```bash
npm run dev
```

### Production
```bash
npm run build
npm start
```

## 📧 Google Apps Script

### Script Location
- **File:** `UPDATED_GOOGLE_APPS_SCRIPT.js`
- **Purpose:** Handle form submissions to Google Sheets
- **Functions:** 
  - `doPost()` - Process form data
  - `doGet()` - Health check

### Deployment Steps
1. Copy script to Google Apps Script
2. Deploy as Web App
3. Set access to "Anyone"
4. Copy Web App URL to environment variables

## 🔍 Maintenance

### Regular Tasks
- Monitor Google Sheets for new submissions
- Check email deliverability
- Update form fields if needed
- Monitor API endpoints

### Backup Strategy
- Google Sheets: Automatic backup
- Local DB: Manual backup recommended
- Code: Git repository

## 📱 Responsive Design
- ✅ Mobile-first approach
- ✅ Tablet optimization
- ✅ Desktop layouts
- ✅ Modern UI/UX

## 🎨 Branding
- **Colors:** Sage green, Terracotta, Charcoal
- **Fonts:** Playfair Display (serif), sans-serif
- **Style:** Professional, warm, inviting

## 🚨 Troubleshooting

### Common Issues
1. **Google Sheets not receiving data**
   - Check Web App URL in .env.local
   - Verify Google Apps Script deployment
   - Check script permissions

2. **Emails not sending**
   - Verify Resend API key
   - Check email configuration
   - Monitor email logs

3. **Form submissions failing**
   - Check API endpoints
   - Verify database permissions
   - Check browser console for errors

## 📈 Performance
- ✅ Optimized images
- ✅ Lazy loading
- ✅ Code splitting
- ✅ SEO friendly

## 🔐 Security
- ✅ Input validation
- ✅ XSS protection
- ✅ CSRF protection
- ✅ Rate limiting (recommended)

---

**Last Updated:** July 2026  
**Status:** Production Ready ✅  
**Next Review:** Monthly
