import { useState } from 'react'
import { useFileUpload } from '../../hooks/useFileUpload'
import ProgressBar from '../progress-bar'

export default function FileUploader() {
  const [error, setError] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState<number>(0)
  const { uploadFile, isUploading } = useFileUpload({
    onUploadComplete: (result) => {
      setError(null)
      setUploadProgress(100)
      console.log('Upload complete:', result)
    },
    onUploadError: (error) => {
      setError(error.message)
      setUploadProgress(0)
      console.error('Upload error:', error)
    },
    onProgress: (progress) => {
      setUploadProgress(progress)
      console.log(`Upload progress: ${progress.toFixed(2)}%`)
    }
  })

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setError(null)
      setUploadProgress(0)
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
            hover:file:bg-purple-100
            disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <p className="mt-2 text-sm text-gray-600">
          Arrastra un archivo CSV aquí o haz clic para seleccionar
        </p>
      </div>

      {isUploading && (
        <ProgressBar label="Subiendo archivo..." progress={uploadProgress} />
      )}
    </div>
  )
}
