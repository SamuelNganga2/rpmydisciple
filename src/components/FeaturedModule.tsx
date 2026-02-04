import React from 'react'
import ProgressBar from './ProgressBar'

interface FeaturedModuleProps {
  onContinue: () => void
}

const FeaturedModule: React.FC<FeaturedModuleProps> = ({ onContinue }) => {
  return (
    <div className="bg-white dark:bg-secondary-900 rounded-lg border border-secondary-200 dark:border-secondary-700 p-6">
      <h2 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100 mb-6">
        My Disciple Program
      </h2>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Illustration */}
        <div className="lg:w-1/3">
          <div className="bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 rounded-lg p-6 h-48 flex items-center justify-center">
            <div className="text-center">
              <i className="bi bi-book text-6xl text-primary-600 dark:text-primary-400 mb-2"></i>
              <div className="text-sm text-secondary-600 dark:text-secondary-400">Learning Journey</div>
            </div>
          </div>
        </div>
        
        {/* Module Info */}
        <div className="lg:w-2/3">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100 mb-1">
              CULTIVATING A TEACHABLE SPIRIT
            </h3>
            <p className="text-sm text-secondary-600 dark:text-secondary-400">MOG</p>
          </div>
          
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-secondary-600 dark:text-secondary-400">Progress</span>
              <span className="text-sm font-medium text-secondary-900 dark:text-secondary-100">51% Completed</span>
            </div>
            <ProgressBar progress={51} />
          </div>
          
          <button 
            onClick={onContinue}
            className="w-full bg-primary-600 dark:bg-primary-700 text-white py-3 px-6 rounded-lg font-medium hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors duration-200"
          >
            Continue Journey
          </button>
        </div>
      </div>
    </div>
  )
}

export default FeaturedModule
