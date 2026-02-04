import React, { useState } from 'react'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  currentPage?: string
  onNavigate?: (page: string) => void
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, currentPage = 'dashboard', onNavigate }) => {
  const [expandedItems, setExpandedItems] = useState<string[]>(['resources', 'evaluation'])

  const toggleExpanded = (item: string) => {
    setExpandedItems(prev => 
      prev.includes(item) 
        ? prev.filter(i => i !== item)
        : [...prev, item]
    )
  }

  const handleNavigation = (page: string) => {
    if (onNavigate) {
      onNavigate(page)
    }
    if (window.innerWidth < 1024) {
      onClose()
    }
  }

  const menuItems = [
    { id: 'dashboard', icon: 'bi-speedometer2', label: 'My Disciple Program', active: currentPage === 'dashboard' },
    { id: 'audios', icon: 'bi-headphones', label: 'Audios', active: currentPage === 'audios' },
    { id: 'pdfs', icon: 'bi-file-earmark-pdf', label: 'PDFs', active: currentPage === 'pdfs' },
    { id: 'flashcards', icon: 'bi-card-text', label: 'Flashcards', active: currentPage === 'flashcards' },
    { id: 'study-tips', icon: 'bi-lightbulb', label: 'Study Tips', active: currentPage === 'study-tips' },
    { 
      id: 'evaluation', 
      icon: 'bi-clipboard-check', 
      label: 'Evaluation', 
      active: currentPage === 'evaluation',
      expandable: true,
      children: [
        { id: 'quizzes', label: 'Quizzes' },
        { id: 'tests', label: 'Tests' }
      ]
    },
    { id: 'help', icon: 'bi-question-circle', label: 'Help Center', active: currentPage === 'help' }
  ]

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-64 bg-white dark:bg-secondary-900 border-r border-secondary-200 dark:border-secondary-700 z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 lg:static lg:z-auto`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-secondary-200 dark:border-secondary-700">
            <div className="flex items-center space-x-3">
              <div className="w-14 h-14 rounded-full overflow-hidden">
                <img 
                  src="/src/assets/RP logo.png" 
                  alt="Profile Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-primary-600 dark:text-primary-400 font-bold text-lg leading-tight" style={{fontFamily: 'Times New Roman, serif'}}>
                ROYAL PRIESTHOOD
              </div>
            </div>
            <button 
              onClick={onClose}
              className="lg:hidden text-secondary-500 dark:text-secondary-400 hover:text-secondary-700 dark:hover:text-secondary-300"
            >
              <i className="bi bi-x-lg text-xl"></i>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-3">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <div className="flex flex-col">
                    <button
                      onClick={() => {
                        if (item.expandable) {
                          toggleExpanded(item.id)
                        } else {
                          handleNavigation(item.id)
                        }
                      }}
                      className={`flex items-center justify-between w-full px-3 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 ${
                        item.active 
                          ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 border-r-2 border-primary-600 dark:border-primary-400' 
                          : 'text-secondary-600 dark:text-secondary-300 hover:bg-secondary-50 dark:hover:bg-secondary-800 hover:text-secondary-900 dark:hover:text-secondary-100'
                      }`}
                    >
                      <div className="flex items-center">
                        <i className={`${item.icon} text-base mr-3`}></i>
                        <span>{item.label}</span>
                      </div>
                      {item.expandable && (
                        <i className={`bi bi-chevron-${expandedItems.includes(item.id) ? 'down' : 'right'} text-xs`}></i>
                      )}
                    </button>
                    
                    {/* Submenu */}
                    {item.expandable && item.children && expandedItems.includes(item.id) && (
                      <ul className="ml-6 mt-1 space-y-1">
                        {item.children.map((child) => (
                          <li key={child.id}>
                            <button 
                              onClick={() => handleNavigation(child.id)}
                              className="flex items-center w-full px-3 py-2 text-sm text-secondary-600 dark:text-secondary-300 hover:bg-secondary-50 dark:hover:bg-secondary-800 hover:text-secondary-900 dark:hover:text-secondary-100 rounded-lg transition-colors duration-200"
                            >
                              {child.label}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  )
}

export default Sidebar
