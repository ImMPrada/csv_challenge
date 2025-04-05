class CreateCsvProcessings < ActiveRecord::Migration[8.0]
  def change
    create_table :csv_processings do |t|
      t.references :csv_upload, null: false, foreign_key: true
      t.integer :status, null: false, default: 0
      t.float :progress, null: false, default: 0

      t.timestamps
    end
  end
end
