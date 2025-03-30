module CsvUploads
  class CreateService
    def initialize(params)
      @params = params
    end

    def call!
      attach_file

      total_rows = count_csv_rows(csv_upload.file.download)
      csv_upload.update!(total_rows:)

      ProcessCsvJob.perform_later(csv_upload.id)
      csv_upload
    end

    def csv_upload
      @csv_upload ||= CsvUpload.new(
        status: :pending,
        total_rows: 0,
        processed_rows: 0,
        failed_rows: 0,
        error_message: nil
      )
    end

    private

    attr_reader :params

    def attach_file
      csv_upload.file.attach(
        io: params[:file].open,
        filename: params[:file].original_filename,
        content_type: params[:file].content_type
      )

      csv_upload.filename = params[:file].original_filename
      csv_upload.save!
    end

    def count_csv_rows(content)
      lines = content.split("\n")
      # Subtract 1 to exclude the header row
      [lines.size - 1, 0].max
    rescue StandardError => e
      raise CsvUploadingError, "Error al contar las filas del CSV: #{e.message}"
    end
  end
end
