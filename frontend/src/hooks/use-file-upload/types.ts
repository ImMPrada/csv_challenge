export interface UseFileUploadProps {
  onUploadComplete?: (response: Record<string, unknown>) => void
  onUploadError?: (error: Error) => void
  onProgress?: (progress: number) => void
}

export interface UploadResponse {
  status: string
  csv_upload?: {
    id: number
    status: string
    created_at: string
  } | null
  error?: string
  errors?: Record<string, string[]>
} 