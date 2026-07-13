# LEAD_ACQUISITION_EXECUTION_PLAN.md

**Document:** Lead Acquisition Execution Plan  
**Project:** AnimaMinds Website & Programme Management Platform  
**Date:** 2026-07-13  
**Status:** Operational and Growth Plan — Not Implemented  
**Scope:** Detailed execution plan for acquiring, managing, nurturing, and converting leads into programme participants.

---

## 1. Introduction

This document provides a complete operational playbook for AnimaMinds' lead acquisition system. It assumes the platform's core modules (website, Supabase database, CMS, authentication, programme management, edition management) are in place and defines how the commercial team will use processes, tools, and content to generate leads and fill programme editions.

No code is implemented from this document. It is a growth and operations specification.

---

## 2. Lead Acquisition Strategy

### 2.1 Target Segments

| Segment | Decision Makers | Contact Sources | Outreach Approach | Recommended Programmes |
|---------|-----------------|-----------------|-------------------|------------------------|
| **Schools** (primary / lower secondary) | School director, deputy director, school counsellor, teacher trainer | County school inspectorates, school websites, educational fairs, Facebook groups | Offer teacher well-being and classroom-management workshops; position as CPD-accredited | Conversații care Contează, Calm sub Presiune |
| **Kindergartens** | Kindergarten director, county kindergarten inspector | Early-education networks, nursery associations, social media | Focus on emotional safety, parent communication, and staff stress management | Calm sub Presiune, Conversații care Contează |
| **High Schools** | Director, career counsellor, head of department, student council mentor | County school inspectorates, high-school directories, university fairs | Pitch AI literacy for teachers and students; decision-making and future-skills programmes | AI Fără Haos, Busola Deciziilor |
| **Universities** | Dean, head of department, career centre director, faculty council | University websites, academic conferences, Erasmus offices | Offer employability and AI-fluency modules for students and staff | AI Fără Haos, Avantajul Uman |
| **CCDs** (County Teacher Training Centres) | CCD director, trainer coordinator, county inspector | Ministry of Education directories, trainer networks | Partner as accredited provider for county-wide teacher training | Conversații care Contează, Calm sub Presiune, AI Fără Haos |
| **City Halls** | Mayor, HR director, public administration trainer, legal adviser | Municipal portals, public procurement notices, local events | Offer public administration communication and decision-making programmes | Busola Deciziilor, Conversații care Contează |
| **County Councils** | County council president, department directors, HR | County council websites, public procurement platforms | Larger cohorts and multi-year training agreements | Busola Deciziilor, AI Fără Haos |
| **Hospitals** (public) | Medical director, HR manager, nursing director, department chief | Hospital websites, medical associations, conferences | Offer emotional resilience, difficult conversations, and leadership under pressure | Calm sub Presiune, Conversații care Contează |
| **Clinics** (private) | Clinic manager, medical director, practice owner | Medical chambers, private clinic directories, specialist groups | Smaller, premium onsite editions; leadership and communication | Conversații care Contează, Busola Deciziilor |
| **NGOs** | Executive director, programme manager, board member | NGO networks, foundation directories, civil society events | Fundraising, volunteer management, and advocacy communication skills | Conversații care Contează, Avantajul Uman |
| **Companies** | HR director, L&D manager, team leader, CEO/owner | LinkedIn, business chambers, industry associations, B2B databases | Team communication, decision-making, AI fluency, resilience under pressure | AI Fără Haos, Busola Deciziilor, Calm sub Presiune |

### 2.2 Segment Priorities for Launch

**Tier 1 (highest conversion potential, fastest sales cycle):**
- Companies (B2B L&D budgets)
- CCDs (accredited provider pathway)
- High schools (future-skills demand)

**Tier 2 (medium cycle, high volume):**
- Schools
- Kindergartens
- NGOs
- Universities

**Tier 3 (longer public procurement cycle):**
- City Halls
- County Councils
- Hospitals (public)

---

## 3. Lead Database Structure

### 3.1 Core Fields

