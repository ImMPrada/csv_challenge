import { useState, useCallback } from 'react'

interface UseFileUploadProps {
  onUploadComplete?: (response: Record<string, unknown>) => void
  onUploadError?: (error: Error) => void
  onProgress?: (progress: number) => void
}

interface UploadResponse {
  status: string
  csv_upload?: {
    id: number
    status: string
    created_at: string
  }
}

const CHUNK_SIZE = 1024 * 1024 // 1MB chunks
const ENDPOINT = 'http://localhost:3000/api/v1/chunks'

export function useFileUpload({ onUploadComplete, onUploadError, onProgress }: UseFileUploadProps = {}) {
  const [isUploading, setIsUploading] = useState(false)

  const uploadFile = useCallback(async (file: File) => {
    try {
      setIsUploading(true)
      const totalChunks = Math.ceil(file.size / CHUNK_SIZE)
      const identifier = `${file.name}-${Date.now()}`
      
      console.log(`Starting upload of ${file.name} in ${totalChunks} chunks`)

      for (let chunkNumber = 1; chunkNumber <= totalChunks; chunkNumber++) {
        const start = (chunkNumber - 1) * CHUNK_SIZE
        const end = Math.min(chunkNumber * CHUNK_SIZE, file.size)
        const chunk = file.slice(start, end)

        const formData = new FormData()
        formData.append('chunk[chunk_data]', chunk)
        formData.append('chunk[chunk_number]', chunkNumber.toString())
        formData.append('chunk[total_chunks]', totalChunks.toString())
        formData.append('chunk[identifier]', identifier)

        console.log(`Uploading chunk ${chunkNumber}/${totalChunks}`)

        const response = await fetch(ENDPOINT, {
          method: 'POST',
          body: formData,
          headers: {
            'X-CSRF-Token': document.querySelector<HTMLMetaElement>('[name="csrf-token"]')?.getAttribute('content') || ''
          }
        })

        if (!response.ok) {
          throw new Error(`Failed to upload chunk ${chunkNumber}/${totalChunks}`)
        }

        const result = await response.json() as UploadResponse
        console.log(`Chunk ${chunkNumber}/${totalChunks} uploaded:`, result)

        if (onProgress) {
          onProgress((chunkNumber / totalChunks) * 100)
        }
      }

      console.log('Upload completed successfully')
      if (onUploadComplete) {
        onUploadComplete({ status: 'complete' })
      }
    } catch (error) {
      console.error('Upload failed:', error)
      if (onUploadError && error instanceof Error) {
        onUploadError(error)
      }
    } finally {
      setIsUploading(false)
    }
  }, [onUploadComplete, onUploadError, onProgress])

  return {
    uploadFile,
    isUploading
  }
} 