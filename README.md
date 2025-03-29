# CSV Challenge Backend

API REST en Rails para procesar archivos CSV de gran tamaño de forma asíncrona.

## Requisitos previos

- Ruby 3.2.2
- PostgreSQL
- Bundler

## Configuración inicial

1. Clonar el repositorio
```bash
git clone [url-del-repositorio]
cd csv_challenge/backend
```

2. Instalar dependencias
```bash
bundle install
```

3. Configurar la base de datos
```bash
rails db:create
rails db:migrate
```

4. Configurar Active Storage
```bash
rails active_storage:install
rails db:migrate
```

## Ejecutar la aplicación

1. Iniciar el servidor Rails
```bash
rails server
```

2. Iniciar el worker de Solid Queue (en una nueva terminal)
```bash
rails solid_queue:start
```

## Endpoints API

### Subir un archivo CSV

# Flatirons Full-Stack Developer Coding Test

Be sure to read **all** of this document carefully, and follow the guidelines within.

## Context

Implement a full-stack web or mobile application that can upload, process, and store into a database the following CSV filem which contains a list of products. An example CSV file is located in data.csv in this repo.

## Technology Choice
1. Backend: Ruby on Rails, NestJS, .NET, or Python (choose the one you are being hired for)
2. Frontend: React (for web candidates) or React Native (for mobile candidates)

## Requirements - Backend

1. The products should be stored along with multiple exchange rates at the time of the upload utilizing this [API](https://github.com/fawazahmed0/exchange-api) (include at least 5 currencies). All product fields are required and must be present.
2. Implement an endpoint that returns all the processed rows of product data along with the available currency conversions stored at the time of the upload. This endpoint should support filtering and sorting based on the name, price, and expiration fields
4. The application should support CSV files with up to 200k rows, but easily scale to support more.

## Requirements - Frontend
1. The front-end should display a file upload input that allows the user to select a CSV file from their device.
2. While the file is uploading and being processed, there should be a loading indicator displaying progress of the upload.
3. Once the file uploads, a success message should display and you should be able to browse a table of the uploaded products. 