| Field | Type | Purpose |
|-------|------|---------|
| `id` | Unique ID | System identifier |
| `organisation` | Text | Organization name |
| `contactPerson` | Text | Primary contact full name |
| `position` | Text | Job title / role |
| `email` | Email | Primary contact email |
| `phone` | Phone | Primary contact phone |
| `county` | Text | County / region |
| `city` | Text | City |
| `segment` | Select | Organization type |
| `interestArea` | Multi-select | General topics of interest |
| `programmeInterest` | Select | Specific AnimaMinds programme |
| `source` | Select | How the lead was acquired |
| `lastContactDate` | Date | Last meaningful interaction |
| `status` | Select | Lifecycle stage |
| `notes` | Long text | Interaction history and context |
| `assignedTo` | Select | Owner / salesperson |
| `gdprConsent` | Boolean | Consent for communication |
| `createdAt` | Date | Record creation date |
| `updatedAt` | Date | Last update date |

### 3.2 Status Values

| Status | Definition |
|--------|------------|
| `NEW` | Added to database, no contact yet |
| `CONTACTED` | First outreach sent |
| `INTERESTED` | Replied positively or attended an event |
| `QUALIFIED` | Budget, need, and timeline confirmed |
| `PROPOSAL` | Offer sent, awaiting decision |
| `REGISTERED` | Registration submitted for an edition |
| `PARTICIPANT` | Attended the programme |
| `ALUMNI` | Past participant, eligible for re-engagement |
| `DORMANT` | No response after multiple attempts |
| `UNSUBSCRIBED` | Opted out |
| `DO_NOT_CONTACT` | Explicit request to stop contact |

### 3.3 Interest Areas

- Inteligență Artificială în educație / muncă
- Comunicare și feedback
- Gestionarea conflictelor
- Decizie și claritate strategică
- Reziliență emoțională și well-being
- Leadership și schimbare
- Competențe viitor

---

## 4. Google Sheets Operational Model

### 4.1 Principle

**Supabase remains the system of record.** Google Sheets remains the operational workspace for the commercial team, fed by Supabase and used for daily actions.

### 4.2 Sheet Tabs

| Tab | Columns | Purpose |
|-----|---------|---------|
| **Dashboard** | Summary KPIs, today's tasks, upcoming deadlines | Quick daily overview |
| **Leads** | Organisation, Contact Person, Position, Email, Phone, County, City, Segment, Interest Area, Programme Interest, Source, Last Contact Date, Status, Notes, Assigned To | Main prospecting list |
| **Contacts** | Person-level records linked to organizations | Multiple contacts per organization |
| **Registrations** | Synced from CMS: edition, programme, contact, participants, status, payment | Track enrolments |
| **Participants** | Attended participants with edition and programme | Delivery and certificate tracking |
| **Past Participants** | Alumni for re-engagement | Loyalty and upsell |
| **Organizations** | Organisation accounts with segment, county, city, size | Account-based view |
| **Follow-ups** | Due date, owner, lead/contact, action, status, outcome | Task management before CRM workflow automation |
| **Campaigns** | Campaign name, type, segment, date, opens, clicks, registrations | Marketing activity log |
| **Content Library** | Email templates, one-pagers, case studies, webinar titles | Quick access for outreach |

### 4.3 Column Structure for Leads Tab

```
A: ID
B: Organisation
C: Contact Person
D: Position
E: Email
F: Phone
G: County
H: City
I: Segment
J: Interest Area
K: Programme Interest
L: Source
M: Last Contact Date
N: Status
O: Notes
P: Assigned To
Q: GDPR Consent
R: Created At
S: Updated At
```

### 4.4 Daily Workflow

**Morning (15 minutes):**
1. Open Dashboard tab.
2. Review new leads and registrations from the last 24 hours.
3. Check follow-ups due today.

**Mid-day (outreach block):**
1. Filter Leads tab by `Assigned To = me` and `Status = NEW | CONTACTED | INTERESTED`.
2. Make calls or send personalized emails.
3. Update Status, Last Contact Date, and Notes.

**End of day (10 minutes):**
1. Mark completed follow-ups.
2. Add new follow-up tasks for the next contact date.
3. Sync any manual changes back to Supabase (or wait for scheduled sync).

### 4.5 Supabase ↔ Sheets Sync Model

| Direction | Trigger | Action |
|-----------|---------|--------|
| Supabase → Sheets | New lead/contact/registration | Append or update row in relevant tab |
| Supabase → Sheets | Status change in CMS | Update corresponding row in Leads/Registrations tab |
| Sheets → Supabase | Manual enrichment in Sheets | Scheduled import (e.g., hourly or twice daily) |
| Sheets → Supabase | New row added directly to Sheets | Import during next scheduled sync with duplicate check |

