module CsvProcessings
  class ProgressService
    attr_reader :csv_processing

    def initialize(csv_upload)
      @csv_upload = csv_upload
    end

    def create!
      @csv_processing = csv_upload.csv_processing.create!(status: :started)
    end

    def update!(progress:, status:)
      csv_processing.update!(progress:, status:)
    end

    def restart!(status:)
      csv_processing.update!(progress: 0, status:)
    end

    def finish!
      csv_processing.update!(progress: 100, status: :finished)
    end

    private

    attr_reader :csv_upload
  end
end
