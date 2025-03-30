import { useState } from 'react'
import { Dashboard } from '@uppy/react'
import { useUppy } from '../../hooks/useUppy'

export default function FileUploader() {
  const [error, setError] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const uppy = useUppy({
    onUploadComplete: (result) => {
      setIsUploading(false)
      setError(null)
      console.log('Upload complete:', result)
    },
    onUploadError: (error) => {
      setIsUploading(false)
      setError(error.message)
      console.error('Upload error:', error)
    }
  })

  if (!uppy) return null

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
      <Dashboard
        uppy={uppy}
        width="100%"
        height="400px"
        showProgressDetails
        proudlyDisplayPoweredByUppy={false}
      />
    </div>
  )
}
