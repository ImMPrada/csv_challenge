module Api
  module V1
    class DirectUploadsController < ActiveStorage::DirectUploadsController
      protect_from_forgery with: :null_session
      
      def create
        blob = ActiveStorage::Blob.create_before_direct_upload!(
          filename: blob_params[:filename],
          byte_size: blob_params[:byte_size],
          checksum: blob_params[:checksum],
          content_type: blob_params[:content_type]
        )
        render json: direct_upload_json(blob)
      end

      private

      def direct_upload_json(blob)
        blob.as_json(root: false, methods: :signed_id)
            .merge(direct_upload: {
              url: blob.service_url_for_direct_upload,
              headers: blob.service_headers_for_direct_upload
            })
      end
    end
  end
end 