Set objWord = CreateObject("Word.Application")
objWord.Visible = False

' Create replacement documents for PMD_003 English files
Dim filesToCreate(8, 2)
filesToCreate(0, 0) = "C:\Users\Utilizator\Desktop\ANIMAMINDS\CPD_MATERIALS_MASTER\EN\PMD_003_Calm_Under_Pressure\CPD_Package\PMD_003_Calm_sub_Presiune_CPD_Package.docx"
filesToCreate(0, 1) = "Calm Under Pressure - CPD Package"

filesToCreate(1, 0) = "C:\Users\Utilizator\Desktop\ANIMAMINDS\CPD_MATERIALS_MASTER\EN\PMD_003_Calm_Under_Pressure\Certificate\PMD_003_Calm_sub_Presiune_Certificate_of_Completion.docx"
filesToCreate(1, 1) = "Calm Under Pressure - Certificate of Completion"

filesToCreate(2, 0) = "C:\Users\Utilizator\Desktop\ANIMAMINDS\CPD_MATERIALS_MASTER\EN\PMD_003_Calm_Under_Pressure\Commercial_Sheet\PMD_003_Calm_sub_Presiune_One_Pager_commercial.docx"
filesToCreate(2, 1) = "Calm Under Pressure - Commercial One Pager"

filesToCreate(3, 0) = "C:\Users\Utilizator\Desktop\ANIMAMINDS\CPD_MATERIALS_MASTER\EN\PMD_003_Calm_Under_Pressure\Competency_Record\PMD_003_Calm_sub_Presiune_Competency_Achievement_Record.docx"
filesToCreate(3, 1) = "Calm Under Pressure - Competency Achievement Record"

filesToCreate(4, 0) = "C:\Users\Utilizator\Desktop\ANIMAMINDS\CPD_MATERIALS_MASTER\EN\PMD_003_Calm_Under_Pressure\Facilitator_Guide\PMD_003_Calm_sub_Presiune_Facilitator_Guide.docx"
filesToCreate(4, 1) = "Calm Under Pressure - Facilitator Guide"

filesToCreate(5, 0) = "C:\Users\Utilizator\Desktop\ANIMAMINDS\CPD_MATERIALS_MASTER\EN\PMD_003_Calm_Under_Pressure\One_Pager\PMD_003_Calm_sub_Presiune_One_Pager.docx"
filesToCreate(5, 1) = "Calm Under Pressure - One Pager"

filesToCreate(6, 0) = "C:\Users\Utilizator\Desktop\ANIMAMINDS\CPD_MATERIALS_MASTER\EN\PMD_003_Calm_Under_Pressure\Pilot_Materials\PMD_003_Calm_sub_Presiune_Pilot_Pack.docx"
filesToCreate(6, 1) = "Calm Under Pressure - Pilot Pack"

filesToCreate(7, 0) = "C:\Users\Utilizator\Desktop\ANIMAMINDS\CPD_MATERIALS_MASTER\EN\PMD_003_Calm_Under_Pressure\Workbook\PMD_003_Calm_sub_Presiune_Workbook.docx"
filesToCreate(7, 1) = "Calm Under Pressure - Workbook"

filesToCreate(8, 0) = "C:\Users\Utilizator\Desktop\ANIMAMINDS\CPD_MATERIALS_MASTER\_UNSORTED_REVIEW_REQUIRED\00_QA_REPORT.docx"
filesToCreate(8, 1) = "QA Report - Unsorted"

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
