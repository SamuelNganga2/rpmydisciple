export interface User {
  id: string
  name: string
  email: string
  phone: string
  password: string // Hashed password for security
  createdAt: string
  lastLogin?: string
  profilePhoto?: string // Optional profile photo URL
}

export interface UserDatabase {
  [email: string]: User
}

export interface SignInFormData {
  name: string
  email: string
  phone: string
  password: string
}

export interface AuthContextType {
  user: User | null
  signIn: (userData: SignInFormData) => Promise<boolean>
  signOut: () => void
  isAuthenticated: boolean
  signUp: (userData: SignInFormData) => Promise<boolean>
  updateProfilePhoto: (photoUrl: string) => Promise<boolean>
}
