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

      @status = all_chunks_received? ? :complete : :chunk_received
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

    def chunks
      FileChunk.for_file(identifier)
    end
  end
end
