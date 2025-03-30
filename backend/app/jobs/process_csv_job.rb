class ProcessCsvJob < ApplicationJob
  queue_as :default

  def perform(csv_upload_id)
    csv_upload = CsvUpload.find(csv_upload_id)

    # Simulate processing with progress updates
    total_steps = 10
    total_steps.times do |step|
      progress = ((step + 1).to_f / total_steps * 100).round(2)

      # Broadcast progress
      ActionCable.server.broadcast(
        "progress_channel_#{csv_upload_id}",
        { progress: progress, message: "Processing step #{step + 1} of #{total_steps}" }
      )

      # Simulate some work
      sleep(1)
    end

    # Mark as completed
    csv_upload.update!(status: :completed)

    # Final broadcast
    ActionCable.server.broadcast(
      "progress_channel_#{csv_upload_id}",
      { progress: 100, message: 'Processing completed' }
    )
  end
end
