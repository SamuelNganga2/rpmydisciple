import React, { useState } from 'react'
import { useTheme } from '../contexts/ThemeContext'
import { useAuth } from '../contexts/AuthContext'
import ProfilePhotoUpload from './ProfilePhotoUpload'

interface HeaderProps {
  onMenuClick: () => void
  showSearch?: boolean
  currentPage?: string
  currentModuleId?: number
  onNavigateHome?: () => void
  onSignInClick?: () => void
  onModuleSelect?: (moduleId: number) => void
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, showSearch = false, currentPage = 'dashboard', currentModuleId, onNavigateHome, onSignInClick, onModuleSelect }) => {
  const { theme, toggleTheme } = useTheme()
  const { user, signOut, isAuthenticated } = useAuth()
  const [showProfileUpload, setShowProfileUpload] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [filteredModules, setFilteredModules] = useState<Array<{id: number, name: string}>>([])

  const getModuleName = (moduleId: number): string => {
    const moduleNames: { [key: number]: string } = {
      1: 'A clear conscious',
      2: 'Health by design 2',
      3: 'Hope for restoration',
      4: 'Praying for your Man of God',
      5: 'Priesthood by the spirit'
    }
    return moduleNames[moduleId] || 'Unknown Module'
  }

  const getAllModules = (): Array<{id: number, name: string}> => {
    return [
      { id: 1, name: 'A clear conscious' },
      { id: 2, name: 'Health by design 2' },
      { id: 3, name: 'Hope for restoration' },
      { id: 4, name: 'Praying for your Man of God' },
      { id: 5, name: 'Priesthood by the spirit' }
    ]
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    
    if (query.trim() === '') {
      setShowSearchResults(false)
      setFilteredModules([])
      return
    }

    const allModules = getAllModules()
    const filtered = allModules.filter(module => 
      module.name.toLowerCase().includes(query.toLowerCase())
    )
    
    setFilteredModules(filtered)
    setShowSearchResults(true)
  }

  const handleModuleSelect = (moduleId: number) => {
    setSearchQuery('')
    setShowSearchResults(false)
    setFilteredModules([])
    if (onModuleSelect) {
      onModuleSelect(moduleId)
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

  return (
    <>
      <header className="bg-white dark:bg-secondary-900 border-b border-secondary-200 dark:border-secondary-700 px-4 lg:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center flex-1">
            <button
              onClick={onMenuClick}
              className="lg:hidden text-secondary-600 dark:text-secondary-300 hover:text-secondary-900 dark:hover:text-secondary-100 mr-4"
            >
              <i className="bi bi-list text-xl"></i>
            </button>
            
            {/* Home button - only show when not on homepage */}
            {currentPage !== 'dashboard' && onNavigateHome && (
              <button
                onClick={onNavigateHome}
                className="flex items-center space-x-2 px-3 py-2 text-sm text-secondary-600 dark:text-secondary-300 hover:text-secondary-900 dark:hover:text-secondary-100 hover:bg-secondary-50 dark:hover:bg-secondary-800 rounded-lg transition-colors duration-200 mr-4"
              >
                <i className="bi bi-house-fill text-base"></i>
                <span className="hidden sm:inline">Home</span>
              </button>
            )}
            
            {showSearch && (
              <div className="flex-1 max-w-md mx-4 relative">
                <div className="relative">
                  <i className="bi bi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 dark:text-secondary-500"></i>
                  <input
                    type="text"
                    placeholder="Search Modules..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onBlur={handleSearchBlur}
                    onFocus={() => searchQuery.trim() !== '' && setShowSearchResults(true)}
                    className="w-full pl-10 pr-4 py-2 bg-secondary-50 dark:bg-secondary-800 border border-secondary-200 dark:border-secondary-700 rounded-lg text-sm text-secondary-900 dark:text-secondary-100 placeholder-secondary-500 dark:placeholder-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                
                {/* Search Results Dropdown */}
                {showSearchResults && filteredModules.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-secondary-900 border border-secondary-200 dark:border-secondary-700 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
                    <div className="px-3 py-2 border-b border-secondary-100 dark:border-secondary-700">
                      <p className="text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wide">
                        Modules ({filteredModules.length})
                      </p>
                    </div>
                    {filteredModules.map((module) => (
                      <button
                        key={module.id}
                        onClick={() => handleModuleSelect(module.id)}
                        onMouseDown={handleMouseDown}
                        className="w-full text-left px-4 py-3 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors duration-200 border-b border-secondary-100 dark:border-secondary-700 last:border-b-0 group"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-secondary-900 dark:text-secondary-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 truncate">
                              {module.name}
                            </div>
                            <div className="text-xs text-secondary-500 dark:text-secondary-400 mt-1">
                              Module {module.id} • Click to view content
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
                {showSearchResults && searchQuery.trim() !== '' && filteredModules.length === 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-secondary-900 border border-secondary-200 dark:border-secondary-700 rounded-lg shadow-lg z-50">
                    <div className="px-4 py-3 text-sm text-secondary-500 dark:text-secondary-400">
                      No modules found matching "{searchQuery}"
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {!showSearch && (
              <h1 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100">
                {currentPage === 'lesson' && currentModuleId ? getModuleName(currentModuleId) : 
                 currentPage === 'lesson' ? 'Lesson' : 
                 currentPage === 'audios' ? 'Audio Resources' : 
                 currentPage === 'study-tips' ? 'Study Tips' : 
                 currentPage === 'pdfs' ? 'PDF Resources' : 
                 'Dashboard'}
              </h1>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Theme toggle */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-secondary-600 dark:text-secondary-300 hidden sm:inline">Dark Mode</span>
              <button 
                onClick={toggleTheme}
                className="flex items-center space-x-2 text-secondary-600 dark:text-secondary-300 hover:text-secondary-900 dark:hover:text-secondary-100 transition-colors duration-200"
              >
                <i className={`bi ${theme === 'light' ? 'bi-brightness-high' : 'bi-brightness-high-fill'} text-lg`}></i>
                <div className="relative w-10 h-5 bg-secondary-200 dark:bg-secondary-700 rounded-full transition-colors duration-200">
                  <div className={`w-4 h-4 bg-white dark:bg-secondary-300 rounded-full absolute top-0.5 shadow-sm transition-transform duration-200 ${
                    theme === 'dark' ? 'translate-x-5' : 'translate-x-0.5'
                  }`}></div>
                </div>
                <i className={`bi ${theme === 'dark' ? 'bi-moon-fill' : 'bi-moon'} text-lg`}></i>
              </button>
            </div>
            
            {/* User authentication */}
            <div className="flex items-center">
              {isAuthenticated ? (
                <div className="flex items-center space-x-3">
                  <div className="hidden sm:block text-right">
                    <p className="text-sm font-medium text-secondary-900 dark:text-secondary-100">
                      {user?.name}
                    </p>
                    <p className="text-xs text-secondary-500 dark:text-secondary-400">
                      {user?.email}
                    </p>
                  </div>
                  <div className="relative">
                    <button
                      onClick={() => setShowProfileUpload(true)}
                      className="w-8 h-8 rounded-full overflow-hidden hover:ring-2 hover:ring-primary-500 transition-all duration-200"
                    >
                      {user?.profilePhoto ? (
                        <img 
                          src={user.profilePhoto} 
                          alt="User profile" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-secondary-200 dark:bg-secondary-700 flex items-center justify-center">
                          <i className="bi bi-person-fill text-secondary-400"></i>
                        </div>
                      )}
                    </button>
                  </div>
                  <button
                    onClick={signOut}
                    className="text-sm text-secondary-600 dark:text-secondary-300 hover:text-secondary-900 dark:hover:text-secondary-100 px-3 py-1 rounded-lg hover:bg-secondary-50 dark:hover:bg-secondary-800 transition-colors duration-200"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={onSignInClick}
                  className="bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </header>
      
      {showProfileUpload && (
        <ProfilePhotoUpload onClose={() => setShowProfileUpload(false)} />
      )}
    </>
  )
}

export default Header
