class ProcessCsvJob < ApplicationJob
  queue_as :default

  def perform(csv_upload_id)
    @csv_upload = CsvUpload.find(csv_upload_id)
    raise ActiveRecord::RecordNotFound, 'CsvUpload not found' if csv_upload.blank?

    progress_service = CsvProcessings::ProgressService.new(csv_upload)
    merging_service = DataProcessing::ChunksMergingService.new(
      csv_upload,
      progress_service
    )
    merging_service.call!

    data_registering_service = DataProcessing::DataRegisteringService.new(
      csv_upload,
      merging_service.tempfile,
      progress_service
    )
    data_registering_service.call!
  end

  private

  attr_reader :csv_upload
end
