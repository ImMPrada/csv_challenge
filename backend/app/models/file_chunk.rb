class FileChunk < ApplicationRecord
  has_one_attached :chunk_data

  belongs_to :csv_upload, optional: true

  validates :chunk_number, presence: true
  validates :total_chunks, presence: true
  validates :identifier, presence: true, uniqueness: false

  scope :for_file, ->(identifier) { where(identifier: identifier) }

  validate :chunk_size_within_limits

  private

  def chunk_size_within_limits
    return unless chunk_data.attached?

    return unless chunk_data.byte_size > 5.megabytes

    errors.add(:chunk_data, 'chunk size exceeds limit')
  end
end
