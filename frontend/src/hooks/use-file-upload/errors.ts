export class ChunkUploadError extends Error {
  public status: number
  public details?: string
  public errors?: Record<string, string[]>
  public chunkNumber: number
  public totalChunks: number
  public isLastChunk: boolean

  constructor(
    message: string, 
    status: number, 
    chunkNumber: number,
    totalChunks: number,
    details?: string, 
    errors?: Record<string, string[]>
  ) {
    super(message)
    this.name = 'ChunkUploadError'
    this.status = status
    this.details = details
    this.errors = errors
    this.chunkNumber = chunkNumber
    this.totalChunks = totalChunks
    this.isLastChunk = chunkNumber === totalChunks
  }
} 