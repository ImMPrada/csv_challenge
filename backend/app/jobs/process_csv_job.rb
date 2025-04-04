class ProcessCsvJob < ApplicationJob
  queue_as :default

  def perform(csv_upload_id)
    csv_upload = CsvUpload.find(csv_upload_id)
    Rails.logger.info "Processing CSV upload #{csv_upload_id}"
    process_service = CsvUploads::ProcessService.new(csv_upload)
    process_service.process_file
    Rails.logger.info "Finished processing CSV upload #{csv_upload_id}"
  end
end
