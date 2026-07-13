Set objWord = CreateObject("Word.Application")
objWord.Visible = False

Set objDoc = objWord.Documents.Add()
Set objSelection = objWord.Selection

' Add title
objSelection.Style = "Title"
objSelection.TypeText "CONVERSAȚII CARE CONTEAZĂ"
objSelection.TypeParagraph()

objSelection.Style = "Subtitle"
objSelection.TypeText "Transformă dialogul în rezultate"
objSelection.TypeParagraph()

objSelection.Style = "Normal"
objSelection.TypeText "Program de dezvoltare profesională | PMD_002"
objSelection.TypeParagraph()
objSelection.TypeText "Investiție în abilități de comunicare cu impact imediat"
objSelection.TypeParagraph()
objSelection.TypeParagraph()

objSelection.Style = "Heading 1"
objSelection.TypeText "PROBLEMA"
objSelection.TypeParagraph()

objSelection.Style = "Normal"
objSelection.TypeText "Echipele și organizațiile pierd zilnic din cauza comunicării ineficiente:"
objSelection.TypeParagraph()

' Add bullet points
objSelection.TypeText "• 70% din erorile organizaționale sunt cauzate de comunicare slabă"
objSelection.TypeParagraph()
objSelection.TypeText "• 85% din angajați evită conversațiile dificile, afectând performanța"
objSelection.TypeParagraph()
objSelection.TypeText "• 60% din conflictele de la locul de muncă ar putea fi prevenite prin comunicare eficientă"
objSelection.TypeParagraph()
objSelection.TypeText "• Costurile medii anuale ale comunicării ineficiente: 62.4 milioane USD per companie"
objSelection.TypeParagraph()

objSelection.Style = "Heading 1"
objSelection.TypeText "SOLUȚIA"
objSelection.TypeParagraph()

objSelection.Style = "Normal"
objSelection.TypeText "Conversații care Contează este un program intensiv care transformă modul în care profesioniștii comunică, construind încredere, claritate și colaborare."
objSelection.TypeParagraph()

objSelection.Style = "Heading 2"
objSelection.TypeText "BENEFICII CHEIE"
objSelection.TypeParagraph()

objSelection.Style = "Normal"
objSelection.TypeText "Pentru participanți:"
objSelection.TypeParagraph()
objSelection.TypeText "• Mai multă încredere în conversațiile dificile"
objSelection.TypeParagraph()
objSelection.TypeText "• Abilitatea de a oferi feedback constructiv fără a crea defensivitate"
objSelection.TypeParagraph()
objSelection.TypeText "• Relații mai bune cu colegii, clienții și partenerii"
objSelection.TypeParagraph()

objSelection.Style = "Heading 1"
objSelection.TypeText "INVESTIȚIE"
objSelection.TypeParagraph()

objSelection.Style = "Normal"
objSelection.TypeText "Pachete disponibile:"
objSelection.TypeParagraph()
objSelection.TypeText "Online Live: 1.200 RON per participant"
objSelection.TypeParagraph()
objSelection.TypeText "La sediul organizației: 2.500 RON per participant"
objSelection.TypeParagraph()
objSelection.TypeText "Experience Edition: 3.500 RON per participant"
objSelection.TypeParagraph()

objSelection.Style = "Heading 1"
objSelection.TypeText "CONTACT"
objSelection.TypeParagraph()

objSelection.Style = "Normal"
objSelection.TypeText "Telefon: +40 722 123 456"
objSelection.TypeParagraph()
objSelection.TypeText "Email: conversatii@animaminds.ro"
objSelection.TypeParagraph()
objSelection.TypeText "Website: www.animaminds.ro"
objSelection.TypeParagraph()

' Save the document
savePath = "C:\Users\Utilizator\Desktop\ANIMAMINDS\CPD_MATERIALS_MASTER\RO\PMD_002_Conversatii_Care_Conteaza\Commercial_Sheet\PMD_002_Conversatii_care_Conteaza_Fisa_comerciala_REPAIRED.docx"
objDoc.SaveAs savePath
objDoc.Close
objWord.Quit

WScript.Echo "Word document created successfully"
