export interface ModuleResource {
  id: string
  moduleId: number
  type: 'audio' | 'pdf'
  title: string
  url: string
  description?: string
}

export const moduleResources: ModuleResource[] = [
  // Module 1: A True Disciple
  {
    id: 'audio-1-1',
    moduleId: 1,
    type: 'audio',
    title: 'A Clear Conscious',
    url: '/src/assets/A clear conscious.MP3',
    description: 'Meditation on spiritual awareness and clarity for true discipleship'
  },
  {
    id: 'pdf-1-1',
    moduleId: 1,
    type: 'pdf',
    title: 'A True Disciple - Lyrics & Study Guide',
    url: '/pdfs/true-disciple-lyrics.pdf',
    description: 'Complete lyrics with study notes and reflection questions'
  },
  
  // Module 2: Knowledge Of The Word Of God
  {
    id: 'audio-2-1',
    moduleId: 2,
    type: 'audio',
    title: 'Health By Design',
    url: '/src/assets/Health by design 2.MP3',
    description: 'Teaching on divine health and wellness through God\'s Word'
  },
  {
    id: 'pdf-2-1',
    moduleId: 2,
    type: 'pdf',
    title: 'Scripture Study Guide - Knowledge Of The Word',
    url: '/pdfs/true-disciple-lyrics.pdf',
    description: 'Comprehensive study guide with key scriptures'
  },
  
  // Module 3: Cultivating A Teachable Spirit
  {
    id: 'audio-3-1',
    moduleId: 3,
    type: 'audio',
    title: 'Hope For Restoration',
    url: '/src/assets/Hope for restoration.MP3',
    description: 'Message of hope and restoration for cultivating a teachable spirit'
  },
  {
    id: 'pdf-3-1',
    moduleId: 3,
    type: 'pdf',
    title: 'Teachable Spirit - Study Materials',
    url: '/pdfs/true-disciple-lyrics.pdf',
    description: 'Study materials on cultivating a teachable spirit'
  },
  
  // Module 4: Identity In Christ
  {
    id: 'audio-4-1',
    moduleId: 4,
    type: 'audio',
    title: 'Praying For Your Man Of God',
    url: '/src/assets/Praying for your Man of God.MP3',
    description: 'Prayer guide for understanding identity in Christ'
  },
  {
    id: 'pdf-4-1',
    moduleId: 4,
    type: 'pdf',
    title: 'Identity In Christ - Study Notes',
    url: '/pdfs/true-disciple-lyrics.pdf',
    description: 'Biblical foundation for identity in Christ'
  },
  
  // Module 5: A Strong Spirit
  {
    id: 'audio-5-1',
    moduleId: 5,
    type: 'audio',
    title: 'Priesthood By The Spirit',
    url: '/src/assets/Priesthood by the spirit.MP3',
    description: 'Teaching on spiritual priesthood and building a strong spirit'
  },
  {
    id: 'pdf-5-1',
    moduleId: 5,
    type: 'pdf',
    title: 'Strong Spirit - Spiritual Warfare Guide',
    url: '/pdfs/true-disciple-lyrics.pdf',
    description: 'Guide to building spiritual strength'
  }
]

export const getResourcesByModule = (moduleId: number): ModuleResource[] => {
  return moduleResources.filter(resource => resource.moduleId === moduleId)
}
