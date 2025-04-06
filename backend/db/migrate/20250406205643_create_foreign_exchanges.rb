class CreateForeignExchanges < ActiveRecord::Migration[8.0]
  def change
    create_table :foreign_exchanges do |t|
      t.date :date, null: false, index: { unique: false }
      t.json :rates, null: false

      t.timestamps
    end
  end
end
