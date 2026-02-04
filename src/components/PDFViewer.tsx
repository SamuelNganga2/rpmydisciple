import React, { useState } from 'react'

interface PDFViewerProps {
  pdfUrl: string
  title: string
  onClose?: () => void
}

const PDFViewer: React.FC<PDFViewerProps> = ({ pdfUrl, title, onClose }) => {
  const [isLoading, setIsLoading] = useState(true)

  const handleLoad = () => {
    setIsLoading(false)
  }

  const handleError = () => {
    setIsLoading(false)
  }

  return (
    <div className="bg-white dark:bg-secondary-900 rounded-lg border border-secondary-200 dark:border-secondary-700 overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-secondary-200 dark:border-secondary-700">
        <h3 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100">
          {title}
        </h3>
        <div className="flex items-center space-x-2">
          <a
            href={pdfUrl}
            download
            className="flex items-center px-3 py-1.5 text-sm text-secondary-600 dark:text-secondary-400 hover:text-secondary-900 dark:hover:text-secondary-200 border border-secondary-300 dark:border-secondary-600 rounded-lg transition-colors duration-200"
          >
            <i className="bi bi-download mr-2"></i>
            Download
          </a>
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
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-secondary-50 dark:bg-secondary-900">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
              <p className="text-secondary-600 dark:text-secondary-400">Loading PDF...</p>
            </div>
          </div>
        )}
        
        <iframe
          src={pdfUrl}
          className="w-full h-full border-0"
          title={title}
          onLoad={handleLoad}
          onError={handleError}
        />
        
        {!isLoading && (
          <div className="absolute bottom-4 left-4 right-4 bg-white dark:bg-secondary-900 bg-opacity-90 dark:bg-opacity-90 rounded-lg p-3 border border-secondary-200 dark:border-secondary-700">
            <p className="text-sm text-secondary-600 dark:text-secondary-400">
              <i className="bi bi-info-circle mr-2"></i>
              Use the toolbar above to navigate, zoom, or download the PDF
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default PDFViewer
