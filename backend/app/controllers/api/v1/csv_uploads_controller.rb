module Api
  module V1
    class CsvUploadsController < ApplicationController
      def progress
        @csv_processing = csv_upload.csv_processing.order(created_at: :desc).first
      end

      private

      def csv_upload
        @csv_upload ||= CsvUpload.find(params[:id])
      end
    end
  end
end
