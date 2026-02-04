import React, { useRef, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'

interface ProfilePhotoUploadProps {
  onClose: () => void
}

const ProfilePhotoUpload: React.FC<ProfilePhotoUploadProps> = ({ onClose }) => {
  const { user, updateProfilePhoto } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5MB')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      // Convert image to base64
      const reader = new FileReader()
      reader.onload = async (e) => {
        const photoUrl = e.target?.result as string
        
        // Update profile photo
        const success = await updateProfilePhoto(photoUrl)
        
        if (success) {
          onClose()
        } else {
          setError('Failed to update profile photo')
        }
        
        setIsLoading(false)
      }
      
      reader.onerror = () => {
        setError('Failed to read image file')
        setIsLoading(false)
      }
      
      reader.readAsDataURL(file)
    } catch (err) {
      setError('An unexpected error occurred')
      setIsLoading(false)
    }
  }

  const handleRemovePhoto = async () => {
    setIsLoading(true)
    setError('')

    try {
      const success = await updateProfilePhoto('')
      if (success) {
        onClose()
      } else {
        setError('Failed to remove profile photo')
      }
      setIsLoading(false)
    } catch (err) {
      setError('An unexpected error occurred')
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-secondary-900 rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100">
                Profile Photo
              </h2>
              <p className="text-sm text-secondary-600 dark:text-secondary-400 mt-1">
                Update your profile picture
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-secondary-400 hover:text-secondary-600 dark:hover:text-secondary-300"
            >
              <i className="bi bi-x-lg text-xl"></i>
            </button>
          </div>

          <div className="flex flex-col items-center mb-6">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-secondary-200 dark:bg-secondary-700 mb-4">
              {user?.profilePhoto ? (
                <img 
                  src={user.profilePhoto} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <i className="bi bi-person-fill text-3xl text-secondary-400"></i>
                </div>
              )}
            </div>
            <p className="text-sm text-secondary-600 dark:text-secondary-400">
              {user?.name}
            </p>
          </div>

          <div className="space-y-4">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />

            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isLoading}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Uploading...' : 'Choose Photo'}
            </button>

            {user?.profilePhoto && (
              <button
                onClick={handleRemovePhoto}
                disabled={isLoading}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Removing...' : 'Remove Photo'}
              </button>
            )}

            <button
              onClick={onClose}
              disabled={isLoading}
              className="w-full bg-secondary-200 hover:bg-secondary-300 dark:bg-secondary-700 dark:hover:bg-secondary-600 text-secondary-700 dark:text-secondary-300 font-medium py-2 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
          </div>

          {error && (
            <div className="mt-4 text-red-600 dark:text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          <div className="mt-4 text-xs text-secondary-500 dark:text-secondary-400 text-center">
            Accepted formats: JPG, PNG, GIF (Max 5MB)
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePhotoUpload
