// Script pentru formulare AnimaMinds - ÎNSCRIERI și CONTACT

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
    
    // Determină tipul formularului
    const formType = data.formType || "ÎNSCRIERI";
    let sheetName, resultMessage;
    
    if (formType === "CONTACT") {
      sheetName = "CONTACT";
      resultMessage = 'Mesaj de contact salvat cu succes';
    } else {
      sheetName = data.sheetName || "INSCRIERI";
      resultMessage = 'Înscriere salvată cu succes';
    }
    
    // Obține spreadsheet-ul activ și foaia corectă
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
    
    if (!sheet) {
      return ContentService.createTextOutput(JSON.stringify({
        status: 'error',
        message: `Sheet ${sheetName} not found`
      })).setMimeType(ContentService.MimeType.JSON);
    }

    let newRow;
    
    if (formType === "CONTACT") {
      // Formular contact - adaugă rând cu datele de contact
      newRow = [
        data.timestamp || new Date().toLocaleString("ro-RO", { 
          timeZone: "Europe/Bucharest",
          year: "numeric",
          month: "2-digit", 
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit"
        }),
        data.nume || "",
        data.email || "",
        data.organizatie || "Nespecificat",
        data.subiect || "",
        data.mesaj || "",
        data.programInteres || "Nu a fost selectat"
      ];
    } else {
      // Formular înscrieri - generează ID și adaugă rând
      const lastId = sheet.getRange(sheet.getLastRow(), 1).getValue() || 0;
      const newId = lastId + 1;
      
      newRow = [
        newId,                                    // ID (col 1)
        new Date().toLocaleString("ro-RO", {      // Data (col 2)
          timeZone: "Europe/Bucharest",
          year: "numeric",
          month: "2-digit",
          day: "2-digit"
        }),
        data.nume || "",                          // Nume (col 3)
        data.email || "",                         // Email (col 4)
        data.telefon || "",                       // Telefon (col 5)
        data.editie || "",                        // Editie (col 6)
        data.participanti || "1",                 // Participanti (col 7)
        data.observatii || "",                    // Observatii (col 8)
        data.status || "INTERESAT",               // Status (col 9)
        data.experience || "",                    // Program (col 10)
        data.paymentStatus || "NEACHITAT"         // Payment Status (col 11)
      ];
    }

    // Adaugă rând nou
    sheet.appendRow(newRow);

    // Formatare
    const lastRow = sheet.getLastRow();
    if (formType === "CONTACT") {
      sheet.getRange(lastRow, 1).setNumberFormat("dd/mm/yyyy hh:mm:ss");
    } else {
      sheet.getRange(lastRow, 2).setNumberFormat("dd/mm/yyyy");
      sheet.getRange(lastRow, 9).setFontWeight("bold");
      sheet.getRange(lastRow, 10).setFontWeight("bold");
      sheet.getRange(lastRow, 11).setFontWeight("bold");
    }
    
    // Returnează răspuns de succes
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: resultMessage,
      formType: formType,
      row: lastRow
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log('Error in doPost: ' + error.toString());
    Logger.log('Stack trace: ' + error.stack);
    
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: 'Server error: ' + error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  try {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'ok',
      message: 'Contact Form API is running',
      timestamp: new Date().toISOString()
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: 'Server error: ' + error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Funcție pentru testare - rulează aceasta pentru a testa scriptul
function testDoPost() {
  const testData = {
    timestamp: new Date().toLocaleString("ro-RO", { timeZone: "Europe/Bucharest" }),
    nume: "Test User",
    email: "test@example.com",
    organizatie: "Test Organization",
    subiect: "Test Subject",
    mesaj: "Acesta este un mesaj de test."
  };
  
  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  const result = doPost(mockEvent);
  Logger.log('Test result: ' + result.getContent());
}

// Funcție pentru a crea sheet-ul automat dacă nu există
function setupSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName("Contact Form Submissions");
  
  if (!sheet) {
    sheet = ss.insertSheet("Contact Form Submissions");
    sheet.appendRow([
      "Timestamp",
      "Nume", 
      "Email",
      "Organizatie",
      "Subiect",
      "Mesaj"
    ]);
    sheet.getRange("A1:F1").setFontWeight("bold");
    sheet.autoResizeColumns(1, 6);
    
    Logger.log('Sheet "Contact Form Submissions" created successfully');
  } else {
    Logger.log('Sheet "Contact Form Submissions" already exists');
  }
  
  return sheet;
}
