class ForeignExchange < ApplicationRecord
  validates :date, presence: true
  validates :rates, presence: true

  has_many :products, dependent: :destroy
end