### 4.6 Duplicate Prevention

- Primary key: `email` for contacts, `organisation + city` for organizations.
- Sync script checks for existing email before inserting.
- Conflicts are logged in a `Sync Conflicts` tab for manual review.

---

## 5. CRM Architecture

### 5.1 Entities

| Entity | Definition | Source |
|--------|------------|--------|
| **Lead** | Organization or contact not yet registered | Website forms, manual entry, events |
| **Contact** | Any person in the database | Lead conversion, direct registration |
| **Organization Account** | Organization profile with all related contacts and history | Derived from leads and contacts |
| **Registration** | Enrolment in a specific edition | CMS registration flow |
| **Participant** | Person who attended an edition | Marked after edition delivery |
| **Past Participant / Alumni** | Participant from a previous edition | Used for re-engagement |

### 5.2 Lifecycle

```
Website Visitor
   ↓
Lead (organisation + contact)
   ↓
CONTACTED → First outreach
   ↓
INTERESTED → Reply, call, event attendance
   ↓
QUALIFIED → Need, budget, timeline confirmed
   ↓
PROPOSAL → Programme offer / edition suggestion
   ↓
REGISTERED → Enrolled in edition
   ↓
PARTICIPANT → Attended
   ↓
ALUMNI → Past participant for re-engagement / referral
```

### 5.3 Lifecycle Rules

- A lead becomes `CONTACTED` when any outreach is sent.
- A lead becomes `INTERESTED` on positive reply or event attendance.
- `REGISTERED` is automatic when a registration record is created in the CMS.
- `PARTICIPANT` is set after the edition status is closed and attendance is confirmed.
- `ALUMNI` is applied 7 days after the edition ends.
- `DORMANT` is applied if no response after 4 follow-ups over 60 days.

---

## 6. Outreach Workflows

### 6.1 First Contact Email

**Goal:** Introduce AnimaMinds and the relevant programme.

**Structure:**
1. Personalized greeting.
2. One-sentence relevance hook (segment-specific pain point).
3. Brief AnimaMinds positioning line.
4. Programme match with one key benefit.
5. Soft CTA: reply, book a call, or download info.
6. Signature with contact details.

**Example for CCDs:**
> Subiect: Program CPD acreditat pentru formatorii din județul [County]
>
> Bună ziua, [Contact Person],
>
> Profesorii din [County] caută soluții practice pentru gestionarea stresului și conversațiile dificile în școală.
>
> AnimaMinds livrează programe CPD interactive, adaptate contextului din educație: Calm sub Presiune și Conversații care Contează.
>
> Aș dori să vă prezint cum am putea organiza o ediție deschisă pentru cadrele didactice din județ.
>
> Puteți să-mi răspundeți cu două date posibile pentru o discuție de 15 minute?
>
> Cu stimă, [Name]

### 6.2 Follow-up Sequence

| Step | Timing | Channel | Message Focus |
|------|--------|---------|---------------|
| 1 | Day 0 | Email | Thank you + programme info |
| 2 | Day 3 | Email | Case study / testimonial |
| 3 | Day 7 | Email | Webinar / open cohort invitation |
| 4 | Day 10 | Phone | Direct call attempt |
| 5 | Day 14 | Email | Address objections, offer call |
| 6 | Day 30 | Email | Re-engagement with new edition |
| 7 | Day 60 | Email | Long-term nurture, seasonal angle |

### 6.3 Webinar Invitation Sequence

| Step | Timing | Message |
|------|--------|---------|
| 1 | 2 weeks before | Save the date + topic teaser |
| 2 | 1 week before | Registration link + speaker intro |
| 3 | 2 days before | Reminder + what to expect |
| 4 | 1 hour before | Join link + final reminder |
| 5 | 1 day after | Thank you + recording + programme offer |
| 6 | 3 days after | Personal follow-up for attendees and no-shows |

### 6.4 Programme Promotion Sequence

Used when a new edition is published.

| Step | Timing | Message |
|------|--------|---------|
| 1 | Edition published | Announcement with dates, format, and CTA |
| 2 | 2 weeks before start | Early-bird or group discount reminder |
| 3 | 1 week before deadline | Registration deadline approaching |
| 4 | 2 days before deadline | Final call |
| 5 | After deadline | Waitlist or next edition interest |

