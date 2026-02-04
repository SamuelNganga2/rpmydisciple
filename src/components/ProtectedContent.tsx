import React, { useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useAudio } from '../contexts/AudioContext'
import Sidebar from './Sidebar'
import Header from './Header'
import Homepage from './Homepage'
import MainContent from './MainContent'
import ModuleOutline from './ModuleOutline'
import KeyScriptures from './KeyScriptures'
import QuickAccess from './QuickAccess'
import Footer from './Footer'
import AudioPlayer from './AudioPlayer'
import Audios from './Audios'
import StudyTips from './StudyTips'
import PDFs from './PDFs'

interface ProtectedContentProps {
  sidebarOpen: boolean
  currentPage: string
  currentModuleId?: number
  closeSidebar: () => void
  toggleSidebar: () => void
  handleNavigation: (page: string) => void
  navigateToLesson: () => void
  navigateToHome: () => void
  navigateToModule?: (moduleId: number) => void
  onSignInClick: () => void
}

const ProtectedContent: React.FC<ProtectedContentProps> = ({
  sidebarOpen,
  currentPage,
  currentModuleId = 3,
  closeSidebar,
  toggleSidebar,
  handleNavigation,
  navigateToLesson,
  navigateToHome,
  navigateToModule,
  onSignInClick
}) => {
  const { isAuthenticated } = useAuth()
  const { currentAudio, isAudioPlayerOpen, closeAudioPlayer } = useAudio()

  // Scroll to top when page or module changes
  useEffect(() => {
    if ((currentPage === 'lesson' && currentModuleId) || currentPage === 'dashboard') {
      // Small delay to ensure DOM is updated
      setTimeout(() => {
        // Try multiple selectors to find the scrollable container
        const scrollContainers = [
          document.querySelector('.overflow-auto'),
          document.querySelector('[class*="overflow-auto"]'),
          document.querySelector('.flex-1.overflow-auto'),
          document.body,
          document.documentElement
        ]
        
        // Find the first scrollable container
        for (const container of scrollContainers) {
          if (container) {
            container.scrollTop = 0
            // Also try scrollTo for good measure
            if (container.scrollTo) {
              container.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
            }
            break
          }
        }
      }, 100)
    }
  }, [currentModuleId, currentPage])

  const renderMainContent = () => {
    if (currentPage === 'lesson') {
      return (
        <div className="flex flex-col lg:flex-row gap-6 p-4 lg:p-6 max-w-7xl mx-auto">
          {/* Main content */}
          <div className="flex-1 min-w-0">
            <MainContent onNavigateHome={navigateToHome} moduleId={currentModuleId} onNavigateToModule={navigateToModule} />
          </div>
          
          {/* Right sidebar */}
          <div className="w-full lg:w-80 space-y-6">
            <ModuleOutline />
            <KeyScriptures />
            <QuickAccess currentModuleId={currentModuleId} />
          </div>
        </div>
      )
    }

    if (currentPage === 'audios') {
      return <Audios />
    }

    if (currentPage === 'study-tips') {
      return <StudyTips />
    }

    if (currentPage === 'pdfs') {
      return <PDFs />
    }

    // Default to homepage
    return (
      <div className="p-4 lg:p-6 max-w-7xl mx-auto">
        <Homepage onNavigateToLesson={navigateToLesson} onNavigateToModule={navigateToModule} />
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-secondary-50 dark:bg-secondary-950">
        <div className="text-center max-w-md">
          <div className="mb-8">
            <i className="bi bi-lock text-6xl text-secondary-400 dark:text-secondary-500 mb-4"></i>
            <h2 className="text-2xl font-semibold text-secondary-900 dark:text-secondary-100 mb-2">
              Authentication Required
            </h2>
            <p className="text-secondary-600 dark:text-secondary-400 mb-6">
              Please sign in to access the website content.
            </p>
            <button
              onClick={onSignInClick}
              className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Sign In to Continue
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={closeSidebar}
        currentPage={currentPage}
        onNavigate={handleNavigation}
      />
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col lg:ml-0 overflow-hidden">
        {/* Header */}
        <Header 
          onMenuClick={toggleSidebar} 
          showSearch={currentPage === 'dashboard'}
          currentPage={currentPage}
          currentModuleId={currentModuleId}
          onNavigateHome={navigateToHome}
          onSignInClick={onSignInClick}
          onModuleSelect={navigateToModule}
        />
        
        {/* Content */}
        <div className="flex-1 overflow-auto bg-secondary-50 dark:bg-secondary-950">
          {renderMainContent()}
        </div>
        
        {/* Footer */}
        <Footer />
      </div>
      
      {/* Floating Audio Player */}
      {isAudioPlayerOpen && currentAudio && (
        <div className="fixed bottom-4 right-4 z-50 w-80 bg-white dark:bg-secondary-900 rounded-lg shadow-lg border border-secondary-200 dark:border-secondary-700">
          <AudioPlayer
            audioUrl={currentAudio.url}
            title={currentAudio.title}
            moduleId={currentAudio.moduleId}
            onClose={closeAudioPlayer}
          />
        </div>
      )}
    </>
  )
}

export default ProtectedContent
