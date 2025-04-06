class AddReferencesProductForeignExchanges < ActiveRecord::Migration[8.0]
  def change
    add_reference :products, :foreign_exchange, null: false, foreign_key: true
  end
end