### 6.5 Re-engagement Sequence

For dormant leads and alumni.

| Step | Timing | Message |
|------|--------|---------|
| 1 | 60 days after last contact | "We miss you" + new programme highlight |
| 2 | 90 days | Educational content / blog / case study |
| 3 | 120 days | Exclusive alumni / early-bird offer |
| 4 | 180 days | Last call before removing from active list |

### 6.6 Programme-Specific Angles

**AI Fără Haos:**
- Audience: High schools, universities, companies, county councils.
- Hook: "Stăpânește AI-ul fără să pierzi controlul."
- Use cases: productivitate, evaluare, creativitate, etică.

**Conversații care Contează:**
- Audience: Schools, kindergartens, hospitals, NGOs, companies.
- Hook: "Feedback, ascultare și conversații dificile care funcționează."
- Use cases: leadership, HR, teaching, healthcare teams.

**Calm sub Presiune:**
- Audience: Hospitals, schools, companies, public administration.
- Hook: "Gestionează situațiile tensionate fără să te lași copleșit."
- Use cases: well-being, conflict management, resilience.

---

## 7. Marketing Automation

### 7.1 Automation Rules

| Trigger | Action | Timing |
|---------|--------|--------|
| **New contact** | Add to welcome sequence; assign to salesperson; alert via email/Slack | Immediate |
| **New registration** | Send confirmation email; add to edition reminder sequence; notify team | Immediate |
| **Downloaded resource** | Add to nurture sequence; tag by resource topic | Immediate |
| **Webinar attendee** | Send thank-you + recording; add to programme promotion sequence | 1 hour after event |
| **Webinar no-show** | Send recording + next edition invitation | 1 day after event |
| **Past participant** | Move to alumni list; send feedback survey; add re-engagement sequence | 7 days after edition ends |
| **Registration deadline approaching** | Send reminder to interested leads | 3 days and 1 day before deadline |
| **Edition reached 80% capacity** | Send urgency email + alert sales team | When threshold crossed |

### 7.2 Scoring Model

Assign points to leads based on behavior:

| Action | Points |
|--------|--------|
| Visits pricing page | +10 |
| Opens email | +2 |
| Clicks email link | +5 |
| Downloads resource | +10 |
| Registers for webinar | +15 |
| Attends webinar | +25 |
| Requests offer | +30 |
| Registers for programme | +50 |
| No email open in 90 days | -10 |

Leads with score ≥ 60 are flagged as hot and prioritized for personal outreach.

---

## 8. Notifications

### 8.1 Notification Types

| Event | Recipients | Channels | Content |
|-------|------------|----------|---------|
| **New lead** | Assigned salesperson + commercial manager | Email + Dashboard | Contact details, source, segment, programme interest |
| **New registration** | Commercial team + programme owner | Email + Dashboard + Sheets | Registrant, edition, programme, payment status |
| **New contact form** | Commercial team | Email + Dashboard | Name, email, message, page source |
| **Daily summary** | Commercial team | Email + Dashboard + Sheets | New leads, new registrations, due follow-ups, deadlines |
| **Weekly summary** | Leadership + commercial team | Email + Sheets | Pipeline, conversion rate, top sources, upcoming editions |

### 8.2 Daily Summary Template

- New leads: [count]
- New registrations: [count]
- Follow-ups due today: [count]
- Editions with deadline today/tomorrow: [list]
- Editions above 80% capacity: [list]
- Hot leads (score ≥ 60): [count]

### 8.3 Weekly Summary Template

- Leads added this week: [count]
- Registrations this week: [count]
- Conversion rate (lead → registered): [%]
- Top lead sources: [list]
- Top segments: [list]
- Upcoming editions (next 14 days): [list]
- Pipeline value (proposals sent): [RON]

---

## 9. Email Marketing Stack Evaluation

### 9.1 Options

