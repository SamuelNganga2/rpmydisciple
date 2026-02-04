import React, { useState } from 'react'
import { useProgress } from '../contexts/ProgressContext'
import { useAudio } from '../contexts/AudioContext'
import InlinePDFViewer from './InlinePDFViewer'
import ProgressBar from './ProgressBar'
import { getResourcesByModule, ModuleResource } from '../data/moduleResources'

interface ModulesTableProps {
  onNavigateToModule?: (moduleId: number) => void
}

const ModulesTable: React.FC<ModulesTableProps> = ({ onNavigateToModule }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [searchFilteredModules, setSearchFilteredModules] = useState<Array<{id: number, title: string, instructor: string}>>([])
  const [selectedResource, setSelectedResource] = useState<ModuleResource | null>(null)
  const [showPDFViewer, setShowPDFViewer] = useState(false)
  const { getModuleProgress } = useProgress()
  const { playAudio } = useAudio()
  
  const modules = [
    {
      id: 1,
      title: 'A clear conscious',
      instructor: 'MOG'
    },
    {
      id: 2,
      title: 'Health by design 2',
      instructor: 'MOG'
    },
    {
      id: 3,
      title: 'Hope for restoration',
      instructor: 'MOG'
    },
    {
      id: 4,
      title: 'Praying for your Man of God',
      instructor: 'MOG'
    },
    {
      id: 5,
      title: 'Priesthood by the spirit',
      instructor: 'MOG'
    }
  ]

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchTerm(query)
    
    if (query.trim() === '') {
      setShowSearchResults(false)
      setSearchFilteredModules([])
      return
    }

    const filtered = modules.filter(module => 
      module.title.toLowerCase().includes(query.toLowerCase())
    )
    
    setSearchFilteredModules(filtered)
    setShowSearchResults(true)
  }

  const handleModuleSelect = (moduleId: number) => {
    setSearchTerm('')
    setShowSearchResults(false)
    setSearchFilteredModules([])
    if (onNavigateToModule) {
      onNavigateToModule(moduleId)
    }
  }

  const handleSearchBlur = () => {
    // Delay hiding results to allow clicking on results
    setTimeout(() => {
      setShowSearchResults(false)
    }, 300)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    // Prevent blur when clicking on dropdown items
    e.preventDefault()
  }

  const handlePlayAudio = (resource: ModuleResource) => {
    playAudio(resource.url, resource.title, resource.moduleId)
  }

  const handleViewPDF = (resource: ModuleResource) => {
    setSelectedResource(resource)
    setShowPDFViewer(true)
  }

  const closeViewers = () => {
    setShowPDFViewer(false)
    setSelectedResource(null)
  }

  return (
    <div className="bg-white dark:bg-secondary-900 rounded-lg border border-secondary-200 dark:border-secondary-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100">
          All Modules
        </h2>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <i className="bi bi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 dark:text-secondary-500"></i>
            <input
              type="text"
              placeholder="Search modules..."
              value={searchTerm}
              onChange={handleSearchChange}
              onBlur={handleSearchBlur}
              onFocus={() => searchTerm.trim() !== '' && setShowSearchResults(true)}
              className="pl-10 pr-4 py-2 bg-secondary-50 dark:bg-secondary-800 border border-secondary-200 dark:border-secondary-700 rounded-lg text-sm text-secondary-900 dark:text-secondary-100 placeholder-secondary-500 dark:placeholder-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            
            {/* Search Results Dropdown */}
            {showSearchResults && searchFilteredModules.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-secondary-900 border border-secondary-200 dark:border-secondary-700 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
                <div className="px-3 py-2 border-b border-secondary-100 dark:border-secondary-700">
                  <p className="text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wide">
                    Modules ({searchFilteredModules.length})
                  </p>
                </div>
                {searchFilteredModules.map((module) => (
                  <button
                    key={module.id}
                    onClick={() => handleModuleSelect(module.id)}
                    onMouseDown={handleMouseDown}
                    className="w-full text-left px-4 py-3 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors duration-200 border-b border-secondary-100 dark:border-secondary-700 last:border-b-0 group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-secondary-900 dark:text-secondary-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 truncate">
                          {module.title}
                        </div>
                        <div className="text-xs text-secondary-500 dark:text-secondary-400 mt-1">
                          Module {module.id} • {module.instructor} • Click to view content
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-3">
                        <span className="text-xs bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 px-2 py-1 rounded-full font-medium">
                          {module.id}
                        </span>
                        <i className="bi bi-arrow-right-short text-secondary-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200"></i>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
            
            {/* No Results Message */}
            {showSearchResults && searchTerm.trim() !== '' && searchFilteredModules.length === 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-secondary-900 border border-secondary-200 dark:border-secondary-700 rounded-lg shadow-lg z-50">
                <div className="px-4 py-3 text-sm text-secondary-500 dark:text-secondary-400">
                  No modules found matching "{searchTerm}"
                </div>
              </div>
            )}
          </div>
          
          <button className="flex items-center space-x-2 px-4 py-2 text-sm text-secondary-600 dark:text-secondary-400 border border-secondary-300 dark:border-secondary-600 rounded-lg hover:bg-secondary-50 dark:hover:bg-secondary-800 transition-colors duration-200">
            <i className="bi bi-funnel"></i>
            <span>Filter All</span>
          </button>
        </div>
      </div>
      
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-secondary-200 dark:border-secondary-700">
              <th className="text-left py-3 px-4 text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wider">
                Program Title
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wider">
                Instructor
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wider">
                Progress
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wider">
                Audio
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wider">
                PDF
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-secondary-200 dark:divide-secondary-700">
            {modules.map((module) => (
              <tr key={module.id} className="hover:bg-secondary-50 dark:hover:bg-secondary-800 transition-colors duration-200">
                <td className="py-4 px-4">
                  <div className="font-medium text-secondary-900 dark:text-secondary-100">
                    {module.title}
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="text-secondary-600 dark:text-secondary-400">
                    {module.instructor}
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex-1">
                      <ProgressBar progress={getModuleProgress(module.id).progressPercentage} />
                    </div>
                    <span className="text-sm font-medium text-secondary-900 dark:text-secondary-100 min-w-0">
                      {getModuleProgress(module.id).progressPercentage}%
                    </span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  {(() => {
                    const audioResource = getResourcesByModule(module.id).find(r => r.type === 'audio')
                    return audioResource ? (
                      <button
                        onClick={() => handlePlayAudio(audioResource)}
                        className="flex items-center px-3 py-1.5 text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 border border-primary-200 dark:border-primary-700 rounded-lg transition-colors duration-200"
                        title={audioResource.title}
                      >
                        <i className="bi bi-play-circle mr-2"></i>
                        Play
                      </button>
                    ) : (
                      <span className="text-sm text-secondary-400 dark:text-secondary-500">N/A</span>
                    )
                  })()}
                </td>
                <td className="py-4 px-4">
                  {(() => {
                    const pdfResource = getResourcesByModule(module.id).find(r => r.type === 'pdf')
                    return pdfResource ? (
                      <button
                        onClick={() => handleViewPDF(pdfResource)}
                        className="flex items-center px-3 py-1.5 text-sm text-secondary-600 dark:text-secondary-400 hover:text-secondary-900 dark:hover:text-secondary-200 border border-secondary-300 dark:border-secondary-600 rounded-lg transition-colors duration-200"
                        title={pdfResource.title}
                      >
                        <i className="bi bi-file-earmark-pdf mr-2"></i>
                        View
                      </button>
                    ) : (
                      <span className="text-sm text-secondary-400 dark:text-secondary-500">N/A</span>
                    )
                  })()}
                </td>
                <td className="py-4 px-4">
                  <button 
                    onClick={() => onNavigateToModule?.(module.id)}
                    className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors duration-200"
                  >
                    View Module
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* PDF Viewer Modal */}
      {showPDFViewer && selectedResource && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-6xl max-h-[90vh]">
            <InlinePDFViewer
              moduleId={selectedResource.moduleId}
              title={selectedResource.title}
              onClose={closeViewers}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default ModulesTable
