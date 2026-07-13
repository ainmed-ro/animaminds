import { addOnlineLiveEdition } from '@/app/admin/actions/add-edition'

export default async function AddEditionPage() {
  const result = await addOnlineLiveEdition()
  
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">Adăugare Ediție Online Live</h1>
        
        {result.success ? (
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-800 font-medium">✅ {result.message}</p>
            </div>
            
            <div className="text-sm text-gray-600">
              <p><strong>Ediție:</strong> {result.edition?.editionTitle}</p>
              <p><strong>Status:</strong> {result.edition?.status}</p>
              <p><strong>Preț:</strong> {result.price?.amount} {result.price?.currency}</p>
              <p><strong>Data:</strong> 8, 15, 22 Septembrie 2026</p>
            </div>
            
            <a 
              href="/inscriere" 
              className="block w-full bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Testează pagina de înscriere
            </a>
          </div>
        ) : (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800 font-medium">❌ {result.error}</p>
          </div>
        )}
        
        <div className="mt-6">
          <a 
            href="/admin" 
            className="block w-full bg-gray-600 text-white text-center py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Înapoi la Admin
          </a>
        </div>
      </div>
    </div>
  )
}
