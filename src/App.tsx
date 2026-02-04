import React, { useState, useEffect } from 'react'
import { ThemeProvider } from './contexts/ThemeContext'
import { AuthProvider } from './contexts/AuthContext'
import { ProgressProvider } from './contexts/ProgressContext'
import { AudioProvider } from './contexts/AudioContext'
import ProtectedContent from './components/ProtectedContent'
import SignIn from './components/SignIn'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [currentModuleId, setCurrentModuleId] = useState(3)
  const [showSignIn, setShowSignIn] = useState(false)

  // Scroll to top when page changes
  useEffect(() => {
    // Force immediate scroll to top
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    // Also try documentElement as fallback
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }, [currentPage])

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const closeSidebar = () => {
    setSidebarOpen(false)
  }

  const handleNavigation = (page: string) => {
    setCurrentPage(page)
  }

  const navigateToLesson = () => {
    setCurrentPage('lesson')
  }

  const navigateToHome = () => {
    setCurrentPage('dashboard')
  }

  const navigateToModule = (moduleId: number) => {
    setCurrentModuleId(moduleId)
    setCurrentPage('lesson')
  }

  return (
    <AuthProvider>
      <AudioProvider>
        <ProgressProvider>
          <ThemeProvider>
            <div className="min-h-screen bg-secondary-50 dark:bg-secondary-950 font-primary transition-colors duration-200">
              <div className="flex h-screen">
                <ProtectedContent
                  sidebarOpen={sidebarOpen}
                  currentPage={currentPage}
                  currentModuleId={currentModuleId}
                  closeSidebar={closeSidebar}
                  toggleSidebar={toggleSidebar}
                  handleNavigation={handleNavigation}
                  navigateToLesson={navigateToLesson}
                  navigateToHome={navigateToHome}
                  navigateToModule={navigateToModule}
                  onSignInClick={() => setShowSignIn(true)}
                />
              </div>
              
              {/* Sign In Modal */}
              {showSignIn && (
                <SignIn onClose={() => setShowSignIn(false)} />
              )}
            </div>
          </ThemeProvider>
        </ProgressProvider>
      </AudioProvider>
    </AuthProvider>
  )
}

export default App
