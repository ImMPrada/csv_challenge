import { ProgressBarProps } from './types'

export default function ProgressBar({ label, progress }: ProgressBarProps) {

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-medium text-purple-700">
          {label}
        </span>
        <span className="text-sm font-medium text-purple-700">
          {progress.toFixed(1)}%
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className={`bg-purple h-2.5 rounded-full transition-all duration-300 ease-in-out`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  )
}
