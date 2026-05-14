/**
 * @vitest-environment jsdom
 */
import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ArtworkCard from '../components/ArtworkCard/ArtworkCard'

const mockArtwork = {
  id: 1,
  title: 'Obra de prueba',
  culture: 'Japonesa',
  dated: '1800',
  primaryimageurl: 'https://example.com/image.jpg'
}

describe('ArtworkCard', () => {
  test('renderiza el título de la obra', () => {
    render(
      <MemoryRouter>
        <ArtworkCard artwork={mockArtwork} />
      </MemoryRouter>
    )
    expect(screen.getByText('Obra de prueba')).toBeInTheDocument()
  })

  test('renderiza la cultura de la obra', () => {
    render(
      <MemoryRouter>
        <ArtworkCard artwork={mockArtwork} />
      </MemoryRouter>
    )
    expect(screen.getByText('Japonesa')).toBeInTheDocument()
  })

  test('muestra texto alternativo si no hay imagen', () => {
    const artworkSinImagen = { ...mockArtwork, primaryimageurl: null }
    render(
      <MemoryRouter>
        <ArtworkCard artwork={artworkSinImagen} />
      </MemoryRouter>
    )
    expect(screen.getByText('Sin imagen')).toBeInTheDocument()
  })

  test('muestra cultura desconocida si no hay cultura', () => {
    const artworkSinCultura = { ...mockArtwork, culture: null }
    render(
      <MemoryRouter>
        <ArtworkCard artwork={artworkSinCultura} />
      </MemoryRouter>
    )
    expect(screen.getByText('Cultura desconocida')).toBeInTheDocument()
  })
})