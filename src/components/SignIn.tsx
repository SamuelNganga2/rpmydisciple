import React, { useState, useEffect } from 'react'
import { SignInFormData } from '../types/auth'
import { useAuth } from '../contexts/AuthContext'

interface SignInProps {
  onClose: () => void
}

const SignIn: React.FC<SignInProps> = ({ onClose }) => {
  const { signIn, signUp } = useAuth()
  const [isSignUp, setIsSignUp] = useState(false)
  const [formData, setFormData] = useState<SignInFormData>({
    name: '',
    email: '',
    phone: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (error) setError('')
  }

  const clearForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      password: ''
    })
    setError('')
    setShowPassword(false)
  }

  const toggleMode = () => {
    clearForm()
    setIsSignUp(!isSignUp)
  }

  // Clear form when component mounts (for new users)
  useEffect(() => {
    clearForm()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Validation based on mode
    if (isSignUp) {
      // Sign up validation - all fields required
      if (!formData.name || !formData.email || !formData.phone || !formData.password) {
        setError('All fields are required for account creation')
        setIsLoading(false)
        return
      }

      if (formData.name.trim().length < 2) {
        setError('Name must be at least 2 characters long')
        setIsLoading(false)
        return
      }

      if (formData.phone.trim().length < 10) {
        setError('Please enter a valid phone number')
        setIsLoading(false)
        return
      }
    } else {
      // Sign in validation - only email and password required
      if (!formData.email || !formData.password) {
        setError('Email and password are required')
        setIsLoading(false)
        return
      }
    }

    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address')
      setIsLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long')
      setIsLoading(false)
      return
    }

    try {
      let success
      if (isSignUp) {
        success = await signUp(formData)
        if (success) {
          // After successful registration, sign in
          success = await signIn(formData)
        } else {
          setError('Registration failed. Email may already exist.')
        }
      } else {
        success = await signIn(formData)
        if (!success) {
          setError('Invalid email or password')
        }
      }
      
      if (success) {
        clearForm()
        onClose()
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
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
                {isSignUp ? 'Create Account' : 'Welcome Back'}
              </h2>
              <p className="text-sm text-secondary-600 dark:text-secondary-400 mt-1">
                {isSignUp 
                  ? 'Sign up to start your learning journey' 
                  : 'Sign in to continue your learning'
                }
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-secondary-400 hover:text-secondary-600 dark:hover:text-secondary-300"
            >
              <i className="bi bi-x-lg text-xl"></i>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-secondary-300 dark:border-secondary-600 rounded-lg bg-white dark:bg-secondary-800 text-secondary-900 dark:text-secondary-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter your full name"
                  required={isSignUp}
                />
              </div>
            )}

            {isSignUp && (
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-secondary-300 dark:border-secondary-600 rounded-lg bg-white dark:bg-secondary-800 text-secondary-900 dark:text-secondary-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter your phone number"
                  required={isSignUp}
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-secondary-300 dark:border-secondary-600 rounded-lg bg-white dark:bg-secondary-800 text-secondary-900 dark:text-secondary-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder={isSignUp ? "Enter your email address" : "Enter your email"}
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 pr-10 border border-secondary-300 dark:border-secondary-600 rounded-lg bg-white dark:bg-secondary-800 text-secondary-900 dark:text-secondary-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder={isSignUp ? "Create a password" : "Enter your password"}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-400 hover:text-secondary-600 dark:hover:text-secondary-300"
                  tabIndex={-1}
                >
                  <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                </button>
              </div>
              {isSignUp && (
                <p className="text-xs text-secondary-500 dark:text-secondary-400 mt-1">
                  Password must be at least 6 characters long
                </p>
              )}
            </div>

            {error && (
              <div className="text-red-600 dark:text-red-400 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (isSignUp ? 'Creating Account...' : 'Signing in...') : (isSignUp ? 'Create Account' : 'Sign In')}
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={toggleMode}
                className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 text-sm font-medium"
              >
                {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignIn
