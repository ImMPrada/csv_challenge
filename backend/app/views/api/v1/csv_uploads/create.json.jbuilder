json.message 'File uploaded successfully'
json.csv_upload do
  json.id @csv_upload.id
  json.filename @csv_upload.filename
  json.status @csv_upload.status
  json.created_at @csv_upload.created_at
end
