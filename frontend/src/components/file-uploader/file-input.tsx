import { FileInputProps } from './types'

export default function FileInput({ disabled, onChange }: FileInputProps) {

  return (
    <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg hover:cursor-pointer hover:border-purple transition-colors duration-200">
      <input
        type="file"
        accept=".csv"
        onChange={onChange}
        disabled={disabled}
        className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-purple-50 file:text-purple-700
          hover:file:bg-purple hover:file:text-white
          hover:file:cursor-pointer
          disabled:opacity-50 disabled:cursor-not-allowed"
      />
      <p className="mt-2 text-sm text-gray-600">
        Drag a CSV file here or click to select
      </p>
    </div>
  )
}
