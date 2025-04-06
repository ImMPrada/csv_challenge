export const config = {
  apiUrl: import.meta.env.VITE_API_URL,
  appName: import.meta.env.VITE_APP_NAME,
  appVersion: import.meta.env.VITE_APP_VERSION,
  chunkSize: parseInt(import.meta.env.VITE_CHUNK_SIZE, 10),
  pollingInterval: parseInt(import.meta.env.VITE_POLLING_INTERVAL, 10),
}; 