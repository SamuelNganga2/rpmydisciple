import React from 'react'

interface ProgressBarProps {
  progress: number
  className?: string
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, className = '' }) => {
  return (
    <div className={`w-full bg-secondary-200 dark:bg-secondary-700 rounded-full h-2 ${className}`}>
      <div 
        className="bg-primary-600 dark:bg-primary-500 h-2 rounded-full transition-all duration-300 ease-out"
        style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
      ></div>
    </div>
  )
}

export default ProgressBar
