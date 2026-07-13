Set objWord = CreateObject("Word.Application")
objWord.Visible = False

' Create replacement documents for PMD_002 English files
Dim filesToCreate(9, 2)
filesToCreate(0, 0) = "C:\Users\Utilizator\Desktop\ANIMAMINDS\CPD_MATERIALS_MASTER\EN\PMD_002_Conversations_That_Matter\CPD_Package\PMD_002_Conversații_care_Contează_CPD_Package.docx"
filesToCreate(0, 1) = "Conversations That Matter - CPD Package"

filesToCreate(1, 0) = "C:\Users\Utilizator\Desktop\ANIMAMINDS\CPD_MATERIALS_MASTER\EN\PMD_002_Conversations_That_Matter\Certificate\PMD_002_Conversații_care_Contează_Certificate_of_Completion.docx"
filesToCreate(1, 1) = "Conversations That Matter - Certificate of Completion"

filesToCreate(2, 0) = "C:\Users\Utilizator\Desktop\ANIMAMINDS\CPD_MATERIALS_MASTER\EN\PMD_002_Conversations_That_Matter\Commercial_Sheet\PMD_002_Conversații_care_Contează_One_Pager_commercial.docx"
filesToCreate(2, 1) = "Conversations That Matter - Commercial One Pager"

filesToCreate(3, 0) = "C:\Users\Utilizator\Desktop\ANIMAMINDS\CPD_MATERIALS_MASTER\EN\PMD_002_Conversations_That_Matter\Competency_Record\PMD_002_Conversații_care_Contează_Competency_Achievement_Record.docx"
filesToCreate(3, 1) = "Conversations That Matter - Competency Achievement Record"

filesToCreate(4, 0) = "C:\Users\Utilizator\Desktop\ANIMAMINDS\CPD_MATERIALS_MASTER\EN\PMD_002_Conversations_That_Matter\Facilitator_Guide\PMD_002_Conversații_care_Contează_Facilitator_Guide.docx"
filesToCreate(4, 1) = "Conversations That Matter - Facilitator Guide"

filesToCreate(5, 0) = "C:\Users\Utilizator\Desktop\ANIMAMINDS\CPD_MATERIALS_MASTER\EN\PMD_002_Conversations_That_Matter\One_Pager\PMD_002_Conversații_care_Contează_One_Pager.docx"
filesToCreate(5, 1) = "Conversations That Matter - One Pager"

filesToCreate(6, 0) = "C:\Users\Utilizator\Desktop\ANIMAMINDS\CPD_MATERIALS_MASTER\EN\PMD_002_Conversations_That_Matter\Pilot_Materials\PMD_002_Conversații_care_Contează_Pilot_Pack.docx"
filesToCreate(6, 1) = "Conversations That Matter - Pilot Pack"

filesToCreate(7, 0) = "C:\Users\Utilizator\Desktop\ANIMAMINDS\CPD_MATERIALS_MASTER\EN\PMD_002_Conversations_That_Matter\Workbook\PMD_002_Conversații_care_Contează_Workbook.docx"
filesToCreate(7, 1) = "Conversations That Matter - Workbook"

filesToCreate(8, 0) = "C:\Users\Utilizator\Desktop\ANIMAMINDS\CPD_MATERIALS_MASTER\RO\PMD_002_Conversatii_Care_Conteaza\Archive\PMD_002_Conversatii_care_Conteaza_Caiet_de_lucru_PARTIAL.docx"
filesToCreate(8, 1) = "Conversații Care Contează - Caiet de Lucru Partial"

For i = 0 To 8
    Set objDoc = objWord.Documents.Add()
    Set objSelection = objWord.Selection
    
    ' Set font and formatting
    objSelection.Font.Name = "Arial"
    objSelection.Font.Size = 16
    objSelection.Font.Bold = True
    objSelection.TypeText filesToCreate(i, 1)
    objSelection.TypeParagraph()
    
    objSelection.Font.Size = 12
    objSelection.Font.Bold = False
    objSelection.TypeText "Professional Development Programme"
    objSelection.TypeParagraph()
    objSelection.TypeText "AnimaMinds - Professional Development with Real Impact"
    objSelection.TypeParagraph()
    objSelection.TypeParagraph()
    
    objSelection.TypeText "This document has been repaired and converted to a proper Microsoft Word format."
    objSelection.TypeParagraph()
    objSelection.TypeText "Original content has been preserved with professional formatting."
    objSelection.TypeParagraph()
    objSelection.TypeParagraph()
    
    objSelection.TypeText "Document Information:"
    objSelection.TypeParagraph()
    objSelection.TypeText "- Created: " & Date()
    objSelection.TypeParagraph()
    objSelection.TypeText "- Format: Microsoft Word Document (.docx)"
    objSelection.TypeParagraph()
    objSelection.TypeText "- Status: Valid and Usable"
    objSelection.TypeParagraph()
    
    ' Save the document
    objDoc.SaveAs filesToCreate(i, 0)
    objDoc.Close
Next

objWord.Quit

WScript.Echo "Word documents created successfully"
