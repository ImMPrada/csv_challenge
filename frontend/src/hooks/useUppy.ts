import { useEffect, useRef } from 'react'
import Uppy from '@uppy/core'
import XHRUpload from '@uppy/xhr-upload'
import type { UppyFile } from '@uppy/core'

interface UseUppyProps {
  onUploadComplete?: (response: Record<string, unknown>) => void
  onUploadError?: (error: Error) => void
}

export function useUppy({ onUploadComplete, onUploadError }: UseUppyProps = {}) {
  const uppyRef = useRef<Uppy | null>(null)

  useEffect(() => {
    uppyRef.current = new Uppy({
      restrictions: {
        maxFileSize: 100 * 1024 * 1024, // 100MB
        maxNumberOfFiles: 1,
        allowedFileTypes: ['.csv']
      }
    })
    .use(XHRUpload, {
      endpoint: '/chunks',
      formData: true,
      fieldName: 'chunk',
      headers: {
        'X-CSRF-Token': document.querySelector<HTMLMetaElement>('[name="csrf-token"]')?.getAttribute('content') || ''
      }
    })

    if (onUploadComplete) {
      uppyRef.current.on('complete', (result) => {
        onUploadComplete(result)
      })
    }

    if (onUploadError) {
      uppyRef.current.on('error', (error) => {
        onUploadError(error)
      })
    }

    return () => {
      // Limpiar los archivos y eventos cuando el componente se desmonte
      uppyRef.current?.cancelAll()
    }
  }, [onUploadComplete, onUploadError])

  return uppyRef.current
} 