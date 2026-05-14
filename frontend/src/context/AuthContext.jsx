import { createContext, useState, useCallback, useEffect } from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

  // Recuperar token del localStorage al iniciar
  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData))
      } catch (err) {
        console.error('Error parsing user data:', err)
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      }
    }
    setLoading(false)
  }, [])

  const register = useCallback(async (nombre, email, password) => {
    try {
      setError(null)
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, email, password })
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Error en el registro')
      }

      const data = await res.json()
      // Guardar token y usuario
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.usuario))
      setUser(data.usuario)
      
      return data
    } catch (err) {
      setError(err.message)
      throw err
    }
  }, [API_URL])

  const login = useCallback(async (email, password) => {
    try {
      setError(null)
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Credenciales incorrectas')
      }

      const data = await res.json()
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.usuario))
      setUser(data.usuario)
      
      return data
    } catch (err) {
      setError(err.message)
      throw err
    }
  }, [API_URL])

  const logout = useCallback(() => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    setError(null)
  }, [])

  const getToken = useCallback(() => {
    return localStorage.getItem('token')
  }, [])

  const isAdmin = user?.rol === 'admin'
  const isAuthenticated = !!user

  const value = {
    user,
    loading,
    error,
    isAuthenticated,
    isAdmin,
    register,
    login,
    logout,
    getToken
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
