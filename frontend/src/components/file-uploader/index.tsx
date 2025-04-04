import { useState } from 'react'
import { useFileUpload } from '../../hooks/use-file-upload/useFileUpload'
import ProgressBar from '../progress-bar'
import FileInput from './file-input'

export default function FileUploader() {
  const [error, setError] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState<number>(0)
  const { uploadFile, isUploading } = useFileUpload({
    onUploadComplete: () => {
      setError(null)
      setUploadProgress(100)
    },
    onUploadError: (error) => {
      setError(error.message)
      setUploadProgress(0)
    },
    onProgress: (progress) => {
      setUploadProgress(progress)
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
