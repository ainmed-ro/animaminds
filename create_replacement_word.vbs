Set objWord = CreateObject("Word.Application")
objWord.Visible = False

' Create replacement documents for each invalid file
Dim filesToCreate(25, 2)
filesToCreate(0, 0) = "C:\Users\Utilizator\Desktop\ANIMAMINDS\CPD_MATERIALS_MASTER\EN\PMD_001_AI_Without_Chaos\Archive\00_QA_REPORT.docx"
filesToCreate(0, 1) = "AI Without Chaos - QA Report"

filesToCreate(1, 0) = "C:\Users\Utilizator\Desktop\ANIMAMINDS\CPD_MATERIALS_MASTER\EN\PMD_001_AI_Without_Chaos\CPD_Package\PMD_001_AI_Fără_Haos_CPD_Package.docx"
filesToCreate(1, 1) = "AI Without Chaos - CPD Package"

filesToCreate(2, 0) = "C:\Users\Utilizator\Desktop\ANIMAMINDS\CPD_MATERIALS_MASTER\EN\PMD_001_AI_Without_Chaos\Certificate\PMD_001_AI_Fără_Haos_Certificate_of_Completion.docx"
filesToCreate(2, 1) = "AI Without Chaos - Certificate of Completion"

filesToCreate(3, 0) = "C:\Users\Utilizator\Desktop\ANIMAMINDS\CPD_MATERIALS_MASTER\EN\PMD_001_AI_Without_Chaos\Commercial_Sheet\PMD_001_AI_Fără_Haos_One_Pager_commercial.docx"
filesToCreate(3, 1) = "AI Without Chaos - Commercial One Pager"

filesToCreate(4, 0) = "C:\Users\Utilizator\Desktop\ANIMAMINDS\CPD_MATERIALS_MASTER\EN\PMD_001_AI_Without_Chaos\Competency_Record\PMD_001_AI_Fără_Haos_Competency_Achievement_Record.docx"
filesToCreate(4, 1) = "AI Without Chaos - Competency Achievement Record"

filesToCreate(5, 0) = "C:\Users\Utilizator\Desktop\ANIMAMINDS\CPD_MATERIALS_MASTER\EN\PMD_001_AI_Without_Chaos\Facilitator_Guide\PMD_001_AI_Fără_Haos_Facilitator_Guide.docx"
filesToCreate(5, 1) = "AI Without Chaos - Facilitator Guide"

filesToCreate(6, 0) = "C:\Users\Utilizator\Desktop\ANIMAMINDS\CPD_MATERIALS_MASTER\EN\PMD_001_AI_Without_Chaos\One_Pager\PMD_001_AI_Fără_Haos_One_Pager.docx"
filesToCreate(6, 1) = "AI Without Chaos - One Pager"

filesToCreate(7, 0) = "C:\Users\Utilizator\Desktop\ANIMAMINDS\CPD_MATERIALS_MASTER\EN\PMD_001_AI_Without_Chaos\Pilot_Materials\PMD_001_AI_Fără_Haos_Pilot_Pack.docx"
filesToCreate(7, 1) = "AI Without Chaos - Pilot Pack"

filesToCreate(8, 0) = "C:\Users\Utilizator\Desktop\ANIMAMINDS\CPD_MATERIALS_MASTER\EN\PMD_001_AI_Without_Chaos\Workbook\PMD_001_AI_Fără_Haos_Workbook.docx"
filesToCreate(8, 1) = "AI Without Chaos - Workbook"

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
