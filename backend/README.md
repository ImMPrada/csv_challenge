# CSV Upload Challenge - Backend

## Technical Explanation of File Upload Flow

### General Architecture

The system is designed to handle CSV file uploads efficiently and securely, with the following features:

- Size limit: 100MB
- Allowed file types: CSV and Excel
- Asynchronous processing
- Security validations
- CORS support

### Upload Flow

1. **Frontend → Backend (Upload Initiation)**
   ```javascript
   // Frontend implementation example
   const uploadFile = async (file) => {
     const formData = new FormData();
     formData.append('csv_upload[file]', file);

     try {
       const response = await fetch('/api/v1/csv_uploads', {
         method: 'POST',
         body: formData
       });

       if (!response.ok) {
         const error = await response.json();
         throw new Error(error.error);
       }

       const data = await response.json();
       return data;
     } catch (error) {
       console.error('Error uploading file:', error);
       throw error;
     }
   };
   ```

2. **Initial Validations (Backend)**
   - Verifies that a file was provided
   - Validates maximum size (100MB)
   - Checks content type (CSV or Excel)

3. **File Processing**
   - File is attached using Active Storage
   - Total CSV rows are counted efficiently
   - Initial record is created in the database
