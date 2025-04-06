import { useState } from 'react'
import { useFileUpload } from '../../hooks/use-file-upload/useFileUpload'
import ProgressBar from '../progress-bar'
import FileInput from './file-input'

interface CsvUpload {
  id: number
  status: string
  created_at: string
}

export default function FileUploader() {
  const [error, setError] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState<number>(0)
  const [csvUpload, setCsvUpload] = useState<CsvUpload | null>(null)
  const { uploadFile, isUploading } = useFileUpload({
    onUploadComplete: (response: { csvUpload?: CsvUpload }) => {
      setError(null)
      setUploadProgress(100)
      if (response.csvUpload) {
        setCsvUpload(response.csvUpload)
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
      setCsvUpload(null)
      uploadFile(file)
    }
  }

  return (
    <div className="w-full max-w-2xl p-4 border border-purple rounded-lg">
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}
      
      <FileInput
        disabled={isUploading}
        onChange={handleFileChange}
      />

      {isUploading && (
        <ProgressBar label="Subiendo archivo..." progress={uploadProgress} />
      )}

      {csvUpload && (
        <div className="mt-4 p-4 bg-green-50 text-green-700 rounded-lg">
          <h3 className="font-semibold">Archivo procesado exitosamente</h3>
          <p>ID: {csvUpload.id}</p>
          <p>Estado: {csvUpload.status}</p>
          <p>Fecha: {new Date(csvUpload.created_at).toLocaleString()}</p>
        </div>
      )}
    </div>
  )
}
