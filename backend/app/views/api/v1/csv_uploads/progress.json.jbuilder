json.csv_upload do
  json.partial! 'api/v1/csv_uploads/csv_upload', csv_upload: @csv_upload
end

if @csv_processing.present?
  json.csv_processing do
    json.partial! 'api/v1/csv_uploads/csv_processing', csv_processing: @csv_processing
  end
end
