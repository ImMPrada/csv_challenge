module Api
  module V1
    class CsvUploadsController < ApplicationController
      def create
        validate_file

        service = CsvUploads::CreateService.new(csv_upload_params)
        begin
          @csv_upload = service.call!
        rescue CsvUploadingError => e
          render_error(e.message, :internal_server_error)
        end
      end

      private

      def render_error(message, status)
        render json: { error: message }, status: status
      end

      def csv_upload_params
        params.require(:csv_upload).permit(:file)
      end

      def validate_file
        return render_error('No file was provided', :bad_request) if csv_upload_params[:file].blank?
        if csv_upload_params[:file].size > 100.megabytes
          return render_error('The file exceeds the maximum allowed size of 100MB', :bad_request)
        end

        return if csv_upload_params[:file].content_type.in?(['text/csv', 'application/vnd.ms-excel'])

        render_error('The file must be a valid CSV', :bad_request)
      end
    end
  end
end
