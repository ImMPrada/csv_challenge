import { ChangeEventHandler } from 'react'

export interface FileInputProps {
  disabled: boolean
  onChange: ChangeEventHandler<HTMLInputElement>
}
