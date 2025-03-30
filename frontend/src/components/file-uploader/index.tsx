import { useState } from 'react'
import { useFileUpload } from '../../hooks/useFileUpload'

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
        <div className="mt-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium text-purple-700">
              Subiendo archivo...
            </span>
            <span className="text-sm font-medium text-purple-700">
              {uploadProgress.toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-purple-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  )
}
