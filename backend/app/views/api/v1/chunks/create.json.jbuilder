json.status @status
if @csv_upload
  json.csv_upload do
    json.id @csv_upload.id
    json.status @csv_upload.status
    json.created_at @csv_upload.created_at
  end
else
  json.csv_upload nil
end
