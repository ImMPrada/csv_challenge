export interface CsvUpload {
  id: number
  status: string
  total_rows: number
  processed_rows: number
  failed_rows: number
  error_messages: string | null
}

export interface CsvProcessing {
  id: number
  status: string
  progress: number
}

export interface CsvUploadProgressResponse {
  csv_upload: CsvUpload
  csv_processing: CsvProcessing
}

export interface UseCsvUploadProgressProps {
  onProgress?: (progress: CsvUploadProgressResponse) => void
  onError?: (error: Error) => void
  pollingInterval?: number
}

export interface UseCsvUploadProgressReturn {
  startPolling: (id: number) => void
  stopPolling: () => void
  isPolling: boolean
} 