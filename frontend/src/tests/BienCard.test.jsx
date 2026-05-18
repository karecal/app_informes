import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import BienCard from '../components/BienCard/BienCard'

const bienBase = {
  id: 1,
  nombre: 'Catedral de Las Palmas',
  ubicacion: 'Las Palmas de Gran Canaria',
  tipo: 'INMUEBLE',
  imagen: '',
  _count: { informes: 3 },
}

function renderCard(bien) {
  return render(
    <MemoryRouter>
      <BienCard bien={bien} />
    </MemoryRouter>
  )
}

describe('BienCard', () => {
  it('muestra el nombre del bien', () => {
    renderCard(bienBase)
    expect(screen.getByText('Catedral de Las Palmas')).toBeInTheDocument()
  })

  it('muestra la ubicación del bien', () => {
    renderCard(bienBase)
    expect(screen.getByText(/Las Palmas de Gran Canaria/)).toBeInTheDocument()
  })

  it('muestra el número de informes', () => {
    renderCard(bienBase)
    expect(screen.getByText(/3 informe/)).toBeInTheDocument()
  })

  it('muestra la imagen cuando existe URL', () => {
    const bienConImagen = { ...bienBase, imagen: 'https://example.com/foto.jpg' }
    renderCard(bienConImagen)
    const img = screen.getByRole('img')
    expect(img).toHaveAttribute('src', 'https://example.com/foto.jpg')
  })

  it('muestra icono cuando no hay imagen', () => {
    renderCard(bienBase)
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
    expect(screen.getByText('🏛️')).toBeInTheDocument()
  })
})
