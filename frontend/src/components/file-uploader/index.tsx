import { useState } from 'react'
import { useFileUpload } from '../../hooks/useFileUpload'
import ProgressBar from '../progress-bar'
import FileInput from './file-input'

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
      
      <FileInput
        disabled={isUploading}
        onChange={handleFileChange}
      />

      {isUploading && (
        <ProgressBar label="Subiendo archivo..." progress={uploadProgress} />
      )}
    </div>
  )
}
