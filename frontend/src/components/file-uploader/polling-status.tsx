import ProgressBar from '../progress-bar'
import { PollingStatusProps } from './types'

export default function PollingStatus({ isPolling, processingProgress, processingDetails }: PollingStatusProps) {
  if (!isPolling) return null

  if (!processingDetails?.csv_processing) {
    return (
      <div className="mt-4 p-4 bg-yellow-50 text-yellow-700 rounded-lg">
        <h3 className="font-semibold">PROCESAMIENTO ENCOLADO...</h3>
        <p>El archivo está en cola para ser procesado. Por favor espere.</p>
      </div>
    )
  }

  return (
    <>
      <ProgressBar 
        label="Procesando archivo..." 
        progress={processingProgress} 
      />
      {processingDetails && (
        <div className="mt-4 p-4 bg-blue-50 text-blue-700 rounded-lg">
          <h3 className="font-semibold">Detalles del procesamiento</h3>
          <p>Filas totales: {processingDetails.csv_upload.total_rows}</p>
          <p>Filas procesadas: {processingDetails.csv_upload.processed_rows}</p>
          <p>Filas fallidas: {processingDetails.csv_upload.failed_rows}</p>
          {processingDetails.csv_upload.error_message && (
            <p className="text-red-600">Error: {processingDetails.csv_upload.error_message}</p>
          )}
        </div>
      )}
    </>
  )
}
