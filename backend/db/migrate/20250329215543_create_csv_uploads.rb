class CreateCsvUploads < ActiveRecord::Migration[8.0]
  def change
    create_table :csv_uploads do |t|
      t.integer :status, null: false
      t.integer :total_rows, null: false
      t.integer :processed_rows, null: false
      t.text :error_message
      t.string :original_filename, null: false
      t.string :content_type, null: false
      t.bigint :file_size, null: false

      t.timestamps
    end
  end
end
