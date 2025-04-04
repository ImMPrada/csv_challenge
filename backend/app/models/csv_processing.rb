class CsvProcessing < ApplicationRecord
  enum :status, { started: 0, processing: 1, completed: 2, failed: 3 }

  belongs_to :csv_upload

  validates :status, presence: true
  validates :progress, presence: true

  
end
