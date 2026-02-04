import React from 'react'
import { getResourcesByModule, ModuleResource } from '../data/moduleResources'
import { useAudio } from '../contexts/AudioContext'

const Audios: React.FC = () => {
  const { playAudio, currentAudio, isAudioPlayerOpen } = useAudio()
  
  // Get all audio resources from all modules
  const getAllAudioResources = (): ModuleResource[] => {
    const allAudios: ModuleResource[] = []
    
    for (let moduleId = 1; moduleId <= 5; moduleId++) {
      const resources = getResourcesByModule(moduleId)
      const audioResources = resources.filter(resource => resource.type === 'audio')
      allAudios.push(...audioResources)
    }
    
    return allAudios
  }

  const audioResources = getAllAudioResources()

  const handlePlayAudio = (resource: ModuleResource) => {
    playAudio(resource.url, resource.title, resource.moduleId)
  }

  const getModuleTitle = (moduleId: number): string => {
    const moduleTitles: { [key: number]: string } = {
      1: 'A Clear Conscious',
      2: 'Health By Design',
      3: 'Hope For Restoration',
      4: 'Praying For Your Man Of God',
      5: 'Priesthood By The Spirit'
    }
    return moduleTitles[moduleId] || `Module ${moduleId}`
  }

  const isCurrentlyPlaying = (resource: ModuleResource) => {
    return currentAudio?.url === resource.url && isAudioPlayerOpen
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-secondary-900 dark:text-secondary-100 mb-2">
          Audio Resources
        </h1>
        <p className="text-secondary-600 dark:text-secondary-400">
          Listen to audio content from all modules
        </p>
      </div>

      {audioResources.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-secondary-400 dark:text-secondary-500 mb-4">
            <i className="bi bi-headphones text-6xl"></i>
          </div>
          <h3 className="text-lg font-medium text-secondary-900 dark:text-secondary-100 mb-2">
            No Audio Resources Available
          </h3>
          <p className="text-secondary-600 dark:text-secondary-400">
            Audio resources will be available here once they are added to the modules.
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {audioResources.map((resource, index: number) => (
            <div
              key={`${resource.moduleId}-${index}`}
              className="bg-white dark:bg-secondary-900 rounded-lg border border-secondary-200 dark:border-secondary-700 p-6 hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-xs bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 px-2 py-1 rounded-full font-medium">
                      Module {resource.moduleId}
                    </span>
                    <span className="text-xs text-secondary-500 dark:text-secondary-400">
                      {getModuleTitle(resource.moduleId)}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100 mb-2">
                    {resource.title}
                  </h3>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400 mb-4">
                    {resource.description || 'Audio resource for your learning journey'}
                  </p>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handlePlayAudio(resource)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                        isCurrentlyPlaying(resource)
                          ? 'bg-primary-600 text-white hover:bg-primary-700'
                          : 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-primary-900/50'
                      }`}
                    >
                      <i className={`bi ${isCurrentlyPlaying(resource) ? 'bi-pause-fill' : 'bi-play-fill'}`}></i>
                      <span>
                        {isCurrentlyPlaying(resource) ? 'Pause' : 'Play'}
                      </span>
                    </button>
                    <div className="text-sm text-secondary-500 dark:text-secondary-400">
                      <i className="bi bi-clock mr-1"></i>
                      Audio Resource
                    </div>
                  </div>
                </div>
                <div className="ml-6">
                  <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                    <i className="bi bi-music-note-beamed text-2xl text-primary-600 dark:text-primary-400"></i>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Current Playing Indicator */}
      {currentAudio && isAudioPlayerOpen && (
        <div className="fixed bottom-6 right-6 bg-white dark:bg-secondary-900 border border-secondary-200 dark:border-secondary-700 rounded-lg shadow-lg p-4 max-w-sm">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
              <i className="bi bi-pause-fill text-primary-600 dark:text-primary-400"></i>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-secondary-900 dark:text-secondary-100 truncate">
                {currentAudio.title}
              </p>
              <p className="text-xs text-secondary-500 dark:text-secondary-400">
                Module {currentAudio.moduleId}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Audios
