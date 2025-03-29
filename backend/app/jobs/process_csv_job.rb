class ProcessCsvJob < ApplicationJob
  queue_as :default

  def perform(csv_upload_id)
    csv_upload = CsvUpload.find(csv_upload_id)
    csv_upload.update(status: 'processing')

    begin
      total_rows = 0
      processed_rows = 0

      # Primero contamos las filas totales
      CSV.parse(csv_upload.file.download, headers: true) do |_row|
        total_rows += 1
      end

      csv_upload.update(total_rows: total_rows)

      # Luego procesamos el archivo
      CSV.parse(csv_upload.file.download, headers: true) do |_row|
        # Aquí irá la lógica de procesamiento de cada fila
        # Por ahora solo incrementamos el contador
        processed_rows += 1

        # Actualizamos el progreso cada 100 filas
        csv_upload.update(processed_rows: processed_rows) if (processed_rows % 100).zero?
      end

      # Actualización final
      csv_upload.update(
        status: 'completed',
        processed_rows: processed_rows
      )
    rescue StandardError => e
      csv_upload.update(
        status: 'failed',
        error_message: e.message
      )
      raise e # Re-lanzamos la excepción para que Solid Queue la maneje
    end
  end
end
