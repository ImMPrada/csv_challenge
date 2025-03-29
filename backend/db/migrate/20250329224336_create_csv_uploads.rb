class CreateCsvUploads < ActiveRecord::Migration[8.0]
  def change
    create_table :csv_uploads do |t|
      t.string :filename, null: false
      t.integer :status, null: false
      t.text :error_message
      t.integer :total_rows, null: false
      t.integer :processed_rows, null: false
      t.integer :failed_rows, null: false

      t.timestamps
    end
  end
end
