/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_APP_NAME: string
  readonly VITE_APP_VERSION: string
  readonly VITE_CHUNK_SIZE: string
  readonly VITE_POLLING_INTERVAL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
