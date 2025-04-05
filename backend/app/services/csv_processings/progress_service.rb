module CsvProcessings
  class ProgressService
    attr_reader :csv_processing

    def initialize(csv_upload)
      @csv_upload = csv_upload
    end

    def create!
      @csv_processing = csv_upload.csv_processing.create!(status: :processing)
    end

    def update!(progress:, status:)
      csv_processing.update!(progress:, status:)
    end

    private

    attr_reader :csv_upload
  end
end
