import { useContext } from 'react'
import { PatrimonioContext } from '../context/PatrimonioContext'

function usePatrimonio() {
  const context = useContext(PatrimonioContext)
  if (!context) {
    throw new Error('usePatrimonio debe usarse dentro de PatrimonioProvider')
  }
  return context
}

export default usePatrimonio
