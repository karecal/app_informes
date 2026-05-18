import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Pagination from '../components/Pagination/Pagination'

describe('Pagination', () => {
  it('muestra el número de página y el total', () => {
    render(<Pagination page={2} totalPages={5} onPageChange={() => {}} />)
    expect(screen.getByText('Página 2 de 5')).toBeInTheDocument()
  })

  it('deshabilita el botón Anterior en la primera página', () => {
    render(<Pagination page={1} totalPages={3} onPageChange={() => {}} />)
    expect(screen.getByText(/Anterior/)).toBeDisabled()
  })

  it('deshabilita el botón Siguiente en la última página', () => {
    render(<Pagination page={3} totalPages={3} onPageChange={() => {}} />)
    expect(screen.getByText(/Siguiente/)).toBeDisabled()
  })

  it('llama onPageChange con página anterior al hacer clic en Anterior', () => {
    const handleChange = vi.fn()
    render(<Pagination page={3} totalPages={5} onPageChange={handleChange} />)
    fireEvent.click(screen.getByText(/Anterior/))
    expect(handleChange).toHaveBeenCalledWith(2)
  })

  it('llama onPageChange con página siguiente al hacer clic en Siguiente', () => {
    const handleChange = vi.fn()
    render(<Pagination page={2} totalPages={5} onPageChange={handleChange} />)
    fireEvent.click(screen.getByText(/Siguiente/))
    expect(handleChange).toHaveBeenCalledWith(3)
  })
})
