# UX Audit & Information Architecture — AnimaMinds

**Livrabile:** Audit de stare actuală, User Journeys pentru 4 profile cheie, noua arhitectură informațională propusă și recomandări prioritizate după impact/efort.

**Abordare:** Analiza păstrează sufletul AnimaMinds (comunitate, căldură, învățare aplicată) și evită transformarea site-ului în catalog rece sau landing page agresiv.

---

## 1. Executive Summary

Site-ul actual comunică corect valorile AnimaMinds, dar suferă de **fragmentare de conținut** și **lipsă de segmentare clară a publicului**. Aceleași programe apar pe trei rute diferite (`/programe`, `/experiences`, `/retreats`), iar persoanele fizice și organizațiile parcurg aceleași pagini fără mesaje adaptate. Rezultatul: vizitatorii pierd timp, nu știu pe unde să înscrie, iar managerii/HR-ii nu găsesc rapid dovada de impact organizațional.

**Oportunitatea principală:** restructurarea site-ului în jurul a **două căi de conversie** — *Individul* și *Organizația* — cu o pagină de programe unificată, o secțiune dedicată B2B și conversie clară pe pagina fiecărui program.

---

## 2. Arhitectura informațională actuală (As-Is)

```
Home /
├── Povestea noastră /povestea-noastra
├── Programe (nav → /experiences)          ← divergență: există și /programe
│   ├── /experiences
│   ├── /programe
│   └── /retreats
│       └── /retreats/busola-interioara
├── Colaborează cu noi /colaboreaza
├── Contact /contact
├── Legal: /politica-de-confidentialitate, /termeni-si-conditii, /cookies
└── Admin: /admin/registrations
```

### Constatări cheie

| # | Problemă | Unde se manifestă | Risc |
|---|----------|-------------------|------|
| 1 | **Rute duplicate** pentru aceleași programe | `/programe`, `/experiences`, `/retreats` | Confuzie SEO, confuzie utilizator, diluare mesaj |
| 2 | Link-ul de navigație "Programe" duce la `/experiences` | `Navbar.tsx` | Utilizatorii care caută `/programe` ajung pe alt conținut |
| 3 | **Nu există segmentare** Individ vs. Organizație | Home, Programe, Busola | B2B pierde încredere și viteză |
| 4 | CTAs generice și repetate | Peste tot | Lipsă de claritate în următorul pas |
| 5 | Pagina Busola este foarte lungă și amestecă publicuri | `busola-interioara/page.tsx` | Oboseală, abandon înainte de formular |
| 6 | Dovada socială (CPD) este subutilizată | TrustBanner doar în layout | Rate de conversie mai mici pe paginile de program |
| 7 | Nu există testimoniale/mărturii de la participanți | Absente | Lipsă de proof pentru decizia de cumpărare |
| 8 | Programele "În curând" nu oferă mecanism de așteptare | `/experiences`, `/programe` | Leads pierduți |
| 9 | **404** folosește adresare directă ("te-ai rătăcit") | `not-found.tsx` | Contrazice tonul neutru profesional dorit |
| 10 | Pagina Colaborează este bună, dar izolată | `/colaboreaza` | Nu este legată suficient de paginile de program |

---

## 3. Audit din perspectiva celor 4 personae

### 3.1 Participantul individual

**Scop:** să se înscrie la o experiență de dezvoltare personală/profesională.

**Parcurs tipic:**
Home → Hero CTA "Descoperă Busola Interioară" → `/retreats/busola-interioara` → scroll lung → "Sunt interesat(ă)" → modal.

**Puncte de confuzie:**
- Vede trei pagini diferite cu programe și nu știe care este cea oficială.
- Nu găsește rapid prețul, locația exactă, programul zilnic și ce trebuie să aducă.
- Statusul "Înscrieri deschise" este pozitiv, dar lipsește urgența (numărul de locuri rămase este vizibil doar pe carduri).
- CTAs secundare pe pagina Busola ("Află mai multe") îl trimit la aceeași pagină.

**Oportunități de conversie:**
- Sticky CTA "Rezervă locul" pe mobil/desktop.
- Secțiune clară "Cum funcționează" cu 3 pași: Alegi ediția → Completezi datele → Primești confirmarea.
- FAQ vizibil.

### 3.2 Directorul de școală

**Scop:** să achiziționeze formare pentru cadre didactice, cu minim de birocrație și maxim de încredere.

**Parcurs tipic:**
Home → caută "instituții educaționale" → `/colaboreaza` → citește despre proces → `/contact` → completează formular.

**Puncte de confuzie:**
- Nu găsește rapid un **PDF sau pagină de ofertă** pentru școli.
- Nu vede studii de caz / număr de profesori formați / feedback de la școli partenere.
- Nu știe dacă programul este acreditat CPD pentru profesori (CPD apare doar în banner general).
- CTA principal pe Colaborează este "Începe conversația" — prea vag.

