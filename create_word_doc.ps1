$word = New-Object -ComObject Word.Application
$word.Visible = $false
$doc = $word.Documents.Add()
$selection = $word.Selection

# Add title
$selection.Style = 'Title'
$selection.TypeText('CONVERSAȚII CARE CONTEAZĂ')
$selection.TypeParagraph()

$selection.Style = 'Subtitle'
$selection.TypeText('Transformă dialogul în rezultate')
$selection.TypeParagraph()

$selection.Style = 'Normal'
$selection.TypeText('Program de dezvoltare profesională | PMD_002')
$selection.TypeParagraph()
$selection.TypeText('Investiție în abilități de comunicare cu impact imediat')
$selection.TypeParagraph()
$selection.TypeParagraph()

$selection.Style = 'Heading 1'
$selection.TypeText('PROBLEMA')
$selection.TypeParagraph()

$selection.Style = 'Normal'
$selection.TypeText('Echipele și organizațiile pierd zilnic din cauza comunicării ineficiente:')
$selection.TypeParagraph()

# Add bullet points
$selection.TypeText('• 70% din erorile organizaționale sunt cauzate de comunicare slabă')
$selection.TypeParagraph()
$selection.TypeText('• 85% din angajați evită conversațiile dificile, afectând performanța')
$selection.TypeParagraph()
$selection.TypeText('• 60% din conflictele de la locul de muncă ar putea fi prevenite prin comunicare eficientă')
$selection.TypeParagraph()
$selection.TypeText('• Costurile medii anuale ale comunicării ineficiente: 62.4 milioane USD per companie')
$selection.TypeParagraph()

$selection.Style = 'Heading 1'
$selection.TypeText('SOLUȚIA')
$selection.TypeParagraph()

$selection.Style = 'Normal'
$selection.TypeText('Conversații care Contează este un program intensiv care transformă modul în care profesioniștii comunică, construind încredere, claritate și colaborare.')
$selection.TypeParagraph()

$selection.Style = 'Heading 2'
$selection.TypeText('BENEFICII CHEIE')
$selection.TypeParagraph()

$selection.Style = 'Normal'
$selection.TypeText('Pentru participanți:')
$selection.TypeParagraph()
$selection.TypeText('• Mai multă încredere în conversațiile dificile')
$selection.TypeParagraph()
$selection.TypeText('• Abilitatea de a oferi feedback constructiv fără a crea defensivitate')
$selection.TypeParagraph()
$selection.TypeText('• Relații mai bune cu colegii, clienții și partenerii')
$selection.TypeParagraph()

$selection.Style = 'Heading 1'
$selection.TypeText('INVESTIȚIE')
$selection.TypeParagraph()

$selection.Style = 'Normal'
$selection.TypeText('Pachete disponibile:')
$selection.TypeParagraph()
$selection.TypeText('Online Live: 1.200 RON per participant')
$selection.TypeParagraph()
$selection.TypeText('La sediul organizației: 2.500 RON per participant')
$selection.TypeParagraph()
$selection.TypeText('Experience Edition: 3.500 RON per participant')
$selection.TypeParagraph()

$selection.Style = 'Heading 1'
$selection.TypeText('CONTACT')
$selection.TypeParagraph()

$selection.Style = 'Normal'
$selection.TypeText('Telefon: +40 722 123 456')
$selection.TypeParagraph()
$selection.TypeText('Email: conversatii@animaminds.ro')
$selection.TypeParagraph()
$selection.TypeText('Website: www.animaminds.ro')
$selection.TypeParagraph()

# Save the document
$savePath = 'C:\Users\Utilizator\Desktop\ANIMAMINDS\CPD_MATERIALS_MASTER\RO\PMD_002_Conversatii_Care_Conteaza\Commercial_Sheet\PMD_002_Conversatii_care_Conteaza_Fisa_comerciala_REPAIRED.docx'
$doc.SaveAs([ref]$savePath)
$doc.Close()
$word.Quit()

Write-Host 'Word document created successfully'
