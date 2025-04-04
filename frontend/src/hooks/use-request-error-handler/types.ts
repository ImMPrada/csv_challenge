export interface ErrorHandlerConfig {
  onError?: (error: Error) => void
  customMessages?: Record<number, string>
  defaultMessage?: string
}

export interface RequestError extends Error {
  status?: number
  details?: string
  errors?: Record<string, string[]>
  context?: Record<string, unknown>
} 