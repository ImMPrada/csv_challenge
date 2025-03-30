import { useState } from 'react'
import { useFileUpload } from '../../hooks/useFileUpload'

export default function FileUploader() {
  const [error, setError] = useState<string | null>(null)
  const { uploadFile, isUploading } = useFileUpload({
    onUploadComplete: (result) => {
      setError(null)
      console.log('Upload complete:', result)
    },
    onUploadError: (error) => {
      setError(error.message)
      console.error('Upload error:', error)
    },
    onProgress: (progress) => {
      console.log(`Upload progress: ${progress.toFixed(2)}%`)
    }
  })

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setError(null)
      uploadFile(file)
    }
  }

  return (
    <div className="w-full max-w-2xl p-4 border border-purple rounded-lg">
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}
      {isUploading && (
        <div className="mb-4 p-4 bg-blue-100 text-blue-700 rounded-lg">
          Subiendo archivo...
        </div>
      )}
      <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg">
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          disabled={isUploading}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-purple-50 file:text-purple-700
            hover:file:bg-purple-100"
        />
        <p className="mt-2 text-sm text-gray-600">
          Arrastra un archivo CSV aquí o haz clic para seleccionar
        </p>
      </div>
    </div>
  )
}
