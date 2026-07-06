import { createContext, useState, useContext, useEffect } from 'react'

// Create the context
const AuthContext = createContext()

// Provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Check if user is already logged in when app starts
  useEffect(() => {
    const storedUser = localStorage.getItem('mockmate_user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  // Signup function
  const signup = async (name, email, password) => {
    const response = await fetch('http://localhost:5000/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Signup failed')
    }

    // Save user to state and localStorage
    setUser(data)
    localStorage.setItem('mockmate_user', JSON.stringify(data))
    return data
  }

  // Login function
  const login = async (email, password) => {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Login failed')
    }

    // Save user to state and localStorage
    setUser(data)
    localStorage.setItem('mockmate_user', JSON.stringify(data))
    return data
  }

  // Logout function
  const logout = () => {
    setUser(null)
    localStorage.removeItem('mockmate_user')
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook to use auth context
export function useAuth() {
  return useContext(AuthContext)
}