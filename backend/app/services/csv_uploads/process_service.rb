module CsvUploads
  class ProcessService
    def initialize(csv_upload)
      @csv_upload = csv_upload
    end

    def process_file
      merge_chunks_io(@csv_upload.file_chunks)
    end

    private

    def merge_chunks_io(chunks, filename: 'merged_file')
      tempfile = Tempfile.new(filename)
      count = 0
      chunks.each do |chunk|
        chunk.chunk_data.open do |downloaded_chunk|
          IO.copy_stream(downloaded_chunk, tempfile)
        end
  
        count += 1
        ActionCable.server.broadcast(
          "progress_channel_#{@csv_upload.id}",
          { progress: (count.to_f / chunks.count * 100).round(2), message: "Processing #{count} of #{chunks.count}" }
        )
      end

      byebug
      tempfile.rewind
      tempfile
    end
  end
end
