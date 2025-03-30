import React, { useCallback } from 'react'
import { useFileUpload } from '../hooks/useFileUpload'

export function FileUploader() {
  const { uploadFile, isUploading } = useFileUpload({
    onUploadComplete: (result: Record<string, unknown>) => {
      console.log('Upload complete:', result)
    },
    onUploadError: (error: Error) => {
      console.error('Upload error:', error)
    },
    onProgress: (progress: number) => {
      console.log(`Upload progress: ${progress.toFixed(2)}%`)
    }
  })

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      uploadFile(file)
    }
  }, [uploadFile])

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">CSV File Uploader</h1>
      <div className="flex flex-col gap-4">
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          disabled={isUploading}
          className="border p-2 rounded"
        />
        {isUploading && (
          <div className="text-blue-600">
            Uploading... Please wait.
          </div>
        )}
      </div>
    </div>
  )
} 