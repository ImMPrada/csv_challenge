import { ResumeProps } from './types'

export default function Resume({
  csvUpload,
  processingDetails
}: ResumeProps) {

  return (
    <div className="mt-4 p-4 bg-green-50 text-green-700 rounded-lg">
      <h3 className="font-semibold">File processed successfully</h3>
      <p>Status: {csvUpload.status}</p>
      <p>ID: {csvUpload.id}</p>
      {processingDetails && (
        <>
          <p>Total rows: {processingDetails.csv_upload.total_rows}</p>
          <p>Processed rows: {processingDetails.csv_upload.processed_rows}</p>
          <p>Failed rows: {processingDetails.csv_upload.failed_rows}</p>
        </>
      )}
    </div>
  )
}
