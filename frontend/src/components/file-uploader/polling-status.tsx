import ProgressBar from '../progress-bar'
import { PollingStatusProps } from './types'

export default function PollingStatus({ isPolling, processingProgress, processingDetails }: PollingStatusProps) {
  if (!isPolling) return null

  if (!processingDetails?.csv_processing) {
    return (
      <div className="mt-4 p-4 bg-yellow-50 text-yellow-700 rounded-lg">
        <h3 className="font-semibold">PROCESSING QUEUED...</h3>
        <p>The file is queued to be processed. Please wait, this may take a while.</p>
        <p>Processing consists on create products from the uploaded file.</p>
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
          <h3 className="font-semibold">Processing details</h3>
          <p>Total rows: {processingDetails.csv_upload.total_rows}</p>
          <p>Processed rows: {processingDetails.csv_upload.processed_rows}</p>
          <p>Failed rows: {processingDetails.csv_upload.failed_rows}</p>
          {processingDetails.csv_upload.error_messages && (
            <p className="text-red">Error: {processingDetails.csv_upload.error_messages}</p>
          )}
        </div>
      )}
    </>
  )
}
