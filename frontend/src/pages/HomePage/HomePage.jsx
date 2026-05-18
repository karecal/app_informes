import { useState, useEffect } from 'react'
import usePatrimonio from '../../hooks/usePatrimonio'
import BienCard from '../../components/BienCard/BienCard'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import styles from './HomePage.module.css'
import BienSearchBar from '../../components/BienSearchBar/BienSearchBar'
import { useAuth } from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

function HomePage() {
  const { isAdmin } = useAuth()
  const navigate = useNavigate()
  const {
    bienes,
    loading,
    initialLoading,
    error,
    page,
    setPage,
    
    totalPages,
    filters,
    handleFilterChange,
    handleReset
  } = usePatrimonio()

  const [showHeading, setShowHeading] = useState(true)

  useEffect(() => {
    const handleScroll = () => setShowHeading(window.scrollY < 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (initialLoading) return <LoadingSpinner />
  if (error) return <p>Error: {error}</p>

  return (
    <main className={styles.main}>
      {showHeading && <h2 className={styles.heading}>Encuentra tu informe</h2>}

      

      <BienSearchBar
      filters={filters}
       onFilterChange={handleFilterChange}
       onReset={handleReset}
      />

      {isAdmin && (
      <button
      className={styles.newBienBtn}
      onClick={() => navigate('/bien/nuevo')}
      >
        + Nuevo bien patrimonial
      </button>
      )}

      {bienes.length === 0 ? (
        <p className={styles.noResults}>No se encontraron bienes</p>
      ) : (
        <div className={styles.grid}>
          {bienes.map((bien) => (
            <BienCard key={bien.id} bien={bien} />
          ))}
        </div>
      )}

    </main>
  )
}

export default HomePage