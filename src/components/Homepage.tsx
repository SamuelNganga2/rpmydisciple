import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useProgress } from '../contexts/ProgressContext'
import ContinueLearning from './ContinueLearning'
import ModulesTable from './ModulesTable'
import ProgressBar from './ProgressBar'

interface HomepageProps {
  onNavigateToLesson: () => void
  onNavigateToModule?: (moduleId: number) => void
}

const Homepage: React.FC<HomepageProps> = ({ onNavigateToLesson, onNavigateToModule }) => {
  const { user } = useAuth()
  const { getOverallProgress } = useProgress()
  const overallProgress = getOverallProgress()

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-white dark:bg-secondary-900 rounded-lg border border-secondary-200 dark:border-secondary-700 p-6 lg:p-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
          Hello, {user?.name || 'User'}
        </h1>
        
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100 mb-3">
            Your Overall Progress
          </h2>
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <ProgressBar progress={overallProgress} />
            </div>
            <span className="text-sm font-medium text-secondary-900 dark:text-secondary-100">
              {overallProgress}% Completed
            </span>
          </div>
        </div>
      </div>

      {/* Continue Learning */}
      <ContinueLearning onNavigateToModule={onNavigateToModule} />

      {/* All Modules */}
      <ModulesTable onNavigateToModule={onNavigateToModule} />
    </div>
  )
}

export default Homepage
