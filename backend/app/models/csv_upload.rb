class CsvUpload < ApplicationRecord
  enum :status, { pending: 0, processing: 1, completed: 2, failed: 3 }

  has_many :file_chunks, dependent: :destroy

  validates :total_rows, numericality: { greater_than_or_equal_to: 0 }
  validates :processed_rows, numericality: { greater_than_or_equal_to: 0 }
  validates :failed_rows, numericality: { greater_than_or_equal_to: 0 }
  validates :error_message, presence: true, if: -> { failed? }

  def progress_percentage
    return 0 if total_rows.zero?

    (processed_rows.to_f / total_rows * 100).round(2)
  end

  def failed_percentage
    return 0 if total_rows.zero?

    (failed_rows.to_f / total_rows * 100).round(2)
  end
end
