import React, { useState } from 'react'

const ModuleOutline: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<string[]>(['foundation'])

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    )
  }

  const modules = [
    {
      id: 'foundation',
      title: 'Foundation of Faith',
      items: [
        { id: 'divine-love', title: 'Understanding Divine Love', completed: true },
        { id: 'grace-mercy', title: 'Grace and Mercy', completed: true },
        { id: 'spiritual-discipline', title: 'Spiritual Discipline', completed: false }
      ]
    },
    {
      id: 'teachable-spirit',
      title: 'Cultivating a Teachable Spirit',
      items: [],
      active: true
    },
    {
      id: 'purposeful-life',
      title: 'Living a Purposeful Life',
      items: []
    }
  ]

  return (
    <div className="bg-white dark:bg-secondary-900 rounded-lg border border-secondary-200 dark:border-secondary-700 p-4">
      <h3 className="font-semibold text-secondary-900 dark:text-secondary-100 mb-4">Module Outline</h3>
      
      <div className="space-y-2">
        {modules.map((module) => (
          <div key={module.id}>
            <button
              onClick={() => toggleSection(module.id)}
              className={`flex items-center justify-between w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 ${
                module.active 
                  ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400' 
                  : 'text-secondary-700 dark:text-secondary-300 hover:bg-secondary-50 dark:hover:bg-secondary-800'
              }`}
            >
              <span className="text-sm font-medium">{module.title}</span>
              <i className={`bi bi-chevron-${expandedSections.includes(module.id) ? 'down' : 'right'} text-xs`}></i>
            </button>
            
            {expandedSections.includes(module.id) && module.items && module.items.length > 0 && (
              <div className="ml-4 mt-2 space-y-1">
                {module.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-2 px-3 py-1.5">
                    <i className={`bi ${item.completed ? 'bi-check-circle-fill text-green-500' : 'bi-circle text-secondary-400 dark:text-secondary-500'} text-sm`}></i>
                    <span className="text-sm text-secondary-600 dark:text-secondary-400">{item.title}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ModuleOutline
