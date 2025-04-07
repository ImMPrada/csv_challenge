# CSV Upload Challenge - Backend

## Technical Explanation of File Upload Flow

### General Architecture

The system is designed to handle CSV file uploads efficiently and securely, with the following features:

- Supported file types: CSV
- Asynchronous processing
- CORS support
- Required CSV fields: name, price, expiration_date
- Supports both comma (,) and semicolon (;) as separators

### Upload Flow

1. **Chunk Processing**:
   - The frontend divides the CSV file into 1MB chunks
   - Each chunk is transmitted to a dedicated POST endpoint

2. **Storage & Processing**:
   - Chunks are stored using Active Storage
   - A background job merges the chunks into a temporary file
   - The system processes the temporary file to extract product data
   - Each product is validated and stored in the database

This architecture ensures reliable and efficient handling of large CSV files while maintaining data integrity.

## How to deploy

1. Clone the repository

```bash
git clone https://github.com/ImMPrada/csv_challenge.git
```

you need an .env file to run the server

```bash
cp .env.example .env
```

You need postgres installed and running

2. Install dependencies

```bash
bundle install
```

3. Run migrations

```bash
rails db:migrate
```

4. Run the server

```bash
rails s
```

5. Run the jobs

```bash
rails jobs:work
```

## What is being used

- Rails 8
- Active Storage
- Active Job: Delayed Job
