import { useState, useCallback } from 'react'

interface UseFileUploadProps {
  onUploadComplete?: (response: { status: string; csvUpload?: { id: number; status: string; created_at: string } }) => void
  onUploadError?: (error: Error) => void
  onProgress?: (progress: number) => void
}

interface UploadResponse {
  status: string
  csv_upload?: {
    id: number
    status: string
    created_at: string
  } | null
  error?: string
  errors?: Record<string, string[]>
}

class ChunkUploadError extends Error {
  public status: number
  public details?: string
  public errors?: Record<string, string[]>
  public chunkNumber: number
  public totalChunks: number
  public isLastChunk: boolean

  constructor(
    message: string, 
    status: number, 
    chunkNumber: number,
    totalChunks: number,
    details?: string, 
    errors?: Record<string, string[]>
  ) {
    super(message)
    this.name = 'ChunkUploadError'
    this.status = status
    this.details = details
    this.errors = errors
    this.chunkNumber = chunkNumber
    this.totalChunks = totalChunks
    this.isLastChunk = chunkNumber === totalChunks
  }
}

const CHUNK_SIZE = 1024 * 1024 // 1MB chunks
const ENDPOINT = 'http://localhost:3000/api/v1/chunks'

export function useFileUpload({ onUploadComplete, onUploadError, onProgress }: UseFileUploadProps = {}) {
  const [isUploading, setIsUploading] = useState(false)

  const handleUploadError = useCallback((error: ChunkUploadError) => {
    let errorMessage = `Error al subir el chunk ${error.chunkNumber}/${error.totalChunks}`

    if (error.isLastChunk) {
      errorMessage = `Error al finalizar la subida del archivo (chunk ${error.chunkNumber}/${error.totalChunks})`
    }

    switch (error.status) {
      case 422:
        if (error.errors) {
          const errorDetails = Object.entries(error.errors)
            .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
            .join('; ')
          errorMessage += `: ${errorDetails}`
        } else if (error.details) {
          errorMessage += `: ${error.details}`
        } else if (error.isLastChunk) {
          errorMessage += ': Error al procesar el archivo completo'
        }
        break
      case 413:
        errorMessage += ': El archivo es demasiado grande'
        break
      case 415:
        errorMessage += ': Tipo de archivo no soportado'
        break
      case 429:
        errorMessage += ': Demasiadas solicitudes, por favor espere un momento'
        break
      case 500:
        errorMessage += error.isLastChunk 
          ? ': Error al procesar el archivo completo' 
          : ': Error interno del servidor'
        break
      default:
        errorMessage += error.details ? `: ${error.details}` : ''
    }

    const finalError = new Error(errorMessage)
    console.error('Upload failed:', finalError)
    if (onUploadError) {
      onUploadError(finalError)
    }
  }, [onUploadError])

  const uploadFile = useCallback(async (file: File) => {
    const totalChunks = Math.ceil(file.size / CHUNK_SIZE)
    
    try {
      setIsUploading(true)
      const identifier = `${file.name}-${Date.now()}`
      
      console.log(`Starting upload of ${file.name} in ${totalChunks} chunks`)

      for (let chunkNumber = 1; chunkNumber <= totalChunks; chunkNumber++) {
        const start = (chunkNumber - 1) * CHUNK_SIZE
        const end = Math.min(chunkNumber * CHUNK_SIZE, file.size)
        const chunk = file.slice(start, end)
        const isLastChunk = chunkNumber === totalChunks

        const formData = new FormData()
        formData.append('chunk[chunk_data]', chunk)
        formData.append('chunk[chunk_number]', chunkNumber.toString())
        formData.append('chunk[total_chunks]', totalChunks.toString())
        formData.append('chunk[identifier]', identifier)
        formData.append('chunk[is_last_chunk]', isLastChunk.toString())

        console.log(`Uploading chunk ${chunkNumber}/${totalChunks}${isLastChunk ? ' (final chunk)' : ''}`)

        const response = await fetch(ENDPOINT, {
          method: 'POST',
          body: formData,
          credentials: 'include',
          headers: {
            'X-CSRF-Token': document.querySelector<HTMLMetaElement>('[name="csrf-token"]')?.getAttribute('content') || ''
          }
        })

        const responseData = await response.json() as UploadResponse

        if (!response.ok) {
          throw new ChunkUploadError(
            `Failed to upload chunk ${chunkNumber}/${totalChunks}`,
            response.status,
            chunkNumber,
            totalChunks,
            responseData.error,
            responseData.errors
          )
        }

        if (isLastChunk && !responseData.csv_upload) {
          throw new ChunkUploadError(
            'Failed to process complete file',
            422,
            chunkNumber,
            totalChunks,
            'Error al procesar el archivo completo'
          )
        }

        console.log(`Chunk ${chunkNumber}/${totalChunks} uploaded:`, responseData)

        if (onProgress) {
          onProgress((chunkNumber / totalChunks) * 100)
        }

        if (isLastChunk && responseData.csv_upload) {
          console.log('Upload completed successfully')
          if (onUploadComplete) {
            onUploadComplete({ 
              status: 'complete',
              csvUpload: responseData.csv_upload
            })
          }
        }
      }
    } catch (error) {
      if (error instanceof ChunkUploadError) {
        handleUploadError(error)
      } else {
        const genericError = new Error('Error inesperado durante la subida del archivo')
        console.error('Upload failed:', genericError)
        if (onUploadError) {
          onUploadError(genericError)
        }
      }
    } finally {
      setIsUploading(false)
    }
  }, [onUploadComplete, onUploadError, onProgress, handleUploadError])

  return {
    uploadFile,
    isUploading
  }
} 