# Configurare Google Sheet pentru Formularul de Contact

## Pași necesari pentru integrarea cu Google Sheets

### 1. Pregătește Google Sheet
**Opțiunea A: Folosește sheet-ul existent "Contact"**
1. Dacă ai deja un sheet numit "Contact", actualizează coloanele pentru a se potrivi:
   - A: `Timestamp` (sau `Data`)
   - B: `Nume`
   - C: `Email`
   - D: `Organizatie` (sau `Persoană fizică / Instituție`)
   - E: `Subiect`
   - F: `Mesaj`

**Opțiunea B: Creează sheet nou**
1. Mergi la [Google Sheets](https://sheets.google.com)
2. Creează un nou sheet cu numele "Contact Form Submissions"
3. Adaugă următoarele coloane în primul rând:
   - A: `Timestamp`
   - B: `Nume`
   - C: `Email`
   - D: `Organizatie`
   - E: `Subiect`
   - F: `Mesaj`

### 2. Actualizează Google Apps Script
1. În Google Sheet, mergi la `Extensii` > `Apps Script`
2. **Înlocuiește tot codul existent** din `Code.gs` cu codul actualizat
3. Poți folosi codul din fișierul `UPDATED_GOOGLE_APPS_SCRIPT.js` sau copia-l direct de mai jos
4. Salvează proiectul (Ctrl+S sau butonul Save)

### 3. Cod Google Apps Script

```javascript
function doPost(e) {
  try {
    // Verifică dacă avem date
    if (!e.postData || !e.postData.contents) {
      return ContentService.createTextOutput(JSON.stringify({
        status: 'error',
        message: 'No data received'
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // Parsează datele JSON
    const data = JSON.parse(e.postData.contents);
    
    // Obține spreadsheet-ul activ
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Contact Form Submissions");
    
    if (!sheet) {
      return ContentService.createTextOutput(JSON.stringify({
        status: 'error',
        message: 'Sheet not found'
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // Adaugă rând nou cu datele
    sheet.appendRow([
      data.timestamp || new Date().toLocaleString("ro-RO", { timeZone: "Europe/Bucharest" }),
      data.nume || "",
      data.email || "",
      data.organizatie || "",
      data.subiect || "",
      data.mesaj || ""
    ]);

    // Returnează răspuns de succes
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Data saved successfully'
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log('Error: ' + error.toString());
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: 'Server error: ' + error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Funcție pentru testare
function test doPost() {
  const testData = {
    timestamp: new Date().toLocaleString("ro-RO", { timeZone: "Europe/Bucharest" }),
    nume: "Test User",
    email: "test@example.com",
    organizatie: "Test Org",
    subiect: "Test Subject",
    mesaj: "Test message"
  };
  
  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  return doPost(mockEvent);
}
```

### 4. Implementează Web App-ul
1. În Apps Script, mergi la `Implementare` > `Implementări noi`
2. Selectează tipul: `Aplicație web`
3. Configurație:
   - Descriere: "Contact Form Web App"
   - Execuție: `Execută ca: Eu (email-ul tău)`
   - Acces: `Oricine are acces`
4. Apasă `Implementare`
5. Autorizează accesul (va necesita permisiuni pentru Google Sheets)
6. Copiază URL-ul web app-ului (arată astfel: `https://script.google.com/macros/s/SCRIPT_ID/exec`)

### 5. Actualizează codul React
În fișierul `app/contact/page.tsx`, înlocuiește:
```javascript
const scriptUrl = "https://script.google.com/macros/s/YOUR_SCRIPT_ID_HERE/exec";
```
cu URL-ul tău real de la pasul 4.

### 5.1. Migrează datele existente (opțional)
Dacă ai deja date în sheet-ul "Contact" și vrei să le păstrezi:
1. Copiază datele existente în sheet-ul nou "Contact Form Submissions"
2. Ajustează manual coloanele pentru a se potrivi cu noul format
3. Sau modifică scriptul să folosească sheet-ul "Contact" existent (schimbă numele în linia 21)

### 6. Testare
1. Completează formularul de contact pe site
2. Verifică dacă datele apar în Google Sheet
3. Verifică console logs pentru eventuale erori

## Securitate și Bune Practici

### Protecție SPAM
- Poți adăuga validare suplimentară în Apps Script
- Poți implementa rate limiting
- Poți adăuga reCAPTCHA în formular (opțional)

### Backup
- Google Sheet are automat backup
- Poți seta notificări email pentru noi trimiteri
- Poți exporta datele periodic

### Mentenanță
- Verifică periodic funcționarea
- Monitorizează numărul de trimiteri
- Curăță datele vechi dacă e necesar

## Troubleshooting

### Erori comune:
1. **CORS errors** - Asigură-te că folosești `mode: "no-cors"` în fetch
2. **Permission denied** - Verifică setările de acces în Apps Script
3. **Sheet not found** - Asigură-te că sheet-ul are exact numele "Contact Form Submissions"
4. **No data received** - Verifică că datele sunt trimise corect ca JSON

### Debugging:
1. Verifică console logs în browser
2. Verifică execution logs în Apps Script (`Execuții` > `Logs`)
3. Testează funcția `test doPost` direct în Apps Script

## Contact
Pentru suport tehnic, contactează dezvoltatorul sau verifică documentația Google Apps Script.
