module CsvUploads
  class CreateService
    attr_reader :csv_upload

    def initialize(chunks)
      @chunks = chunks
    end

    def call!
      @csv_upload = build_csv_upload

      csv_upload.file_chunks << chunks
      csv_upload.save!
    end

    private

    attr_reader :chunks

    def build_csv_upload
      CsvUpload.new(
        status: :pending,
        total_rows: 0,
        processed_rows: 0,
        failed_rows: 0,
        error_message: nil
      )
    end
  end
end
