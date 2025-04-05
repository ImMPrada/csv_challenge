class Product < ApplicationRecord
  validates :name, :price, :expiration_date, presence: true
  validates :price, numericality: { greater_than: 0 }
end
