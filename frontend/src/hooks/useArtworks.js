import { useContext } from 'react'
import { ArtContext } from '../context/ArtContext'

function useArtworks() {
  const { artworks, loading, error, page, setPage, totalPages } = useContext(ArtContext)

  const goToNextPage = () => {
    if (page < totalPages) setPage(page + 1)
  }

  const goToPrevPage = () => {
    if (page > 1) setPage(page - 1)
  }

  return {
    artworks,
    loading,
    error,
    page,
    setPage,
    totalPages,
    goToNextPage,
    goToPrevPage,
  }
}

export default useArtworks