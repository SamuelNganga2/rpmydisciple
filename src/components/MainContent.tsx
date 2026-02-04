import React from 'react'
import { getPDFContentByModule } from '../data/pdfContent'

interface MainContentProps {
  onNavigateHome?: () => void
  moduleId?: number
  onNavigateToModule?: (moduleId: number) => void
}

const MainContent: React.FC<MainContentProps> = ({ onNavigateHome, moduleId = 3, onNavigateToModule }) => {
  const pdfContent = getPDFContentByModule(moduleId)

  const goToPreviousModule = () => {
    if (moduleId > 1 && onNavigateToModule) {
      onNavigateToModule(moduleId - 1)
    }
  }

  const goToNextModule = () => {
    if (moduleId < 5 && onNavigateToModule) {
      onNavigateToModule(moduleId + 1)
    }
  }

  const renderContent = (text: string) => {
    // Split by lines and render with markdown-like formatting
    return text.split('\n').map((line, index) => {
      if (line.startsWith('# ')) {
        return <h1 key={index} className="text-3xl font-bold text-secondary-900 dark:text-secondary-100 mb-6 mt-8">{line.substring(2)}</h1>
      } else if (line.startsWith('## ')) {
        return <h2 key={index} className="text-2xl font-semibold text-secondary-900 dark:text-secondary-100 mb-5 mt-7">{line.substring(3)}</h2>
      } else if (line.startsWith('### ')) {
        return <h3 key={index} className="text-xl font-medium text-secondary-900 dark:text-secondary-100 mb-4 mt-6">{line.substring(4)}</h3>
      } else if (line.startsWith('#### ')) {
        return <h4 key={index} className="text-lg font-medium text-secondary-900 dark:text-secondary-100 mb-3 mt-5">{line.substring(5)}</h4>
      } else if (line.startsWith('- ')) {
        return <li key={index} className="ml-6 text-secondary-700 dark:text-secondary-300 mb-2 list-disc">{line.substring(2)}</li>
      } else if (line.match(/^\d+\. /)) {
        return <li key={index} className="ml-6 text-secondary-700 dark:text-secondary-300 mb-2 list-decimal">{line.substring(line.indexOf(' ') + 1)}</li>
      } else if (line.startsWith('**') && line.endsWith('**')) {
        return <p key={index} className="font-semibold text-secondary-900 dark:text-secondary-100 mb-3">{line.slice(2, -2)}</p>
      } else if (line.startsWith('*') && line.endsWith('*')) {
        return <p key={index} className="italic text-secondary-700 dark:text-secondary-300 mb-3">{line.slice(1, -1)}</p>
      } else if (line.startsWith('"') && line.endsWith('"')) {
        return <p key={index} className="text-primary-600 dark:text-primary-400 italic mb-4 border-l-4 border-primary-300 dark:border-primary-600 pl-4 py-2 bg-primary-50 dark:bg-primary-900/20 rounded-r-lg">{line}</p>
      } else if (line.trim() === '') {
        return <br key={index} />
      } else {
        return <p key={index} className="text-secondary-700 dark:text-secondary-300 mb-4 leading-relaxed text-lg">{line}</p>
      }
    })
  }

  if (!pdfContent) {
    return (
      <div className="bg-white dark:bg-secondary-900 rounded-lg border border-secondary-200 dark:border-secondary-700 p-6 lg:p-8">
        <div className="text-center text-secondary-600 dark:text-secondary-400">
          <i className="bi bi-file-earmark-x text-4xl mb-4"></i>
          <p>Content not found for this module</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-secondary-900 rounded-lg border border-secondary-200 dark:border-secondary-700 p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center space-x-4">
          {onNavigateHome && (
            <button
              onClick={onNavigateHome}
              className="flex items-center justify-center w-10 h-10 text-secondary-600 dark:text-secondary-300 hover:text-secondary-900 dark:hover:text-secondary-100 hover:bg-secondary-50 dark:hover:bg-secondary-800 rounded-lg transition-colors duration-200"
              title="Back to Home"
            >
              <i className="bi bi-arrow-left text-lg"></i>
            </button>
          )}
          <h1 className="text-2xl lg:text-3xl font-bold text-secondary-900 dark:text-secondary-100">
            {pdfContent.title}
          </h1>
        </div>
        <button className="text-secondary-400 dark:text-secondary-500 hover:text-secondary-600 dark:hover:text-secondary-400">
          <i className="bi bi-bookmark text-xl"></i>
        </button>
      </div>

      {/* Content */}
      <div className="prose prose-secondary max-w-none">
        <div className="space-y-6">
          {renderContent(pdfContent.content)}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-12 pt-6 border-t border-secondary-200 dark:border-secondary-700">
        <button 
          onClick={goToPreviousModule}
          disabled={moduleId <= 1}
          className="flex items-center px-4 py-2 text-sm text-secondary-600 dark:text-secondary-400 hover:text-secondary-900 dark:hover:text-secondary-200 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <i className="bi bi-chevron-left mr-2"></i>
          Previous Module
        </button>
        
        <button 
          onClick={goToNextModule}
          disabled={moduleId >= 5}
          className="flex items-center px-6 py-2 bg-primary-600 dark:bg-primary-700 text-white rounded-lg hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next Module
          <i className="bi bi-chevron-right ml-2"></i>
        </button>
      </div>
    </div>
  )
}

export default MainContent