| Tool | Strengths | Weaknesses | Best For |
|------|-----------|------------|----------|
| **Brevo** | Generous free tier, built-in CRM, SMS, automation, EU-based | Less advanced reporting than HubSpot | Budget-conscious teams, multi-channel (email + SMS) |
| **MailerLite** | Simple, affordable, good automation, landing pages | CRM features are basic | Small teams focused on newsletters and simple sequences |
| **ActiveCampaign** | Advanced automation, segmentation, scoring, CRM | Higher cost, steeper learning curve | Teams with structured sales process |
| **HubSpot** | Full CRM + marketing + reporting ecosystem | Expensive at scale, may be overkill early | Larger teams needing full funnel visibility |
| **Mailchimp** | Well-known, many integrations, good templates | Pricing escalates quickly, automation less flexible | Basic email marketing needs |

### 9.2 Primary Recommendation: Brevo

**Why Brevo fits AnimaMinds:**

1. **Cost-effective scaling** — Free tier covers initial contact volume; paid tiers scale affordably.
2. **Built-in CRM** — Manages leads, contacts, and deals without needing a separate CRM tool.
3. **Marketing automation** — Visual workflow builder for welcome sequences, follow-ups, and re-engagement.
4. **SMS capability** — Future-proof for SMS reminders and alerts without changing provider.
5. **EU data residency** — Important for GDPR and Romanian data protection expectations.
6. **Segmentation** — Easy tagging by segment, county, programme interest, and status.
7. **Integrations** — Zapier/Make connector to sync with Supabase and Google Sheets.

### 9.3 Implementation Path

1. **Phase A:** Set up Brevo, import first 100 contacts, create welcome and follow-up sequences.
2. **Phase B:** Add webinar invitation and programme promotion automations; connect CMS registration events.
3. **Phase C:** Add scoring, advanced segmentation, SMS reminders, and alumni re-engagement.

---

## 10. Calendar and Capacity Integration

### 10.1 Data Flow

```
Programme
  ↓
Edition (dates, format, capacity, deadline, price)
  ↓
Capacity (maxSeats, availableSeats)
  ↓
Registrations
  ↓
Available Seats Updated
```

### 10.2 Public Calendar Requirements

The public calendar must display:

| Field | Source |
|-------|--------|
| Programme name | `Programme.name` |
| Edition title | `Edition.editionTitle` |
| Delivery format | `Edition.deliveryFormat` |
| Start / end dates | `Edition.startDate`, `Edition.endDate` |
| Registration deadline | `Edition.registrationDeadline` |
| Available seats | `Edition.availableSeats` |
| Registration status | Derived from `Edition.status`, `availableSeats`, `registrationDeadline` |
| Price display | `Edition.displayPrice` + `Price.amount` |
| Location / online info | `Edition.city`, `Edition.locationName`, `Edition.platform` |

### 10.3 Registration Status Logic

| Condition | Public Status |
|-----------|---------------|
| `status = OPEN` and `availableSeats > 0` and deadline not passed | Open for registration |
| `availableSeats <= 0` or `status = FULL` | Sold out / full |
| `registrationDeadline < today` or `status = CLOSED` | Registration closed |
| `status = CANCELLED` | Cancelled |
| `status = DRAFT` | Hidden from public calendar |

### 10.4 Capacity Rules

- `availableSeats` is decremented when a registration is confirmed.
- If `availableSeats` reaches 0, edition status can be auto-updated to `FULL`.
- Waitlist can be enabled when edition is full.
- Last-minute released seats trigger notification to waitlisted contacts.

---

## 11. Phase-by-Phase Execution Plan

### 11.1 Phase A — First 100 Contacts

**Goal:** Build the foundation, validate messaging, and acquire the first 100 qualified contacts.

**Actions:**
- Set up Brevo account and import existing contacts.
- Create Leads, Contacts, Registrations, and Participants tabs in Google Sheets.
- Define lead statuses and segment tags.
- Build first-contact email templates for Tier 1 segments (companies, CCDs, high schools).
- Create 1 programme one-pager (PDF) for each core programme.
- Manually source 100 contacts from public directories, LinkedIn, and school inspectorate websites.
- Send personalized first-contact emails to 30 contacts per week.
- Set up daily and weekly notification emails.

**Tools:**
- Brevo (free tier)
- Google Sheets
- LinkedIn + manual research
- Canva/Google Docs (one-pagers)

**Effort:**
- 1 commercial person × 2 months
- ~10 hours/week on outreach

**Expected Outcomes:**
- 100 contacts in database
- 20–30% email open rate
- 5–10% reply rate
- 2–5 qualified proposals
- 1–3 first registrations

