class Product < ApplicationRecord
  validates :name, :price, :expiration_date, presence: true
  validates :price, numericality: { greater_than: 0 }
  validate :valid_name_format

  belongs_to :foreign_exchange

  private

  def valid_name_format
    return if name.blank?
    return if name.match?(/^[a-zA-Z0-9]+(?:[\s-][a-zA-Z0-9]+)*\s*#\s*\(\d+\)$/)

    errors.add(:name,
               'wrong name')
  end
end
