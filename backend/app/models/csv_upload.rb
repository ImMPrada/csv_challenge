class CsvUpload < ApplicationRecord
  enum :status, { pending: 0, processing: 1, finished: 2 }

  before_create :set_error_messages

  has_many :file_chunks, dependent: :destroy
  has_many :csv_processing, dependent: :destroy

  validates :total_rows, numericality: { greater_than_or_equal_to: 0 }
  validates :processed_rows, numericality: { greater_than_or_equal_to: 0 }
  validates :failed_rows, numericality: { greater_than_or_equal_to: 0 }

  private

  def set_error_messages
    self.error_messages = []
  end
end
