import React from 'react'
import { getPDFContentByModule } from '../data/pdfContent'

interface InlinePDFViewerProps {
  moduleId: number
  title: string
  onClose?: () => void
}

const InlinePDFViewer: React.FC<InlinePDFViewerProps> = ({ moduleId, title, onClose }) => {
  const pdfContent = getPDFContentByModule(moduleId)

  if (!pdfContent) {
    return (
      <div className="bg-white dark:bg-secondary-900 rounded-lg border border-secondary-200 dark:border-secondary-700 p-6">
        <div className="text-center text-secondary-600 dark:text-secondary-400">
          <i className="bi bi-file-earmark-x text-4xl mb-4"></i>
          <p>PDF content not found for this module</p>
        </div>
      </div>
    )
  }

  const renderContent = (text: string) => {
    // Split by lines and render with markdown-like formatting
    return text.split('\n').map((line, index) => {
      if (line.startsWith('# ')) {
        return <h1 key={index} className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mb-4 mt-6">{line.substring(2)}</h1>
      } else if (line.startsWith('## ')) {
        return <h2 key={index} className="text-xl font-semibold text-secondary-900 dark:text-secondary-100 mb-3 mt-5">{line.substring(3)}</h2>
      } else if (line.startsWith('### ')) {
        return <h3 key={index} className="text-lg font-medium text-secondary-900 dark:text-secondary-100 mb-2 mt-4">{line.substring(4)}</h3>
      } else if (line.startsWith('#### ')) {
        return <h4 key={index} className="text-base font-medium text-secondary-900 dark:text-secondary-100 mb-2 mt-3">{line.substring(5)}</h4>
      } else if (line.startsWith('- ')) {
        return <li key={index} className="ml-6 text-secondary-700 dark:text-secondary-300 mb-1">{line.substring(2)}</li>
      } else if (line.match(/^\d+\. /)) {
        return <li key={index} className="ml-6 text-secondary-700 dark:text-secondary-300 mb-1 list-decimal">{line.substring(line.indexOf(' ') + 1)}</li>
      } else if (line.startsWith('**') && line.endsWith('**')) {
        return <p key={index} className="font-semibold text-secondary-900 dark:text-secondary-100 mb-2">{line.slice(2, -2)}</p>
      } else if (line.startsWith('*') && line.endsWith('*')) {
        return <p key={index} className="italic text-secondary-700 dark:text-secondary-300 mb-2">{line.slice(1, -1)}</p>
      } else if (line.startsWith('"') && line.endsWith('"')) {
        return <p key={index} className="text-primary-600 dark:text-primary-400 italic mb-2 border-l-2 border-primary-300 dark:border-primary-600 pl-3">{line}</p>
      } else if (line.trim() === '') {
        return <br key={index} />
      } else {
        return <p key={index} className="text-secondary-700 dark:text-secondary-300 mb-2 leading-relaxed">{line}</p>
      }
    })
  }

  return (
    <div className="bg-white dark:bg-secondary-900 rounded-lg border border-secondary-200 dark:border-secondary-700 overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-secondary-200 dark:border-secondary-700">
        <h3 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100">
          {title}
        </h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => window.print()}
            className="flex items-center px-3 py-1.5 text-sm text-secondary-600 dark:text-secondary-400 hover:text-secondary-900 dark:hover:text-secondary-200 border border-secondary-300 dark:border-secondary-600 rounded-lg transition-colors duration-200"
          >
            <i className="bi bi-printer mr-2"></i>
            Print
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="text-secondary-400 hover:text-secondary-600 dark:hover:text-secondary-300"
            >
              <i className="bi bi-x-lg text-xl"></i>
            </button>
          )}
        </div>
      </div>

      <div className="relative" style={{ height: '600px' }}>
        <div className="h-full overflow-auto p-6 bg-secondary-50 dark:bg-secondary-950">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-secondary-900 rounded-lg p-8 shadow-sm">
              {renderContent(pdfContent.content)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InlinePDFViewer
