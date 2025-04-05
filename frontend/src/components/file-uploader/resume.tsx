import { ResumeProps } from './types'

export default function Resume({
  csvUpload,
  isPolling,
  processingDetails
}: ResumeProps) {

  if (!csvUpload || isPolling) { return null }

  return (
    <div className="mt-4 p-4 bg-green-50 text-green-700 rounded-lg">
      <h3 className="font-semibold">Archivo procesado exitosamente</h3>
      <p>ID: {csvUpload.id}</p>
      <p>Estado: {csvUpload.status}</p>
      {processingDetails && (
        <>
          <p>Filas totales: {processingDetails.csv_upload.total_rows}</p>
          <p>Filas procesadas: {processingDetails.csv_upload.processed_rows}</p>
          <p>Filas fallidas: {processingDetails.csv_upload.failed_rows}</p>
        </>
      )}
    </div>
  )
}
