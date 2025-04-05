class CreateCsvUploads < ActiveRecord::Migration[8.0]
  def change
    create_table :csv_uploads do |t|
      t.integer :status, null: false
      t.json :error_messages
      t.integer :total_rows, null: false
      t.integer :processed_rows, null: false
      t.integer :failed_rows, null: false

      t.timestamps
    end
  end
end
