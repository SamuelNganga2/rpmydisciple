import React from 'react'
import { pdfContents } from '../data/pdfContent'

const PDFs: React.FC = () => {
  // Group PDFs by module
  const pdfsByModule = pdfContents.reduce((acc, pdf) => {
    if (!acc[pdf.moduleId]) {
      acc[pdf.moduleId] = []
    }
    acc[pdf.moduleId].push(pdf)
    return acc
  }, {} as Record<number, typeof pdfContents>)

 const getModuleTitle = (moduleId: number): string => {
    const moduleTitles: Record<number, string> = {
      1: 'A clear conscious',
      2: 'Health by design 2',
      3: 'Hope for restoration',
      4: 'Praying for your Man of God',
      5: 'Priesthood by the spirit'
    }
    return moduleTitles[moduleId] || `Module ${moduleId}`
  }

  const handleViewPDF = (content: string, title: string) => {
    // Create a new window with the PDF content
    const newWindow = window.open('', '_blank')
    if (newWindow) {
      newWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>${title}</title>
          <meta charset="UTF-8">
          <style>
            body {
              font-family: Arial, sans-serif;
              font-size: 16px;
              line-height: 1.6;
              color: #333;
              max-width: 800px;
              margin: 0 auto;
              padding: 20px;
            }
            h1 { color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px; }
            h2 { color: #34495e; margin-top: 30px; }
            h3 { color: #7f8c8d; }
            ul { margin: 15px 0; }
            li { margin: 8px 0; }
            strong { color: #2c3e50; }
            em { color: #7f8c8d; }
            @media print {
              body { font-size: 12pt; }
              h1 { font-size: 18pt; }
              h2 { font-size: 16pt; }
            }
          </style>
        </head>
        <body>
          <h1>${title}</h1>
          <div>${content.replace(/\n/g, '<br>')}</div>
          <script>
            window.onload = function() {
              window.print();
            }
          </script>
        </body>
        </html>
      `)
      newWindow.document.close()
    }
  }

  const handleDownloadPDF = (content: string, title: string) => {
    // Create a text file with the content
    const blob = new Blob([content], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-secondary-900 dark:text-secondary-100 mb-6">
        PDF Resources
      </h1>
      <p className="text-lg text-secondary-600 dark:text-secondary-400 mb-8">
        Access comprehensive study guides, materials, and content from every module.
      </p>

      <div className="space-y-8">
        {Object.entries(pdfsByModule)
          .sort(([a], [b]) => parseInt(a) - parseInt(b))
          .map(([moduleId, pdfs]) => (
            <div key={moduleId} className="bg-white dark:bg-secondary-900 rounded-lg border border-secondary-200 dark:border-secondary-700 overflow-hidden">
              {/* Module Header */}
              <div className="bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 px-6 py-4 border-b border-primary-200 dark:border-primary-800">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary-600 dark:bg-primary-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">{moduleId}</span>
                  </div>
                  <h2 className="text-xl font-semibold text-primary-900 dark:text-primary-100">
                    {getModuleTitle(parseInt(moduleId))}
                  </h2>
                  <span className="bg-primary-200 dark:bg-primary-800 text-primary-800 dark:text-primary-200 px-3 py-1 rounded-full text-sm font-medium">
                    {pdfs.length} PDF{pdfs.length > 1 ? 's' : ''}
                  </span>
                </div>
              </div>

              {/* PDFs List */}
              <div className="p-6">
                <div className="space-y-4">
                  {pdfs.map((pdf, index) => (
                    <div key={`${pdf.moduleId}-${index}`} className="flex items-center justify-between p-4 bg-secondary-50 dark:bg-secondary-800 rounded-lg border border-secondary-200 dark:border-secondary-700 hover:bg-secondary-100 dark:hover:bg-secondary-700 transition-colors duration-200">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                          <i className="bi bi-file-earmark-pdf text-xl text-red-600 dark:text-red-400"></i>
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-secondary-900 dark:text-secondary-100">
                            {pdf.title}
                          </h3>
                          <p className="text-sm text-secondary-600 dark:text-secondary-400">
                            Complete study guide with comprehensive content and materials
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleDownloadPDF(pdf.content, pdf.title)}
                          className="flex items-center space-x-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors duration-200"
                        >
                          <i className="bi bi-download"></i>
                          <span>Download</span>
                        </button>
                        <button
                          onClick={() => handleViewPDF(pdf.content, pdf.title)}
                          className="flex items-center space-x-2 px-4 py-2 bg-secondary-200 dark:bg-secondary-700 hover:bg-secondary-300 dark:hover:bg-secondary-600 text-secondary-700 dark:text-secondary-300 rounded-lg transition-colors duration-200"
                        >
                          <i className="bi bi-eye"></i>
                          <span>View</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Summary Section */}
      <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4">
          PDF Resources Summary
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3">
            <i className="bi bi-file-earmark-pdf text-blue-600 dark:text-blue-400"></i>
            <span className="text-blue-800 dark:text-blue-200">
              {pdfContents.length} Total PDFs
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <i className="bi bi-collection text-blue-600 dark:text-blue-400"></i>
            <span className="text-blue-800 dark:text-blue-200">
              {Object.keys(pdfsByModule).length} Modules
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <i className="bi bi-book text-blue-600 dark:text-blue-400"></i>
            <span className="text-blue-800 dark:text-blue-200">
              Study Guides & Materials
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PDFs
