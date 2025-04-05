import { useState, useEffect } from 'react'
import { useFileUpload } from '../../hooks/use-file-upload/useFileUpload'
import { useCsvUploadProgress, CsvUploadProgressResponse, CsvUpload } from '../../hooks/use-csv-upload-progress'
import ProgressBar from '../progress-bar'
import FileInput from './file-input'
import PollingStatus from './polling-status'
import Resume from './resume'

export default function FileUploader() {
  const [error, setError] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState<number>(0)
  const [csvUpload, setCsvUpload] = useState<CsvUpload | null>(null)
  const [processingProgress, setProcessingProgress] = useState<number>(0)
  const [processingDetails, setProcessingDetails] = useState<CsvUploadProgressResponse | null>(null)

  const { startPolling, stopPolling, isPolling } = useCsvUploadProgress({
    onProgress: (progress: CsvUploadProgressResponse) => {
      setProcessingDetails(progress)
      if (progress.csv_processing) {
        setProcessingProgress(progress.csv_processing.progress)
        if (progress.csv_processing.status === 'completed' || progress.csv_processing.status === 'failed') {
          stopPolling()
        }
      } else {
        setProcessingProgress(0)
      }
    },
    onError: (error) => {
      setError(error.message)
      stopPolling()
    }
  })

  const { uploadFile, isUploading } = useFileUpload({
    onUploadComplete: (response: { csvUpload?: CsvUpload }) => {
      setError(null)
      setUploadProgress(100)
      if (response.csvUpload) {
        setCsvUpload(response.csvUpload)
        startPolling(response.csvUpload.id)
      }
    },
    onUploadError: (error) => {
      setError(error.message)
      setUploadProgress(0)
      setCsvUpload(null)
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
      setProcessingProgress(0)
      setProcessingDetails(null)
      setCsvUpload(null)
      uploadFile(file)
    }
  }

  useEffect(() => {
    return () => {
      stopPolling()
    }
  }, [stopPolling])

  return (
    <div className="w-full max-w-2xl p-4 border border-purple rounded-lg">
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}
      
      <FileInput
        disabled={isUploading || isPolling}
        onChange={handleFileChange}
      />

      {isUploading && (
        <ProgressBar label="Subiendo archivo..." progress={uploadProgress} />
      )}

      <PollingStatus
        isPolling={isPolling}
        processingProgress={processingProgress}
        processingDetails={processingDetails}
      />

      <Resume
        csvUpload={csvUpload}
        isPolling={isPolling}
        processingDetails={processingDetails}
      />
    </div>
  )
}
