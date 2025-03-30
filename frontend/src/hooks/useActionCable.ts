import { useEffect, useRef, useCallback } from 'react'
import { Subscription } from '@rails/actioncable'
import { actionCable } from '../services/actionCable'

interface UseActionCableProps {
  csvUploadId: string
  onProgress: (data: { progress?: number; message?: string }) => void
  onConnected?: () => void
  onDisconnected?: () => void
}

export const useActionCable = ({
  csvUploadId,
  onProgress,
  onConnected,
  onDisconnected
}: UseActionCableProps) => {
  const subscription = useRef<Subscription | null>(null)

  const handleProgress = useCallback((data: { progress?: number; message?: string }) => {
    console.log('Progress callback:', data)
    onProgress(data)
  }, [onProgress])

  const handleConnected = useCallback(() => {
    console.log('Connected callback')
    onConnected?.()
  }, [onConnected])

  const handleDisconnected = useCallback(() => {
    console.log('Disconnected callback')
    onDisconnected?.()
  }, [onDisconnected])

  useEffect(() => {
    if (csvUploadId) {
      console.log('Subscribing to progress channel:', csvUploadId)
      subscription.current = actionCable.subscribeToFileProgress(
        csvUploadId,
        {
          onProgress: handleProgress,
          onConnected: handleConnected,
          onDisconnected: handleDisconnected
        }
      )
    }

    return () => {
      if (subscription.current) {
        console.log('Unsubscribing from progress channel')
        subscription.current.unsubscribe()
        subscription.current = null
      }
    }
  }, [csvUploadId, handleProgress, handleConnected, handleDisconnected])

  return subscription.current
} 