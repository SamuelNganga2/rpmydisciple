import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-secondary-900 border-t border-secondary-200 dark:border-secondary-700 px-4 lg:px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <span className="text-sm text-secondary-500 dark:text-secondary-400">© 2025 ROYAL PRIESTHOOD</span>
        </div>
        
        <div className="text-sm text-secondary-500 dark:text-secondary-400">
          <span className="font-semibold text-black-600 dark:text-blue-400">posessing the land of the promise</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
