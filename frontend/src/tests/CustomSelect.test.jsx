import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import CustomSelect from '../components/CustomSelect/CustomSelect'

const OPTIONS = [
  { value: '', label: 'Todos' },
  { value: 'MUEBLE', label: 'Mueble' },
  { value: 'INMUEBLE', label: 'Inmueble' },
]

describe('CustomSelect', () => {
  it('muestra el placeholder cuando no hay valor seleccionado', () => {
    render(<CustomSelect value="" onChange={() => {}} options={OPTIONS} placeholder="Todos" />)
    expect(screen.getByText('Todos')).toBeInTheDocument()
  })

  it('muestra la etiqueta del valor seleccionado', () => {
    render(<CustomSelect value="MUEBLE" onChange={() => {}} options={OPTIONS} />)
    expect(screen.getByText('Mueble')).toBeInTheDocument()
  })

  it('abre el desplegable al hacer clic en el botón', () => {
    render(<CustomSelect value="" onChange={() => {}} options={OPTIONS} />)
    const trigger = screen.getByRole('button')
    fireEvent.click(trigger)
    expect(screen.getByText('Inmueble')).toBeInTheDocument()
  })

  it('cierra el desplegable y llama onChange al seleccionar una opción', () => {
    const handleChange = vi.fn()
    render(<CustomSelect value="" onChange={handleChange} options={OPTIONS} />)
    fireEvent.click(screen.getByRole('button'))
    fireEvent.click(screen.getByText('Inmueble'))
    expect(handleChange).toHaveBeenCalledWith('INMUEBLE')
  })

  it('cierra el desplegable al hacer clic fuera del componente', () => {
    render(
      <div>
        <CustomSelect value="" onChange={() => {}} options={OPTIONS} />
        <button>Fuera</button>
      </div>
    )
    fireEvent.click(screen.getByRole('button', { name: /▼|▲|Todos/i }))
    fireEvent.mouseDown(screen.getByText('Fuera'))
    expect(screen.queryByText('Inmueble')).not.toBeInTheDocument()
  })
})
