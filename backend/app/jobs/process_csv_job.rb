class ProcessCsvJob < ApplicationJob
  queue_as :default

  def perform(_csv_upload_id)
    puts 'Processing CSV job'
  end
end
