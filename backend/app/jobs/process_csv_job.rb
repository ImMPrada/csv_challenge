class ProcessCsvJob < ApplicationJob
  queue_as :default

  def perform(csv_upload_id)
    @csv_upload = CsvUpload.find(csv_upload_id)
    raise ActiveRecord::RecordNotFound, 'CsvUpload not found' if csv_upload.blank?

    DataProcessing::ProcessService.new(csv_upload).call!
  end

  private

  attr_reader :csv_upload
end