**Oportunități de conversie:**
- Pagină/section "Pentru școli și instituții educaționale" cu badge CPD, curriculum adaptabil, proces de achiziție, date contact direct.
- Buton "Solicită ofertă pentru școală" pe paginile de program relevante.

### 3.3 Managerul HR

**Scop:** să rezolve o nevoie de echipă (wellbeing, comunicare, leadership, AI) și să justifice bugetul.

**Parcurs tipic:**
Home → scroll la "Organizații & Companii" în Audience → `/colaboreaza` → verifică tipuri de colaborare → `/contact`.

**Puncte de confuzie:**
- Nu vede o listă de programe **disponibile pentru organizații** (toate sunt prezentate ca ediții deschise).
- Lipsește informația de livrare on-site / online / hibrid (deși există pe Colaborează, este prea jos).
- Nu există o pagină de **ROI / impact măsurabil**.
- Formularul de contact nu pre-populează subiectul "Parteneriat organizație".

**Oportunități de conversie:**
- Hero split pe Home: „Pentru echipe și organizații” cu CTA direct.
- Pagină de programe cu filtru „Disponibil pentru organizații”.
- Conținut despre format (on-site, online, hibrid) și metrici de impact.

### 3.4 Managerul de spital

**Scop:** să livreze formare continuă pentru personal medical, eventual cu credite CPD, și să reducă stresul/echipajul.

**Parcurs tipic:**
Home → caută informații pentru spitale → găsește „Unități sanitare” doar în texte generale → ajunge la `/colaboreaza` sau `/contact`.

**Puncte de confuzie:**
- Nu există o secțiune sau pagină dedicată sănătății.
- Nu știe ce programe sunt potrivite pentru personal medical (Reziliență, Wellbeing, Comunicare, EMOȚII SUB CONTROL).
- Nu găsește rapid informația că programul poate fi livrat la sediu.
- CPD-ul este menționat, dar nu explicit pentru sectorul medical.

**Oportunități de conversie:**
- Landing page sau card „Pentru sănătate” în secțiunea de parteneriate.
- Mapare program → provocare din sănătate (ex. Reziliență pentru personal medical).

---

## 4. User Journeys propuse (To-Be)

### 4.1 Participantul individual

```
Home /
→ Hero: "Căut o experiență pentru mine"
   → CTA: "Vezi programele deschise"
      → /programe (unificat)
         → Filtru: Ediții deschise / În curând
         → Card Busola Interioară → "Află detalii și înscrie-te"
            → /programe/busola-interioara
               → Hero cu data, locație, preț, locuri rămase
               → Tabs: Despre / Program / Cazare / FAQ
               → Sticky CTA: "Rezervă locul" → formular one-page
               → FAQ + testimoniale
```

### 4.2 Director de școală / HR / Manager spital

```
Home /
→ Hero: "Programe pentru echipe și organizații"
   → CTA: "Solicită o ofertă"
      → /organizatii (ex /colaboreaza refăcut)
         → Hero B2B: „Formare adaptată pentru echipa ta"
         → Sectoare: Educație, Sănătate, Companii, Instituții publice, ONG-uri
         → Programe recomandate per sector
         → Proces de colaborare (4 pași)
         → Dovada socială: CPD, număr participanți, testimoniale
         → CTA: "Programează un call de descoperire" → formular scurt
```

### 4.3 Formator independent

```
Home / → /comunitate (sau /colaboreaza)
→ "Alătură-te rețelei de formatori"
→ CTA: "Aplică să colaborăm"
→ Formular specializat (nu formularul general de contact)
```

---

## 5. Noua arhitectură informațională propusă

```
Home /
├── Programe /programe                    [UNIFICAT: înlocuiește /experiences și /retreats ca listare]
│   ├── Ediții deschise (individuale)
│   ├── Programe pentru organizații
│   └── Experience Editions (retreats)
│       └── Busola Interioară /programe/busola-interioara
│
├── Organizații /organizatii              [refăcut din /colaboreaza]
│   ├── Educație /organizatii/educatie
│   ├── Sănătate /organizatii/sanatate
│   ├── Companii /organizatii/companii
│   ├── Instituții publice /organizatii/institutii
│   └── ONG-uri /organizatii/ong
│
├── Comunitate /comunitate
│   ├── Povestea noastră /povestea-noastra
│   ├── Echipa /povestea-noastra#echipa
│   ├── Valori /povestea-noastra#valori
│   └── Rezultate & testimoniale /rezultate
│
├── Contact /contact
└── Legal
```

### Modificări de top-level navigation

