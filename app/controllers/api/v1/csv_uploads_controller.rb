module Api
  module V1
    class CsvUploadsController < ApplicationController
      def create
        @csv_upload = CsvUpload.new
        
        if params[:file].present?
          @csv_upload.file.attach(params[:file])
          
          if @csv_upload.save
            ProcessCsvJob.perform_later(@csv_upload.id)
            render json: { 
              message: 'Archivo recibido. Será procesado en segundo plano.',
              id: @csv_upload.id 
            }, status: :accepted
          else
            render json: { errors: @csv_upload.errors.full_messages }, 
                   status: :unprocessable_entity
          end
        else
          render json: { error: 'No se proporcionó ningún archivo' }, 
                 status: :bad_request
        end
      end
    end
  end
end 