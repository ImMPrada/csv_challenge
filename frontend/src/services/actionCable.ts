import { createConsumer, Subscription } from '@rails/actioncable'

const WEBSOCKET_URL = 'ws://localhost:3000/cable'

class ActionCableService {
  private consumer = createConsumer(WEBSOCKET_URL)

  subscribeToFileProgress(csvUploadId: string, callbacks: {
    onProgress: (data: { progress?: number; message?: string }) => void,
    onConnected?: () => void,
    onDisconnected?: () => void,
  }): Subscription {
    console.log('Attempting to subscribe to progress channel for file:', csvUploadId)
    
    const subscription = this.consumer.subscriptions.create(
      {
        channel: "ProgressChannel",
        csv_upload_id: csvUploadId
      },
      {
        connected: () => {
          console.log(`Connected to progress channel for file ${csvUploadId}`)
          callbacks.onConnected?.()
        },

        disconnected: () => {
          console.log(`Disconnected from progress channel for file ${csvUploadId}`)
          callbacks.onDisconnected?.()
        },

        rejected: () => {
          console.error(`Subscription rejected for file ${csvUploadId}`)
        },

        received: (data: { progress?: number; message?: string }) => {
          console.log(`Progress for file ${csvUploadId}:`, data)
          callbacks.onProgress(data)
        }
      }
    )

    return subscription
  }
}

export const actionCable = new ActionCableService() 