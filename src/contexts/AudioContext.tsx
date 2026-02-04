import React, { createContext, useContext, useState } from 'react'

interface AudioState {
  url: string
  title: string
  moduleId: number
}

interface AudioContextType {
  currentAudio: AudioState | null
  isAudioPlayerOpen: boolean
  playAudio: (url: string, title: string, moduleId: number) => void
  closeAudioPlayer: () => void
  toggleAudioPlayer: () => void
}

const AudioContext = createContext<AudioContextType | undefined>(undefined)

export const useAudio = () => {
  const context = useContext(AudioContext)
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider')
  }
  return context
}

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentAudio, setCurrentAudio] = useState<AudioState | null>(null)
  const [isAudioPlayerOpen, setIsAudioPlayerOpen] = useState(false)

  const playAudio = (url: string, title: string, moduleId: number) => {
    setCurrentAudio({ url, title, moduleId })
    setIsAudioPlayerOpen(true)
  }

  const closeAudioPlayer = () => {
    setIsAudioPlayerOpen(false)
    // Don't clear currentAudio to allow resuming
  }

  const toggleAudioPlayer = () => {
    if (currentAudio) {
      setIsAudioPlayerOpen(!isAudioPlayerOpen)
    }
  }

  return (
    <AudioContext.Provider value={{
      currentAudio,
      isAudioPlayerOpen,
      playAudio,
      closeAudioPlayer,
      toggleAudioPlayer
    }}>
      {children}
    </AudioContext.Provider>
  )
}
