module Api
  module V1
    class ChunksController < ApplicationController
      def create
        service = Chunks::CreateService.new(chunk_params)
        service.call!

        @status = service.status
        @csv_upload = service.csv_upload
        process_csv(service.csv_upload) if @status == :complete
      rescue StandardError => e
        render json: { error: e.message }, status: :unprocessable_entity
      end

      private

      def chunk_params
        params.require(:chunk).permit(:chunk_data, :chunk_number, :total_chunks, :identifier)
      end

      def process_csv(csv_upload)
        ProcessCsvJob.perform_later(csv_upload.id)
      end
    end
  end
end
