import { useState, useCallback, useEffect, useRef } from 'react'
import { UseCsvUploadProgressProps, UseCsvUploadProgressReturn } from './types'
import { useRequestErrorHandler } from '../use-request-error-handler'

const DEFAULT_POLLING_INTERVAL = 10 // 0.5 seconds
const PROGRESS_ENDPOINT = 'http://localhost:3000/api/v1/csv_uploads'

export function useCsvUploadProgress({
  onProgress,
  onError,
  pollingInterval = DEFAULT_POLLING_INTERVAL
}: UseCsvUploadProgressProps = {}): UseCsvUploadProgressReturn {
  const [isPolling, setIsPolling] = useState(false)
  const pollingIdRef = useRef<number | null>(null)
  const isPollingRef = useRef(false)
  const { handleError } = useRequestErrorHandler({
    onError,
    defaultMessage: 'Error al obtener el progreso del archivo'
  })

  const fetchProgress = useCallback(async (id: number) => {
    try {
      const response = await fetch(`${PROGRESS_ENDPOINT}/${id}/progress`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      if (onProgress) {
        onProgress(data)
      }
      // Only stop polling if processing is complete and exists
      if (data.csv_processing && (data.csv_processing.status === 'completed' || data.csv_processing.status === 'finished')) {
        stopPolling()
      }
    } catch (error) {
      handleError(error as Error)
    }
  }, [onProgress, handleError])

  const startPolling = useCallback((id: number) => {
    setIsPolling(true)
    isPollingRef.current = true

    const poll = async () => {
      if (!isPollingRef.current) return
      
      await fetchProgress(id)
      
      if (isPollingRef.current) {
        pollingIdRef.current = window.setTimeout(() => poll(), pollingInterval)
      }
    }
    
    poll()
  }, [fetchProgress, pollingInterval])

  const stopPolling = useCallback(() => {
    if (pollingIdRef.current) {
      clearTimeout(pollingIdRef.current)
      pollingIdRef.current = null
    }
    isPollingRef.current = false
    setIsPolling(false)
  }, [])

  useEffect(() => {
    return () => {
      if (pollingIdRef.current) {
        clearTimeout(pollingIdRef.current)
      }
      isPollingRef.current = false
    }
  }, [])

  return {
    startPolling,
    stopPolling,
    isPolling
  }
} 