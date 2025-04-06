import { CsvUpload, CsvUploadProgressResponse } from '../../hooks/use-csv-upload-progress'

export interface FileInputProps {
  disabled: boolean
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export interface PollingStatusProps {
  isPolling: boolean
  processingProgress: number
  processingDetails: CsvUploadProgressResponse | null
}

export interface ResumeProps {
  csvUpload: CsvUpload
  processingDetails: CsvUploadProgressResponse | null
}
