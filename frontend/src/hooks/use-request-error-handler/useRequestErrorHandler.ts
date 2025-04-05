import { useCallback } from 'react'
import { ErrorHandlerConfig, RequestError } from './types'

const DEFAULT_ERROR_MESSAGES: Record<number, string> = {
  400: 'Solicitud inválida',
  401: 'No autorizado',
  403: 'Acceso denegado',
  404: 'Recurso no encontrado',
  413: 'El contenido es demasiado grande',
  415: 'Tipo de contenido no soportado',
  422: 'Error de validación',
  429: 'Demasiadas solicitudes, por favor espere un momento',
  500: 'Error interno del servidor',
  502: 'Error de gateway',
  503: 'Servicio no disponible',
  504: 'Tiempo de espera del gateway agotado'
}

export function useRequestErrorHandler({
  onError,
  customMessages = {},
  defaultMessage = 'Error inesperado durante la solicitud'
}: ErrorHandlerConfig = {}) {
  const handleError = useCallback((error: RequestError) => {
    let errorMessage = defaultMessage

    if (error.status) {
      const message = customMessages[error.status] || DEFAULT_ERROR_MESSAGES[error.status]
      if (message) {
        errorMessage = message
      }
    }

    if (error.errors) {
      const errorDetails = Object.entries(error.errors)
        .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
        .join('; ')
      errorMessage += `: ${errorDetails}`
    } else if (error.details) {
      errorMessage += `: ${error.details}`
    }

    if (error.context) {
      const contextDetails = Object.entries(error.context)
        .map(([key, value]) => `${key}: ${value}`)
        .join('; ')
      errorMessage += ` [${contextDetails}]`
    }

    const finalError = new Error(errorMessage)
    console.error('Request failed:', finalError)
    if (onError) {
      onError(finalError)
    }
  }, [onError, customMessages, defaultMessage])

  return { handleError }
} 