import React from 'react'
import { useProgress } from '../contexts/ProgressContext'

interface ContinueLearningProps {
  onNavigateToModule?: (moduleId: number) => void
}

const ContinueLearning: React.FC<ContinueLearningProps> = ({ onNavigateToModule }) => {
  const { getLastAccessedModule, getOverallProgress, getModuleProgress } = useProgress()
  
  const lastAccessedModule = getLastAccessedModule()
  const overallProgress = getOverallProgress()
  const allModulesCompleted = overallProgress >= 100

  const findNextIncompleteModule = (currentModuleId: number): number | null => {
    // Check modules in order from current+1 to 5
    for (let moduleId = currentModuleId + 1; moduleId <= 5; moduleId++) {
      const progress = getModuleProgress(moduleId)
      if (progress.progressPercentage < 100) {
        return moduleId
      }
    }
    // If no incomplete modules found after current, check from beginning
    for (let moduleId = 1; moduleId < currentModuleId; moduleId++) {
      const progress = getModuleProgress(moduleId)
      if (progress.progressPercentage < 100) {
        return moduleId
      }
    }
    return null
  }
  
  const getModuleTitle = (moduleId: number): string => {
    const moduleTitles: { [key: number]: string } = {
      1: 'A clear conscious',
      2: 'Health by design 2',
      3: 'Hope for restoration',
      4: 'Praying for your Man of God',
      5: 'Priesthood by the spirit'
    }
    return moduleTitles[moduleId] || `Module ${moduleId}`
  }

  const getModuleDescription = (moduleId: number): string => {
    const descriptions: { [key: number]: string } = {
      1: 'Learn what it means to have a clear conscious inChrist and follow His teachings faithfully.',
      2: 'Experience the living Word that enlightens, empowers, and strengthens your faith journey.',
      3: 'Develop a humble and receptive heart that is open to God\'s guidance and instruction.',
      4: 'Discover who you are in Christ and live boldly as a new creation in His power.',
      5: 'Build spiritual strength and resilience to overcome life\'s challenges through faith.'
    }
    return descriptions[moduleId] || 'Continue your learning journey with this module.'
  }

  if (!lastAccessedModule) {
    return (
      <div className="bg-white dark:bg-secondary-900 rounded-lg border border-secondary-200 dark:border-secondary-700 p-6">
        <h2 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100 mb-6">
          Start Your Journey
        </h2>
        
        <div className="text-center py-8">
          <div className="text-secondary-400 dark:text-secondary-500 mb-4">
            <i className="bi bi-play-circle text-6xl"></i>
          </div>
          <h3 className="text-lg font-medium text-secondary-900 dark:text-secondary-100 mb-2">
            Begin Your Discipleship Journey
          </h3>
          <p className="text-secondary-600 dark:text-secondary-400 mb-6">
            Start with Module 1: A clear conscious to begin your learning experience.
          </p>
          <button
            onClick={() => onNavigateToModule?.(1)}
            className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Start Learning
          </button>
        </div>
      </div>
    )
  }

  // Show congratulations message if all modules are completed
  if (allModulesCompleted) {
    return (
      <div className="bg-white dark:bg-secondary-900 rounded-lg border border-secondary-200 dark:border-secondary-700 p-6">
        <h2 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100 mb-6">
          Congratulations!
        </h2>
        
        <div className="text-center py-8">
          <div className="text-green-500 dark:text-green-400 mb-4">
            <i className="bi bi-trophy-fill text-6xl"></i>
          </div>
          <h3 className="text-lg font-medium text-secondary-900 dark:text-secondary-100 mb-2">
            You have completed all modules!
          </h3>
          <p className="text-secondary-600 dark:text-secondary-400 mb-6">
            Congratulations on completing your entire discipleship journey. You can now review any module or explore the audio resources.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigateToModule?.(1)}
              className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Review Modules
            </button>
            <button
              onClick={() => window.location.hash = '#audios'}
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Listen to Audios
            </button>
          </div>
        </div>
      </div>
    )
  }

  const { moduleId, progress } = lastAccessedModule
  const moduleTitle = getModuleTitle(moduleId)
  const moduleDescription = getModuleDescription(moduleId)
  const progressPercentage = progress.progressPercentage
  const isCompleted = progressPercentage >= 100

  const getContinueButtonText = () => {
    if (isCompleted) {
      const nextIncompleteModule = findNextIncompleteModule(moduleId)
      if (nextIncompleteModule) {
        return `Continue to Module ${nextIncompleteModule}`
      } else {
        return 'Review Module'
      }
    } else {
      return 'Continue Journey'
    }
  }

  const handleContinue = () => {
    if (isCompleted) {
      // Find the next incomplete module
      const nextIncompleteModule = findNextIncompleteModule(moduleId)
      if (nextIncompleteModule) {
        onNavigateToModule?.(nextIncompleteModule)
      } else {
        // All modules are completed, go to first module for review
        onNavigateToModule?.(1)
      }
    } else {
      // Continue current module
      onNavigateToModule?.(moduleId)
    }
  }

  return (
    <div className="bg-white dark:bg-secondary-900 rounded-lg border border-secondary-200 dark:border-secondary-700 p-6">
      <h2 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100 mb-6">
        {isCompleted ? 'Completed Module' : 'Continue Learning'}
      </h2>
      
      <div className="flex items-center space-x-6">
        {/* Module Icon */}
        <div className="flex-shrink-0">
          <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
            <span className="text-xl font-bold text-primary-600 dark:text-primary-400">
              {moduleId}
            </span>
          </div>
        </div>
        
        {/* Module Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100 mb-2">
            {moduleTitle}
          </h3>
          <p className="text-sm text-secondary-600 dark:text-secondary-400 mb-4 line-clamp-2">
            {moduleDescription}
          </p>
          
          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-secondary-900 dark:text-secondary-100">
                Progress
              </span>
              <span className="text-sm font-medium text-secondary-900 dark:text-secondary-100">
                {progressPercentage}%
              </span>
            </div>
            <div className="w-full bg-secondary-200 dark:bg-secondary-700 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${
                  isCompleted 
                    ? 'bg-green-500' 
                    : 'bg-primary-600'
                }`}
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
          
          {/* Action Button */}
          <button
            onClick={handleContinue}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
              isCompleted
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-primary-600 hover:bg-primary-700 text-white'
            }`}
          >
            <i className={`bi ${isCompleted ? 'bi-arrow-right-circle' : 'bi-play-circle'}`}></i>
            <span>
              {getContinueButtonText()}
            </span>
          </button>
        </div>
        
        {/* Status Badge */}
        <div className="flex-shrink-0">
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            isCompleted
              ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
              : 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
          }`}>
            {isCompleted ? 'Completed' : 'In Progress'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContinueLearning
