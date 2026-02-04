import React, { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'

interface ModuleProgress {
  moduleId: number
  audioCompleted: boolean
  audioProgress: number // 0-100 representing audio listening progress
  progressPercentage: number // Total progress (audio only)
  lastAccessed: Date
  permanentlyCompleted: boolean // Flag to prevent progress loss
}

interface ProgressContextType {
  moduleProgress: { [key: number]: ModuleProgress }
  updateAudioProgress: (moduleId: number, progress: number) => void
  markAudioCompleted: (moduleId: number) => void
  getModuleProgress: (moduleId: number) => ModuleProgress
  getOverallProgress: () => number
  resetProgress: (moduleId: number) => void
  resetAllProgress: () => void
  exportProgress: () => string
  importProgress: (progressData: string) => boolean
  getLastAccessedModule: () => { moduleId: number; progress: ModuleProgress } | null
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined)

export const useProgress = () => {
  const context = useContext(ProgressContext)
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider')
  }
  return context
}

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth()
  const [moduleProgress, setModuleProgress] = useState<{ [key: number]: ModuleProgress }>({})

  // Get user-specific storage keys
  const getStorageKeys = () => {
    const userId = user?.id || 'anonymous'
    return {
      localStorage: `moduleProgress_${userId}`,
      sessionStorage: `moduleProgress_backup_${userId}`
    }
  }

  // Reset progress when user changes
  useEffect(() => {
    const keys = getStorageKeys()
    
    // Load from user-specific storage on initial render or user change
    try {
      let saved = localStorage.getItem(keys.localStorage)
      
      // If localStorage fails, try sessionStorage backup
      if (!saved) {
        saved = sessionStorage.getItem(keys.sessionStorage)
        if (saved) {
          console.log('Loading progress from sessionStorage backup for user:', user?.id)
        }
      }
      
      if (saved) {
        const parsed = JSON.parse(saved)
        
        // Validate and migrate saved data
        const validatedProgress: { [key: number]: ModuleProgress } = {}
        
        Object.keys(parsed).forEach(key => {
          const moduleId = parseInt(key)
          const moduleData = parsed[key]
          
          // Ensure data structure is valid
          if (moduleData && typeof moduleData === 'object') {
            validatedProgress[moduleId] = {
              moduleId: moduleData.moduleId || moduleId,
              audioCompleted: Boolean(moduleData.audioCompleted),
              audioProgress: Math.min(Math.max(Number(moduleData.audioProgress) || 0, 0), 100),
              progressPercentage: Math.min(Math.max(Number(moduleData.progressPercentage) || 0, 0), 100),
              permanentlyCompleted: Boolean(moduleData.permanentlyCompleted),
              lastAccessed: moduleData.lastAccessed ? new Date(moduleData.lastAccessed) : new Date()
            }
          }
        })
        
        // Ensure all modules (1-5) exist
        for (let i = 1; i <= 5; i++) {
          if (!validatedProgress[i]) {
            validatedProgress[i] = {
              moduleId: i,
              audioCompleted: false,
              audioProgress: 0,
              progressPercentage: 0,
              permanentlyCompleted: false,
              lastAccessed: new Date()
            }
          }
        }
        
        console.log('Progress loaded successfully for user:', user?.id, validatedProgress)
        setModuleProgress(validatedProgress)
      } else {
        // Initialize with default progress for all modules
        const defaultProgress: { [key: number]: ModuleProgress } = {}
        for (let i = 1; i <= 5; i++) {
          defaultProgress[i] = {
            moduleId: i,
            audioCompleted: false,
            audioProgress: 0,
            progressPercentage: 0,
            permanentlyCompleted: false,
            lastAccessed: new Date()
          }
        }
        console.log('Initialized default progress for user:', user?.id)
        setModuleProgress(defaultProgress)
      }
    } catch (error) {
      console.error('Error loading progress from storage:', error)
      // Clear corrupted data
      localStorage.removeItem(keys.localStorage)
      sessionStorage.removeItem(keys.sessionStorage)
      
      // Initialize with default progress
      const defaultProgress: { [key: number]: ModuleProgress } = {}
      for (let i = 1; i <= 5; i++) {
        defaultProgress[i] = {
          moduleId: i,
          audioCompleted: false,
          audioProgress: 0,
          progressPercentage: 0,
          permanentlyCompleted: false,
          lastAccessed: new Date()
        }
      }
      setModuleProgress(defaultProgress)
    }
  }, [user?.id]) // Reset when user ID changes

  // Save to localStorage whenever progress changes
  useEffect(() => {
    if (Object.keys(moduleProgress).length === 0) return // Don't save empty progress
    
    try {
      const keys = getStorageKeys()
      const dataToSave = JSON.stringify(moduleProgress)
      localStorage.setItem(keys.localStorage, dataToSave)
      
      // Also save to sessionStorage as backup
      sessionStorage.setItem(keys.sessionStorage, dataToSave)
      
      console.log('Progress saved successfully for user:', user?.id)
    } catch (error) {
      console.error('Error saving progress to localStorage:', error)
      
      // Fallback to sessionStorage only
      try {
        const keys = getStorageKeys()
        sessionStorage.setItem(keys.sessionStorage, JSON.stringify(moduleProgress))
        console.log('Progress saved to sessionStorage as fallback for user:', user?.id)
      } catch (sessionError) {
        console.error('Error saving to sessionStorage fallback:', sessionError)
      }
    }
  }, [moduleProgress, user?.id]) // Save when progress or user changes

  const markAudioCompleted = (moduleId: number) => {
    setModuleProgress(prev => {
      const current = prev[moduleId] || {
        moduleId,
        audioCompleted: false,
        audioProgress: 0,
        progressPercentage: 0,
        lastAccessed: new Date(),
        permanentlyCompleted: false
      }
      
      const updated = {
        ...current,
        audioCompleted: true,
        audioProgress: 100,
        progressPercentage: 100,
        permanentlyCompleted: true, // Mark as permanently completed
        lastAccessed: new Date()
      }
      
      return {
        ...prev,
        [moduleId]: updated
      }
    })
  }

  const updateAudioProgress = (moduleId: number, progress: number) => {
    setModuleProgress(prev => {
      const current = prev[moduleId] || {
        moduleId,
        audioCompleted: false,
        audioProgress: 0,
        progressPercentage: 0,
        lastAccessed: new Date(),
        permanentlyCompleted: false
      }
      
      // If module is permanently completed, don't reduce progress
      if (current.permanentlyCompleted && progress < 100) {
        return prev // Keep existing progress
      }
      
      const updated = {
        ...current,
        audioProgress: progress,
        progressPercentage: progress,
        audioCompleted: progress >= 100,
        permanentlyCompleted: progress >= 100, // Mark as permanently completed when reaching 100%
        lastAccessed: new Date()
      }
      
      return {
        ...prev,
        [moduleId]: updated
      }
    })
  }

  const getModuleProgress = (moduleId: number): ModuleProgress => {
    return moduleProgress[moduleId] || {
      moduleId,
      audioCompleted: false,
      audioProgress: 0,
      progressPercentage: 0,
      lastAccessed: new Date(),
      permanentlyCompleted: false
    }
  }

  const getOverallProgress = (): number => {
    const modules = Object.values(moduleProgress)
    if (modules.length === 0) return 0
    
    const totalProgress = modules.reduce((sum, module) => sum + module.progressPercentage, 0)
    return Math.round(totalProgress / modules.length)
  }

  const resetProgress = (moduleId: number) => {
    setModuleProgress(prev => ({
      ...prev,
      [moduleId]: {
        moduleId,
        audioCompleted: false,
        audioProgress: 0,
        progressPercentage: 0,
        lastAccessed: new Date(),
        permanentlyCompleted: false
      }
    }))
  }

  const resetAllProgress = () => {
    const defaultProgress: { [key: number]: ModuleProgress } = {}
    for (let i = 1; i <= 5; i++) {
      defaultProgress[i] = {
        moduleId: i,
        audioCompleted: false,
        audioProgress: 0,
        progressPercentage: 0,
        permanentlyCompleted: false,
        lastAccessed: new Date()
      }
    }
    setModuleProgress(defaultProgress)
    
    // Clear storage for current user
    const keys = getStorageKeys()
    localStorage.removeItem(keys.localStorage)
    sessionStorage.removeItem(keys.sessionStorage)
    
    console.log('All progress reset for user:', user?.id)
  }

  const exportProgress = (): string => {
    try {
      const exportData = {
        version: '1.0',
        timestamp: new Date().toISOString(),
        progress: moduleProgress
      }
      return JSON.stringify(exportData, null, 2)
    } catch (error) {
      console.error('Error exporting progress:', error)
      return ''
    }
  }

  const importProgress = (progressData: string): boolean => {
    try {
      const imported = JSON.parse(progressData)
      
      // Validate import data structure
      if (!imported.progress || typeof imported.progress !== 'object') {
        console.error('Invalid progress data format')
        return false
      }
      
      // Validate and merge imported data
      const validatedProgress: { [key: number]: ModuleProgress } = {}
      
      Object.keys(imported.progress).forEach(key => {
        const moduleId = parseInt(key)
        const moduleData = imported.progress[key]
        
        if (moduleData && typeof moduleData === 'object' && moduleId >= 1 && moduleId <= 5) {
          validatedProgress[moduleId] = {
            moduleId: moduleData.moduleId || moduleId,
            audioCompleted: Boolean(moduleData.audioCompleted),
            audioProgress: Math.min(Math.max(Number(moduleData.audioProgress) || 0, 0), 100),
            progressPercentage: Math.min(Math.max(Number(moduleData.progressPercentage) || 0, 0), 100),
            permanentlyCompleted: Boolean(moduleData.permanentlyCompleted),
            lastAccessed: moduleData.lastAccessed ? new Date(moduleData.lastAccessed) : new Date()
          }
        }
      })
      
      // Update state with imported progress
      setModuleProgress(prev => ({
        ...prev,
        ...validatedProgress
      }))
      
      console.log('Progress imported successfully:', validatedProgress)
      return true
    } catch (error) {
      console.error('Error importing progress:', error)
      return false
    }
  }

  const getLastAccessedModule = () => {
    const modules = Object.entries(moduleProgress)
      .filter(([_, progress]) => progress.lastAccessed)
      .map(([moduleId, progress]) => ({
        moduleId: parseInt(moduleId),
        progress
      }))
      .sort((a, b) => b.progress.lastAccessed.getTime() - a.progress.lastAccessed.getTime())
    
    return modules.length > 0 ? modules[0] : null
  }

  return (
    <ProgressContext.Provider value={{
      moduleProgress,
      updateAudioProgress,
      markAudioCompleted,
      getModuleProgress,
      getOverallProgress,
      resetProgress,
      resetAllProgress,
      exportProgress,
      importProgress,
      getLastAccessedModule
    }}>
      {children}
    </ProgressContext.Provider>
  )
}
