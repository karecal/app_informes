/*import { createContext, useState, useEffect, useMemo } from 'react'
import useDebounce from '../hooks/useDebounce'

export const ArtContext = createContext()

const PAGE_SIZE = 50

function ArtProvider({ children }) {
  const [artworks, setArtworks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [filters, setFilters] = useState({
    query: '',
    classification: '',
    culture: '',
    department: '',
    sort: '',
    yearFrom: '',
    yearTo: '',
    hasImage: true
  })
  const debouncedQuery = useDebounce(filters.query, 500)
 

  const API_KEY = import.meta.env.VITE_API_KEY
  const API_URL = import.meta.env.VITE_API_URL

  const hasActiveFilters = Object.entries(filters).some(([key, value]) => {
    if (key === 'hasImage') return false
    return value !== ''
  })

  useEffect(() => {
    setLoading(true)

    let url = `${API_URL}/object?apikey=${API_KEY}&hasimage=1&size=${PAGE_SIZE}&page=${page}`

   if (debouncedQuery) url += `&q=${encodeURIComponent(debouncedQuery)}`

    if (filters.classification) url += `&classification=${encodeURIComponent(filters.classification)}`
    if (filters.culture) url += `&culture=${encodeURIComponent(filters.culture)}`
    if (filters.department) url += `&department=${encodeURIComponent(filters.department)}`
    if (filters.yearFrom) url += `&yearmade=${filters.yearFrom}`
    if (filters.sort === 'asc') url += `&sort=datebegin&sortorder=asc`
    if (filters.sort === 'desc') url += `&sort=datebegin&sortorder=desc`

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setArtworks(data.records || [])
        setTotalPages(data.info?.pages || 0)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [page, filters.classification, filters.culture, filters.department, filters.sort, filters.yearFrom, filters.yearTo, filters.hasImage, debouncedQuery])

  const classifications = useMemo(() => {
    const values = artworks.map(a => a.classification).filter(Boolean)
    return [...new Set(values)].sort()
  }, [artworks])

  const cultures = useMemo(() => {
    const values = artworks.map(a => a.culture).filter(Boolean)
    return [...new Set(values)].sort()
  }, [artworks])

  const departments = useMemo(() => {
    const values = artworks.map(a => a.department).filter(Boolean)
    return [...new Set(values)].sort()
  }, [artworks])

  const handleFilterChange = (key, value) => {
    setPage(1)
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const handleReset = () => {
    setPage(1)
    setFilters({
      query: '',
      classification: '',
      culture: '',
      department: '',
      sort: '',
      yearFrom: '',
      yearTo: '',
      hasImage: true
    })
  }

  return (
    <ArtContext.Provider value={{
      artworks, loading, error,
      classifications, cultures, departments,
      page, setPage, totalPages,
      filters, handleFilterChange, handleReset,
      hasActiveFilters
    }}>
      {children}
    </ArtContext.Provider>
  )
}

export default ArtProvider*/

import { createContext, useState, useEffect, useMemo } from 'react'

export const ArtContext = createContext()

const PAGE_SIZE = 50

function ArtProvider({ children }) {
  const [artworks, setArtworks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  const [filters, setFilters] = useState({
    query: '',
    classification: '',
    culture: '',
    department: '',
    sort: '',
    yearFrom: '',
    yearTo: '',
    hasImage: true
  })

  // 👇 ESTA ES LA CLAVE
  const [submittedQuery, setSubmittedQuery] = useState('')

  const API_KEY = import.meta.env.VITE_API_KEY
  const API_URL = import.meta.env.VITE_API_URL

  const hasActiveFilters = Object.entries(filters).some(([key, value]) => {
    if (key === 'hasImage') return false
    return value !== ''
  })

  useEffect(() => {
    setLoading(true)

    let url = `${API_URL}/object?apikey=${API_KEY}&hasimage=1&size=${PAGE_SIZE}&page=${page}`

    // 👇 SOLO BUSCA CUANDO SE PULSA ENTER
    if (submittedQuery) {
      url += `&q=${encodeURIComponent(submittedQuery)}`
    }

    if (filters.classification) url += `&classification=${encodeURIComponent(filters.classification)}`
    if (filters.culture) url += `&culture=${encodeURIComponent(filters.culture)}`
    if (filters.department) url += `&department=${encodeURIComponent(filters.department)}`
    if (filters.yearFrom) url += `&yearmade=${filters.yearFrom}`
    if (filters.sort === 'asc') url += `&sort=datebegin&sortorder=asc`
    if (filters.sort === 'desc') url += `&sort=datebegin&sortorder=desc`

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setArtworks(data.records || [])
        setTotalPages(data.info?.pages || 0)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [
    page,
    filters.classification,
    filters.culture,
    filters.department,
    filters.sort,
    filters.yearFrom,
    filters.yearTo,
    filters.hasImage,
    submittedQuery
  ])

  const classifications = useMemo(() => {
    const values = artworks.map(a => a.classification).filter(Boolean)
    return [...new Set(values)].sort()
  }, [artworks])

  const cultures = useMemo(() => {
    const values = artworks.map(a => a.culture).filter(Boolean)
    return [...new Set(values)].sort()
  }, [artworks])

  const departments = useMemo(() => {
    const values = artworks.map(a => a.department).filter(Boolean)
    return [...new Set(values)].sort()
  }, [artworks])

  const handleFilterChange = (key, value) => {
    setPage(1)
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const handleReset = () => {
    setPage(1)
    setFilters({
      query: '',
      classification: '',
      culture: '',
      department: '',
      sort: '',
      yearFrom: '',
      yearTo: '',
      hasImage: true
    })

    setSubmittedQuery('') // 👈 importante
  }

  return (
    <ArtContext.Provider value={{
      artworks,
      loading,
      error,
      classifications,
      cultures,
      departments,
      page,
      setPage,
      totalPages,
      filters,
      handleFilterChange,
      handleReset,
      hasActiveFilters,
      setSubmittedQuery // 👈 IMPORTANTE
    }}>
      {children}
    </ArtContext.Provider>
  )
}

export default ArtProvider