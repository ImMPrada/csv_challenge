module DataProcessing
  class ChunksMergingService
    attr_reader :tempfile

    def initialize(csv_upload, progress_service)
      @csv_upload = csv_upload
      @progress_service = progress_service
    end

    def call!
      progress_service.create!
      progress_service.update!(progress: 0, status: :merging_chunks)
      merge_chunks_io!
    end

    private

    attr_reader :csv_upload, :progress_service

    def chunks
      @chunks ||= csv_upload.file_chunks
    end

    def merge_chunks_io!
      initialize_tempfile

      total_chunks = chunks.count
      count = 0

      chunks.each do |chunk|
        count += 1
        process_chunk!(chunk, count, total_chunks)
      end

      progress_service.finish!
      @tempfile.rewind
    end

    def initialize_tempfile
      filename = "#{csv_upload.id}_#{chunks.first.identifier}_merged.csv"

      @tempfile = Tempfile.new(filename)
    end

    def process_chunk!(chunk, count, total_chunks)
      puts "Processing chunk #{count} of #{total_chunks}"
      progress_service.update!(
        progress: (count.to_f / total_chunks * 100).round(2),
        status: :merging_chunks
      )

      chunk.chunk_data.open do |downloaded_chunk|
        IO.copy_stream(downloaded_chunk, tempfile)
      end
    end
  end
end
