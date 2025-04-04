module Api
  module V1
    class ChunksController < ApplicationController
      def create
        service = Chunks::CreateService.new(chunk_params)
        service.call!

        @status = service.status

        if @status == :complete
          @csv_upload = create_csv_upload
          enqueue_process_csv
        end
      rescue StandardError => e
        render json: { error: e.message }, status: :unprocessable_entity
      end

      private

      attr_reader :csv_upload

      def chunk_params
        params.require(:chunk).permit(:chunk_data, :chunk_number, :total_chunks, :identifier)
      end

      def create_csv_upload
        chunks = FileChunk.for_file(chunk_params[:identifier])
        CsvUploads::CreateService.new(chunks).call!
      end

      def enqueue_process_csv
        ProcessCsvJob.perform_later(csv_upload.id)
      end
    end
  end
end
