import { useState, useEffect } from 'react'
import usePatrimonio from '../../hooks/usePatrimonio'
import BienCard from '../../components/BienCard/BienCard'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import Pagination from '../../components/Pagination/Pagination'
import styles from './HomePage.module.css'

function HomePage() {
  const {
    bienes,
    loading,
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

  const handlePageChange = (newPage) => {
    setPage(newPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (loading) return <LoadingSpinner />
  if (error) return <p>Error: {error}</p>

  return (
    <main className={styles.main}>
      {showHeading && <h2 className={styles.heading}>Bienes Patrimoniales</h2>}

      {/* Barra de búsqueda simple */}
      <div className={styles.searchRow}>
        <input
          type="text"
          placeholder="Buscar bien patrimonial..."
          value={filters.search}
          onChange={(e) => handleFilterChange({ search: e.target.value })}
          className={styles.searchInput}
        />
        <select
          value={filters.tipo}
          onChange={(e) => handleFilterChange({ tipo: e.target.value })}
          className={styles.select}
        >
          <option value="">Todos los tipos</option>
          <option value="MUEBLE">Mueble</option>
          <option value="INMUEBLE">Inmueble</option>
        </select>
        <button onClick={handleReset} className={styles.resetBtn}>
          Limpiar
        </button>
      </div>

      {bienes.length === 0 ? (
        <p className={styles.noResults}>No se encontraron bienes</p>
      ) : (
        <div className={styles.grid}>
          {bienes.map((bien) => (
            <BienCard key={bien.id} bien={bien} />
          ))}
        </div>
      )}

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </main>
  )
}

export default HomePage