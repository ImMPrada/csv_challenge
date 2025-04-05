json.status @status
if @csv_upload
  json.csv_upload do
    json.id @csv_upload.id
    json.status @csv_upload.status
  end
else
  json.csv_upload nil
end
