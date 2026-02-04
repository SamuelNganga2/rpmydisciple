import React, { useState, useRef, useEffect } from 'react'
import { useProgress } from '../contexts/ProgressContext'

interface AudioPlayerProps {
  audioUrl: string
  title: string
  moduleId?: number
  onClose?: () => void
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl, title, moduleId, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [hasInitialized, setHasInitialized] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const { updateAudioProgress, getModuleProgress } = useProgress()

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => {
      setCurrentTime(audio.currentTime)
      // Update progress based on audio listening percentage (0-80 scale)
      if (moduleId && duration > 0) {
        const audioProgressPercentage = Math.round((audio.currentTime / duration) * 100)
        updateAudioProgress(moduleId, audioProgressPercentage)
      }
    }
    const updateDuration = () => {
      setDuration(audio.duration)
      
      // Set initial position based on saved progress
      if (moduleId && !hasInitialized) {
        const moduleProgress = getModuleProgress(moduleId)
        const progressPercentage = moduleProgress.progressPercentage
        
        if (progressPercentage >= 100) {
          // If completed, start from beginning
          audio.currentTime = 0
        } else if (progressPercentage > 0) {
          // Resume from saved position (convert percentage to time)
          const resumeTime = (progressPercentage / 100) * audio.duration
          audio.currentTime = resumeTime
          setCurrentTime(resumeTime)
        }
        
        setHasInitialized(true)
      }
    }

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', updateDuration)

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', updateDuration)
    }
  }, [moduleId, duration, updateAudioProgress, getModuleProgress, hasInitialized])

  const togglePlayPause = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current
    if (!audio) return

    const newTime = parseFloat(e.target.value)
    audio.currentTime = newTime
    setCurrentTime(newTime)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current
    if (!audio) return

    const newVolume = parseFloat(e.target.value)
    audio.volume = newVolume
    setVolume(newVolume)
  }

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="bg-white dark:bg-secondary-900 rounded-lg border border-secondary-200 dark:border-secondary-700 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100">
          {title}
        </h3>
        {onClose && (
          <button
            onClick={onClose}
            className="text-secondary-400 hover:text-secondary-600 dark:hover:text-secondary-300"
          >
            <i className="bi bi-x-lg text-xl"></i>
          </button>
        )}
      </div>

      <audio
        ref={audioRef}
        src={audioUrl}
        onEnded={() => setIsPlaying(false)}
      />

      {/* Audio Controls */}
      <div className="space-y-4">
        {/* Play/Pause and Progress */}
        <div className="flex items-center space-x-4">
          <button
            onClick={togglePlayPause}
            className="flex items-center justify-center w-12 h-12 bg-primary-600 hover:bg-primary-700 text-white rounded-full transition-colors duration-200"
          >
            <i className={`bi ${isPlaying ? 'bi-pause-fill' : 'bi-play-fill'} text-xl`}></i>
          </button>

          <div className="flex-1">
            <div className="flex items-center space-x-3">
              <span className="text-sm text-secondary-600 dark:text-secondary-400 min-w-0">
                {formatTime(currentTime)}
              </span>
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={handleSeek}
                className="flex-1 h-2 bg-secondary-200 dark:bg-secondary-700 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(currentTime / duration) * 100}%, #e5e7eb ${(currentTime / duration) * 100}%, #e5e7eb 100%)`
                }}
              />
              <span className="text-sm text-secondary-600 dark:text-secondary-400 min-w-0">
                {formatTime(duration)}
              </span>
            </div>
          </div>
        </div>

        {/* Volume Control */}
        <div className="flex items-center space-x-3">
          <i className="bi bi-volume-up text-secondary-600 dark:text-secondary-400"></i>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
            className="w-24 h-2 bg-secondary-200 dark:bg-secondary-700 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${volume * 100}%, #e5e7eb ${volume * 100}%, #e5e7eb 100%)`
            }}
          />
          <span className="text-sm text-secondary-600 dark:text-secondary-400">
            {Math.round(volume * 100)}%
          </span>
        </div>
      </div>
    </div>
  )
}

export default AudioPlayer
