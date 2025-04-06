class CsvProcessing < ApplicationRecord
  enum(
    :status,
    {
      started: 0,
      merging_chunks: 1,
      creating_products: 2,
      finished: 3
    }
  )

  belongs_to :csv_upload

  validates :status, presence: true
  validates :progress, presence: true
end
