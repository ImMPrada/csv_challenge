module DataProcessing
  class DataRegisteringService
    attr_reader :tempfile

    def initialize(csv_upload, tempfile, progress_service)
      @csv_upload = csv_upload
      @tempfile = tempfile
      @progress_service = progress_service
      @foreign_exchange_service = ForeignExchanges::UpsertService.new
    end

    def call!
      foreign_exchange_service.call!
      extract_file_sections
      csv_upload.update!(status: :processing, processed_rows: total_lines)
      progress_service.restart!(status: :creating_products)
      register_products
    end

    private

    attr_reader :csv_upload,
                :progress_service,
                :content,
                :headers,
                :total_lines,
                :separator,
                :foreign_exchange_service

    def extract_file_sections
      @content = tempfile.readlines
      @headers = @content.shift
      @total_lines = @content.size
      @separator = @headers.include?(';') ? ';' : ','
    end

    def register_products
      count = 0

      content.each do |line|
        count += 1
        begin
          params = product_params(line)
          Products::CreateService.new(params, foreign_exchange_service).call!
          count_success
        rescue StandardError => e
          add_row_error("Error en la linea #{count}: #{e.message} | #{line} |")
        end
        progress_service.update!(
          progress: (count.to_f / total_lines * 100).round(2),
          status: :creating_products
        )
      end

      progress_service.finish!
    end

    def product_params(line)
      splitted_line = line.split(separator)

      name = splitted_line[0]
      price = splitted_line[1].delete('$').to_f
      expiration_date = Date.strptime(splitted_line[2], '%m/%d/%Y')

      {
        name:,
        price:,
        expiration_date:
      }
    end

    def count_success
      csv_upload.processed_rows += 1
      csv_upload.save!
    end

    def add_row_error(error_messages)
      csv_errors = csv_upload.error_messages
      failed_rows = csv_upload.failed_rows
      processed_rows = csv_upload.processed_rows
      total_rows = csv_upload.total_rows
      total_rows += 1
      processed_rows += 1
      failed_rows += 1
      csv_errors << error_messages
      csv_upload.update!(error_messages: csv_errors, failed_rows:, processed_rows:, total_rows:)
    end
  end
end
