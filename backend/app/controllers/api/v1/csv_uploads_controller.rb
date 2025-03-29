module Api
  module V1
    class CsvUploadsController < ApplicationController
      def create
        @csv_upload = CsvUpload.new(
          status: 'pending',
          original_filename: params[:file].original_filename,
          content_type: params[:file].content_type,
          file_size: params[:file].size
        )

        if params[:file].present?
          @csv_upload.file.attach(params[:file])

          if @csv_upload.save
            ProcessCsvJob.perform_later(@csv_upload.id)

            render json: {
              message: 'Archivo recibido. Será procesado en segundo plano.',
              id: @csv_upload.id,
              status: @csv_upload.status
            }, status: :accepted
          else
            render json: {
              errors: @csv_upload.errors.full_messages
            }, status: :unprocessable_entity
          end
        else
          render json: {
            error: 'No se proporcionó ningún archivo'
          }, status: :bad_request
        end
      end

      def show
        @csv_upload = CsvUpload.find(params[:id])
        render json: {
          id: @csv_upload.id,
          status: @csv_upload.status,
          total_rows: @csv_upload.total_rows,
          processed_rows: @csv_upload.processed_rows,
          progress: if @csv_upload.total_rows.positive?
                      (@csv_upload.processed_rows.to_f / @csv_upload.total_rows * 100).round
                    else
                      0
                    end,
          error_message: @csv_upload.error_message
        }
      end
    end
  end
end
