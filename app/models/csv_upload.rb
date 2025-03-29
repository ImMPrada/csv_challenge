class CsvUpload < ApplicationRecord
  has_one_attached :file
  
  validates :file, presence: true
  validate :file_format

  private

  def file_format
    return unless file.attached?
    
    unless file.content_type == 'text/csv'
      errors.add(:file, 'debe ser un archivo CSV')
    end
  end
end 