import { createContext, useState, useCallback, useEffect } from 'react'

export const PatrimonioContext = createContext()

export const PatrimonioProvider = ({ children }) => {
  const [bienes, setBienes] = useState([])
  const [informes, setInformes] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  
  // Paginación
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [limit] = useState(10)

  // Filtros
  const [filters, setFilters] = useState({
    search: '',
    tipo: '', // MUEBLE | INMUEBLE
    estadoInforme: '' // EN_CURSO | FINALIZADO | PENDIENTE
  })

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'
  const token = localStorage.getItem('token')

  // Obtener headers con auth
  const getHeaders = () => ({
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  })

  // Obtener bienes con filtros y paginación
  const fetchBienes = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const params = new URLSearchParams()
      params.append('page', page)
      params.append('limit', limit)
      
      if (filters.search) params.append('search', filters.search)
      if (filters.tipo) params.append('tipo', filters.tipo)

      const res = await fetch(`${API_URL}/bienes?${params}`, {
        headers: getHeaders()
      })

      if (!res.ok) {
        throw new Error('Error al obtener bienes')
      }

      const data = await res.json()
      setBienes(data.data || data)
      setTotalPages(data.totalPages || Math.ceil(data.length / limit))
    } catch (err) {
      setError(err.message)
      setBienes([])
    } finally {
      setLoading(false)
    }
  }, [page, limit, filters, API_URL, token])

  // Obtener informe específico con detalles
  const fetchInforme = useCallback(async (id) => {
    try {
      setLoading(true)
      const res = await fetch(`${API_URL}/informes/${id}`, {
        headers: getHeaders()
      })

      if (!res.ok) {
        throw new Error('Error al obtener el informe')
      }

      return await res.json()
    } catch (err) {
      setError(err.message)
      return null
    } finally {
      setLoading(false)
    }
  }, [API_URL, token])

  // Obtener informes de un bien
  const fetchInformesPorBien = useCallback(async (bienId) => {
    try {
      const res = await fetch(`${API_URL}/bienes/${bienId}`, {
        headers: getHeaders()
      })

      if (!res.ok) {
        throw new Error('Error al obtener informes del bien')
      }

      const bien = await res.json()
      setInformes(bien.informes || [])
      return bien
    } catch (err) {
      setError(err.message)
      return null
    }
  }, [API_URL, token])

  // Crear informe
  const createInforme = useCallback(async (datos) => {
    try {
      const res = await fetch(`${API_URL}/informes`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(datos)
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Error al crear el informe')
      }

      return await res.json()
    } catch (err) {
      setError(err.message)
      throw err
    }
  }, [API_URL, token])

  // Actualizar filtros
  const handleFilterChange = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
    setPage(1) // Volver a página 1 al filtrar
  }, [])

  // Reset filtros
  const handleReset = useCallback(() => {
    setFilters({ search: '', tipo: '', estadoInforme: '' })
    setPage(1)
  }, [])

  // Fetch inicial al cambiar page o filters
  useEffect(() => {
    fetchBienes()
  }, [fetchBienes])

  const value = {
    // Bienes
    bienes,
    loading,
    error,
    page,
    setPage,
    totalPages,
    
    // Informes
    informes,
    
    // Filtros
    filters,
    handleFilterChange,
    handleReset,
    
    // Métodos
    fetchBienes,
    fetchInforme,
    fetchInformesPorBien,
    createInforme
  }

  return (
    <PatrimonioContext.Provider value={value}>
      {children}
    </PatrimonioContext.Provider>
  )
}
