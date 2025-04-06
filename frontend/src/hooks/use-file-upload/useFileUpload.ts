import { useState, useCallback, useMemo } from 'react'
import { UseFileUploadProps, UploadResponse } from './types'
import { ChunkUploadError } from './errors'
import { CHUNK_SIZE, ENDPOINT } from './constants'
import { useRequestErrorHandler } from '../use-request-error-handler'

const UPLOAD_ERROR_MESSAGES: Record<number, string> = {
  413: 'El archivo es demasiado grande',
  415: 'Tipo de archivo no soportado',
  422: 'Error al procesar el archivo'
}

export function useFileUpload({ onUploadComplete, onUploadError, onProgress }: UseFileUploadProps = {}) {
  const [isUploading, setIsUploading] = useState(false)
  const { handleError } = useRequestErrorHandler({
    onError: onUploadError,
    customMessages: UPLOAD_ERROR_MESSAGES,
    defaultMessage: 'Error inesperado durante la subida del archivo'
  })

  const createFormData = useCallback((chunk: Blob, chunkNumber: number, totalChunks: number, identifier: string) => {
    const formData = new FormData()
    formData.append('chunk[chunk_data]', chunk)
    formData.append('chunk[chunk_number]', chunkNumber.toString())
    formData.append('chunk[total_chunks]', totalChunks.toString())
    formData.append('chunk[identifier]', identifier)
    formData.append('chunk[is_last_chunk]', (chunkNumber === totalChunks).toString())
    return formData
  }, [])

  const uploadChunk = useCallback(async (
    chunk: Blob,
    chunkNumber: number,
    totalChunks: number,
    identifier: string
  ) => {
    const formData = createFormData(chunk, chunkNumber, totalChunks, identifier)
    const isLastChunk = chunkNumber === totalChunks

    const response = await fetch(ENDPOINT, {
      method: 'POST',
      body: formData,
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

    return { responseData, isLastChunk }
  }, [createFormData])

  const processChunk = useCallback(async (
    file: File,
    chunkNumber: number,
    totalChunks: number,
    identifier: string
  ) => {
    const start = (chunkNumber - 1) * CHUNK_SIZE
    const end = Math.min(chunkNumber * CHUNK_SIZE, file.size)
    const chunk = file.slice(start, end)

    const { responseData, isLastChunk } = await uploadChunk(chunk, chunkNumber, totalChunks, identifier)

    if (onProgress) {
      onProgress((chunkNumber / totalChunks) * 100)
    }

    if (isLastChunk && responseData.csv_upload) {
      if (onUploadComplete) {
        onUploadComplete({ 
          status: 'complete',
          csvUpload: responseData.csv_upload
        })
      }
    }
  }, [uploadChunk, onProgress, onUploadComplete])

  const uploadFile = useCallback(async (file: File) => {
    const totalChunks = Math.ceil(file.size / CHUNK_SIZE)
    const identifier = `${file.name}-${Date.now()}`
    
    try {
      setIsUploading(true)

      for (let chunkNumber = 1; chunkNumber <= totalChunks; chunkNumber++) {
        await processChunk(file, chunkNumber, totalChunks, identifier)
      }
    } catch (error) {
      handleError(error as Error)
    } finally {
      setIsUploading(false)
    }
  }, [processChunk, handleError])

  return useMemo(() => ({
    uploadFile,
    isUploading
  }), [uploadFile, isUploading])
} 