---

### 11.2 Phase B — First 500 Contacts

**Goal:** Scale outreach, automate nurture, and convert first cohorts.

**Actions:**
- Connect CMS registration form to Brevo via Zapier/Make.
- Sync new registrations to Google Sheets automatically.
- Build automation: welcome sequence, follow-up sequence, webinar invitation sequence.
- Host 2 webinars (one for AI Fără Haos, one for Conversații care Contează).
- Launch programme promotion sequences for upcoming editions.
- Add registration deadline and capacity alerts.
- Expand sourcing to Tier 2 segments (schools, kindergartens, NGOs, universities).
- Introduce a simple lead scoring model.

**Tools:**
- Brevo automation
- Zapier or Make.com
- Google Sheets (operational)
- Supabase (system of record)
- Webinar platform (Google Meet / Zoom)

**Effort:**
- 1 commercial person + 0.5 marketing support × 3 months
- ~15 hours/week on outreach and content

**Expected Outcomes:**
- 500 contacts in database
- 30–40% email open rate on segmented campaigns
- 50–100 webinar registrants
- 10–20 registrations across editions
- 2–5 converted B2B proposals
- 1 alumni group for re-engagement

---

### 11.3 Phase C — First 1,000 Contacts

**Goal:** Build predictable acquisition engine and optimize conversion.

**Actions:**
- Migrate from Google Sheets follow-ups to CRM-style workflow in Brevo/CMS.
- Add advanced segmentation (county, segment, programme interest, engagement score).
- Launch re-engagement sequences for alumni and dormant leads.
- A/B test email subject lines and CTAs.
- Add SMS reminders for deadlines and last-minute seats (Brevo SMS).
- Build public calendar with live capacity and registration status.
- Explore partner/referral programme with CCDs and NGOs.
- Add WhatsApp integration pilot for B2B follow-up.
- Weekly pipeline review and monthly optimisation.

**Tools:**
- Brevo paid tier + SMS
- CMS public calendar
- Zapier/Make advanced workflows
- Google Sheets for reporting snapshots
- WhatsApp Business API (pilot)

**Effort:**
- 2 commercial persons + 1 marketing person × 4–6 months
- ~20–25 hours/week on outreach, content, and optimisation

**Expected Outcomes:**
- 1,000 contacts in database
- 3–5% conversion rate from lead to registration
- 50–100 registrations per quarter
- 5–10 enterprise/corporate clients
- Predictable monthly webinar attendance (50+)
- 20%+ re-engagement rate from alumni campaigns

---

## 12. Key Performance Indicators

| KPI | Phase A Target | Phase B Target | Phase C Target |
|-----|----------------|----------------|----------------|
| Contacts in database | 100 | 500 | 1,000 |
| Email open rate | 20–30% | 30–40% | 35–45% |
| Reply/engagement rate | 5–10% | 8–12% | 10–15% |
| Webinar registrants | 0 | 50–100 | 150+ |
| Registrations | 1–3 | 10–20 | 50–100/quarter |
| Conversion lead → registration | 1–3% | 2–4% | 3–5% |
| B2B proposals | 2–5 | 10–20 | 30+ |
| Alumni re-engagement rate | — | 10% | 20%+ |

---

## 13. Risks and Mitigations

| Risk | Mitigation |
|------|------------|
| Low email deliverability | Use Brevo, warm up domain, clean lists, add SPF/DKIM |
| GDPR complaints | Clear consent, easy unsubscribe, suppression list |
| Google Sheets becomes out of sync | Scheduled sync, conflict log, clear ownership of system of record (Supabase) |
| Low reply rates | Segment better, personalize more, test subject lines |
| Long public procurement cycles for public institutions | Focus first on companies and CCDs, keep public sector in nurture pipeline |
| Capacity management errors | Automate seat decrement, add waitlist, alert programme managers |

---

## 14. Next Steps

1. Validate target segments and priorities with the AnimaMinds leadership team.
2. Create Brevo account and configure initial lists and segments.
3. Build the Google Sheets operational template with all tabs and columns.
4. Write first-contact email templates for each Tier 1 segment.
5. Source first 100 contacts manually.
6. Schedule weekly outreach sprints.
7. Plan first webinar for 4–6 weeks after email setup.
8. Define the Supabase → Google Sheets sync cadence and ownership.
