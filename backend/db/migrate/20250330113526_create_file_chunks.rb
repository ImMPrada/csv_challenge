class CreateFileChunks < ActiveRecord::Migration[8.0]
  def change
    create_table :file_chunks do |t|
      t.string :identifier, null: false, index: { unique: false }
      t.integer :chunk_number, null: false
      t.integer :total_chunks, null: false
      t.boolean :processed, default: false
      t.references :csv_upload, null: true, foreign_key: true

      t.timestamps
    end

    add_index :file_chunks, %i[identifier chunk_number], unique: true
  end
end
