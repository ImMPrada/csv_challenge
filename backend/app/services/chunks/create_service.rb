module Chunks
  class CreateService
    attr_reader :chunk, :csv_upload, :status

    def initialize(params)
      @params = params
    end

    def call!
      @chunk = create_chunk!
      chunk.chunk_data.attach(chunk_data)
      chunk.save!

      if all_chunks_received?
        create_csv_upload!
        @status = :complete
      else
        @status = :chunk_received
      end
    end

    private

    attr_reader :params

    def chunk_data
      params[:chunk_data]
    end

    def chunk_number
      @chunk_number ||= params[:chunk_number].to_i
    end

    def total_chunks
      @total_chunks ||= params[:total_chunks].to_i
    end

    def identifier
      @identifier ||= params[:identifier].to_s
    end

    def create_chunk!
      FileChunk.create!(
        identifier:,
        chunk_number:,
        total_chunks:
      )
    end

    def all_chunks_received?
      chunk_number == total_chunks
    end

    def create_csv_upload!
      @csv_upload = CsvUpload.new(
        status: :pending,
        total_rows: 0,
        processed_rows: 0,
        failed_rows: 0,
        error_message: nil
      )

      csv_upload.file_chunks << chunks
      csv_upload.save!
    end

    def chunks
      FileChunk.for_file(identifier)
    end
  end
end
