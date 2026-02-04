import React, { useState } from 'react'
import AudioPlayer from './AudioPlayer'
import InlinePDFViewer from './InlinePDFViewer'
import { getResourcesByModule, ModuleResource } from '../data/moduleResources'
import { useAudio } from '../contexts/AudioContext'

interface QuickAccessProps {
  currentModuleId?: number
}

const QuickAccess: React.FC<QuickAccessProps> = ({ currentModuleId = 3 }) => {
  const { playAudio } = useAudio()
  const [selectedResource, setSelectedResource] = useState<ModuleResource | null>(null)
  const [showAudioPlayer, setShowAudioPlayer] = useState(false)
  const [showPDFViewer, setShowPDFViewer] = useState(false)

  const quickAccessItems = [
    {
      id: 'audio',
      icon: 'bi-headphones',
      label: 'Audio Version'
    },
    {
      id: 'pdf',
      icon: 'bi-file-earmark-pdf',
      label: 'Download PDF'
    },
    {
      id: 'flashcards',
      icon: 'bi-card-text',
      label: 'Flashcards'
    }
  ]

  const handlePlayAudio = () => {
    // Get the current module's audio
    const audioResource = getResourcesByModule(currentModuleId).find(r => r.type === 'audio')
    if (audioResource) {
      console.log('QuickAccess: Playing audio for module', currentModuleId, audioResource.title)
      // Use global audio context to play audio
      playAudio(audioResource.url, audioResource.title, currentModuleId)
    } else {
      console.log('QuickAccess: No audio resource found for module', currentModuleId)
    }
  }

  const handleViewPDF = () => {
    // Get the current module's PDF
    const pdfResource = getResourcesByModule(currentModuleId).find(r => r.type === 'pdf')
    if (pdfResource) {
      setSelectedResource(pdfResource)
      setShowPDFViewer(true)
      setShowAudioPlayer(false)
    } else {
      console.log('QuickAccess: No PDF resource found for module', currentModuleId)
    }
  }

  const closeViewers = () => {
    setShowAudioPlayer(false)
    setShowPDFViewer(false)
    setSelectedResource(null)
  }

  const handleItemClick = (itemId: string) => {
    switch (itemId) {
      case 'audio':
        handlePlayAudio()
        break
      case 'pdf':
        handleViewPDF()
        break
      case 'flashcards':
        // Flashcards functionality can be added later
        console.log('Flashcards clicked')
        break
      default:
        break
    }
  }

  return (
    <div className="bg-white dark:bg-secondary-900 rounded-lg border border-secondary-200 dark:border-secondary-700 p-4">
      <h3 className="font-semibold text-secondary-900 dark:text-secondary-100 mb-4">Quick Access</h3>
      
      <div className="space-y-2">
        {quickAccessItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleItemClick(item.id)}
            className="flex items-center w-full px-3 py-2 text-sm text-secondary-700 dark:text-secondary-300 hover:bg-secondary-50 dark:hover:bg-secondary-800 rounded-lg transition-colors duration-200"
          >
            <i className={`${item.icon} text-base mr-3 text-secondary-500 dark:text-secondary-400`}></i>
            <span>{item.label}</span>
          </button>
        ))}
      </div>
      
      {/* Audio Player Modal */}
      {showAudioPlayer && selectedResource && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <AudioPlayer
            audioUrl={selectedResource.url}
            title={selectedResource.title}
            onClose={closeViewers}
          />
        </div>
      )}
      
      {/* PDF Viewer Modal */}
      {showPDFViewer && selectedResource && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-6xl max-h-[90vh]">
            <InlinePDFViewer
              moduleId={selectedResource.moduleId}
              title={selectedResource.title}
              onClose={closeViewers}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default QuickAccess
