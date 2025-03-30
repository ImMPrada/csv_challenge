class ProgressChannel < ApplicationCable::Channel
  def subscribed
    return if params[:csv_upload_id].blank?

    stream_from "progress_channel_#{params[:csv_upload_id]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