| Acum | Propus | Motiv |
|------|--------|-------|
| Acasă | Acasă | - |
| Povestea noastră | Comunitate | Grupăm povestea, echipa, valori, rezultate sub comunitate |
| Programe → /experiences | Programe → /programe | Corectează ruta și unifică listarea |
| Colaborează cu noi | Organizații | Nume mai clar pentru B2B |
| Contact | Contact | - |

### Ce se întâmplă cu rutele vechi

| Ruta veche | Acțiune propusă |
|------------|-----------------|
| `/experiences` | 301 redirect către `/programe` |
| `/retreats` | Devine sub-secțiune în `/programe` sau redenumit `/programe/experience-editions` |
| `/retreats/busola-interioara` | Redenumit `/programe/busola-interioara` (sau păstrat cu redirect) |
| `/colaboreaza` | Redenumit `/organizatii` sau `/pentru-organizatii` |

---

## 6. Recomandări prioritizate

### 6.1 Impact mare, efort mic (Quick wins)

1. **Corectează link-ul "Programe" din navigație** să ducă la `/programe` în loc de `/experiences`.
2. **Adaugă un CTA sticky** pe pagina Busola Interioară: „Rezervă locul” pe mobil și desktop.
3. **Adaugă butonul „Solicită ofertă pentru organizație”** în hero-ul paginii Busola și în CTA-ul final de pe `/programe`.
4. **Pre-populează subiectul în formularul de contact** când utilizatorul vine din secțiunea B2B (`?subiect=Parteneriat+organizatie`).
5. **Adaugă badge-ul CPD și pe paginile de program** (nu doar în bannerul global).
6. **Colectează și afișează 2-3 testimoniale** pe pagina Busola și pe home.
7. **Înlocuiește textul 404** cu ton neutru profesional (fără „te-ai rătăcit”).
8. **Adaugă „Ediții în așteptare” / waitlist** pentru programele „În curând”.

### 6.2 Impact mare, efort mediu

9. **Unifică `/programe`, `/experiences`, `/retreats`** într-o singură pagină cu filtre: Deschise / Pentru organizații / Experience Editions / În curând.
10. **Creează o pagină/section dedicată „Pentru organizații”** cu segmentare pe sectoare și programe recomandate.
11. **Restructurarea paginii Busola** în tab-uri: Despre, Program zilnic, Cazare & logistică, FAQ, Înscriere.
12. **Adaugă o pagină `/rezultate`** cu impact, numere, testimoniale, parteneri.
13. **Implementează open-graph și meta-uri specifice** pentru fiecare program (unele sunt deja, dar să fie consistente după unificare).

### 6.3 Impact mare, efort mare

14. **Construiește un funnel de conversie B2B:** landing page → formular de descoperire → calendly/call → propunere de ofertă → pagină de mulțumire.
15. **Adaugă un sistem de înscriere cu plată** (nu doar manifestare de interes) pentru edițiile deschise.
16. **Portal de parteneri / formatori** cu aplicație dedicată.
17. **Studii de caz detaliate** pe sectoare (școală, spital, companie).

### 6.4 Impact mic, efort mic

18. Adaugă breadcrumbs pe paginile de program.
19. Unifică label-urile de status („Disponibil acum”, „În curând”, „Ediții disponibile”).
20. Adaugă link în footer către `/rezultate` și `/organizatii`.

---

## 7. Propuneri de metrici și teste

- **CTR pe CTA-uri** — măsurăm care variantă de CTA pe Home convertește mai bine (Individ vs. Organizație).
- **Scroll depth** pe Busola — identificăm unde abandonează utilizatorii.
- **Form completion rate** — contact vs. înscriere Busola vs. B2B.
- **A/B test:** hero single vs. hero split (Individ / Organizație) pe Home.
- **Heatmap pe `/programe`** pentru a vedea ce filtre sunt folosite.

---

## 8. Concluzie

Site-ul AnimaMinds are o bază solidă de brand și conținut. Punctul critic este **claritatea structurală**: vizitatorul trebuie să știe imediat dacă site-ul îi oferă o experiență pentru el/ea personal sau o soluție pentru organizație. Odată rezolvată această segmentare, cu o pagină de programe unificată, un CTA persistent și o secțiune B2B credibilă, rata de conversie va crește semnificativ fără a pierde căldura și comunitatea care definesc brandul.

**Următorii pași recomandați:**
1. Validarea noii IA și a numelor de rute.
2. Implementarea quick wins (punctele 1–8).
3. Refacerea paginii `/programe` și unificarea cu `/experiences`/`/retreats`.
4. Crearea paginii/sectiunii „Pentru organizații”.
5. Adunarea de testimoniale și construirea paginii `/rezultate`.
