import { createContext, useState, useCallback, useEffect, useRef } from 'react'

export const PatrimonioContext = createContext()

export const PatrimonioProvider = ({ children }) => {
  const [bienes, setBienes] = useState([])
  const [informes, setInformes] = useState([])
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [limit] = useState(30)

  const [filters, setFilters] = useState({
    search: '',
    tipo: '',
    municipio: '',
    tipoPatrimonio: '',
    estilo: '',
    anioDesde: '',
    anioHasta: ''
  })

  const [lastUpdate, setLastUpdate] = useState(Date.now())
  const searchTimerRef = useRef(null)

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

  const getHeaders = () => {
    const token = localStorage.getItem('token')
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    }
  }

  const fetchBienes = useCallback(async (currentFilters, currentPage) => {
    try {
      setLoading(true)
      setError(null)

      const params = new URLSearchParams()
      params.append('page', currentPage)
      params.append('limit', limit)
      
      if (currentFilters.search) params.append('search', currentFilters.search)
      if (currentFilters.tipo) params.append('tipo', currentFilters.tipo)
      if (currentFilters.municipio) params.append('municipio', currentFilters.municipio)
      if (currentFilters.tipoPatrimonio) params.append('tipoPatrimonio', currentFilters.tipoPatrimonio)
      if (currentFilters.estilo) params.append('estilo', currentFilters.estilo)
      if (currentFilters.anioDesde) params.append('anioDesde', currentFilters.anioDesde)
      if (currentFilters.anioHasta) params.append('anioHasta', currentFilters.anioHasta)

      const res = await fetch(`${API_URL}/bienes?${params}`, {
        headers: getHeaders()
      })

      if (!res.ok) throw new Error('Error al obtener bienes')

      const data = await res.json()
      setBienes(data.data || data)
      setTotalPages(data.totalPages || Math.ceil((data.total || data.length) / limit))
    } catch (err) {
      setError(err.message)
      setBienes([])
    } finally {
      setLoading(false)
      setInitialLoading(false)
    }
  }, [API_URL, limit])

  // Fetch cuando cambian filtros no-texto, página o lastUpdate
  useEffect(() => {
    fetchBienes(filters, page)
  }, [filters.tipo, filters.municipio, filters.tipoPatrimonio, filters.estilo, filters.anioDesde, filters.anioHasta, page, lastUpdate])

  // Fetch con debounce solo para búsqueda de texto
  useEffect(() => {
    if (searchTimerRef.current) clearTimeout(searchTimerRef.current)
    searchTimerRef.current = setTimeout(() => {
      fetchBienes(filters, page)
    }, 400)
    return () => clearTimeout(searchTimerRef.current)
  }, [filters.search])

  const fetchInforme = useCallback(async (id) => {
    try {
      setLoading(true)
      const res = await fetch(`${API_URL}/informes/${id}`, { headers: getHeaders() })
      if (!res.ok) throw new Error('Error al obtener el informe')
      return await res.json()
    } catch (err) {
      setError(err.message)
      return null
    } finally {
      setLoading(false)
    }
  }, [API_URL])

  const fetchInformesPorBien = useCallback(async (bienId) => {
    try {
      const res = await fetch(`${API_URL}/bienes/${bienId}`, { headers: getHeaders() })
      if (!res.ok) throw new Error('Error al obtener informes del bien')
      const bien = await res.json()
      setInformes(bien.informes || [])
      return bien
    } catch (err) {
      setError(err.message)
      return null
    }
  }, [API_URL])

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
  }, [API_URL])

  const handleFilterChange = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
    if (!('search' in newFilters)) setPage(1)
  }, [])

  const handleReset = useCallback(() => {
    setFilters({ search: '', tipo: '', municipio: '', tipoPatrimonio: '', estilo: '', anioDesde: '', anioHasta: '' })
    setPage(1)
  }, [])

  const refetchBienes = useCallback(() => {
    setLastUpdate(Date.now())
  }, [])

  const value = {
    bienes, loading, initialLoading, error,
    page, setPage, totalPages,
    informes,
    filters, handleFilterChange, handleReset,
    fetchBienes, refetchBienes,
    fetchInforme, fetchInformesPorBien, createInforme
  }

  return (
    <PatrimonioContext.Provider value={value}>
      {children}
    </PatrimonioContext.Provider>
  )
}