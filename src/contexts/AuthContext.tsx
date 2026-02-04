import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { User, SignInFormData, AuthContextType, UserDatabase } from '../types/auth'
import { SimpleHasher } from '../utils/auth'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  // Load user database from localStorage
  const getUserDatabase = (): UserDatabase => {
    try {
      const stored = localStorage.getItem('userDatabase')
      const database = stored ? JSON.parse(stored) : {}
      console.log('getUserDatabase - loaded database keys:', Object.keys(database))
      console.log('getUserDatabase - full database:', database)
      return database
    } catch (error) {
      console.error('Error loading user database:', error)
      return {}
    }
  }

  // Save user database to localStorage
  const saveUserDatabase = (database: UserDatabase) => {
    try {
      console.log('saveUserDatabase - saving database with keys:', Object.keys(database))
      localStorage.setItem('userDatabase', JSON.stringify(database))
      console.log('saveUserDatabase - database saved successfully')
    } catch (error) {
      console.error('Error saving user database:', error)
    }
  }

  useEffect(() => {
    // Check for stored user session on component mount
    const storedUser = localStorage.getItem('currentUser')
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser)
        // Verify user still exists in database
        const database = getUserDatabase()
        if (database[userData.email]) {
          setUser(userData)
        } else {
          // User no longer exists, clear session
          localStorage.removeItem('currentUser')
        }
      } catch (error) {
        console.error('Error parsing stored user:', error)
        localStorage.removeItem('currentUser')
      }
    }
  }, [])

  const signUp = async (userData: SignInFormData): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const database = getUserDatabase()
      console.log('Current users in database during signup:', Object.keys(database))
      
      // Check if user already exists
      if (database[userData.email]) {
        console.error('User with this email already exists:', userData.email)
        return false
      }
      
      // Create new user with hashed password
      const hashedPassword = SimpleHasher.hash(userData.password)
      console.log('Original password:', userData.password)
      console.log('Hashed password for storage:', hashedPassword)
      
      const newUser: User = {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        password: hashedPassword,
        createdAt: new Date().toISOString()
      }
      
      // Save to database
      database[userData.email] = newUser
      saveUserDatabase(database)
      
      console.log('User registered successfully:', userData.email)
      console.log('Updated database:', Object.keys(database))
      return true
    } catch (error) {
      console.error('Sign up error:', error)
      return false
    }
  }

  const signIn = async (userData: SignInFormData): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const database = getUserDatabase()
      console.log('Current users in database:', Object.keys(database))
      console.log('Attempting to sign in user with email:', userData.email)
      
      // Find user by email
      const existingUser = database[userData.email]
      if (!existingUser) {
        console.error('User not found for email:', userData.email)
        return false
      }
      
      console.log('User found:', existingUser.email)
      console.log('Stored password hash:', existingUser.password)
      console.log('Input password:', userData.password)
      
      // Verify password
      const inputHash = SimpleHasher.hash(userData.password)
      console.log('Generated hash from input:', inputHash)
      
      const isPasswordValid = SimpleHasher.verify(userData.password, existingUser.password)
      console.log('Password verification result:', isPasswordValid)
      
      if (!isPasswordValid) {
        console.error('Invalid password - hashes do not match')
        return false
      }
      
      // Update last login
      existingUser.lastLogin = new Date().toISOString()
      database[userData.email] = existingUser
      saveUserDatabase(database)
      
      // Set current user session (without password for security)
      const userSession = {
        id: existingUser.id,
        name: existingUser.name,
        email: existingUser.email,
        phone: existingUser.phone,
        password: existingUser.password,
        createdAt: existingUser.createdAt,
        lastLogin: existingUser.lastLogin
      }
      
      setUser(userSession)
      localStorage.setItem('currentUser', JSON.stringify(userSession))
      
      console.log('User signed in successfully:', userData.email)
      return true
    } catch (error) {
      console.error('Sign in error:', error)
      return false
    }
  }

  const signOut = () => {
    setUser(null)
    localStorage.removeItem('currentUser')
    console.log('User signed out')
  }

  const updateProfilePhoto = async (photoUrl: string): Promise<boolean> => {
    try {
      if (!user) {
        console.error('No user logged in')
        return false
      }

      const database = getUserDatabase()
      const existingUser = database[user.email]
      
      if (!existingUser) {
        console.error('User not found in database')
        return false
      }

      // Update user's profile photo in database
      existingUser.profilePhoto = photoUrl
      database[user.email] = existingUser
      saveUserDatabase(database)

      // Update current user state
      const updatedUser = {
        ...user,
        profilePhoto: photoUrl
      }
      setUser(updatedUser)
      localStorage.setItem('currentUser', JSON.stringify(updatedUser))

      console.log('Profile photo updated successfully for user:', user.email)
      return true
    } catch (error) {
      console.error('Error updating profile photo:', error)
      return false
    }
  }

  const isAuthenticated = !!user

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut, updateProfilePhoto, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}
